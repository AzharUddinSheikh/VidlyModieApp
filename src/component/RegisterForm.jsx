import React from 'react'
import Input from './common/Input';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';


const RegisterForm = () => {
    
    const schema = yup.object({
        Username: yup.string().required(),
        Password: yup.string().min(5).required(),
        Name: yup.string().required()
    }).required();
    
    const {register, formState: { errors }, handleSubmit} = useForm({resolver: yupResolver(schema)})

    const onSubmit = data => {
        console.log('data submittd register form')
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            id='username'
                            type='email'
                            label={'Username'}
                            register={register}
                            errors={errors}/>
                        <Input
                            id='password'
                            type='password'
                            label={'Password'}
                            register={register}
                            errors={errors}/>
                        <Input
                            id='name'
                            type='text'
                            label={'Name'}
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