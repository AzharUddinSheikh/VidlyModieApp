import React, { Component, useEffect, useState } from 'react';
import Like from './component/Like';
import ListGroup from './component/ListGroup';
import Pagination from './component/Pagination';
import { genres } from './server/fakeGenreService';
import { getMovies } from './server/fakeMovieService';
import { paginate } from './utils/paginate';

const Movie = () => {

    const [allMovies, setAllMovies] = useState([]);
    const [itemPerPage, setItemPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const [allGenre, setAllGenre] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState({_id:1, name:'All Genre'});

    useEffect(() => {
        setAllMovies(getMovies());
        setAllGenre(genres);
    }, [])

    const handleDelete = (movie) => {
        setAllMovies(allMovies.filter(m => m != movie));
    }

    const handleLike = (movie) => {
        setAllMovies(allMovies.map(m => {
            if (movie == m) {
                m.liked = !(m.liked)
            }
            return m
        }))
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const getPageData = () => {
        const paginatedMovie = paginate(allMovies, currentPage, itemPerPage)
        return {data : paginatedMovie}
    }

    if (allMovies.length === 0) {
        return `There is no movies in the database`
    }

    const {data} = getPageData()
    return (
        <React.Fragment>
            <div className='row'>
                <div className="col-3">
                    <ListGroup 
                        allData={[{_id:1, name:'All Genre'}, ...allGenre]}
                        selectedGenre={selectedGenre}/>
                </div>
                
                <div className="col">
                    <p>Showing {allMovies.length} movies in the database</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Genre</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Rate</th>
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
                                <td><Like isLiked={movie.liked} onLike={() => handleLike(movie)}/></td>
                                <td><button className='btn btn-danger' onClick={() => handleDelete(movie)}>Delete</button></td>
                            </tr>)}
                        </tbody>
                    </table>

                    <Pagination
                        currentPage={currentPage}
                        itemPerPage={itemPerPage} 
                        totalItem={allMovies.length}
                        onPageChange={handlePageChange}/>
                </div>
            </div>
        </React.Fragment> 
    );
}
 
export default Movie;