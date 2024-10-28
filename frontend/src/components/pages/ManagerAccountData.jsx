import React from "react";
import axios from "axios";
import { useToast } from "../context/Toast";

export default function ManageAccountData() {
    const showToast = useToast();

    // Wipe vehicles and log button
    const wipeVehiclesAndLogs = async () => {
        // Delete maintenance logs
        const deletelogs_url = '/remove-logs-per-uid';
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
        const deletevehicle_url = '/remove-vehicles-per-uid';
        const deleteVehicles = async () => {
            try{
                const response = await axios.delete(deletevehicle_url);
                console.log('Successful vehicle delete: ', response.data);
            }
            catch(err){
                console.error("Error deleting vehicle: ", err.message);
            }
        }

        // Delete functions
        deleteLogs();
        deleteVehicles();
        showToast("Wiped all vehicle and maintenance data.", "success");
    }

    const handleWipeConfirm = () => {
        showToast(
            <>
              <label className="text-white font-bold">Wipe all vehicle and maintenance data?</label>
              <br></br>
              <br></br>  
                <div className="grid grid-cols-2 font-semibold">
                  <button className="mb-2 rounded hover:shadow hover:bg-red-900 py-2" onClick={wipeVehiclesAndLogs}>Confirm</button>
                  <button className="mb-2 rounded hover:shadow hover:bg-red-900 py-2" onClick={() => showToast("Canceled wiping data.", "error")}>Cancel</button>
                </div>
            </>, "info"
        )
    }

    return (
        <div className="absolute bg-[#cdb087] px-4 py-2 ml-64 h-screen w-screen">
            <div className="text-3xl text-white font-bold">
                Manage Account Data
            </div>
            <br></br>
            <br></br>

            <ul className="grid grid-cols-2 gap-10 w-fit h-fit"> 
                {/* Reset password function */}
                <li className="rounded-lg hover:bg-green-500">
                    <a className="flex items-center justify-center text text-white text-2xl font-bold">Reset Password</a>
                </li>
                {/* Wipe vehicles and logs function */}
                <li onClick={handleWipeConfirm} className="rounded-lg hover:bg-red-700">
                    <a className="flex items-center justify-center text text-white text-2xl font-bold">Wipe All Vehicle and Log Data</a>
                </li >
            </ul>
        </div>
    )
}
