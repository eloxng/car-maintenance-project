import React from "react";

export default function Home() {
    return (
        <div className="relative bg-[#cdb087] px-4 py-2 ml-64 h-screen">
            <div className="text-3xl text-white font-bold">
                Home Page
            </div>
            <br></br>
            <br></br>
            <div className="text-2xl text-white font-semibold"> 
                <ul className="grid gap-10"> 
                    <div>Log all of the maintenance done on your personal vehicles digitally.</div>
                    <div>
                        Adding Vehicles Options: 
                        <li className="ml-16">- Year</li>
                        <li className="ml-16">- Make</li>
                        <li className="ml-16">- Model</li>
                        <li className="ml-16">- License Plate</li>
                    </div>
                    <div>
                        View Vehicles will allow you to see your current list of vehicles.
                        You will be able to modify and or delete vehicles of your choice.
                    </div>
                    <div>
                        Log Maintenance will ask you for the description of what was done, 
                        the date that it was done on, and for which vehicle it was.
                    </div>
                    <div>
                        View Maintenance Log will allow you to view all of the maintenance that 
                        you've logged for all of your vehicles. You will be able to select which vehicle you want to see 
                        the maintenance for, and it will print out a list of all of the maintenance.
                    </div>
                </ul>
            </div>
        </div>
    )
}
