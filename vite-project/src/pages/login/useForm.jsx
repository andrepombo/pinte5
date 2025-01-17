import React, { useState } from 'react';
import { TextField, Grid, Button, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/system';

export function useForm(initialFValues, validateOnChange = false, validate) {
    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
        if (validateOnChange) validate({ [name]: value });
    };

    const resetForm = () => {
        setValues(initialFValues);
        setErrors({});
    };

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
    };
}

const StyledForm = styled('form')(({ theme }) => ({
    '& .MuiFormControl-root': {
        width: '95%',
        margin: theme.spacing(1),  // Ensure the theme is provided for spacing
    },
}));

export function Form(props) {
    const { children, ...other } = props;
    return (
        <StyledForm autoComplete="off" {...other}>
            {children}
        </StyledForm>
    );
}
