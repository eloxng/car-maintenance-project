import React from "react";
import LogMaintenance from '../LogMaintenance';
import ViewMaintenance from '../ViewMaintenance';

export default function ManageLogs(){
    return(
        <div className="absolute bg-[#cdb087] px-4 py-2 ml-64 h-screen w-screen">
            <ViewMaintenance></ViewMaintenance>
            <LogMaintenance></LogMaintenance>
        </div>
    )
}