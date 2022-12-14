import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import { paginate } from './utils/paginate';
import ListGroup from './component/common/ListGroup';
import Pagination from './component/common/Pagination';
import MovieTable from './component/movieTable';
import { genres } from './services/genreService';
import { movies, deleteMovie } from './services/movieService';
import toast, { Toaster } from 'react-hot-toast';


const Movie = ({user}) => {

    const [allMovies, setAllMovies] = useState([]);
    const [itemPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const [allGenre, setAllGenre] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState({_id:1, name:'All Genre'});
    const [sortColumn, setSortColumn] = useState({path:'title', order:'asc'});
    const [search, setSearch] = useState('');

    useEffect(() => {
        const getMovies = async () => {
            const {data} = await movies();
            setAllMovies(data);
        }
        getMovies();
        const getGenres = async () => {
            const {data} = await genres();
            setAllGenre(data)
        };
        getGenres();
    }, [])

    useEffect(() => {
        setSelectedGenre({_id:1, name:'All Genre'});
        setCurrentPage(1);
    }, [search])

    const handleDelete = async (movie) => {
        const originalMovies = allMovies;
        try {
            await deleteMovie(movie._id)
            setAllMovies(allMovies.filter(m => m !== movie));
            toast.success(`${movie.title} is been deleted successfully`);
        } catch (e) {
            if (e.response && e.response.status === 404) {
                toast.error(`This movie already been deleted`)
            }
            setAllMovies(originalMovies);
        }
    }

    const handleLike = (movie) => {
        setAllMovies(allMovies.map(m => {
            if (movie === m) {
                m.liked = !(m.liked)
            }
            return m
        }))
        toast.success(`You ${movie.liked ? 'liked' : 'disliked'} the ${movie.title} movie`);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleSelectGenre = (genre) => {
        setSelectedGenre(genre)
        setCurrentPage(1);
        setSearch('')
    }

    const handleSort = (sortColumn) => {
        setSortColumn(sortColumn);
    }

    const getPageData = () => {
        let filteredMovies = allMovies;

        if (selectedGenre.name !== 'All Genre') {
            filteredMovies = filteredMovies.filter(m => m.genre.name === selectedGenre.name);
        }
        
        if (search) {
            filteredMovies = filteredMovies.filter(m => m.title.toLowerCase().startsWith(search.toLowerCase()));
        }

        const sortedMovie = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order])

        const paginatedMovie = paginate(sortedMovie, currentPage, itemPerPage)
        return {data : paginatedMovie, length: filteredMovies.length}
    }
    
    const {data, length} = getPageData()

    return (
        <React.Fragment>
            <div className='row'>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 5000,
                    }}
                />
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
                                value={search}
                                onChange={e => setSearch(e.currentTarget.value)}/>
                        </div>
                        { user && 
                            <div className="col-3">
                                <NavLink to='/movies/new' className='btn btn-primary'>Add Movie</NavLink>
                            </div>
                        }
                        {
                            !user && <div className="col-3"></div>
                        }
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