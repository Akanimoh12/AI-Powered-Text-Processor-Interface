import React, { useState } from 'react';

const ChatBot = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [language, setLanguage] = useState('');
  const [error, setError] = useState('');

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'pt', label: 'Portuguese' },
    { code: 'es', label: 'Spanish' },
    { code: 'ru', label: 'Russian' },
    { code: 'tr', label: 'Turkish' },
    { code: 'fr', label: 'French' },
  ];

  const handleSend = async () => {
    if (!inputText) {
      setError('Please enter some text.');
      return;
    }

    setError('');
    setOutputText(inputText);
    await detectLanguage(inputText);
  };

  const detectLanguage = async (text) => {
    try {
      // Call the Language Detection API here
      const response = await fetch('https://chrome.googleapis.com/v1/language/detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const result = await response.json();
      setLanguage(result.language);
    } catch (err) {
      setError('Error detecting language.');
    }
  };

  const handleSummarize = async () => {
    if (outputText.length > 150) {
      // Call Summarizer API here
      const response = await fetch('https://chrome.googleapis.com/v1/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: outputText }),
      });
      const result = await response.json();
      setOutputText(result.summary);
    }
  };

  const handleTranslate = async () => {
    if (language !== 'en') {
      // Call Translator API here
      const response = await fetch('https://chrome.googleapis.com/v1/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: outputText, targetLanguage: language }),
      });
      const result = await response.json();
      setOutputText(result.translatedText);
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
            {language && <p className="text-sm">Detected language: {language}</p>}
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
              onChange={(e) => setLanguage(e.target.value)}
              value={language}
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
