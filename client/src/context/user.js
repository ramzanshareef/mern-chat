import { createContext, useContext, useState } from "react";

const userContext = createContext();
const backendUrl = "http://localhost:5000";

const UserProvider = (props) => {
    const isAuth = document.cookie.includes("isAuthenticated=true")?true:false;

    const signup = async (credentials) => {
        const response = await fetch(`${backendUrl}/user/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        return data;
    }

    const login = async (credentials) => {
        const response = await fetch(`${backendUrl}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        document.cookie = "isAuthenticated=true;"
        return data;
    }

    const getUser = async () => {
        const response = await fetch(`${backendUrl}/user/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token"),
            },
        });
        const data = await response.json();
        if (response.status === 200){
            return data;
        }
        else {
            console.log(data)
            return;
        }
    }

    const getAllUsers = async (keyword) => {
        const response = await fetch(`${backendUrl}/user/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token"),
            },
            body: JSON.stringify({keyword}),
        });
        const data = await response.json();
        if (response.status === 200){
            return data;
        }
        else{
            return "No users found";
        }
    } 
    
    return (
    <userContext.Provider value={{ isAuth, signup, login, getUser, getAllUsers,  }}>
        {props.children}
    </userContext.Provider>)
};

const UserState = () => {
    return useContext(userContext);
}

export {
    UserProvider, 
    UserState
}