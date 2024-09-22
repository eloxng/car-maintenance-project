import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage';
import PageAfterLogin from './components/PageAfterLogin';
import AuthContext from './components/context/AuthProvider';

function App() {
  const { auth } = useContext(AuthContext); // Get the auth state from context
  return (
    <div>
        {auth ? <PageAfterLogin /> : <LoginPage />}
    </div>
  );

}

export default App;
