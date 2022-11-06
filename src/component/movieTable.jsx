import React from 'react'
import Like from './common/Like';
import Table from './common/Table';


const MovieTable = ({data, onLike, onDelete, onSort, sortColumn}) => {

    const columns = [
        {key: 'title', label:'Title', content:(movie) => <a href={`/movie/${movie._id}`}>{movie.title}</a>, sort:true},
        {key: 'genre.name', label:'Genre', sort:true},
        {key: 'numberInStock', label:'Stock', sort:true},
        {key: 'dailyRentalRate', label:'Rate', sort:true},
        {key: 'like', content:(movie) => <Like isLiked={movie.liked} onLike={() => onLike(movie)}/>},
        {key: 'delete', content:(movie) => <button className='btn btn-danger' onClick={() => onDelete(movie)}>Delete</button>},
    ]

    return (
        <Table 
            allData={data}
            columns={columns}
            onSort={onSort}
            sortColumn={sortColumn}/>
    );
}
 
export default MovieTable;