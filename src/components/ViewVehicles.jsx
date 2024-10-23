import React, { useState, useEffect } from "react";
import axios from "axios";
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
