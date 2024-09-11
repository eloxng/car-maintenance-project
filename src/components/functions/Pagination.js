import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];
    // Display correct number of page numbers
    for(let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <ul className='pagination flex gap-5 py-6 text-lg font-semibold'>
            {pageNumbers.map(number => (
                <li key={number} className='page-item' >
                    <a onClick={(e) => {e.preventDefault(); paginate(number);}} href='' className="page-link px-4 py-2 border-2 rounded text-white hover:bg-blue-500">
                        {number}
                    </a>
                </li>
            ))}
        </ul>
    )
}

export default Pagination;