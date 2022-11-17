import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Input from './common/Input';
import { useForm } from "react-hook-form";
import { login } from '../services/authService';
import toast, { Toaster } from 'react-hot-toast';


const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
}).required();

const LoginForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(schema)});

    const onSubmit = async (data) => {
        try {
            const {data : jwt} = await login(data);
            localStorage.setItem('token', jwt);
            window.location = '/';
        } catch (err) {
            if (err.response && err.response.status == 400) {
                toast.error(err.response.data);
            }
        }
    }
    
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input 
                            id='username'
                            label='username'
                            register={register}
                            errors={errors}
                            required={false}/>
                        <Input 
                            id='password'
                            label='password'
                            type='password'
                            register={register}
                            errors={errors}
                            required/>
                        <button type="submit" className="btn btn-primary mt-3">Submit</button>
                    </form>
                </div>
                <div className="col"></div>
            </div>
        </div>
    );
}
 
export default LoginForm;