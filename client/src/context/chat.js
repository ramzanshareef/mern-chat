import { createContext, useContext, useState } from "react";

const chatContext = createContext();
const backendUrl = "http://localhost:5000";

const ChatProvider = (props) => {
    const [recieverID, setRecieverID] = useState("");
    const [recieverName, setRecieverName] = useState("");
    const [selectedChat, setSelectedChat] = useState({});

    const createIndividualChat = async (reciever) => {
        const response = await fetch(`${backendUrl}/chat/individual`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token"),
            },
            body: JSON.stringify(reciever)
        });
        const jsonData = await response.json();
        if (response.status !== 200) {
            return { error: jsonData.message };
        }
        return jsonData;
    }



    return (
        <chatContext.Provider value={{
            createIndividualChat,
            selectedChat,
            setSelectedChat,

            recieverID,
            setRecieverID,
            recieverName,
            setRecieverName
        }}>
            {props.children}
        </chatContext.Provider>)
};

const ChatState = () => {
    return useContext(chatContext);
}

export {
    ChatProvider,
    ChatState,
}