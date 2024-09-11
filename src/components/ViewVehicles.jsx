import React, { useState, useEffect } from "react";
import PageVehicles from './functions/PageVehicles';
import Pagination from './functions/Pagination';
import PostsPerPage from "./functions/PostsPerPage";

export default function ViewVehicles () {
    /// For pagination
    const [vehicles, setVehicles] = useState([])
    const [loading, setLoading] = useState(false);
    // Get current posts per page
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(15);  
    const VehiclesPerPage = PostsPerPage(vehicles, currentPage, setCurrentPage, postsPerPage);
    const currentVehicles = VehiclesPerPage[0];
    const paginate = VehiclesPerPage[1];

    // Get vehicle data from backend
    useEffect(() => {
        setLoading(true);
        fetch('/api/getvehicles')
            .then(response => {
                if(!response.ok)
                    throw new Error("Couldn't find vehicle");
                return response.json();
            })
            .then(data => {
                // Extract the data array from the response object
                const vehicles = data.data;   
                setVehicles(data.data);
            })
            .catch(err => console.error(err))
            .finally(() => {setLoading(false)})
    }, [])

    return (
        <div className="relative bg-[#cdb087] px-4 py-2 ml-64 h-screen w-screen">
            <div className="text-3xl text-white font-bold"> 
                View Vehicles
            </div>
            <br></br>
            <br></br>

            <div className="h-fit">
                <PageVehicles vehicles={currentVehicles} loading={loading}></PageVehicles>
                <br></br>
                <Pagination postsPerPage={postsPerPage} totalPosts={vehicles.length} paginate={paginate}></Pagination>
            </div>
        </div>
    )
}
