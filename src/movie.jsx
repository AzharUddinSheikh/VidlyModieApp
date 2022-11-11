import React, { useEffect, useState } from 'react';
import ListGroup from './component/common/ListGroup';
import Pagination from './component/common/Pagination';
import MovieTable from './component/movieTable';
import { genres } from './server/fakeGenreService';
import { getMovies } from './server/fakeMovieService';
import { paginate } from './utils/paginate';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';

const Movie = () => {

    const [allMovies, setAllMovies] = useState([]);
    const [itemPerPage, setItemPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const [allGenre, setAllGenre] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState({_id:1, name:'All Genre'});
    const [sortColumn, setSortColumn] = useState({path:'title', order:'asc'});
    const [search, setSearch] = useState('');

    useEffect(() => {
        setAllMovies(getMovies());
        setAllGenre(genres);
    }, [])

    useEffect(() => {
        setSelectedGenre({_id:1, name:'All Genre'});
    }, [search])

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

    const handleSelectGenre = (genre) => {
        setSelectedGenre(genre)
        setCurrentPage(1);
    }

    const handleSort = (sortColumn) => {
        setSortColumn(sortColumn);
    }

    const getPageData = () => {
        let filteredMovies = allMovies;

        if (selectedGenre.name != 'All Genre') {
            filteredMovies = filteredMovies.filter(m => m.genre.name == selectedGenre.name);
        }
        
        if (search) {
            filteredMovies = filteredMovies.filter(m => m.title.toLowerCase().startsWith(search.toLowerCase()));
        }

        const sortedMovie = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order])

        const paginatedMovie = paginate(sortedMovie, currentPage, itemPerPage)
        return {data : paginatedMovie, length: filteredMovies.length}
    }
    
    const {data, length} = getPageData()

    if (length === 0) {
        return `There is no movies in the database`
    }

    return (
        <React.Fragment>
            <div className='row'>
                <div className="col-3">
                    <ListGroup 
                        allData={[{_id:1, name:'All Genre'}, ...allGenre]}
                        selectedGenre={selectedGenre}
                        onSelectGenre={handleSelectGenre}/>
                </div>
                
                <div className="col">
                    <div className="row mt-3">
                        <div className="col">
                            <p>Showing {length} movies in the database</p>
                            <input 
                                type="text" 
                                className="form-control"
                                placeholder='Search Movie'
                                onChange={e => setSearch(e.currentTarget.value)}/>
                        </div>
                        <div className="col-3">
                            <NavLink to='/movies/new' className='btn btn-primary'>Add Movie</NavLink>
                        </div>
                    </div>
                    
                    <MovieTable
                        data={data}
                        onLike={handleLike}
                        onDelete={handleDelete}
                        onSort={handleSort}
                        sortColumn={sortColumn}/>

                    <Pagination
                        currentPage={currentPage}
                        itemPerPage={itemPerPage} 
                        totalItem={length}
                        onPageChange={handlePageChange}/>
                </div>
            </div>
        </React.Fragment> 
    );
}
 
export default Movie;