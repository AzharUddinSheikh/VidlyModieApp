import React, { Component } from 'react'
import Like from './common/Like';

const MovieTable = ({data, onLike, onDelete, onSort, sortColumn}) => {

    const raiseSort = (path) => {
        let newSort = {...sortColumn};
        newSort = (newSort.path == path && newSort.order == 'asc') 
                    ? {path:path, order:'desc'} 
                    : {path:path, order:'asc'}
        onSort(newSort);
    }

    return (
        <table className="table">
            <thead>
                <tr style={{cursor:'pointer'}}>
                    <th onClick={() => raiseSort('title')}>Title</th>
                    <th onClick={() => raiseSort('genre.name')}>Genre</th>
                    <th onClick={() => raiseSort('numberInStock')}>Stock</th>
                    <th onClick={() => raiseSort('dailyRentalRate')}>Rate</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map(movie => <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td><Like isLiked={movie.liked} onLike={() => onLike(movie)}/></td>
                    <td><button className='btn btn-danger' onClick={() => onDelete(movie)}>Delete</button></td>
                </tr>)}
            </tbody>
        </table>
    );
}
 
export default MovieTable;