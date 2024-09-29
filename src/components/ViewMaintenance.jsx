import React, { useState, useEffect } from "react";
import axios from "axios";
import PageLogs from './functions/PageLogs';
import Pagination from './functions/Pagination';
import PostsPerPage from './functions/PostsPerPage';

export default function ViewMaintenance() {
    // For getting vehicles from db and setting their ID's
    const [vehicles, setVehicles] = useState([]);
    const [vehicleID, setVehicleID] = useState([]);
    // For getting the maintenance logs
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    // Get current posts per page
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
    // Set vehicle ID for const vehicleID
    const LogsPerPage = PostsPerPage(logs, currentPage, setCurrentPage, postsPerPage);
    const currentLogs = LogsPerPage[0];
    const paginater = LogsPerPage[1];
    // Handle vehicle selection
    const handleVehicleChange = (e) => {
        setVehicleID(e.target.value);
    };
    
    // GET vehicle data from backend
    const getvehicle_url = '/get-vehicles';
    useEffect(() => {
        const getVehicles = async () => {
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
        getVehicles();
    }, [])
    

    // Get maintenance logs
    const getlog_url = `/get-logs-by-id/${vehicleID}`;
    useEffect(() => {
        const getPosts = async () => {
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
        getPosts();
    }, [vehicleID])


    return (
        <div className="absolute bg-[#cdb087] px-4 py-2 ml-64 h-screen w-screen">
            <div className="text-3xl text-white font-bold"> 
                View Maintenance Log Page
            </div>
            <br></br>
            <br></br>
            {/*Select Car*/}
            <div className="grid grid-cols-2 text-2xl text-white font-semibold w-fit">             
                <label>Select Car: </label>
                    {/*onChange*/}
                    <select id="car" className="bg-[#a48c6c]" onChange={handleVehicleChange}>
                        <option value="">Select an option</option>
                            {vehicles.map((vehicle) => (
                                <option key={vehicle.v_id} value={vehicle.v_id}>
                                    {vehicle.v_id}: {vehicle.year} {vehicle.make} {vehicle.model} - <strong>{vehicle.lplate}</strong>
                                </option>
                            ))}
                    </select>
            </div>
            {/************/}                    
            <br></br>               
            {/*Paginating maitenance logs*/}
            <div>
                <PageLogs logs={currentLogs} loading={loading} ></PageLogs>
                <br></br>
                <Pagination postsPerPage={postsPerPage} totalPosts={logs.length} paginate={paginater}></Pagination>
            </div>              
        </div>
    )
}
