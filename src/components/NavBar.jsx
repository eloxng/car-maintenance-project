import React from "react";

const NavBar = () => {
    return (
      <div className='main-bg flex justify-between items-center just-another-hand px-4 text-3xl font-medium'>
        <nav className=''>
          <ul className='flex list-none pt-32 ml-20'>
            <li className='mr-4'>
              <a href='/'>
                Home
              </a>
            </li>
            <li className='mr-4'>
              <a href='/add-vehicles'>
                Add Vehicles
              </a>
            </li>
            <li className='mr-4'>
              <a href='/view-vehicles'>
                View Vehicles
              </a>
            </li>
            <li className='mr-4'>
              <a href='/log-maintenance'>
                Log Maintenance
              </a>
            </li>
            <li>
              <a href='/view-maintenance-log'>
                View Maintenance Log
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
  
  export default NavBar;