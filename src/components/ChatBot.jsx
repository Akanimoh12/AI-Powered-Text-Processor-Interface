import React, { useState } from 'react';

const ChatBot = () => {
  const [inputText, setInputText] = useState(''); 
  const [outputText, setOutputText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('en');
  //  const [language, setLanguage] = useState('en'); 
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [error, setError] = useState('');

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'pt', label: 'Portuguese' },
    { code: 'es', label: 'Spanish' },
    { code: 'ru', label: 'Russian' },
    { code: 'tr', label: 'Turkish' },
    { code: 'fr', label: 'French' },
  ];

  require('dotenv').config(); // Load environment variables from .env file
const fetch = require('node-fetch');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

  const handleSend = async () => {
    if (!inputText) {
      setError('Please enter some text.');
      return;
    }

    setError('');
    setOutputText(inputText); // Initial output is the same as input
    await detectLanguage(inputText);
  };

  const detectLanguage = async (text) => {
    try {
      const response = await fetch(
        `https://language.googleapis.com/v2/detect?key=${GOOGLE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ q: [text] }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || 'Language detection failed');
      }

      const result = await response.json();
      if (result.data.detections && result.data.detections[0] && result.data.detections[0][0]) {
        setDetectedLanguage(result.data.detections[0][0].language);
      } else {
        setDetectedLanguage("Language not detected");
      }
    } catch (err) {
      setError(err.message);
      console.error("Language detection error:", err);
    }
  };

  const handleTranslate = async () => {
    if (!detectedLanguage) {
      setError("Please send text first to detect Language");
      return;
    }

    if (detectedLanguage === targetLanguage) {
      setError("Source and target languages are the same.");
      return;
    }

    try {
      const response = await fetch(
        `https://translation.googleapis.com/language/v2/translate?key=${GOOGLE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            q: [inputText], // Use inputText for translation
            target: targetLanguage,
            source: detectedLanguage
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || 'Translation failed');
      }

      const result = await response.json();
      setOutputText(result.data.translations[0].translatedText);
    } catch (err) {
      setError(err.message);
      console.error("Translation error:", err);
    }
  };

  // handleSummarize function
  const handleSummarize = async () => {
    if (outputText.length <= 150) {
      setError("Text must be longer than 150 characters to summarize.");
      return;
    }

    try {
        const response = await fetch(
          `https://us-central1-aiplatform.googleapis.com/v1/projects/YOUR_PROJECT_ID/locations/us-central1/endpoints/YOUR_ENDPOINT_ID:predict`, // Replace with your endpoint
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${YOUR_ACCESS_TOKEN}`, // Replace with your access token
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "instances": [
                {
                  "content": outputText
                }
              ],
              "parameters": {
                "length_penalty": 1.0,
                "min_length": 50,
                "max_length": 200
              }
            })
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error.message || 'Summarization failed');
        }

        const result = await response.json();
        const summary = result.predictions[0].summary; // Adjust based on your model's output structure
        setOutputText(summary);

    } catch (err) {
      setError(err.message);
      console.error("Summarization error:", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="chat-container bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        <div className="output-area mb-4">
          <p className="text-lg font-semibold">Output:</p>
          <div className="output-text bg-gray-100 p-4 rounded-md">
            {outputText ? outputText : 'Enter text and click send...'}
          </div>
          <div className="language-detection mt-2">
            {detectedLanguage && <p className="text-sm">Detected language: {detectedLanguage}</p>}
          </div>
        </div>

        <div className="input-area mb-4">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your text here..."
            className="textarea w-full p-3 border rounded-lg"
            rows="4"
          />
          <div className="flex space-x-2 mt-2">
            <button
              onClick={handleSend}
              className="btn-send bg-blue-500 text-white py-2 px-4 rounded-full"
            >
              Send
            </button>
            <button
              onClick={handleSummarize}
              className="btn-summarize bg-green-500 text-white py-2 px-4 rounded-full"
            >
              Summarize
            </button>

              <select
        className="language-select py-2 px-4 border rounded-lg"
        onChange={(e) => setTargetLanguage(e.target.value)} // Corrected to targetLanguage
        value={targetLanguage} // Corrected to targetLanguage
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>

            <button
              onClick={handleTranslate}
              className="btn-translate bg-yellow-500 text-white py-2 px-4 rounded-full"
            >
              Translate
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default ChatBot; 
