import React, { useState, useEffect } from "react";
import axios from "axios";
import { handleDescKeyPress, handleDateKeyPress, handleOdoReadingKeyPress } from "./functions/InputHandling";

export default function LogMaintenance({vehicleID, getPosts}) {
    // Log maintenance variables
    const [VID, setVID] = useState('');
    const [odoReading, setOdoReading] = useState('');
    const [odoUnits, setOdoUnits] = useState('');
    const [date, setDate] = useState('');
    const [desc, setDesc] = useState('');
    /* 
        Set VID to vehicleID every time vehicleID 
        updates from ManageLogs 
    */
    useEffect(() => {
        setVID(vehicleID)
    },[vehicleID]);

    const HandleOdoReading = (event) => {setOdoReading(event.target.value);}
    const HandleOdoUnits = (event) => {setOdoUnits(event.target.value);}
    const HandleDate = (event) => {setDate(event.target.value);}
    const HandleDesc = (event) => {setDesc(event.target.value);}

    const SubmitLog = (event) => {
        event.preventDefault()
        if(window.confirm("Are you sure you want to submit?")){
            // if there's an odo reading, if odo units chosen, and if date is completely typed
            if(VID !== '' && odoReading.length > 0 && odoUnits !== "" && date.length === 10)
            {
                    const addlog_url = '/add-log';
                    const data = {VID, odoReading, odoUnits, date, desc};
                    // POST log to backend
                    axios.post(addlog_url, data)
                        .then(response => {
                            console.log(response.data);
                            alert("Maintenance Logged");
                            /* 
                                Do not clear VID because 
                                drop down values doesn't 
                                change after submission
                            */
                            // Clear inputs
                            setOdoReading('');
                            setOdoUnits('');
                            setDate('');
                            setDesc('');
                            // Update maintenance logs list without reloading page
                            getPosts();
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
        <>
            <div className="text-3xl text-white font-bold"> 
                Log Maintenance
            </div>

            <form className="grid grid-cols-2 gap-4 text-white text-2xl font-semibold w-fit" onSubmit={SubmitLog}>
                <label className="relative bg-[#cdb087] text-white">Odometer Reading: </label>
                <input id="odoreading" value={odoReading} onChange={HandleOdoReading} type="text" className="text-black" onKeyPress={handleOdoReadingKeyPress}></input>

                <label for="odo">Odometer Units: </label>
                <select id="odounits" value={odoUnits} onChange={HandleOdoUnits} className="bg-[#a48c6c]">
                    <option value="" disabled selected>--select an option--</option>
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
        </>
    )
}