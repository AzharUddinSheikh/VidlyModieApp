import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Input from './common/Input';
import { useForm } from "react-hook-form";
import auth from '../services/authService';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';


const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
}).required();

const LoginForm = () => {
    const {state} = useLocation();
    const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(schema)});

    const onSubmit = async (data) => {
        try {
            await auth.login(data);
            window.location = (state?.userRequestedURL) ? state.userRequestedURL : '/';
        } catch (err) {
            if (err.response && err.response.status === 400) {
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