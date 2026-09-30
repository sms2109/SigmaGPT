import "./ChatWindow.css";

import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";

import {
    useContext,
    useState,
    useEffect,
} from "react";

import { ScaleLoader } from "react-spinners";
import { apiFetch } from "./api.js";


/* =====================================================
   Chat Window
===================================================== */

function ChatWindow() {

    const {

        // =================================================
        // Authentication
        // =================================================

        user,
        setUser,

        // Used to open Login / Signup screen
        setShowAuth,


        // =================================================
        // Chat
        // =================================================

        prompt,
        setPrompt,

        reply,
        setReply,

        currThreadId,

        setPrevChats,

        setNewChat,


        // =================================================
        // Mobile Sidebar
        // =================================================

        isSidebarOpen,
        setIsSidebarOpen,

    } = useContext(MyContext);


    /* =====================================================
       Local State
    ===================================================== */

    const [loading, setLoading] = useState(false);

    const [isOpen, setIsOpen] = useState(false);


    /* =====================================================
       Send Message
    ===================================================== */

    const getReply = async () => {

        // Don't send empty message
        if (!prompt.trim()) return;

        // Don't send another request while loading
        if (loading) return;


        setLoading(true);

        setNewChat(false);


        try {

            /* =================================================
               IMPORTANT

               Logged-in user:

               /api/chat
               ↓
               Authentication required
               ↓
               MongoDB
               ↓
               Sidebar


               Guest user:

               /api/guest-chat
               ↓
               No authentication
               ↓
               No MongoDB
               ↓
               No Sidebar
            ================================================= */


            const endpoint = user
                ? "/api/chat"
                : "/api/guest-chat";


            /* =================================================
               Request body

               Logged-in:
               message + threadId

               Guest:
               message only
            ================================================= */

            const requestBody = user
                ? {
                    message: prompt,
                    threadId: currThreadId,
                }
                : {
                    message: prompt,
                };


            const data = await apiFetch(endpoint, {
                method: "POST",

                body: JSON.stringify(requestBody),
            });


            // Store Gemini response
            setReply(data.reply);


        } catch (error) {

            console.error("Chat request failed:", error);


            setReply(
                "Sorry, something went wrong. Please try again."
            );


        } finally {

            setLoading(false);
        }
    };


    /* =====================================================
       Update Chat History
    ===================================================== */

    useEffect(() => {

        // Only add chat when we have both:
        // prompt + reply

        if (prompt && reply) {

            setPrevChats((previousChats) => [

                ...previousChats,

                {
                    role: "user",
                    content: prompt,
                },

                {
                    role: "assistant",
                    content: reply,
                },

            ]);
        }


        // Clear input after receiving reply
        setPrompt("");


    }, [reply]);


    /* =====================================================
       Logout
    ===================================================== */

    const logout = async () => {

        try {

            await apiFetch("/api/auth/logout", {
                method: "POST",
            });


            // Remove logged-in user
            setUser(null);


            // Close profile dropdown
            setIsOpen(false);


        } catch (error) {

            console.error("Logout failed:", error);
        }
    };


    /* =====================================================
       Profile Menu
    ===================================================== */

    const handleProfileClick = () => {

        setIsOpen((previous) => !previous);
    };


    /* =====================================================
       Enter Key
    ===================================================== */

    const handleKeyDown = (e) => {

        if (
            e.key === "Enter" &&
            !e.shiftKey
        ) {

            e.preventDefault();

            getReply();
        }
    };


    /* =====================================================
       User Initial
    ===================================================== */

    const userInitial =
        user?.name?.charAt(0)?.toUpperCase() || "U";


    /* =====================================================
       JSX
    ===================================================== */

    return (

        <div className="chatWindow">


            {/* =================================================
                NAVBAR
            ================================================= */}

            <div className="navbar">


                {/* LEFT SIDE */}

                <div className="navLeft">


                    {/* =================================================
                        MOBILE MENU

                        Only show hamburger for logged-in users
                        because guests don't have Sidebar.
                    ================================================= */}

                    {user && (
                        <div
                            className="menuBtn"
                            onClick={() =>
                                setIsSidebarOpen(!isSidebarOpen)
                            }
                        >
                            <i className="fa-solid fa-bars"></i>
                        </div>
                    )}


                    {/* =================================================
                        TITLE
                    ================================================= */}

                    <span className="title">

                        SigmaGPT

                        <i className="fa-solid fa-chevron-down"></i>

                    </span>

                </div>


                {/* =================================================
                    RIGHT SIDE
                ================================================= */}

                <div className="navRight">


                    {/* =================================================
                        GUEST USER

                        Show Login / Sign Up button
                    ================================================= */}

                    {!user && (

                        <button
                            className="guestLoginBtn"
                            onClick={() => setShowAuth(true)}
                        >
                            Login / Sign Up
                        </button>

                    )}


                    {/* =================================================
                        LOGGED-IN USER

                        Show profile icon
                    ================================================= */}

                    {user && (

                        <div
                            className="userIconDiv"
                            onClick={handleProfileClick}
                            title="Account"
                        >

                            <span className="userIcon">

                                {userInitial}

                            </span>

                        </div>

                    )}

                </div>

            </div>


            {/* =================================================
                PROFILE DROPDOWN

                Only logged-in users have this.
            ================================================= */}

            {isOpen && user && (

                <div className="dropDown">


                    {/* USER INFORMATION */}

                    <div className="dropDownUser">


                        <div className="dropDownAvatar">

                            {userInitial}

                        </div>


                        <div>

                            <strong>
                                {user?.name}
                            </strong>

                            <span>
                                {user?.email}
                            </span>

                        </div>

                    </div>


                    <div className="dropdownDivider"></div>


                    {/* LOGOUT */}

                    <button
                        className="dropDownItem logoutItem"
                        onClick={logout}
                    >

                        <i className="fa-solid fa-right-from-bracket"></i>

                        <span>
                            Log out
                        </span>

                    </button>

                </div>
            )}


            {/* =================================================
                CHAT AREA
            ================================================= */}

            <Chat />


            {/* =================================================
                LOADING
            ================================================= */}

            <div className="loaderContainer">

                <ScaleLoader
                    color="#ffffff"
                    loading={loading}
                />

            </div>


            {/* =================================================
                CHAT INPUT
            ================================================= */}

            <div className="chatInput">


                <div className="inputBox">


                    <input
                        type="text"

                        placeholder={
                            user
                                ? "Ask anything"
                                : "Ask anything without signing in"
                        }

                        value={prompt}

                        onChange={(e) =>
                            setPrompt(e.target.value)
                        }

                        onKeyDown={handleKeyDown}

                        disabled={loading}
                    />


                    {/* SEND BUTTON */}

                    <div
                        id="submit"

                        onClick={getReply}

                        className={
                            loading
                                ? "disabledSubmit"
                                : ""
                        }
                    >

                        <i className="fa-solid fa-paper-plane"></i>

                    </div>

                </div>


                {/* =================================================
                    INFO TEXT
                ================================================= */}

                <p className="info">

                    {user
                        ? "SigmaGPT can make mistakes. Check important info."
                        : "Guest chats are not saved. Log in to save your conversations."
                    }

                </p>

            </div>

        </div>
    );
}


export default ChatWindow;