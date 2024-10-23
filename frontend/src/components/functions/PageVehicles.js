// View Vehicles Paging
import React from 'react'

const PageVehicles = ({vehicles, loading}) => {
    if(loading){
        return <h2>Loading vehicles...</h2>
    }
    if (vehicles.length === 0){
        return <div>No vehicles found.</div>;
    } 
    return (
        <div className="bg-white text-black text-2xl w-fit px-2">
            {vehicles.map((vehicle) => (
                <ul key={vehicle.v_id} value={vehicle.v_id}>
                    <strong>{vehicle.lplate}:</strong> {vehicle.year} {vehicle.make} {vehicle.model}       
                </ul>
            ))}
        </div>
    )
}

export default PageVehicles;