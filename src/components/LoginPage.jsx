import React, { useState, useEffect } from "react";
import LoginValidater from "./functions/LoginValidater";

const LoginPage = ({setIsLoggedIn}) => {
    // Variables where inputs will be stored
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ uid, setUID ] = useState();

    // Get username and password from inputs
    const HandleUsername = (event) => {setUsername(event.target.value);}
    const HandlePassword = (event) => {setPassword(event.target.value);}

    // Function when login button is clicked
    const SubmitLogin = async (event) => {
        event.preventDefault();
        // Get call to api to get user id
        await fetch(`${process.env.REACT_APP_GET_LOGIN}${username}/${password}`)
        .then(response => {
            if(!response.ok)
                console.log("Invalid Login")        
            return response.json();
        })
        .then(data => {
            // If statement ensures that we are working with valid data before trying to process it
            const uids = data.data;
            const filteredData = uids.map(user => {
                const { u_id } = user;
                return u_id;
            });
            // Set the u_id of the user
            setUID(filteredData[0]);
        })
        .catch(err => {console.log(err)})
    }
    // Update the UID when user logins in with correct information
    useEffect(() => {
        if (uid !== null) {
            console.log(`UID updated: ${uid}`);
            // Perform additional actions when UID updates, if needed
        }
    }, [uid]);

    return (
        <div className="absolute bg-[#cdb087] px-4 py-2 ml-64 h-screen w-screen">
            <div className="text-3xl text-white font-bold">
                Login  
            </div>
            <br></br>
            <br></br>

            <form className="grid grid-cols-2 gap-7 text-2xl font-semibold w-fit" onSubmit={SubmitLogin}>
                <label className="relative bg-[#cdb087] text-white">Username </label>
                <input type="text" value={username} onChange={HandleUsername}></input>
                <label className="relative bg-[#cdb087] text-white">Password </label>
                <input type="password" value={password} onChange={HandlePassword}></input>
                <button type="submit" className="text-white font-bold bg-[#a48c6c] ring ring-[##a48c6c] ring-offset-4 rounded-2xl text-3xl ml-9 my-2 hover:shadow hover:bg-blue-500">
                    <label className="">Login</label>
                </button>   
            </form>
            <LoginValidater username={username} password={password} uid={uid} setIsLoggedIn={setIsLoggedIn}></LoginValidater>
        </div>
    )

}

export default LoginPage;