import "./Sidebar.css";

import {
    useContext,
    useEffect,
} from "react";

import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";
import { apiFetch } from "./api.js";


/* Sidebar */

function Sidebar() {

    const {
        // Auth
        user,
        setUser,

        // Threads
        allThreads,
        setAllThreads,
        currThreadId,
        setNewChat,
        setPrompt,
        setReply,
        setCurrThreadId,
        setPrevChats,

        // Mobile Sidebar
        isSidebarOpen,
        setIsSidebarOpen,

    } = useContext(MyContext);


    /* Get All Threads */

    const getAllThreads = async () => {

        try {

            const data = await apiFetch("/api/thread");

            // Filter required thread data
            const filteredData = data.map((thread) => ({
                threadId: thread.threadId,
                title: thread.title,
            }));

            setAllThreads(filteredData);

        } catch (error) {

            console.error(
                "Failed to fetch threads:",
                error
            );

        }

    };


    /* Load Threads */

    useEffect(() => {

        if (user) {
            getAllThreads();
        }

    }, [user, currThreadId]);


    /* Create New Chat */

    const createNewChat = () => {

        // Start new conversation
        setNewChat(true);

        // Clear input
        setPrompt("");

        // Clear latest reply
        setReply(null);

        // Generate new thread ID
        setCurrThreadId(uuidv1());

        // Clear previous messages
        setPrevChats([]);

        // Close mobile sidebar
        setIsSidebarOpen(false);

    };


    /* Change Thread */

    const changeThread = async (newThreadId) => {

        // Set selected thread
        setCurrThreadId(newThreadId);

        // Close mobile sidebar
        setIsSidebarOpen(false);

        try {

            // Fetch selected thread
            const data = await apiFetch(
                `/api/thread/${newThreadId}`
            );

            // Load messages
            setPrevChats(data);

            // No longer a new conversation
            setNewChat(false);

            // Clear latest reply
            setReply(null);

        } catch (error) {

            console.error(
                "Failed to load thread:",
                error
            );

        }

    };


    /* Delete Thread */

    const deleteThread = async (threadId) => {

        try {

            await apiFetch(
                `/api/thread/${threadId}`,
                {
                    method: "DELETE",
                }
            );

            // Remove thread from state
            setAllThreads((previousThreads) =>
                previousThreads.filter(
                    (thread) =>
                        thread.threadId !== threadId
                )
            );

            // Create new chat if current thread is deleted
            if (threadId === currThreadId) {
                createNewChat();
            }

        } catch (error) {

            console.error(
                "Failed to delete thread:",
                error
            );

        }

    };


    /* Logout */

    const logout = async () => {

        try {

            // Clear authentication cookie
            await apiFetch(
                "/api/auth/logout",
                {
                    method: "POST",
                }
            );

            // Remove user from state
            setUser(null);

            // Clear chat state
            setAllThreads([]);
            setPrevChats([]);
            setReply(null);
            setPrompt("");

        } catch (error) {

            console.error(
                "Logout failed:",
                error
            );

        }

    };


    /* User Avatar */

    const getInitial = () => {

        if (!user?.name) {
            return "U";
        }

        return user.name
            .charAt(0)
            .toUpperCase();

    };


    /* JSX */

    return (

        <section
            className={`sidebar ${
                isSidebarOpen ? "open" : ""
            }`}
        >

            {/* Close Mobile Sidebar */}

            <div
                className="closeSidebar"
                onClick={() =>
                    setIsSidebarOpen(false)
                }
            >

                <i className="fa-solid fa-xmark"></i>

            </div>


            {/* New Chat Button */}

            <div className="sidebarTop">

                <button
                    onClick={createNewChat}
                    title="New Chat"
                >

                    <img
                        src="/blacklogo.png"
                        alt="SigmaGPT"
                        className="logo"
                    />

                    <span>
                        <i className="fa-solid fa-pen-to-square"></i>
                    </span>

                </button>

            </div>


            {/* Chat History */}

            <ul className="history">

                {allThreads?.map((thread) => (

                    <li
                        key={thread.threadId}
                        onClick={() =>
                            changeThread(
                                thread.threadId
                            )
                        }
                        className={
                            thread.threadId === currThreadId
                                ? "highlighted"
                                : ""
                        }
                    >

                        <span className="thread-title">
                            {thread.title}
                        </span>


                        {/* Delete */}

                        <i
                            className="fa-solid fa-trash"
                            onClick={(e) => {

                                // Prevent thread selection
                                e.stopPropagation();

                                deleteThread(
                                    thread.threadId
                                );

                            }}
                            title="Delete chat"
                        >
                        </i>

                    </li>

                ))}

            </ul>


            {/* User Section */}

            <div className="sidebarUser">

                <div className="userDetails">

                    <div className="userAvatar">
                        {getInitial()}
                    </div>

                    <div className="userText">

                        <strong>
                            {user?.name}
                        </strong>

                        <span>
                            {user?.email}
                        </span>

                    </div>

                </div>


                <button
                    className="logoutButton"
                    onClick={logout}
                    title="Logout"
                >

                    <i className="fa-solid fa-right-from-bracket"></i>

                </button>

            </div>


            {/* Footer */}

            <div className="sign">

                <p>
                    By Sheshkaran &hearts;
                </p>

            </div>

        </section>

    );

}


export default Sidebar;