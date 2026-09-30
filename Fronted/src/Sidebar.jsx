import "./Sidebar.css";

import {
    useContext,
    useEffect
} from "react";

import { MyContext } from "./MyContext.jsx";

import { v1 as uuidv1 } from "uuid";

import { apiFetch } from "./api.js";

function Sidebar() {

    const {
        allThreads,
        setAllThreads,

        currThreadId,

        setNewChat,
        setPrompt,
        setReply,

        setCurrThreadId,
        setPrevChats,

        isSidebarOpen,
        setIsSidebarOpen
    } = useContext(MyContext);


    // Get all threads
    const getAllThreads = async () => {

        try {

            const res = await apiFetch("/api/thread");

            const filteredData = res.map(
                (thread) => ({
                    threadId: thread.threadId,
                    title: thread.title
                })
            );

            setAllThreads(filteredData);

        } catch (error) {

            console.error(
                "Failed to load threads:",
                error
            );

        }
    };


    useEffect(() => {

        getAllThreads();

    }, [currThreadId]);


    // Create new chat
    const createNewChat = () => {

        setNewChat(true);

        setPrompt("");

        setReply(null);

        setCurrThreadId(uuidv1());

        setPrevChats([]);

        setIsSidebarOpen(false);
    };


    // Open existing thread
    const changeThread = async (
        newThreadId
    ) => {

        setCurrThreadId(newThreadId);

        setIsSidebarOpen(false);

        try {

            const res = await apiFetch(
                `/api/thread/${newThreadId}`
            );

            setPrevChats(res);

            setNewChat(false);

            setReply(null);

        } catch (error) {

            console.error(
                "Failed to load thread:",
                error
            );

        }
    };


    // Delete thread
    const deleteThread = async (
        threadId
    ) => {

        try {

            await apiFetch(
                `/api/thread/${threadId}`,
                {
                    method: "DELETE"
                }
            );

            setAllThreads(
                (prev) =>
                    prev.filter(
                        (thread) =>
                            thread.threadId !==
                            threadId
                    )
            );

            if (
                threadId === currThreadId
            ) {

                createNewChat();
            }

        } catch (error) {

            console.error(
                "Failed to delete thread:",
                error
            );

        }
    };


    return (

        <section
            className={`sidebar ${
                isSidebarOpen
                    ? "open"
                    : ""
            }`}
        >

            {/* Close button */}

            <div
                className="closeSidebar"
                onClick={() =>
                    setIsSidebarOpen(false)
                }
            >
                <i className="fa-solid fa-xmark"></i>
            </div>


            {/* New chat */}

            <div className="sidebarTop">

                <button
                    onClick={createNewChat}
                >

                    <img
                        src="/SigmaGPTlogo.png"
                        alt="SigmaGPT"
                        className="logo"
                    />

                    <span>
                        <i className="fa-solid fa-pen-to-square"></i>
                    </span>

                </button>

            </div>


            {/* History */}

            <ul className="history">

                {allThreads?.map(
                    (thread) => (

                        <li
                            key={thread.threadId}

                            onClick={() =>
                                changeThread(
                                    thread.threadId
                                )
                            }

                            className={
                                thread.threadId ===
                                currThreadId
                                    ? "highlighted"
                                    : ""
                            }
                        >

                            {thread.title}

                            <i
                                className="fa-solid fa-trash"
                                onClick={(e) => {

                                    e.stopPropagation();

                                    deleteThread(
                                        thread.threadId
                                    );

                                }}
                            ></i>

                        </li>

                    )
                )}

            </ul>


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