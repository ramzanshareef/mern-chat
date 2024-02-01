import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./context/user";
import { ChatProvider } from "./context/chat";
import { MessageProvider } from "./context/message";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ChatProvider>
            <MessageProvider>
                <UserProvider>
                    <App />
                </UserProvider>
            </MessageProvider>
        </ChatProvider>
    </React.StrictMode>
);