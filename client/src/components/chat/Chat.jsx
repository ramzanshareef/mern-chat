import { useEffect, useRef, useState } from "react";
import { MessageState } from "../../context/message";
import { ChatState } from "../../context/chat";
import io from "socket.io-client";
import { UserState } from "../../context/user";
const ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
var socket;

const Chat = () => {
    socket = io(ENDPOINT);
    const effectRan = useRef(false);
    const effect1Ran = useRef(false);
    const { sendIndividualMessage, getIndividualChat } = MessageState();
    const { selectedChat } = ChatState();
    const { getUser } = UserState();
    const myAudio = new Audio(require("../../static/ting.mp3"));
    const [userName, setUserName] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        if (effectRan.current === false) {
            getUser()
                .then((res) => {
                    if (res.user) {
                        setUser(res.user);
                        setUserName(res.user.name);
                        socket.emit("setup", res.user);
                        socket.on("connected", (user) => {
                            console.log(user.name + " connected");
                        });
                    }
                })
            effectRan.current = true;
        }
        else {
            return;
        }
    }, []); // get logged in user

    useEffect(() => {
        if (effect1Ran.current === false) {
            socket.on("message received", (data) => {
                const recID = localStorage.getItem("recID");
                myAudio.play();
                if (data.chat.users[0] === recID || data.chat.users[1] === recID ) {
                    append(
                        data.chat.messages[data.chat.messages.length - 1].sender.name + " : " + data.chat.messages[data.chat.messages.length - 1].message,
                        "recieved"
                    );
                }
                else {
                    console.log("iam here")
                }
            });
            socket.on("message sent", (data) => {
                append(
                    "You : " + data.chat.messages[data.chat.messages.length - 1].message,
                    "sent"
                );
            })
            effect1Ran.current = true;
        }
    }, []); // for sending and recieving messages

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
    } // @function : append message to message box

    const handleMsgChange = (e) => {
        setMessage(e.target.value);
    } // @function : handle message input change

    const sendMsg = async (e) => {
        e.preventDefault();
        if (message === "" || message === " " || message === null) {
            alert("Please enter a message");
            return;
        }
        const data = {
            recieverID: selectedChat._id,
            message
        }
        await sendIndividualMessage( data )
            .then((res) => {
                if (res.error) {
                    console.log("Error = ", res);
                }
                else {
                    console.log(res)
                    socket.emit("new message", res)
                    setMessage("");
                }
            })
    } // @function : send message to reciever

    useEffect(() => {
        const recID = localStorage.getItem("recID");
        if (recID !== undefined && recID !== null && recID !== "") {
            const data = {
                recieverID: recID
            }
            getIndividualChat(data)
                .then((res) => {
                    if (res.error) {
                        console.log("Error = ", res.error.message);
                    }
                    else {
                        setMessages(res.chat.messages);
                    }
                })
        }
    }, [selectedChat]) // fetching previous messages

    useEffect(() => {
        const messageBox = document.getElementById("message-box");
        messageBox.innerHTML = "";
        messages.forEach((msg) => {
            if (msg.sender._id === user._id) {
                append(
                    "You : " + msg.message,
                    "sent"
                );
            }
            else {
                append(
                    msg.sender.name + " : " + msg.message,
                    "recieved"
                );
            }
        });
    }, [messages]) // update messages

    return (
        <>
            <div className={"min-h-screen bg-green-300 flex flex-col justify-center" +
                " " + (selectedChat._id ? "" : "hidden")
            }>
                <div className="w-4/5 mx-auto p-4 bg-gray-600 h-[10vh]">
                    <h1 className="text-white text-center text-2xl">
                        Chat with {selectedChat.name}
                    </h1>
                </div>

                <div className="w-4/5 mx-auto p-4 bg-gray-600 h-[80vh] overflow-y-auto" id="message-box">
                </div>
                <div>
                    <form className="w-4/5 mx-auto"
                        onSubmit={sendMsg}
                        id="message-form">
                        <input type="text"
                            className="w-11/12 p-2 rounded-lg border-2 border-gray-600"
                            placeholder="Type your message here..."
                            id="message"
                            value={message}
                            onChange={handleMsgChange}
                        />
                        <button className="w-1/12 p-4 bg-gray-600 text-white rounded-lg float-right"
                            type="submit">
                            <img src="https://th.bing.com/th/id/R.cabb92ca7eb39b8bc5aed1c198f142db?rik=KpNKlI4NCPeLTQ&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_307755.png&ehk=JUZRydDk1eulGPisi1vcgjKaZI24JCdpDqe61brluTA%3d&risl=&pid=ImgRaw&r=0" draggable="false" />
                        </button>
                    </form>
                </div>
            </div>
            <div className={"flex bg-green-400 min-h-screen items-center justify-center text-2xl" + " " + (selectedChat._id ? "hidden" : "")}>
                Chat with people around the world!
            </div>
        </>
    )
}

export default Chat;