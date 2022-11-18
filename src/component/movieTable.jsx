import React from 'react'
import Like from './common/Like';
import Table from './common/Table';
import auth from '../services/authService';

const user = auth.getCurrentUser();

const MovieTable = ({data, onLike, onDelete, onSort, sortColumn}) => {
    
    const columns = [
        {key: 'title', label:'Title', content:(movie) => <a href={`/movie/${movie._id}`}>{movie.title}</a>, sort:true},
        {key: 'genre.name', label:'Genre', sort:true},
        {key: 'numberInStock', label:'Stock', sort:true},
        {key: 'dailyRentalRate', label:'Rate', sort:true},
        {key: 'like', content:(movie) => <Like isLiked={movie.liked} onLike={() => onLike(movie)}/>}
    ]
    
    if (user && user.isAdmin) {
        const deleteColumn = {key: 'delete', content:(movie) => <button className='btn btn-danger' onClick={() => onDelete(movie)}>Delete</button>};
        columns.push(deleteColumn);
    }

    return (
        <Table 
            allData={data}
            columns={columns}
            onSort={onSort}
            sortColumn={sortColumn}/>
    );
}
 
export default MovieTable;