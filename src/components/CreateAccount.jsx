import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

export default function CreateAccount(){
    // Get username and password from inputs
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState(''); 

    const HandleUsername = (event) => {setUsername(event.target.value);}
    const HandlePassword = (event) => {setPassword(event.target.value);}
    const HandleConfPassword = (event) => {setConfPassword(event.target.value);}

    // For notifying users of account creation errors
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');
    useEffect(() => {
        setErrMsg('');
    }, [username, password, confPassword])

    const createAccount = async (event) => {
        event.preventDefault();

        if(password === confPassword){
            const createaccount_url = '/create-account';
            const data = {username, password, confPassword}

            axios.post(createaccount_url, data)
                .then(response => {
                    console.log("Account created frontend: ", username, password, confPassword)
                    console.log(response.data)
                    setUsername('');
                    setPassword('');
                    setConfPassword('');
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
        else{
            setErrMsg('Passwords do not match.')
        }

    }

    return(
        <>
            <div className="grid items-center justify-center relative bg-[#cdb087] h-screen w-screen"> 
                <form className="grid gap-4 text-2xl font-semibold w-fit" onSubmit={createAccount}>
                    <input className="w-64 h-12 p-2" type="text" placeholder=" Username" value={username} onChange={HandleUsername}></input>
                    <input className="w-64 h-12 p-2" type="text" placeholder=" Password" value={password} onChange={HandlePassword}></input>
                    <input className="w-64 h-12 p-2" type="text" placeholder=" Confirm Password" value={confPassword} onChange={HandleConfPassword}></input>
                    <button type="submit" className="w-64 h-12 p-2 text-white font-bold bg-[#a48c6c] ring ring-[##a48c6c] ring-offset-4 rounded-2xl text-3xl hover:shadow hover:bg-blue-500">
                        Create Account
                    </button>  
                </form>
                <div className="text-lg flex items-center justify-center text-red-500 font-bold">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                </div>   
            </div>
        </>
    )
}