import React, { useState, useEffect } from "react";
import PageVehicles from './functions/PageVehicles';
import Pagination from './functions/Pagination';
import PostsPerPage from "./functions/PostsPerPage";

export default function ViewVehicles ({vehicles, loading, getVehicles}) {
    // Get current posts per page
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);  
    const VehiclesPerPage = PostsPerPage(vehicles, currentPage, setCurrentPage, postsPerPage);
    const currentVehicles = VehiclesPerPage[0];
    const paginate = VehiclesPerPage[1];
    
    useEffect(() => {
        getVehicles();
    }, [])

    return (
        <>
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
        </>
    )
}
