import React, { useState, useEffect } from "react";

export default function ViewMaintenance() {
    const [vehicles, setVehicles] = useState([]) 
    const [logs, setLogs] = useState([])  

    // get vehicle data
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

    // get maintenance logs
    useEffect(() => {
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
        })
        .catch(err => {console.error(err)})
    }, [])


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

            <div className="grid">                   
                <div className="bg-white text-black text-2xl w-fit px-3 p">
                    {logs.map((log, index) => (
                        <ul>
                            <strong>Log ID: </strong>{log.l_id}<br></br>
                            <strong>Mileage: </strong>{log.odoreading} {log.odounits} <br></br>
                            <strong>Date: </strong>{log.date} <br></br>
                            <strong>Maintenance Description:</strong> <br></br>
                            {log.desc}
                            <hr></hr>
                        </ul>
                    ))}
                </div>
            </div> 
        </div>
    )
}
