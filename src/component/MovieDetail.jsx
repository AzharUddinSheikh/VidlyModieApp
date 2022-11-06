import React from 'react'
import { useParams } from 'react-router-dom';


const MovieDetail = () => {
    const movieID = useParams()?.id;

    return (
        <>
            <h1 className='mb-3'>Movie Form {movieID}</h1>
            <button className='btn btn-primary'>Save</button>
        </>
    );
}
 
export default MovieDetail;