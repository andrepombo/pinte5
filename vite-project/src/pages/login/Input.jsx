import React from 'react'
import { TextField } from '@mui/material';

export default function Input(props) {

    const { name, label, value,error=null, type, onChange } = props;
    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            type={type}
            onChange={onChange}
            {...(error && {error:true,helperText:error})}
        />
    )
}