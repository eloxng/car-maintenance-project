import React, { useState } from 'react';
import SideBar from './SideBar';
import ManageAccountData from './ManagerAccountData';
import AddVehicle from './AddVehicle';
import LogMaintenance from './LogMaintenance';
import ViewMaintenance from './ViewMaintenance';
import ViewVehicles from './ViewVehicles';
import { AuthProvider } from './context/AuthProvider';

function PageAfterLogin() {
    let screen;
    // Sidebar web pages
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
            <SideBar />
            {screen}
      </>
    );
}

export default PageAfterLogin;