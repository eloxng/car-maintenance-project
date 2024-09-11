import React, { useState, useEffect } from "react";
import PostLogs from './functions/PostLogs'
import Pagination from './functions/Pagination'

export default function ViewMaintenance() {
    // For pulling vehicles
    const [vehicles, setVehicles] = useState([]);

    // For pagination
    const [logs, setLogs] = useState([]);  
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);

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
            fetch('/api/getlogs')
            .then(response => {
                if(!response.ok)
                    throw new Error("Couldn't find logs");
                return response.json();
            })
            .then(calldata => {
                const logs = calldata.data;
                const filteredData = logs.map(log => {
                    const { v_id, l_id, odoreading, odounits, date, desc } = log;
                    return { v_id, l_id, odoreading, odounits, date, desc };
                })
                setLogs(filteredData);
                setLoading(false);
            })
            .catch(err => {console.error(err)})
        }

        fetchPosts();
    }, [])

    // Get current logs
    const indexOfLastLogPost = currentPage * postsPerPage;
    const indexOfFirstLogPost = indexOfLastLogPost - postsPerPage;
    const currentLogs = logs.slice(indexOfFirstLogPost, indexOfLastLogPost);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="relative bg-[#cdb087] px-4 py-2 ml-64 h-screen">
            <div className="text-3xl text-white font-bold"> 
                View Maintenance Log Page
            </div>
            <br></br>
            <br></br>

            <div className="text-2xl text-white font-semibold">             
                <label>Select Car: </label>
                    <select id="car" className="bg-[#a48c6c]">
                            <option value="">select an option</option>
                            {vehicles.map((vehicle, index) => (
                                <option id={vehicle.v_id} key={index}>
                                    {vehicle.year} {vehicle.make} {vehicle.model} - <strong>{vehicle.lplate}</strong>
                                </option>
                            ))}
                    </select>
            </div> 
            <div className="text-2xl text-white font-semibold">
                <button className="bg-[#a48c6c] ring ring-[##a48c6c] ring-offset-4 rounded-2xl text-2xl ml-6 my-2 hover:shadow hover:bg-blue-500">
                    <label className="">View Maintenance Log</label>
                </button>
            </div>                            
            {/*Paginating maitenance logs*/}                        
            <PostLogs className='grid grid-cols-2' logs={currentLogs} loading={loading}></PostLogs>
            <Pagination postsPerPage={postsPerPage} totalPosts={logs.length} paginate={paginate}></Pagination>
        </div>
        
    )
}
