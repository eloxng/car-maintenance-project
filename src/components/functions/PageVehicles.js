// View Vehicles Paging
import React from 'react'

const PageVehicles = ({vehicles, loading}) => {
    if(loading){
        return <h2>Loading vehicles...</h2>
    }
    return (
        <div className="bg-white text-black text-2xl w-fit px-2">
            <ul>
                {vehicles.map((vehicle) => (
                    <li key={vehicle.v_id}>
                        <strong>{vehicle.lplate}</strong> - {vehicle.year} {vehicle.make} {vehicle.model}
                        <hr></hr>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PageVehicles;