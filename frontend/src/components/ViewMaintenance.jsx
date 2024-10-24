import React, { useState, useEffect } from "react";
import PageLogs from './functions/PageLogs';
import Pagination from './functions/Pagination';
import PostsPerPage from './functions/PostsPerPage';

export default function ViewMaintenance({loading, logs}) {
    // For paginating maintenance logs
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
    const LogsPerPage = PostsPerPage(logs, currentPage, setCurrentPage, postsPerPage);
    const currentLogs = LogsPerPage[0];
    const paginater = LogsPerPage[1];

    return (
        <>
            <div className="text-3xl text-white font-bold"> 
                View Maintenance Logs
            </div>
            <div>
                <PageLogs logs={currentLogs} loading={loading} ></PageLogs>
                <Pagination postsPerPage={postsPerPage} totalPosts={logs.length} paginate={paginater}></Pagination>
            </div>              
        </>
    )
}
