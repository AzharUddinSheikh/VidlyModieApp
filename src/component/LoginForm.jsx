import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Input from './common/Input';
import { useForm } from "react-hook-form";

const schema = yup.object({
  Username: yup.string().required(),
  Password: yup.string().required(),
}).required();

const LoginForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(schema)});

    const onSubmit = data => {
        console.log('login data submitted')
    }
    
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input 
                            id='username'
                            label='Username'
                            register={register}
                            errors={errors}
                            required={false}/>
                        <Input 
                            id='password'
                            label='Password'
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