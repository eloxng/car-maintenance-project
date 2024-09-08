import React from "react";

export default function LogMaintenance() {

    // allow only numbers to be typed
    const handleOdoReadingKP = (event) => {
        const charCode = event.charCode;
        if(!(charCode > 47 && charCode < 58)) // if event key press isn't 0-9
            event.preventDefault(); // prevent character from being typed
    }

    // handles date format
    const mmddyyyyFormatter = (event) => {
        const charCode = event.charCode;
        let date_string = document.getElementById('date').value;
        let date_length = date_string.length;

        if(((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || (charCode === 32)))
            event.preventDefault(); // prevent a-z, A-Z, or space from being typed on keypress
        else
            if(date_length === 2 || date_length === 5)
                document.getElementById('date').value += '/';
    }

    // log maintenance button
    const logButton = () => {
        let car = document.getElementById('car').value;
        let odoreading = document.getElementById('odoreading').value;
        let odounits = document.getElementById('odounits').value;
        let date = document.getElementById('date').value;
        let mdesc = document.getElementById('mdesc').value;

        if(window.confirm("Are you sure you want to submit?")){
            // if there's an odo reading, if odo units chosen, and if date is completely typed
            if(odoreading.length > 0 && odounits != "--select an option--" && date.length == 10)
            {
                // log data into db "console.log() substitute"
                console.log(car)
                console.log(odoreading)
                console.log(odounits)
                console.log(date)
                console.log(mdesc)
                // clear inputs
                document.getElementById('car').value = '';
                document.getElementById('odoreading').value = '';
                document.getElementById('odounits').value = '';
                document.getElementById('date').value = '';
                document.getElementById('mdesc').value = '';
            }
            else
                window.alert("missing values")
        }
        else{
            window.alert("Maintenance not logged.")
        }
    }    

    return (
        <div className="relative bg-[#cdb087] px-4 py-2 ml-64 h-screen w-screen">
            <div className="text-3xl text-white font-bold"> 
                Log Maintenance Page
                <br></br>
                <br></br>
                <div className="text-lg font-semibold grid grid-cols-1 gap-2 w-60">
                    <label>Select Car: </label>
                    <select id="car" className="bg-[#a48c6c]"></select>

                    <label>Odometer Reading: </label>
                    <input id="odoreading" type="text" className="text-black" onKeyPress={handleOdoReadingKP}></input>

                    <label for="odo">Odometer Units: </label>
                    <select id="odounits" name="odo" className="bg-[#a48c6c]">
                        <option value="">--select an option--</option>
                        <option value="miles">Miles</option>
                        <option value="kilometers">Kilometers</option>
                    </select>

                    <label>Date (MMDDYYYY): </label>
                    <input id="date" type="text" className="text-black" onKeyPress={mmddyyyyFormatter} maxLength={10}></input>

                    <label>Maintenance Description:</label>
                    <textarea id="mdesc" className="w-full max-w-full h-80 resize-none text-black resize"></textarea>
                </div>
                
                <button className="bg-[#a48c6c] ring ring-[##a48c6c] ring-offset-4 rounded-2xl text-2xl ml-6 my-2 hover:shadow hover:bg-blue-500"onClick={logButton}>
                    <label className="">Log Maintenance</label>
                </button>
            </div>
        </div>
    )
}