import { createContext, useContext } from "react";

const messageContext = createContext();
const backendUrl = "http://localhost:5000";

const MessageProvider = (props) => {

    const sendIndividualMessage = async (data) => {
        const response = await fetch(`${backendUrl}/message/sendIndMsg`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token"),
            },
            body: JSON.stringify(data)
        });
        const jsonData = await response.json();
        if (response.status !== 200) {
            return { error: jsonData.message };
        }
        return jsonData;
    }
    
    const getIndividualChat = async (reciever) => {
        const response = await fetch(`${backendUrl}/message/getIndMsgs`, {
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
        <messageContext.Provider value={{ sendIndividualMessage, getIndividualChat }}>
            {props.children}
        </messageContext.Provider>)
};

const MessageState = () => {
    return useContext(messageContext);
}

export {
    MessageProvider,
    MessageState,
}