import React, { useState, useEffect } from "react";

export default function ViewVehicles () {
    let api = "/api/getvehicles"
    const [vehicles, setVehicles] = useState([])   
    // get vehicle data
    useEffect(() => {
            // GET vehicle data from backend
           fetch(api)
           .then(response => {
               if(!response.ok)
                   throw new Error("Couldn't find vehicle");
               return response.json();
           })
           .then(data => {
                // Extract the data array from the response object
                const vehicles = data.data;
       
                // Map through the array to extract only the desired fields
                const filteredData = vehicles.map(vehicle => {
                    const { year, make, model, lplate } = vehicle;
                    return { year, make, model, lplate };
                });     
                setVehicles(filteredData);
            })
            .catch(err => {console.error(err)})
    }, [])

    return (
        <div className="relative bg-[#cdb087] px-4 py-2 ml-64 h-screen">
            <div className="text-3xl text-white font-bold"> 
                View Vehicles
            </div>
            <br></br>
            <br></br>

            <div className="h-fit">
                <div className="bg-white text-black text-2xl w-fit px-2">
                        <ul>
                            {vehicles.map((vehicle, index) => (
                                <li key={index}>
                                    <strong>{vehicle.lplate}</strong> - {vehicle.year} {vehicle.make} {vehicle.model}
                                    <hr></hr>
                                </li>
                            ))}
                        </ul>
                </div>
            </div>
        </div>
    )
}
