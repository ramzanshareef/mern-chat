import io from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { UserState } from "../context/user";
const socket = io("http://localhost:5000");

const Chatpage = () => {
    const effectRan = useRef(false);
    const myAudio = new Audio(require("../static/ting.mp3"));
    const [userName, setUserName] = useState("");
    const { isAuth, getUser } = UserState();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const append = (message, status) => {
        const messageBox = document.getElementById("message-box");
        const userJoined = document.createElement("div");
        userJoined.classList.add("text-white");
        userJoined.classList.add("overflow-auto");
        if (status === "joined") {
            userJoined.classList.add("text-center");
        }
        else if (status === "sent") {
            userJoined.classList.add("text-end");
        }
        else if (status === "recieved") {
            userJoined.classList.add("text-start");
        }
        else if (status === "left") {
            userJoined.classList.add("text-center");
        }
        else if (status === "typing") {
            userJoined.classList.add("text-center");
            userJoined.classList.add("typing-box");
        }
        userJoined.innerText = message;
        messageBox.appendChild(userJoined);
    }

    const deleteTypingBox = () => {
        const messageBox = document.getElementById("message-box");
        const typingBox = document.querySelector(".typing-box");
        if (typingBox) {
            messageBox.removeChild(typingBox);
        }
    }

    useEffect(() => {
        if (effectRan.current === false) return;
        else {
            socket.on("user-left", (name) => {
                append(name + " left the chat", "left");
            });
            socket.on("user-joined", (name) => {
                append(name + " joined the chat", "joined");
            });
            socket.on("recieve-message", (data) => {
                myAudio.play();
                append(`${data.name}: ${data.message}`, "recieved");
            });
            socket.on("user-typing", (name) => {
                append(`${name} is typing...`, "typing");
            });
            socket.on("user-stop-typing", (name) => {
                deleteTypingBox();
            });
            effectRan.current = true;
        }
    }, []);

    useEffect(() => {
        if (effectRan.current === true) return;
        else {
            if (isAuth === false) {
                window.location.href = "/";
            }
            else {
                const userDetails = async () => {
                    const token = localStorage.getItem("token");
                    await getUser(token)
                        .then((data) => {
                            setUserName(data.user.name)
                            if (data.user.name === "" || data.user.name === null) { }
                            else {
                                socket.emit("new-user-joined", data.user.name);
                            }
                        })
                }
                userDetails();
                effectRan.current = true;
            }
        }
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        socket.emit("leave-chat", userName);
        document.cookie = "isAuthenticated=false;";
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    const sendMsg = (e) => {
        e.preventDefault();
        if (message === "") {
            alert("Please enter a message");
            return;
        }
        socket.emit("stop-typing", userName);
        setIsTyping(false);
        socket.emit("send-message", message);
        append(`You: ${message}`, "sent");
        setMessage("");
    };

    const handleMsgChange = (e) => {
        setMessage(e.target.value);
        if (isTyping === false) {
            socket.emit("typing", userName);
            setIsTyping(true);
        }
    };

    return (
        <>
            <div className="min-h-screen bg-green-300">
                <nav>
                    <img src={require("../static/logo.png")} alt="chat-logo" className="mx-auto" />
                    <p className="w-fit mx-auto text-xl font-bold">Welcome to iChat</p>
                    <p className="w-fit mx-auto text-xl font-bold">User: {userName}</p>
                    <div className="w-fit mx-auto">
                        <button className="bg-blue-400 hover:bg-blue-500 p-2 text-white rounded-md" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </nav>
                <div className="w-3/5 mx-auto my-4 p-4 bg-gray-600 rounded-lg h-[60vh] overflow-y-auto" id="message-box">
                </div>
                <div>
                    <form className="w-3/5 mx-auto" onSubmit={sendMsg} id="message-form">
                        <input type="text" className="w-11/12 p-2 rounded-lg border-2 border-gray-600"
                            placeholder="Type your message here..." id="message" value={message} onChange={handleMsgChange} />
                        <button className="w-1/12 p-2 bg-gray-600 text-white  rounded-lg float-right"
                            type="submit">Send</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Chatpage