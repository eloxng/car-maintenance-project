import React, { useState, useEffect } from "react";
import PageLogs from './functions/PageLogs';
import Pagination from './functions/Pagination';
import PostsPerPage from './functions/PostsPerPage';

export default function ViewMaintenance({vehicles, vehicleID, setVehicleID, loading, logs, getPosts}) {
    // For paginating maintenance logs
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
    const LogsPerPage = PostsPerPage(logs, currentPage, setCurrentPage, postsPerPage);
    const currentLogs = LogsPerPage[0];
    const paginater = LogsPerPage[1];

    // Handle vehicle selection
    const handleVehicleChange = (e) => {setVehicleID(e.target.value); };
    
    // Render maintenance logs by vehicle ID in the dropdown
    useEffect(() => {
        getPosts();
    }, [vehicleID])

    return (
        <>
            <div className="text-3xl text-white font-bold"> 
                View Maintenance Logs
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
        </>
    )
}
