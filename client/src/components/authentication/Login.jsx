import React, { useEffect, useRef } from 'react';
import { UserState } from '../../context/user';
import io from "socket.io-client";
const socket = io("http://localhost:5000");

const Login = () => {
    const { login, setUser } = UserState();
    const effectRan = useRef(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const credentials = {
            email,
            password
        };
        e.target.reset();
        await login(credentials)
            .then((data)=>{
                if (data.token){
                    localStorage.setItem("token", data.token)
                    window.location.href = "/chat"
                }
                else {
                    alert(data.message)
                }
            })
    };

    return (
        <>
            <div className="flex justify-center items-center h-56">
                <form className="rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
                    <input className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" name="email" placeholder="Enter your email" />
                    <input className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" placeholder="Enter your password" />
                    <button className="px-4 py-2 rounded-lg bg-blue-500 text-white" >Login</button>
                </form>
            </div>
        </>
    );
};

export default Login