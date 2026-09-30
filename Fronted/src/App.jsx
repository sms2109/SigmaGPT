import { useEffect, useState } from "react";
import { v1 as uuidv1 } from "uuid";

import "./App.css";

import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import Auth from "./components/Auth.jsx";

import { MyContext } from "./MyContext.jsx";
import { apiFetch } from "./api.js";

function App() {
    const [user, setUser] = useState(null);
    const [checkingAuth, setCheckingAuth] = useState(true);

    const [showAuth, setShowAuth] = useState(false);

    const [prompt, setPrompt] = useState("");
    const [reply, setReply] = useState(null);
    const [currThreadId, setCurrThreadId] = useState(uuidv1());
    const [prevChats, setPrevChats] = useState([]);
    const [newChat, setNewChat] = useState(true);
    const [allThreads, setAllThreads] = useState([]);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const data = await apiFetch("/api/auth/me");
                setUser(data.user);
            } catch (error) {
                setUser(null);
            } finally {
                setCheckingAuth(false);
            }
        };

        checkAuth();
    }, []);

    if (checkingAuth) {
        return (
            <div className="auth-loading">
                <div className="loading-spinner"></div>
                <p>Loading SigmaGPT...</p>
            </div>
        );
    }

    if (!user && showAuth) {
        return (
            <Auth
                onLogin={(loggedInUser) => {
                    setUser(loggedInUser);
                    setShowAuth(false);

                    setCurrThreadId(uuidv1());
                    setPrevChats([]);
                    setReply(null);
                    setPrompt("");
                    setNewChat(true);
                }}
                onBack={() => {
                    setShowAuth(false);
                }}
            />
        );
    }

    const providerValues = {
        user,
        setUser,

        showAuth,
        setShowAuth,

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

        isSidebarOpen,
        setIsSidebarOpen,
    };

    return (
        <div className="app">
            <MyContext.Provider value={providerValues}>
                {user && <Sidebar />}

                {user && (
                    <div
                        className={`sidebarOverlay ${
                            isSidebarOpen ? "show" : ""
                        }`}
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                <ChatWindow />
            </MyContext.Provider>
        </div>
    );
}

export default App;