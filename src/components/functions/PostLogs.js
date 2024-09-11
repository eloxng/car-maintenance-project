// View Maintenance Logs - Pagination
import React from 'react'

const PostLogs = ({ logs, loading }) => {
    if(loading){
        return <h2>Loading...</h2>
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

export default PostLogs;