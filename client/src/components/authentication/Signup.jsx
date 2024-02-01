import React from 'react';
import { UserState } from '../../context/user';

const Signup = () => {

    const { signup } = UserState();

    const handleSignup = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        e.target.reset();
        const credentials = {
            name,
            email,
            password
        };
        await signup(credentials)
            .then((data)=>{
                alert("Signup successful, please login to continue")
            })
    };

    return (
        <>
        <div className="flex justify-center items-center h-56">
            <form className="rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSignup}>
                <input className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="name" placeholder="Enter your name" />
                <input className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" name="email" placeholder="Enter your email" />
                <input className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" placeholder="Enter your password" />
                <button className="px-4 py-2 rounded-lg bg-blue-500 text-white" >Register</button>
            </form>
        </div>
        </>
    );
};

export default Signup