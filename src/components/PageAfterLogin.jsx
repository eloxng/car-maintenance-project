import React, { useEffect } from 'react';
import SideBar from './SideBar';
import ManageAccountData from './ManagerAccountData';
import AddVehicle from './AddVehicle';
import LogMaintenance from './LogMaintenance';
import ViewMaintenance from './ViewMaintenance';
import ViewVehicles from './ViewVehicles';

function PageAfterLogin() {
    let screen;
    // Sidebar web pages
    switch (window.location.pathname){
      case "/":
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