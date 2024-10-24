import React, { useState, useEffect } from "react";
import axios from "axios";
import LogMaintenance from '../LogMaintenance';
import ViewMaintenance from '../ViewMaintenance';

export default function ManageLogs(){

    /* 
        For getting and setting vehicles into the
        dropdown for ViewMaintenance and LogMaintenance 
    */
    const [vehicles, setVehicles] = useState([]); 

    // For getting and setting the vehicle ID for ViewMaintenance
    const [vehicleID, setVehicleID] = useState([]);
    // For getting and setting maintenance logs for ViewMaintenance
    const [logs, setLogs] = useState([]);

    /* 
        For loading vehicles into drop-down tab and loading
        maintenance logs for ViewMaintenance and LogMaintenance
    */
    const [loading, setLoading] = useState(false);

    // Get maintenance logs per vehicle ID for ViewMaintenance
    const getPosts = async () => {
        const getlog_url = `/get-logs-by-id/${vehicleID}`;
        setLoading(true);
        try{
            const response = await axios.get(getlog_url);
            const logs = response.data.data;
            const filteredData = logs.map(log => {
                const { v_id, l_id, odoreading, odounits, date, mdesc } = log;
                return { v_id, l_id, odoreading, odounits, date, mdesc };
            })
            setLogs(filteredData);
        }  
        catch (err) {
            console.error("Couldn't find logs:", err);
        }
        finally {
            setLoading(false); // End loading state
        }
    }

    // GET vehicle data from backend
    const getVehicles = async () => {
        const getvehicle_url = '/get-vehicles';
        setLoading(true); // Start loading state
        try {
          const response = await axios.get(getvehicle_url);
          // Assuming the API response structure has a data property that contains the vehicles
          setVehicles(response.data.data);
        } catch (err) {
          console.error("Couldn't find vehicle:", err);
        } finally {
          setLoading(false); // End loading state
        }
    };

    // Render vehicles onto the dropdowns for ViewMaintenance and LogMaintenance
    useEffect(() => {
        getVehicles();
    }, [])

    // Render maintenance logs by vehicle ID in the dropdown
    useEffect(() => {
        getPosts();
    }, [vehicleID])

    /* 
        Moved drop down so that only one is 
        needed to control both the viewing 
        maintenance logs and logging maintenance
    */
    // Handle vehicle selection
    const handleVehicleChange = (e) => {setVehicleID(e.target.value); };

    return(
        <div className="absolute bg-[#cdb087] px-4 py-2 ml-64 h-screen w-screen">
            {/*onChange*/}
            <div className="grid grid-cols-2 text-2xl text-white font-semibold w-fit">
                <label className="text-3xl font-bold">Select Car: </label>             
                <select id="car" className="bg-[#a48c6c]" onChange={handleVehicleChange}>
                    <option disabled selected value>-- select an option --</option>
                    {vehicles.map((vehicle) => (
                        <option key={vehicle.v_id} value={vehicle.v_id}>
                            {vehicle.v_id}: {vehicle.year} {vehicle.make} {vehicle.model} - <strong>{vehicle.lplate}</strong>
                        </option>
                    ))}
                </select>
            </div>
            {/* ViewMaintenance */}
            <ViewMaintenance 
            loading={loading} logs={logs}></ViewMaintenance>

            {/* LogMaintenance */}
            <LogMaintenance vehicleID={vehicleID} getPosts={getPosts}></LogMaintenance>
        </div>
    )
}