import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SideBar from './components/SideBar';
import ManageAccountData from './components/ManagerAccountData';
import AddVehicle from './components/AddVehicle';
import LogMaintenance from './components/LogMaintenance';
import ViewMaintenance from './components/ViewMaintenance';
import ViewVehicles from './components/ViewVehicles';
import LoginPage from './components/LoginPage';

function App() {
  // Login check variables
  const [isLoggedIn, setIsLoggedIn] = useState(0);
  // Screen that displays each page
  let screen = <LoginPage setIsLoggedIn={setIsLoggedIn}/>

  switch (window.location.pathname){
    case "/mng-acc-data":
      screen = <ManageAccountData />
      break;
    case "/add-vehicles":
      screen = <AddVehicle />
      break;
    case "/view-vehicles":
      screen = <ViewVehicles />
      break;
    case "/log-maintenance":
      screen = <LogMaintenance />
      break;
    case "/view-maintenance-log":
      screen = <ViewMaintenance />
      break;
    default:
      break;
  }
  return (
    <>
        {/*<div className='bg-red-400 w-screen px-4 font-bold text-white'>Login status: {isLoggedIn}</div>*/}
        <SideBar />
        {screen}
    </>
  );
}

export default App;
