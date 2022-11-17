import React from 'react'
import Input from './common/Input';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { registerUser } from '../services/userService';


const RegisterForm = () => {
    
    const schema = yup.object({
        username: yup.string().email().required(),
        password: yup.string().min(5).required(),
        name: yup.string().required()
    }).required();
    
    const {register, setError, formState: { errors }, handleSubmit} = useForm({resolver: yupResolver(schema)})

    const onSubmit = async (data) => {
        try {
            const { headers } = await registerUser(data);
            localStorage.setItem('token', headers['x-auth-token']);
            window.location.reload();
        } catch (err) {
            if (err.response && err.response.status == 400) {
                setError('username', {type:'custom', message:'Username already exists'}, { shouldFocus: true });
            }
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            id='username'
                            type='email'
                            label='username'
                            register={register}
                            errors={errors}/>
                        <Input
                            id='password'
                            type='password'
                            label='password'
                            register={register}
                            errors={errors}/>
                        <Input
                            id='name'
                            type='text'
                            label='name'
                            register={register}
                            errors={errors}/>
                        <button className='btn btn-primary mt-3' type='submit'>Register</button>
                    </form>
                </div>
                <div className="col"></div>
            </div>
        </div>
    );
}
 
export default RegisterForm;