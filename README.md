# AI-Powered Text Processing Chatbot 🤖

This project implements an AI-powered chatbot that uses **Google Cloud's Gemini API** to process text inputs and perform tasks like **language detection**, **summarization**, and **translation**. The application provides an interactive chat interface where users can input text and get real-time feedback through summarization or translation based on their selected language. The entire conversation history is saved locally to improve the user experience.

## Features 🌟
- **Input Text Area** ✍️: A large, user-friendly text area where users can type or paste text.
- **Language Detection** 🌍: Automatically detects the language of the input text.
- **Summarize** ✂️: Summarize the text if it's longer than 150 characters.
- **Translation** 🌐: Translate the text into multiple languages including English, Portuguese, Spanish, Russian, Turkish, and French.
- **Chat History** 💬: Keeps track of previous questions and responses, stored locally on the user’s browser.
- **Responsive Design** 📱💻: The app is fully responsive and works on mobile, tablet, and desktop devices.

## Installation 🔧

### Prerequisites 🛠️
- **Node.js** (Recommended version: 16.x or higher)
- **Google Cloud API Key** 🔑 (for accessing the Gemini API)

### 1. Clone the Repository 📂

```bash
git https://github.com/Akanimoh12/AI-Powered-Text-Processor-Interface.git
cd AI-Powered-Text-Processor-Interface
```

### 2. Install Dependencies 🧰

Run the following command to install required dependencies:

```bash
npm install
```

### 3. Set Up Google Cloud API 🌐

1. **Create a Google Cloud Project**:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project and enable the necessary AI APIs (e.g., Language API, Translation API).

2. **Generate an API Key** 🔑:
   - Go to **APIs & Services > Credentials** and click **Create Credentials** > **API Key**.
   - Restrict the API key for security.

3. **Update the Code with Your API Key**:
   - Replace the placeholder `YOUR_API_KEY` in the code with your generated API key for the Google Gemini API.

### 4. Run the Application 🚀

To start the development server, run:

```bash
npm start
```

This will start the application on [http://localhost:5173](http://localhost:5173).

## How It Works 🧠

- **Input Area** ✍️: Users can enter text into the input box at the bottom of the screen.
- **Send Button** ➡️: When clicked, it sends the input text and immediately displays it in the output area.
- **Language Detection** 🌍: The application automatically detects the language of the entered text and displays it below the output.
- **Summarize** ✂️: If the input text is longer than 150 characters, a **Summarize** button will appear, allowing users to summarize the text.
- **Translate** 🌐: Users can select a language from a dropdown and click **Translate** to convert the text to the selected language.

## Local Storage 💾

- The application saves the conversation history (input and output) in the browser’s **localStorage**. This allows users to revisit past conversations even after refreshing the page.

## Error Handling ⚠️

- If the application encounters an error while making API requests (e.g., network issues or invalid API key), an error message will be displayed.
- If the user inputs no text, an error message will prompt them to enter some text.

## Technologies Used ⚙️
- **React** ⚛️: For building the frontend UI.
- **Tailwind CSS** 🎨: For styling the components and ensuring a responsive design.
- **Google Cloud Gemini API** ☁️: For language detection, summarization, and translation tasks.

## Contributions 💡

Feel free to fork this repository and contribute by:
- Fixing bugs 🐞
- Adding new features ✨
- Improving the design 🎨


