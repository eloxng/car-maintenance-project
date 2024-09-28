import React from "react";
import LoginPage from "./LoginPage";
import CreateAccount from "./CreateAccount";

export default function PageBeforeLogin(){
    let screen;
    switch(window.location.pathname){
        case "/":
            screen = <LoginPage />;
            break;
        case "/create-account":
            screen = <CreateAccount />;
            break;
        default:
            break;
    }
    return(
        <>
            {screen}
        </>
    )
}