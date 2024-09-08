import React from "react";

export default function AddVehicle() {

    // allow only numbers to be typed
    const handleYearKeyPress = (event) => {
        const charCode = event.charCode;
        if(!(charCode > 47 && charCode < 58)) // if event key press isn't 0-9
            event.preventDefault(); // prevent character from being typed
    }

    // allow only letters (capital and lowercase) to be typed
    const handleMakeModelKeyPress = (event) => {
        const charCode = event.charCode;
        if(!((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || (charCode === 32))) // a-z, A-Z, space
            event.preventDefault(); // prevent character from being typed
    }

    const handleAddVehicle = () => {
        let car_year = document.getElementById('caryear').value;
        let car_make = document.getElementById('carmake').value;
        let car_model = document.getElementById('carmodel').value;
        let license_plate = document.getElementById('licenseplate').value;

        if ((car_year.length > 0 && car_make.length > 0 && car_model.length > 0 && license_plate.length > 0)){
            if(window.confirm("Are you sure you want to submit?")){
                // POST vehicle data into backend
                fetch('/api/addvehicles', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        car_year,
                        car_make,
                        car_model,
                        license_plate,
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    console.log("Vehicle added:", data);
                    // clear text boxes
                    document.getElementById('caryear').value = '';
                    document.getElementById('carmake').value = '';
                    document.getElementById('carmodel').value = '';
                    document.getElementById('licenseplate').value = '';
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
        <div className="relative bg-[#cdb087] px-4 py-2 ml-64 h-screen w-screen">
            <div className="text-2x text-white font-bold">
                <div className="text-2xl">ENTER VEHICLE DATA:</div>          
                <div className="grid grid-cols-2 gap-2 w-64 font-semibold">
                    <label>Year: </label>
                    <input type="text" id="caryear" className = 'input-borders text-black' onKeyPress={handleYearKeyPress} maxLength={4}></input>  
                    <label>Make: </label>
                    <input type="text" id="carmake" className = 'input-borders text-black' onKeyPress={handleMakeModelKeyPress} maxLength={20}></input>  
                    <label>Model: </label>
                    <input type="text" id="carmodel" className = 'input-borders text-black' onKeyPress={handleMakeModelKeyPress} maxLength={50}></input>  
                    <label>License Plate: </label>
                    <input type="text" id="licenseplate" className = 'input-borders text-black' maxLength={8}></input>  
                </div>
                
                <button className="bg-[#a48c6c] ring ring-[##a48c6c] ring-offset-4 rounded-2xl text-3xl ml-9 my-2 hover:shadow hover:bg-blue-500" onClick={handleAddVehicle}>
                    <label className="">Add Vehicle</label>
                </button>

            </div>
        </div>
    )
}