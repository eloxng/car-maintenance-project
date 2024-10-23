import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SideBar from '../SideBar';
import ManageAccountData from './ManagerAccountData';
import ManageVehicles from './ManageVehicles'
import ManageLogs from './ManageLogs'

function PageAfterLogin() {
  return(
    <Router>
      <SideBar />
      <Routes>
        <Route path="/" element={<ManageAccountData />} />
        <Route path="/manage-vehicles" element={<ManageVehicles />} />
        <Route path="/manage-maintenance-logs" element={<ManageLogs />} />
      </Routes>
    </Router>
  )
}

export default PageAfterLogin;