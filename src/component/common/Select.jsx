import React from 'react';

function Select({name, label, register, required, options, errors, ...rest}) {

    return (
        <div className='form-group mt-3'>
            <label
                style={{'textTransform':'capitalize'}} 
                htmlFor={name}>{label}</label>
            <select
                id={name} 
                name={name}
                {...rest}
                {...register(label, { required })}
                className="form-control">
                <option value=""></option>
                {options.map(option => 
                    <option key={option._id} value={option._id}>
                        {option.name}
                    </option>
                )}
            </select>
            {errors[label] && <p role="alert" style={{color:'red'}}>{errors[label]?.message}</p>}
        </div>
    );
}

export default Select;