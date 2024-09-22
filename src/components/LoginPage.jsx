import React, { useRef, useState, useEffect, useContext } from "react";
import axios from 'axios';
import AuthContext from "./context/AuthProvider";
import LoginValidater from "./functions/LoginValidater";
import PageAfterLogin from "./PageAfterLogin";

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

    // Function when login button is clicked
    const SubmitLogin = async (event) => {
        event.preventDefault(); 
        if(username.length > 0 && password.length > 0){
            const login_url = process.env.REACT_APP_GET_LOGIN;
            const data = {username, password}
            // POST request to login api
            axios.post(login_url, data)
                .then(response => {
                    console.log(response.data)
                    setAuth({username, password});
                    setUsername('');
                    setPassword('');
                    setSuccess(true);
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
            {success ? (
                <PageAfterLogin/>
            ) : ( 
            <div className="grid items-center justify-center absolute bg-[#cdb087] h-screen w-screen">
                <label className="text-3xl text-black font-bold">Sign into account</label>
                <form className="grid gap-4 text-2xl font-semibold w-fit" onSubmit={SubmitLogin}>
                    <input type="text" id="username" placeholder=" Username" ref={userRef} autoComplete="off" value={username} onChange={HandleUsername} required></input>
                    <input type="password" id="password" placeholder=" Password" value={password} onChange={HandlePassword} required></input>
                    <button type="submit" className="text-white font-bold bg-[#a48c6c] ring ring-[##a48c6c] ring-offset-4 rounded-2xl text-3xl hover:shadow hover:bg-blue-500">
                        Login
                    </button> 
                </form>
                <LoginValidater username={username} password={password}></LoginValidater>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
            </div>
            )}
        </>
    )

}

export default LoginPage;