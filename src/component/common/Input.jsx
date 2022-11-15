import React from 'react'

const Input = ({id, label, register, required, errors, ...rest}) => {
    return (
        <div className="form-group mt-3">
            {label && <label style={{'textTransform':'capitalize'}} htmlFor={id}>{label}</label>}
            <input
                {...rest}
                className="form-control"
                {...register(label, { required })} />
            {errors[label] && <p role="alert" style={{color:'red'}}>{errors[label]?.message}</p>}
        </div>
    );
}
 
export default Input;