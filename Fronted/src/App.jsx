import { useEffect, useState } from "react";
import { v1 as uuidv1 } from "uuid";

import "./App.css";

import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import Auth from "./components/Auth.jsx";

import { MyContext } from "./MyContext.jsx";
import { apiFetch } from "./api.js";


/* App */

function App() {
    // Authentication
    const [user, setUser] = useState(null);
    const [checkingAuth, setCheckingAuth] = useState(true);

    // Auth Screen
    const [showAuth, setShowAuth] = useState(false);

    // Chat
    const [prompt, setPrompt] = useState("");
    const [reply, setReply] = useState(null);
    const [currThreadId, setCurrThreadId] = useState(uuidv1());
    const [prevChats, setPrevChats] = useState([]);
    const [newChat, setNewChat] = useState(true);
    const [allThreads, setAllThreads] = useState([]);

    // Sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    /* Check Authentication */

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const data = await apiFetch("/api/auth/me");

                // User is logged in
                setUser(data.user);
            } catch (error) {
                // User is not logged in
                setUser(null);
            } finally {
                setCheckingAuth(false);
            }
        };

        checkAuth();
    }, []);


    /* Authentication Loading */

    if (checkingAuth) {
        return (
            <div className="auth-loading">
                <div className="loading-spinner"></div>
                <p>Loading SigmaGPT...</p>
            </div>
        );
    }


    /* Login / Signup */

    if (!user && showAuth) {
        return (
            <Auth
                onLogin={(loggedInUser) => {
                    setUser(loggedInUser);
                    setShowAuth(false);

                    // Start fresh authenticated chat
                    setCurrThreadId(uuidv1());
                    setPrevChats([]);
                    setReply(null);
                    setPrompt("");
                    setNewChat(true);
                }}
                // Called when user clicks
                // "Continue as Guest"
                onBack={() => {

                    // Hide Auth screen
                    setShowAuth(false);

                }}
            />
        );
    }


    /* Context Values */

    const providerValues = {
        // Authentication
        user,
        setUser,

        // Auth Screen
        showAuth,
        setShowAuth,

        // Chat
        prompt,
        setPrompt,
        reply,
        setReply,
        currThreadId,
        setCurrThreadId,
        newChat,
        setNewChat,
        prevChats,
        setPrevChats,
        allThreads,
        setAllThreads,

        // Sidebar
        isSidebarOpen,
        setIsSidebarOpen,
    };


    /* Main Application */

    return (
        <div className="app">
            <MyContext.Provider value={providerValues}>

                {/* Sidebar for logged-in users */}

                {user && <Sidebar />}

                {/* Mobile Sidebar Overlay */}

                {user && (
                    <div
                        className={`sidebarOverlay ${
                            isSidebarOpen ? "show" : ""
                        }`}
                        onClick={() =>
                            setIsSidebarOpen(false)
                        }
                    />
                )}

                {/* Chat available for everyone */}

                <ChatWindow />

            </MyContext.Provider>
        </div>
    );
}

export default App;