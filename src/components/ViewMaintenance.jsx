import React, { useState, useEffect } from "react";
import PageLogs from './functions/PageLogs';
import Pagination from './functions/Pagination';
import PostsPerPage from './functions/PostsPerPage';

export default function ViewMaintenance() {
    // For getting vehicles from db and setting their ID's
    const [vehicles, setVehicles] = useState([]);
    const [vehicleID, setVehicleID] = useState([]);
    // For pagination
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
    useEffect(() => {
        setLoading(true); 
            fetch(process.env.REACT_APP_GET_VEHICLE_API)
            .then(response => {
                if(!response.ok)
                   throw new Error("Couldn't find vehicle");
                return response.json();
            })
            .then(calldata => {
                setVehicles(calldata.data);
            })
        .catch(err => {console.error(err)})
        .finally(() => setLoading(false)); 
    }, [])

    // Get maintenance logs
    useEffect(() => {
        const fetchPosts = () => { 
            setLoading(true);           
                // GET call to api
                fetch(`${process.env.REACT_APP_GET_LOG_BY_VEHICLE_ID_API}${vehicleID}`)
                .then(response => {
                    if(!response.ok)
                        throw new Error("Couldn't find logs");
                    return response.json();
                })
                .then(data => {
                    const logs = data.data;
                    const filteredData = logs.map(log => {
                        const { v_id, l_id, odoreading, odounits, date, mdesc } = log;
                        return { v_id, l_id, odoreading, odounits, date, mdesc };
                    })
                    setLogs(filteredData);
                })
                .catch(err => {console.error(err)})
                .finally(() => setLoading(false));
            }
        fetchPosts();
    }, [vehicleID])


    return (
        <div className="absolute bg-[#cdb087] px-4 py-2 ml-64 h-screen w-screen">
            <div className="text-3xl text-white font-bold"> 
                View Maintenance Log Page
            </div>
            <br></br>
            <br></br>
            {/*Select Car*/}
            <div className="text-2xl text-white font-semibold">             
                <label>Select Car: </label>
                    {/*onChange*/}
                    <select id="car" className="bg-[#a48c6c]" onChange={handleVehicleChange}>
                        <option value="">select an option</option>
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
