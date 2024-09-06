import React from "react";

const Home = () => {
    return (
        <div className="fixed bg-[#cdb087] px-4 py-3 ml-64 h-screen w-screen">
            <div className="text-2x text-white font-semibold absolute"> 
                <div> 
                1) The purpose of this website is to log all of the 
                maintenance done on your personal vehicles.
                </div>

                <div>
                    2) Adding Vehicles Options: 
                    <li className="ml-16">Year</li>
                    <li className="ml-16">Make</li>
                    <li className="ml-16">Model</li>
                    <li className="ml-16">License Plate</li>
                </div>

                <div>
                    3) View Vehicles will allow you to see your current list of vehicles.
                    You will be able to modify and or delete vehicles of your choice.
                </div>

                <div>
                    4) Log Maintenance will ask you for the description of what was done, 
                    the date that it was done on, and for which vehicle it was.
                </div>

                <div>
                    5) View Maintenance Log will allow you to view all of the maintenance that 
                    you've logged for all of your vehicles. 
                    <li className="ml-16">
                        You will be able to select which vehicle you want to see the maintenance for, 
                        and it will print out a list of all of the maintenance.
                    </li>
                </div>
            </div>
        </div>
    )
}

export default Home;