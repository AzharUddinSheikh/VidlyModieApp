import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Input from './common/Input';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import Select from './common/Select';
import { genres } from '../services/genreService';
import { getMovieById } from '../services/movieService';
import logService from '../services/logService';
import toast, { Toaster } from 'react-hot-toast';
import http from '../services/httpServices';
import config from '../config.json';


const MovieDetail = () => {
    const movieId = useParams()?.id;
    const navigate = useNavigate();
    const [allGenre, setAllGenre] = useState([]);
    
    const schema = yup.object({
        title: yup.string().required(),
        genreId: yup.
                string().
                required('Genre is Required'),
        numberInStock: yup.
                    number().
                    transform((value) => (isNaN(value) ? 0 : value)).
                    integer().
                    positive().
                    required('Please Provide The Stock'),
        dailyRentalRate: yup.
                number().
                transform((value) => (isNaN(value) ? 0 : value)).
                positive().
                max(10, 'Should Not be Greater than 10').
                required('Please Provide The Rate'),
    })
    const {register, reset, formState : {errors}, handleSubmit } = useForm({resolver: yupResolver(schema)})

    const onSubmit = data => {
        if (movieId) {
            const updateMovie = async () => {
                await http.put(`${config.apiMovieEndPoint}/${movieId}`, data);
                toast.success(`Movie Updated Successfully`);
            };
            updateMovie();
        } else {
            const saveMovie = async () => {
                await http.post(config.apiMovieEndPoint, data);
                toast.success(`Movie Added Successfully`)
            }
            saveMovie();
        }
        return navigate('/movies', {push:true});
    }

    useEffect(() => {
        const getGenres = async () => {
            const {data} = await genres();
            setAllGenre(data)
        };
        getGenres();
    }, [])

    useEffect(() => {
        if (movieId !== undefined) {
            const getMovie = async (id) => {
                try {
                    const {data} = await getMovieById(id);
                    reset({
                        title : data.title,
                        genreId : data.genre._id,
                        numberInStock : data.numberInStock,
                        dailyRentalRate : data.dailyRentalRate
                    });
                } catch (err) {
                    return navigate('/not-found', { replace: true });
                }
            }
            getMovie(movieId);
        }
    }, [])

    return (
       <div className="container">
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 5000,
                }}
            />
            <div className="row">
                <div className="col">
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Input
                            id='title'
                            label='title'
                            errors={errors}
                            register={register}
                            type='text'/>
                        <Select
                            name='genre'
                            label='genreId'
                            errors={errors}
                            options={allGenre}
                            register={register}/>
                        <Input
                            id='stock'
                            label='numberInStock'
                            errors={errors}
                            register={register}
                            type='number'/>
                        <Input
                            id='rate'
                            label='dailyRentalRate'
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