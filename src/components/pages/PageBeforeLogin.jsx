import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React from "react";
import LoginPage from "../LoginPage";
import CreateAccount from "../CreateAccount";

export default function PageBeforeLogin(){
    return(
        <>
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route path="/create-account" element={<CreateAccount/>} />
            </Routes>
        </Router>
        </>
    )
}