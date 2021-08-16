import React from 'react';

import './FormInputComponent.css';

const FormInputComponent = ({
    className,
    type, 
    value, 
    id, 
    name, 
    min, 
    max, 
    step, 
    onChange, 
    placeholder 
}) => {
    return (
        <input 
        className={className}
        type={type}
        value={value}
        id={id}
        name={name}
        min={min}
        max={max}
        step={step}
        onChange={onChange} 
        placeholder={placeholder}/>
    );
}

export default FormInputComponent;
