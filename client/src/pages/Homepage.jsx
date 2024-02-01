import React, { useEffect, useRef, useState } from 'react';
import Login from "../components/authentication/Login";
import Signup from "../components/authentication/Signup";
import { UserState } from '../context/user';

const Homepage = () => {
    const { isAuth } = UserState();
    const useEffectRan = useRef(false);
    const [activeTab, setActiveTab] = useState("login");

    useEffect(() => {
        if (useEffectRan.current === true) {
            if (isAuth===true){
                console.log("I am authenticated")
                window.location.href = '/chat';
            }
        } 
        else {
            useEffectRan.current = true;
            return;
        }
    }, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-96 bg-white rounded-lg shadow-lg p-6 border">
                <h1 className="text-3xl font-bold mb-4 text-center">
                    Welcome to iChat
                </h1>
                <div className="flex justify-between mb-6">
                    <button
                        className={`px-4 py-2 rounded-lg ${activeTab === 'signup' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                        onClick={() => handleTabChange('signup')}
                    >
                        Signup
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg ${activeTab === 'login' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                        onClick={() => handleTabChange('login')}
                    >
                        Login
                    </button>
                </div>
                {activeTab === "signup" ? <Signup /> : <Login />}
            </div>
        </div>
    );
};

export default Homepage;