import "./ChatWindow.css";

import Chat from "./Chat.jsx";

import { MyContext } from "./MyContext.jsx";

import {
    useContext,
    useState,
    useEffect
} from "react";

import { ScaleLoader } from "react-spinners";

import { apiFetch } from "./api.js";

function ChatWindow() {

    const {
        user,
        setUser,

        setShowAuth,

        prompt,
        setPrompt,

        reply,
        setReply,

        currThreadId,

        setPrevChats,
        setNewChat,

        isSidebarOpen,
        setIsSidebarOpen
    } = useContext(MyContext);

    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Send message
    const getReply = async () => {

        if (!prompt.trim() || loading) {
            return;
        }

        setLoading(true);
        setNewChat(false);

        const currentPrompt = prompt;

        try {
            // Logged-in user -> /api/chat
            // Guest user -> /api/guest-chat
            const endpoint = user
                ? "/api/chat"
                : "/api/guest-chat";

            // Logged-in users need threadId.
            // Guest users only need message.
            const requestBody = user
                ? {
                    message: currentPrompt,
                    threadId: currThreadId
                }
                : {
                    message: currentPrompt
                };

            const response = await apiFetch(
                endpoint,
                {
                    method: "POST",
                    body: JSON.stringify(
                        requestBody
                    )
                }
            );
            setReply(response.reply);
        } catch (error) {

            console.error("Chat error:", error);

            setReply(
                "Sorry, something went wrong. Please try again."
            );

        } finally {

            setLoading(false);
        }
    };

    // Add new response to chat history
    useEffect(() => {

        if (prompt && reply) {

            setPrevChats((prevChats) => [

                ...prevChats,

                {
                    role: "user",
                    content: prompt
                },

                {
                    role: "assistant",
                    content: reply
                }

            ]);

            setPrompt("");
        }

    }, [reply]);

    // Profile menu
    const handleProfileClick = () => {
        setIsOpen((prev) => !prev);
    };

    // Logout
    const handleLogout = async () => {

        try {

            await apiFetch("/api/auth/logout", {
                method: "POST"
            });

        } catch (error) {

            console.error("Logout error:", error);

        } finally {

            setUser(null);
            setIsOpen(false);
            setShowAuth(false);

            setPrompt("");
            setReply(null);
            setPrevChats([]);
        }
    };

    // First letter of user's name
    const getInitial = () => {

        if (!user) {
            return "U";
        }

        return (
            user.name?.charAt(0)?.toUpperCase() ||
            user.email?.charAt(0)?.toUpperCase() ||
            "U"
        );
    };

    return (

        <div className="chatWindow">

            {/* Navbar */}

            <div className="navbar">

                <div className="navLeft">

                    <button
                        className="menuBtn"
                        onClick={() =>
                            setIsSidebarOpen(!isSidebarOpen)
                        }
                    >
                        <i className="fa-solid fa-bars"></i>
                    </button>

                    <span className="title">
                        SigmaGPT
                        <i className="fa-solid fa-chevron-down"></i>
                    </span>

                </div>


                {/* User */}

                <div
                    className="userIconDiv"
                    onClick={handleProfileClick}
                >

                    <span className="userIcon">

                        {user ? getInitial() : (
                            <i className="fa-solid fa-user"></i>
                        )}

                    </span>

                </div>

            </div>


            {/* Dropdown */}

            {isOpen && (

                <div className="dropDown">

                    {user ? (

                        <>
                            <div className="dropDownUser">

                                <div className="dropDownAvatar">
                                    {getInitial()}
                                </div>

                                <div>

                                    <strong>
                                        {user.name}
                                    </strong>

                                    <span>
                                        {user.email}
                                    </span>

                                </div>

                            </div>

                            <div className="dropdownDivider"></div>

                            <button
                                className="dropDownItem logoutItem"
                                onClick={handleLogout}
                            >

                                <i className="fa-solid fa-arrow-right-from-bracket"></i>

                                Log out

                            </button>

                        </>

                    ) : (

                        <button
                            className="dropDownItem"
                            onClick={() => {
                                setShowAuth(true);
                                setIsOpen(false);
                            }}
                        >

                            <i className="fa-solid fa-right-to-bracket"></i>

                            Login / Sign Up

                        </button>

                    )}

                </div>

            )}


            {/* Chat */}

            <Chat />


            {/* Loading */}

            <div className="loaderContainer">

                <ScaleLoader
                    color="#ffffff"
                    loading={loading}
                    height={20}
                    width={3}
                />

            </div>


            {/* Input */}

            <div className="chatInput">

                <div className="inputBox">

                    <input
                        type="text"
                        placeholder="Ask anything"
                        value={prompt}

                        disabled={loading}

                        onChange={(e) =>
                            setPrompt(e.target.value)
                        }

                        onKeyDown={(e) => {

                            if (
                                e.key === "Enter" &&
                                !e.shiftKey
                            ) {

                                e.preventDefault();

                                getReply();
                            }

                        }}
                    />

                    <button
                        id="submit"

                        className={
                            loading || !prompt.trim()
                                ? "disabledSubmit"
                                : ""
                        }

                        onClick={getReply}

                        disabled={
                            loading ||
                            !prompt.trim()
                        }
                    >

                        <i className="fa-solid fa-paper-plane"></i>

                    </button>

                </div>

                <p className="info">

                    SigmaGPT can make mistakes.
                    Check important info.

                </p>

            </div>

        </div>
    );
}

export default ChatWindow;