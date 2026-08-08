# 🤖 SigmaGPT

SigmaGPT is a full-stack AI chatbot application inspired by ChatGPT. It provides an interactive chat interface where users can ask questions, receive AI-generated responses, create multiple conversations, switch between previous chats, and delete chat threads.

## 🌐 Live Demo

🚀 **Try SigmaGPT:**  
https://sigmagpt-ibug.onrender.com/

---

## 📸 Features

- 💬 AI-powered chatbot
- 🤖 Google Gemini API integration
- 🆕 Create new conversations
- 🗂️ View previous chat history
- 🔄 Switch between different conversations
- 🗑️ Delete chat threads
- 💾 Store conversations in MongoDB
- ⚡ React-based interactive UI
- ⏳ Loading animation while generating responses
- 🎨 ChatGPT-inspired dark interface
- 📱 Responsive user interface
- ☁️ Fully deployed application

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- JavaScript
- CSS
- Font Awesome
- React Spinners

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Google Gemini API

### Database

- MongoDB Atlas

### Deployment

- Render

---

## 🏗️ Project Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │       Vite          │
                    └──────────┬──────────┘
                               │
                         HTTP Requests
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Node + Express    │
                    │      Backend        │
                    └──────────┬──────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
                    ▼                     ▼
          ┌─────────────────┐   ┌─────────────────┐
          │  Google Gemini  │   │  MongoDB Atlas  │
          │      API        │   │    Database     │
          └─────────────────┘   └─────────────────┘
```

---

## 📂 Project Structure

```text
SigmaGPT/
│
├── Fronted/
│   │
│   ├── public/
│   │   ├── blacklogo.png
│   │   ├── favicon.svg
│   │   └── icons.svg
│   │
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
│   ├── package-lock.json
│   ├── vite.config.js
│   └── index.html
│
├── backend/
│   │
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
│   ├── package-lock.json
│   └── server.js
│
├── .gitignore
└── README.md
```

---

## 🔄 How SigmaGPT Works

When the user sends a message, the following process takes place:

```text
User enters message
        ↓
React Frontend
        ↓
Express API
        ↓
Google Gemini API
        ↓
AI Generated Response
        ↓
Express Backend
        ↓
MongoDB
        ↓
Response sent back to React
        ↓
Displayed in Chat UI
```

### Step-by-step

1. The user enters a question in the chat input.
2. React sends the question and `threadId` to the backend.
3. Express receives the request.
4. The backend sends the prompt to Google Gemini.
5. Gemini generates an AI response.
6. The backend stores the conversation in MongoDB.
7. The response is returned to the frontend.
8. React displays the response in the chat window.
9. The conversation becomes available in the sidebar.

---

## 💬 Chat Threads

SigmaGPT supports multiple conversations.

Each conversation has a unique:

```text
threadId
```

The sidebar displays all previous conversations.

Users can:

- Create a new chat
- Open an existing chat
- Continue a previous conversation
- Delete a conversation

---

## 🗄️ Database

SigmaGPT uses **MongoDB Atlas** to store chat threads and messages.

A thread contains information such as:

```text
threadId
title
messages
timestamp
```

Messages contain:

```text
role
content
timestamp
```

Example:

```json
{
  "role": "user",
  "content": "What is React?"
}
```

and:

```json
{
  "role": "assistant",
  "content": "React is a JavaScript library for building user interfaces."
}
```

---

## 🔐 Environment Variables

The backend requires environment variables for MongoDB and Gemini API access.

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

### ⚠️ Important

Never upload your `.env` file to GitHub.

Your `.gitignore` should contain:

```gitignore
node_modules/
.env
.env.local
dist/
```

---

# 🚀 Run SigmaGPT Locally

## 1. Clone the Repository

```bash
git clone https://github.com/sms2109/SigmaGPT.git
```

Move into the project:

```bash
cd SigmaGPT
```

---

## 2. Setup Backend

Move into the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create:

```text
backend/.env
```

Add:

```env
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend:

```bash
node server.js
```

The backend will run locally on:

```text
http://localhost:8080
```

---

## 3. Setup Frontend

Open another terminal.

From the project root:

```bash
cd Fronted
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

# ☁️ Deployment

SigmaGPT is deployed using Render.

### Frontend

The React/Vite frontend is deployed as a Render Static Site.

```text
Fronted
   ↓
npm install && npm run build
   ↓
dist/
   ↓
Render Static Site
```

### Backend

The Node.js/Express backend is deployed as a Render Web Service.

```text
backend
   ↓
npm install
   ↓
node server.js
   ↓
Render Web Service
```

### Database

MongoDB Atlas is used as the cloud database.

---

## 🔗 API Endpoints

### Get All Threads

```http
GET /api/thread
```

Returns all chat threads.

---

### Get a Specific Thread

```http
GET /api/thread/:threadId
```

Returns the messages belonging to a specific thread.

---

### Send Chat Message

```http
POST /api/chat
```

Example request:

```json
{
  "message": "What is JavaScript?",
  "threadId": "unique-thread-id"
}
```

---

### Delete Thread

```http
DELETE /api/thread/:threadId
```

Deletes a specific conversation.

---

## 🎨 User Interface

SigmaGPT provides a ChatGPT-inspired interface with:

- Dark theme
- Sidebar chat history
- New chat button
- User messages
- AI responses
- Loading animation
- Scrollable conversation area
- Profile menu
- Responsive chat input

---

## 🧠 AI Integration

SigmaGPT uses the **Google Gemini API** to generate responses.

The backend handles communication with Gemini so that the API key is never exposed directly in the frontend.

```text
React
  ↓
Express Backend
  ↓
Gemini API
  ↓
AI Response
  ↓
React
```

This keeps the API credentials on the server side.

---

## 📈 Future Improvements

Some features planned for future versions:

- 🔐 User authentication
- 👤 User accounts
- 💬 Streaming AI responses
- 📎 File uploads
- 🖼️ Image understanding
- 🎤 Voice input
- 🔊 Voice responses
- 🔍 Search chat history
- ✏️ Rename conversations
- 🌙 Light/Dark theme switcher
- 📱 Better mobile responsiveness
- ⚡ Faster response streaming
- 🧠 Conversation memory
- 📊 Usage statistics

---

## 📚 What I Learned

While building SigmaGPT, I worked with:

- React component architecture
- React Context API
- `useState`
- `useEffect`
- API requests using `fetch`
- REST APIs
- Node.js
- Express.js
- MongoDB
- Mongoose
- Google Gemini API
- Environment variables
- Git and GitHub
- Render deployment
- Frontend-backend integration

---

## 🧑‍💻 Author

### Sheshkaran Solanki

BE Information Technology  
MBM University

GitHub:  
https://github.com/sms2109

---

## ⭐ Support

If you found this project useful or interesting, consider giving the repository a ⭐.

---

## 📜 License

This project is created for learning and educational purposes.

---

# ❤️ SigmaGPT

Built with React, Node.js, Express, MongoDB and Google Gemini.

**Made with ❤️ by Sheshkaran**
