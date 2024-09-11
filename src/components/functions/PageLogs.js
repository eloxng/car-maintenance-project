// View Maintenance Logs Paging
import React from 'react'

const PageLogs = ({ logs, loading }) => {
    if(loading){
        return <h2>Loading maintenance logs...</h2>
    }
    return (     
                <div className="bg-white text-lg/[20px] text-black text w-fit px-3">
                    {logs.map((log) => (
                        <ul key={log.l_id}>
                            <strong>Log ID: </strong>{log.l_id}<br></br>
                            <strong>Mileage: </strong>{log.odoreading} {log.odounits} <br></br>
                            <strong>Date: </strong>{log.date} <br></br>
                            <strong>Maintenance Description:</strong> <br></br>
                            {log.desc}
                            <hr></hr>
                        </ul>
                    ))}
                </div>  
    )      
}

export default PageLogs;