import React, { useRef, useState, useEffect, useContext } from "react";
import axios from 'axios';
import AuthContext from "./context/AuthProvider";

const LoginPage = () => {
    // Reference
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    // Variables where inputs will be stored
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // Get username and password from inputs
    const HandleUsername = (event) => {setUsername(event.target.value);}
    const HandlePassword = (event) => {setPassword(event.target.value);}

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const SubmitLogin = async (event) => {
        event.preventDefault(); 
        if(username.length > 0 && password.length > 0){
            const login_url = process.env.REACT_APP_GET_LOGIN;
            const data = {username, password}
            // POST request to login api
            axios.post(login_url, data)
                .then(response => {
                    setAuth({username, password}); // Set authorization when user posts valid login details
                    console.log(response.data)
                    setUsername('');
                    setPassword('');
                })
                .catch(err => {
                    if(!err.response) {
                        setErrMsg('No server response')
                    } else if (err.response?.status === 400){
                        setErrMsg('Missing username or password')
                    } else if (err.response?.status === 401){
                        setErrMsg('Error: Not a valid account')
                        console.error(err)
                    } else{
                        setErrMsg('Login Failed')
                    }
                    errRef.current.focus();
                })
        }
    }


    return (
        <>
            {/* {success ? (page to be shown after login) : (login page)} */}
            <div className="grid items-center justify-center relative bg-[#cdb087] h-screen w-screen">              
                <form className="grid gap-4 text-2xl font-semibold w-fit" onSubmit={SubmitLogin}>
                    <label className="text-3xl text-white font-bold">Sign-in</label>
                    <input className="w-64 h-12 p-2" type="text" id="username" placeholder=" Username" ref={userRef} autoComplete="off" value={username} onChange={HandleUsername} required></input>
                    <input className="w-64 h-12 p-2" type="password" id="password" placeholder=" Password" value={password} onChange={HandlePassword} required></input>
                    <button type="submit" className="w-64 h-12 p-2 text-white font-bold bg-[#a48c6c] ring ring-[##a48c6c] ring-offset-4 rounded-2xl text-3xl hover:shadow hover:bg-blue-500">
                        Login
                    </button>         
                </form>
                <a href="/create-account" className="text-lg flex items-center justify-center text-white">Create an account</a>  
                <div className="text-lg flex items-center justify-center text-red-500 font-bold">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                </div>               
            </div>
        </>
    )

}

export default LoginPage;