import React from "react";

const SideBar = () => {
  return (
    <div className="fixed w-full h-screen bg-[#865d35] px-4 py-2">
      <div className="my-2 mb-4">
        <h1 className="text-2x text-white font-bold">Car Maintenance Logger</h1>
      </div>
      
      <ul className="mt-3 text-white font-bold">
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <a href='/' className="px-3">Home</a>
        </li>
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
      </ul>
    </div>
  );
  }
  
  export default SideBar;