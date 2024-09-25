import React from "react";
import axios from "axios";

export default function ManageAccountData() {
    // Wipe vehicles and log button
    const wipeVehiclesAndLogs = async () => {
        // Delete maintenance logs
        const deletelogs_url = process.env.REACT_APP_CLEAR_LOGS_API;
        const deleteLogs = async () => {
            try {
                const response = await axios.delete(deletelogs_url);
                console.log('Successful maintenance log delete: ', response.data);
            }
            catch (err) {
                console.error("Error deleting maintenance logs: ", err.message);
            }
        }
        // Delete vehicle
        const deletevehicle_url = process.env.REACT_APP_CLEAR_VEHICLES_API;
        const deleteVehicles = async () => {
            try{
                const response = await axios.delete(deletevehicle_url);
                console.log('Successful vehicle delete: ', response.data);
            }
            catch(err){
                console.error("Error deleting vehicle: ", err.message);
            }
        }

        if(window.confirm("Are you sure you want to wipe your vehicles and maintenance logs?")){
            deleteLogs();
            deleteVehicles();
            window.alert("Wiped.")
        }
        else
            window.alert("Canceled wipe.")
    }

    return (
        <div className="absolute bg-[#cdb087] px-4 py-2 ml-64 h-screen w-screen">
            <div className="text-3xl text-white font-bold">
                Manage Account Data
            </div>
            <br></br>
            <br></br>

            <ul className="grid grid-cols-3 gap-10 w-fit h-fit"> 
                {/* Reset password function */}
                <li className="rounded-lg hover:bg-green-500">
                    <a className="flex items-center justify-center text text-white text-2xl font-bold">Reset username</a>
                </li>
                {/* Reset password function */}
                <li className="rounded-lg hover:bg-green-500">
                    <a className="flex items-center justify-center text text-white text-2xl font-bold">Reset Password</a>
                </li>
                {/* Wipe vehicles and logs function */}
                <li onClick={wipeVehiclesAndLogs} className="rounded-lg hover:bg-red-700">
                    <a className="flex items-center justify-center text text-white text-2xl font-bold">Wipe All Vehicle and Log Data</a>
                </li >
            </ul>
        </div>
    )
}
