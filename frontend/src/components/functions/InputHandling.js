/* Add Vehicle Key Presses */
// Allow only numbers to be typed
export const handleYearKeyPress = (event) => {
    const charCode = event.charCode;
    if(!(charCode > 47 && charCode < 58)) // if event key press isn't 0-9
        event.preventDefault(); // prevent character from being typed
}   
// Allow only letters (capital and lowercase) to be typed
export const handleMakeKeyPress = (event) => {
    const charCode = event.charCode;
    if(!((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || (charCode === 32))) // a-z, A-Z, space
        event.preventDefault(); // prevent character from being typed
}
// Allow only letters (capital and lowercase) and numbers to be typed
// License plate will use the same key press handler
export const handleModelKeyPress = (event) => {
    const charCode = event.charCode;
    if(!((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || (charCode === 32) || (charCode > 47 && charCode < 58))) // a-z, A-Z, space, 0-9
        event.preventDefault(); // prevent character from being typed
}
// a-z, A-Z, space, 0-9, else don't type character
// If a-z, automatically uppercase the value
export const handleLPKeyPress = (event) => {
    const charCode = event.charCode;
    if(!((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || (charCode === 32) || (charCode > 47 && charCode < 58)))
        event.preventDefault(); 
}


/* Log Maintenance Key Presses */
// Prevent characters tha taren't 0-9 or a comma
export const handleOdoReadingKeyPress = (event) => {
    const charCode = event.charCode;
    if(!((charCode > 47 && charCode < 58) || charCode === 44))
        event.preventDefault();
}
// MM/DD/YYYY
// Prevent characters that aren't 0-9 to be typed
// Add a slash if the length of the date input is 2 or 5
export const handleDateKeyPress = (event) => {
    const charCode = event.charCode;
    let date = event.target.value;
    let date_length = date.length

    if(!(charCode > 47 && charCode < 58))
        event.preventDefault() 

    if(date_length === 2 || date_length === 5)
        document.getElementById('date').value += '/';
}
// Prevent characters that aren't 0-9, a-z, A-Z, comma, period, or parenthesis' from being typed
export const handleDescKeyPress = (event) => {
    const charCode = event.charCode;
    if(!((charCode > 47 && charCode < 58) || (charCode > 96 && charCode < 123) || 
        (charCode > 64 && charCode < 91) || charCode === 32 || charCode === 40 || charCode === 41 || charCode === 44 || charCode === 46))
        event.preventDefault(); // prevent from being typed
}

