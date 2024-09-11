import React, { useState, useEffect } from "react";
import PageVehicles from './functions/PageVehicles';
import Pagination from './functions/Pagination';

export default function ViewVehicles () {

    const [vehicles, setVehicles] = useState([])
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(15);  

    // GET vehicle data from backend
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
                setVehicles(vehicles);
            })
            .catch(err => {console.error(err)})
            setLoading(false);
    }, [])

    // Get current vehicles
    const indexOfLastVehiclePost = currentPage * postsPerPage;
    const indexOfFirstVehiclePost = indexOfLastVehiclePost - postsPerPage;
    const currentVehicles = vehicles.slice(indexOfFirstVehiclePost, indexOfLastVehiclePost)

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div className="relative bg-[#cdb087] px-4 py-2 ml-64 h-screen w-screen">
            <div className="text-3xl text-white font-bold"> 
                View Vehicles
            </div>
            <br></br>
            <br></br>

            <div className="h-fit">
                <PageVehicles vehicles={currentVehicles} loading={loading}></PageVehicles>
                <Pagination postsPerPage={postsPerPage} totalPosts={vehicles.length} paginate={paginate}></Pagination>
            </div>
        </div>
    )
}
