import React from "react";

export default function ManageAccountData() {
    const wipeVehiclesAndLogs = async () => {
        const deleteVehicles = () => {
            fetch(process.env.REACT_APP_CLEAR_VEHICLES_API, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(response => console.log(response))
            .catch((err) => console.error("Error:", err))
        }
        const deleteLogs = () => {
            fetch(process.env.REACT_APP_CLEAR_LOGS_API, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(response => console.log(response))
            .catch((err) => console.error("Error:", err))
        }
        if(window.confirm("Are you sure you want to wipe your vehicles and maintenance logs?")){
            deleteVehicles();
            deleteLogs();
            window.alert("Wiped.")
        }
        else
            window.alert("Canceled wipe.")
    }

    return (
        <div className="absolute bg-[#cdb087] px-4 py-2 ml-64 h-screen w-screen">
            <div className="text-3xl text-white font-bold">
                Manage User Data
            </div>
            <br></br>
            <br></br>

            <ul className="grid grid-cols-1 gap-10 w-fit h-fit"> 
                <li className="rounded-lg hover:bg-green-500">
                    <a className="flex items-center justify-center text text-white text-2xl font-bold">Reset username</a>
                </li>
                <li className="rounded-lg hover:bg-green-500">
                    <a className="flex items-center justify-center text text-white text-2xl font-bold">Reset Password</a>
                </li>
                <li onClick={wipeVehiclesAndLogs} className="rounded-lg hover:bg-red-700">
                    <a className="flex items-center justify-center text text-white text-2xl font-bold">Wipe All Vehicle and Log Data</a>
                </li >
            </ul>
        </div>
    )
}
