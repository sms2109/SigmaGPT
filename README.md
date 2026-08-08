# 🤖 SigmaGPT

SigmaGPT is a full-stack AI chatbot application inspired by ChatGPT. It allows users to create conversations, send questions, receive AI-generated responses, and access previous chat history.

## 🚀 Live Demo

👉 https://sigmagpt-ibug.onrender.com/

## ✨ Features

- 💬 AI-powered chat interface
- 🆕 Create a new conversation
- 🗂️ View previous conversations
- 🔄 Switch between different chat threads
- 🗑️ Delete conversations
- 💾 Store conversations in MongoDB
- 🤖 Generate AI responses using Google Gemini
- ⚡ Real-time communication between frontend and backend
- 📱 Responsive and modern dark UI
- ⌛ Loading animation while generating responses

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- CSS
- JavaScript
- Font Awesome
- React Spinners

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Google Gemini API

### Deployment

- Render — Frontend
- Render — Backend
- MongoDB Atlas — Database

## 🏗️ Project Structure

```text
SigmaGPT/
│
├── Fronted/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── Chat.jsx
│   │   ├── Chat.css
│   │   ├── ChatWindow.jsx
│   │   ├── ChatWindow.css
│   │   ├── Sidebar.jsx
│   │   ├── Sidebar.css
│   │   ├── MyContext.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── models/
│   │   └── Thread.js
│   │
│   ├── routes/
│   │   └── chat.js
│   │
│   ├── utils/
│   │   └── genai.js
│   │
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md

🔄 How It Works

User
  ↓
React Frontend
  ↓
Express.js Backend
  ↓
Google Gemini API
  ↓
AI Response
  ↓
MongoDB
  ↓
Chat History
