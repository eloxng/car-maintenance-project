import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./context/AuthProvider";
import axios from "axios";

const SideBar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
      if(window.confirm("Are you sure you want to logout?")){
        alert("Logging out.")
        const logout_url = '/logout';
        axios.post(logout_url)
          .then(response => {
            console.log('Logging out data: ', response.data)
            logout();
            navigate('/');
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
          <a href='/' className="px-3">Manage Account Data</a>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <a href='/manage-vehicles' className="px-3">Manage Vehicles</a>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <a href='/manage-maintenance-logs' className="px-3">Manage Maintenance Logs</a>
        </li>
        <button className='mb-2 rounded hover:shadow hover:bg-red-900 py-2'>
          <a onClick={handleLogout} className="logout-button px-3">Logout</a>
        </button>
      </ul>
    </div>
  );
  }
  
  export default SideBar;