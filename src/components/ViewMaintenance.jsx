import React, { useState, useEffect } from "react";
import PageLogs from './functions/PageLogs'
import Pagination from './functions/Pagination'

export default function ViewMaintenance() {
    // For pulling vehicles
    const [vehicles, setVehicles] = useState([]);
    const [vehicleID, setVehicleID] = useState('');
    // For pagination
    const [logs, setLogs] = useState([]);  
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
    // Get current logs per page
    const indexOfLastLogPost = currentPage * postsPerPage;
    const indexOfFirstLogPost = indexOfLastLogPost - postsPerPage;
    const currentLogs = logs.slice(indexOfFirstLogPost, indexOfLastLogPost);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    // Set vehicle ID for const vehicleID
    const getVehicleId = (v_id) => {setVehicleID(v_id);}

    // Get vehicle data
    useEffect(() => {
            // GET vehicle data from backend
           fetch('/api/getvehicles')
           .then(response => {
               if(!response.ok)
                   throw new Error("Couldn't find vehicle");
               return response.json();
           })
           .then(calldata => {
                setVehicles(calldata.data);
            })
        .catch(err => {console.error(err)})
    }, [])

    // Get maintenance logs
    useEffect(() => {
        const fetchPosts = () => {
            setLoading(true);           
            // GET call to api
            fetch(`/api/getlogsbyid/${vehicleID}`)
            .then(response => {
                if(!response.ok)
                    throw new Error("Couldn't find logs");
                return response.json();
            })
            .then(calldata => {
                const logs = calldata.data;
                const filteredData = logs.map(log => {
                    const { v_id, l_id, odoreading, odounits, date, mdesc } = log;
                    return { v_id, l_id, odoreading, odounits, date, mdesc };
                })
                setLogs(filteredData);
            })
            .catch(err => {console.error(err)})
            setLoading(false);
        }
        fetchPosts();
    }, [vehicleID])

    return (
        <div className="absolute bg-[#cdb087] px-4 py-2 ml-64 h-fit w-screen">
            <div className="text-3xl text-white font-bold"> 
                View Maintenance Log Page
            </div>
            <br></br>
            <br></br>
            {/*Select Car*/}
            <div className="text-2xl text-white font-semibold">             
                <label>Select Car: </label>
                    <select id="car" className="bg-[#a48c6c]">
                        <option value="">select an option</option>
                            {vehicles.map((vehicle) => (
                                <option id="vehicleid" onClick={() => getVehicleId(vehicle.v_id)} value={vehicle.v_id}>
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
                <Pagination postsPerPage={postsPerPage} totalPosts={logs.length} paginate={paginate}></Pagination>
            </div>              
        </div>
    )
}
