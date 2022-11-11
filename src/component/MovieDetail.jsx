import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Input from './common/Input';
import * as yup from 'yup';
import { getMovie } from '../server/fakeMovieService';
import { useEffect } from 'react';


const MovieDetail = () => {
    const movieId = useParams()?.id;
    
    const schema = yup.object({
        Title: yup.string().required(),
        Genre: yup.
                mixed().
                oneOf(['Action', 'Thriller', 'Comedy']).
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
    const {register, reset, formState : {errors}, handleSubmit, setError} = useForm({resolver: yupResolver(schema)})

    const onSubmit = data => {
        console.log('movie new data is been submitted')
    }

    useEffect(() => {
        const getMovieById = (id) => {
            if (id !== undefined) {
                const movie = getMovie(id)
                reset({
                        Title : movie.title,
                        Genre : movie.genre.name,
                        NumberInStock : movie.numberInStock,
                        Rate : movie.dailyRentalRate})
            }
        }
        getMovieById(movieId)
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
                        <Input
                            id='genre'
                            label='Genre'
                            errors={errors}
                            register={register}
                            type='text'/>
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