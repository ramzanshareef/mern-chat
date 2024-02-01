import io from "socket.io-client";
import { useEffect, useRef } from "react";
import Sidebar from "../components/chat/Sidebar";
import Chat from "../components/chat/Chat";
import Right from "../components/chat/Right";
import { UserState } from "../context/user";
const socket = io("http://localhost:5000");

const Chatspage = () => {
    const { isAuth } = UserState();
    const useEffectRan = useRef(false);
    
    // For checking if user is authenticated
    useEffect(() => {
        if (!useEffectRan.current) {
            if (isAuth === false) {
                window.location.href = "/";
                useEffectRan.current = true;
            }
        }
    }, []);

    return (
        <div className="flex h-screen overflow-auto">
            <div className="w-1/4 border-2 border-gray-600">
                <Sidebar />
            </div>
            <div className="w-2/4 border-2 border-gray-600">
                <Chat />
            </div>
            <div className="w-1/4 border-2 border-gray-600">
                <Right />
            </div>
        </div>
    );
};

export default Chatspage;