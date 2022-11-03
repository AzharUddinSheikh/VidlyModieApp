import React, { Component } from 'react'
import Like from './common/Like';
import TableBody from './common/TableBody';
import TableHeader from './common/tableHeader';


const MovieTable = ({data, onLike, onDelete, onSort, sortColumn}) => {

    const columns = [
        {key: 'title', label:'Title', sort:true},
        {key: 'genre.name', label:'Genre', sort:true},
        {key: 'numberInStock', label:'Stock', sort:true},
        {key: 'dailyRentalRate', label:'Rate', sort:true},
        {key: 'like', content:(movie) => <Like isLiked={movie.liked} onLike={() => onLike(movie)}/>},
        {key: 'delete', content:(movie) => <button className='btn btn-danger' onClick={() => onDelete(movie)}>Delete</button>},
    ]

    return (
        <table className="table">
           <TableHeader
                onSort={onSort}
                sortColumn={sortColumn}
                columns={columns}
                />
            <TableBody 
                allData={data}
                columns={columns}/>
        </table>
    );
}
 
export default MovieTable;