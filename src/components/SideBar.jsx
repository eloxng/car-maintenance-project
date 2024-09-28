import React, { useContext } from "react";
import AuthContext from "./context/AuthProvider";
import axios from "axios";

const SideBar = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
      if(window.confirm("Are you sure you want to logout?")){
        alert("Logging out.")

        axios.post(process.env.REACT_APP_GET_LOGOUT)
          .then(response => {
            console.log('Logging out data: ', response.data)
            logout();
          })
          .catch(error => {
            console.log(error);
          })
      }
      else
        alert("Cancelled Logout.")
  }

  return (
    <div className="absolute bg-[#865d35] px-4 py-2 w-screen h-screen">
      <div className="my-2 mb-4">
        <h1 className="text-2x text-white font-bold">Car Maintenance Logger</h1>
      </div>
      
      <ul className="mt-3 text-white font-bold h-fit w-fit">
        {/* Add conditional rendering here when accounts database is setup */}
        <li className='mb-2 rounded hover:shadow hover:bg-red-500 py-2'>
          <a href='/manage-account-data' className="px-3">Manage Account Data</a>
        </li>
        {/******************************************************************/}
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <a href='/add-vehicles' className="px-3">Add Vehicles</a>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <a href='/view-vehicles' className="px-3">View Vehicles</a>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <a href='/log-maintenance' className="px-3">Log Maintenance</a>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <a href='/view-maintenance-log' className="px-3">View Maintenance Log</a>
        </li>
        <button className='mb-2 rounded hover:shadow hover:bg-red-900 py-2'>
          <a onClick={handleLogout} className="logout-button px-3">Log out of account</a>
        </button>
      </ul>
    </div>
  );
  }
  
  export default SideBar;