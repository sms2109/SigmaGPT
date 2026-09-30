# 🤖 SigmaGPT

SigmaGPT is a full-stack AI chatbot application inspired by ChatGPT. It uses the Google Gemini API to generate AI responses and provides a modern chat interface with user authentication, guest chat, conversation history, and MongoDB storage.

Users can create an account, log in, start conversations, switch between previous chats, continue conversations, and delete chat threads.

---

## 🌐 Live Demo

🚀 **Try SigmaGPT:**

https://sigmagpt-ibug.onrender.com/

### 🔗 Repository

https://github.com/sms2109/SigmaGPT

---

# ✨ Features

- 🤖 AI-powered chatbot using Google Gemini
- 🔐 User Signup and Login
- 🚪 User Logout
- 👤 JWT-based authentication
- 🍪 HTTP cookie-based authentication
- 👥 Guest Chat without login
- 💬 Create multiple conversations
- 🆕 Start a new chat
- 🗂️ View previous conversations
- 🔄 Switch between chat threads
- 💾 Store conversations in MongoDB
- 🗑️ Delete chat threads
- 👤 Display logged-in user information
- ⚡ React-based interactive interface
- ⏳ Loading animation while generating responses
- 🎨 ChatGPT-inspired dark interface
- 📱 Responsive user interface
- 🔒 Backend API protection
- 🌐 Frontend and backend deployed on Render

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- JavaScript
- CSS
- React Context API
- Font Awesome
- React Spinners

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Google Gemini API
- JSON Web Token (JWT)
- Cookie Parser
- CORS

## Database

- MongoDB Atlas

## Deployment

- Render

## Development Tools

- Git
- GitHub
- VS Code
- npm

---

# 🏗️ System Architecture

```text
                         ┌───────────────────┐
                         │       User        │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │  React + Vite     │
                         │     Frontend      │
                         └─────────┬─────────┘
                                   │
                              REST API
                                   │
                                   ▼
                         ┌───────────────────┐
                         │ Node.js + Express │
                         │      Backend      │
                         └───────┬─────┬─────┘
                                 │     │
                     ┌───────────┘     └────────────┐
                     ▼                              ▼
             ┌───────────────┐              ┌───────────────┐
             │ MongoDB Atlas │              │ Google Gemini │
             │               │              │      API      │
             │ Users / Chats │              │ AI Responses  │
             └───────────────┘              └───────────────┘
