import React from "react";

export default function ManageAccountData() {
    const clearVehicles = () => {
        window.alert("Clear vehicles clicked.")
        //ClearVehicles()
    }

    const clearLogs = () => {
        window.alert("Clear maintenance logs clicked.")
        //ClearLog()
    }

    return (
        <div className="absolute bg-[#cdb087] px-4 py-2 ml-64 h-screen w-screen">
            <div className="text-3xl text-white font-bold">
                Manage User Data
            </div>
            <br></br>
            <br></br>

            <ul className="grid grid-cols-2 gap-10 w-fit h-fit"> 
                <li onClick={clearVehicles} className="rounded-lg hover:bg-red-700">
                    <a className="flex items-center justify-center text text-white text-2xl font-bold">Clear Vehicles</a>
                </li >
                <li className="rounded-lg hover:bg-green-500">
                    <a className="flex items-center justify-center text text-white text-2xl font-bold">Reset username</a>
                </li>
                <li onClick={clearLogs} className="rounded-lg hover:bg-red-700">
                    <a className="flex items-center justify-center text-center text text-white text-2xl font-bold">Clear Maintenance Logs</a>
                </li>
                <li className="rounded-lg hover:bg-green-500">
                    <a className="flex items-center justify-center text text-white text-2xl font-bold">Reset Password</a>
                </li>
            </ul>
        </div>
    )
}
