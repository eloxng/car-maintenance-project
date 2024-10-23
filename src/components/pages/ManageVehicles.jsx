import React from "react";
import ViewVehicles from '../ViewVehicles';
import AddVehicle from '../AddVehicle';

export default function ManageVehicles() {

    return (
        <div className="absolute bg-[#cdb087] px-4 py-2 ml-64 h-screen w-screen">
            <ViewVehicles></ViewVehicles>
            <AddVehicle></AddVehicle>
        </div>
    )
}