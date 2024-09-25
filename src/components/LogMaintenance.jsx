import React, { useState, useEffect } from "react";
import axios from "axios";
import { handleDescKeyPress, handleDateKeyPress, handleOdoReadingKeyPress } from "./functions/InputHandling";

export default function LogMaintenance() {
    // For select car dropdown
    const [vehicles, setVehicles] = useState([]); 
    const getvehicle_url = process.env.REACT_APP_GET_VEHICLE_API;
    useEffect(() => {
        // GET vehicle data from backend     
        const getVehicles = async () => {
            try {
                const response = await axios.get(getvehicle_url);
                // Assuming the API response structure has a data property that contains the vehicles
                setVehicles(response.data.data);
            } 
            catch (err) {
                console.error("Couldn't find vehicle:", err);
            } 
            };
        getVehicles();
    }, [])

    // Log maintenance variables
    const [VID, setVID] = useState('');
    const [odoReading, setOdoReading] = useState('');
    const [odoUnits, setOdoUnits] = useState('');
    const [date, setDate] = useState('');
    const [desc, setDesc] = useState('');

    const HandleVID = (event) => {setVID(event.target.value);}
    const HandleOdoReading = (event) => {setOdoReading(event.target.value);}
    const HandleOdoUnits = (event) => {setOdoUnits(event.target.value);}
    const HandleDate = (event) => {setDate(event.target.value);}
    const HandleDesc = (event) => {setDesc(event.target.value);}

    const SubmitLog = (event) => {
        event.preventDefault()
        // console.log(VID, odoReading, odoUnits, date, desc)
        if(window.confirm("Are you sure you want to submit?")){
            // if there's an odo reading, if odo units chosen, and if date is completely typed
            if(VID.length > 0 && odoReading.length > 0 && odoUnits !== "--select an option--" && date.length === 10)
            {
                    const addlog_url = process.env.REACT_APP_ADD_LOG_API;
                    const data = {VID, odoReading, odoUnits, date, desc};
                    // POST log to backend
                    axios.post(addlog_url, data)
                        .then(response => {
                            console.log(response.data);
                            alert("Maintenance Logged")
                            setVID('');
                            setOdoReading('');
                            setOdoUnits('');
                            setDate('');
                            setDesc('');
                        })
                        .catch((error) => {
                            alert("Error adding data")
                            console.error("Error: ", error);
                        });
            }
            else
                window.alert("Missing an input.")
        }
        else{
            window.alert("Maintenance not logged.")
        }
    }   


    return (
        <div className="absolute bg-[#cdb087] px-4 py-2 ml-64 h-screen w-screen">
            <div className="text-3xl text-white font-bold"> 
                Log Maintenance Page
            </div>
            <br></br>
            <br></br>

            <form className="grid grid-cols-2 gap-4 text-white text-2xl font-semibold w-fit" onSubmit={SubmitLog}>
                <label className="relative bg-[#cdb087] text-white">Select Car: </label>
                <select id="vid" value={VID} onChange={HandleVID} className="bg-[#a48c6c]">
                    <option value="">Select an option</option>
                    {vehicles.map((vehicle, index) => (
                    <option value={vehicle.v_id} key={index}>
                        {vehicle.v_id}: {vehicle.year} {vehicle.make} {vehicle.model} - <strong>{vehicle.lplate}</strong>
                    </option>
                    ))}
                </select>
                <label className="relative bg-[#cdb087] text-white">Odometer Reading: </label>
                <input id="odoreading" value={odoReading} onChange={HandleOdoReading} type="text" className="text-black" onKeyPress={handleOdoReadingKeyPress}></input>

                <label for="odo">Odometer Units: </label>
                <select id="odounits" value={odoUnits} onChange={HandleOdoUnits} className="bg-[#a48c6c]">
                    <option value="">select an option</option>
                    <option value="miles">Miles</option>
                    <option value="kilometers">Kilometers</option>
                </select>

                <label>Date (MMDDYYYY): </label>
                <input id="date" value={date} onChange={HandleDate} type="date" className="text-black" onKeyPress={handleDateKeyPress} maxLength={10}></input>
                
                <label>Maintenance Description:</label>
                <textarea id="desc" value={desc} onChange={HandleDesc} onKeyPress={handleDescKeyPress} style={{width: '500px', height:'300px'}} className="w-fit h-fit resize-none text-black text-lg"></textarea>
                <button type="submit" className="text-white font-bold bg-[#a48c6c] ring ring-[##a48c6c] ring-offset-4 rounded-2xl text-3xl ml-9 my-2 hover:shadow hover:bg-blue-500">
                    <label className="">Log Maintenance</label>
                </button>    
            </form>
        </div>
    )
}