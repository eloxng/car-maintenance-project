// View Maintenance Logs Paging
import React from 'react'

const PageLogs = ({ logs, loading }) => {
    if(loading){
        return <h2>Loading maintenance logs...</h2>
    }
    if (logs.length === 0){
        return <div>No logs found.</div>;
    } 
    return (     
        <div className="grid bg-white text-lg[10px] text-black w-fit px-3">
            {logs.map((log) => (
                <ul className="" key={log.l_id} value={log.l_id}>
                    <strong>Date: </strong>{log.date} <br></br>
                    <strong>Mileage: </strong>{log.odoreading} {log.odounits} <br></br>
                    <strong>Maintenance Description:</strong> <br></br>
                    {log.mdesc}
                    <hr></hr>
                </ul>
            ))}
        </div>  
    )      
}

export default PageLogs;

