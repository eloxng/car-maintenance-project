import React, {useState} from "react";
import axios from "axios";
import ViewVehicles from '../ViewVehicles';
import AddVehicle from '../AddVehicle';

export default function ManageVehicles() {

    // For pagination of vehicles in ViewVehicles;
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);

    // Get vehicle data from backend
    const getVehicles = async () => {
        const getvehicle_url = '/get-vehicles';
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
    
    return (
        <div className="absolute items-center justify-center bg-[#cdb087] px-4 py-2 ml-64 h-screen w-screen">
            {/* View Vehicles*/}
            <ViewVehicles vehicles={vehicles} loading={loading} 
            getVehicles={getVehicles}></ViewVehicles>
            {/* Add Vehicles */}
            <AddVehicle getVehicles={getVehicles}></AddVehicle>
        </div>
    )
}