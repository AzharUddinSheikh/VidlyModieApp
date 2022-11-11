import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Input from './common/Input';
import * as yup from 'yup';
import { getMovie } from '../server/fakeMovieService';
import { useEffect, useState } from 'react';
import Select from './common/Select';
import { genres } from '../server/fakeGenreService';


const MovieDetail = () => {
    const movieId = useParams()?.id;
    const navigate = useNavigate();
    const [allGenre, setAllGenre] = useState([]);
    
    const schema = yup.object({
        Title: yup.string().required(),
        Genre: yup.
                string().
                required(),
        NumberInStock: yup.
                    number().
                    transform((value) => (isNaN(value) ? 0 : value)).
                    integer().
                    positive().
                    required('Please Provide The Stock'),
        Rate: yup.
                number().
                transform((value) => (isNaN(value) ? 0 : value)).
                positive().
                max(10, 'Should Not be Greater than 10').
                required('Please Provide The Rate'),
    })
    const {register, reset, formState : {errors}, handleSubmit } = useForm({resolver: yupResolver(schema)})

    const onSubmit = data => {
        console.log(data);
        return navigate('/movies', {push:true})
    }

    useEffect(() => {
        setAllGenre(genres)
    }, [])

    useEffect(() => {
        let movie = undefined;
        if (movieId !== undefined) {
            movie = getMovie(movieId);
            if (!movie) return navigate('/not-found', { replace: true });
            reset({
                Title : movie.title,
                Genre : movie.genre._id,
                NumberInStock : movie.numberInStock,
                Rate : movie.dailyRentalRate
            })
        }
    }, [])

    return (
       <div className="container">
            <div className="row">
                <div className="col">
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Input
                            id='title'
                            label='Title'
                            errors={errors}
                            register={register}
                            type='text'/>
                        <Select
                            name='genre'
                            label='Genre'
                            errors={errors}
                            options={allGenre}
                            register={register}/>
                        <Input
                            id='stock'
                            label='NumberInStock'
                            errors={errors}
                            register={register}
                            type='number'/>
                        <Input
                            id='rate'
                            label='Rate'
                            errors={errors}
                            register={register}
                            type='number'/>
                        <button type='submit' className='btn btn-primary mt-3'>Save</button>
                    </form>
                </div>
                <div className="col"></div>
            </div>
       </div> 
    );
}
 
export default MovieDetail;