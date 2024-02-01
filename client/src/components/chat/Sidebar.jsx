import io from "socket.io-client";
import React, { useRef, useState, useEffect } from 'react';
import { UserState } from '../../context/user';
import { ChatState } from '../../context/chat';
const ENDPOINT = "http://localhost:5000";
var socket;

const Sidebar = () => {
    const { getUser, getAllUsers } = UserState();
    const { createIndividualChat, setRecieverName, setRecieverID, selectedChat, setSelectedChat, } = ChatState();
    const useEffectRan = useRef(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [user, setUser] = useState({});

    socket = io(ENDPOINT);

    useEffect(() => {
        if (!useEffectRan.current) {
            useEffectRan.current = true;
            getUser()
                .then((res) => {
                    if (res.user) {
                        setUser(res.user);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            getAllUsers()
                .then((res) => {
                    if (res.users) {
                        setSearchResults(res.users);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            useEffectRan.current = true;
        }
    }, []); // get logged in user and all registered users

    const handleSearch = async (e) => {
        setSearchTerm(e.target.value);
        await getAllUsers(e.target.value)
            .then((res) => {
                if (res.users) {
                    setSearchResults(res.users);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }; // @function : search for users

    const handleUserChange = async (e) => {
        const reciever = {
            recieverID: e.target.id,
        }
        await createIndividualChat(reciever)
            .then((res) => {
                if (res.error) {
                    console.log("Error = ", res.error.message)
                }
                else {
                    // setRecieverID(reciever.recieverID);
                    res.chat.users.forEach((user) => {
                        if (user._id === reciever.recieverID) {
                            // setRecieverName(user.name);
                            setSelectedChat(user)
                            localStorage.setItem("recID", user._id);
                        }
                    });
                    socket.emit("join chat", res.chat._id);
                }
            })
    }

    const handleLogout = (e) => {
        e.preventDefault();
        document.cookie = "isAuthenticated=false;";
        localStorage.removeItem("token");
        localStorage.removeItem("recID");
        window.location.href = "/";
    }; // @function : logout logged in user

    return (
        <>
            <div className="text-center m-2">
                Welcome, {user.name}
                <button className="bg-blue-400 hover:bg-blue-500 m-2 px-2 py-1 text-white rounded-md" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search for users or groups"
                className="block w-4/5 mx-auto border border-gray-300 rounded-md m-4 p-2 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:shadow-md"
            />
            <ul>
                {searchResults.map((user, index) => (
                    <li key={index} className="bg-gray-400 p-2 w-4/5 mx-auto block hover:bg-gray-500 hover:cursor-pointer" onClick={handleUserChange} id={user._id}>{user.name}</li>
                ))}
            </ul>
        </>
    );
};

export default Sidebar