import React, {useState} from "react";
import { handleYearKeyPress, handleMakeKeyPress, handleModelKeyPress, handleLPKeyPress } from "./functions/InputHandling";

export default function AddVehicle() {
    //const test = (wan, too, free, foe) => {console.log(wan, too, free, foe)}
    const [year, setYear] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [licensePlate, setLicensePlate] = useState('');

    const HandleYear = (event) => {setYear(event.target.value)}
    const HandleMake = (event) => {setMake(event.target.value)}
    const HandleModel = (event) => {setModel(event.target.value)}
    const HandleLP = (event) => {setLicensePlate(event.target.value)}

    const SubmitVehicle = (event) => { 
        event.preventDefault(); // Prevent default form submission behavior     
        if ((year.length > 0 && make.length > 0 && model.length > 0 && licensePlate.length > 0)){
            if(window.confirm("Are you sure you want to submit?")){
                // POST vehicle data into backend
                fetch(process.env.REACT_APP_ADD_VEHICLE_API, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        year, make, model, licensePlate
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    console.log("Vehicle added:", data);
                    window.location.reload();                    
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
            } else {
                window.alert("You pressed cancel, vehicle not added.");
            }
        } else {
            window.alert("Missing input value(s).");
        }
    }

    return (
        <div className="absolute bg-[#cdb087] px-4 py-2 ml-64 h-screen w-screen">
            <div className="text-3xl text-white font-bold">
                Add Vehicle  
            </div>
            <br></br>   
            <br></br>
            <form className="grid grid-cols-2 gap-7 text-2xl font-semibold w-fit" onSubmit={SubmitVehicle}>
                <label className="relative bg-[#cdb087] text-white">Year: </label>
                <input type="text" value={year} onChange={HandleYear}  onKeyPress={handleYearKeyPress} maxLength={4}></input>
                <label className="relative bg-[#cdb087] text-white">Make: </label>
                <input type="text" value={make} onChange={HandleMake} onKeyPress={handleMakeKeyPress} maxLength={20}></input>  
                <label className="relative bg-[#cdb087] text-white">Model: </label>
                <input type="text" value={model} onChange={HandleModel} onKeyPress={handleModelKeyPress} maxLength={50}></input>  
                <label className="relative bg-[#cdb087] text-white">License Plate: </label>
                <input type="text" value={licensePlate} onChange={HandleLP} onKeyPress={handleLPKeyPress} maxLength={8}></input>  
                <button type="submit" className="text-white font-bold bg-[#a48c6c] ring ring-[##a48c6c] ring-offset-4 rounded-2xl text-3xl ml-9 my-2 hover:shadow hover:bg-blue-500">
                    <label className="">Add Vehicle</label>
                </button>   
            </form> 
            <br></br>     


        </div>
    )
}