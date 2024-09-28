import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import PageBeforeLogin from './components/PageBeforeLogin';
import PageAfterLogin from './components/PageAfterLogin';
import AuthContext from './components/context/AuthProvider';

function App() {
  // Get the auth state from context
  // Auth is set in LoginPage.jsx in SubmitLogin
  const { auth } = useContext(AuthContext); 
  return (
    <div>
        {auth ? <PageAfterLogin /> : <PageBeforeLogin/>}
    </div>
  );

}

export default App;
