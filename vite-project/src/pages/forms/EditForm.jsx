import React, { useState, useEffect } from 'react'
import axiosInstance from '../../axios';
//import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Grid, } from '@mui/material';
import Controls from "../../components/Controls/Controls";
import { useForm, Form } from '../../components/useForm';
import { useNavigate, useParams } from 'react-router-dom';
import { FormControl, FormLabel, RadioGroup as MuiRadioGroup, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import InputMask from 'react-input-mask';


//import * as employeeService from "../../services/employeeService";

const currencies = [
    {
        value: 'Pintor',
        label: 'Pintor',
    },
    {
        value: 'Mestre',
        label: 'Mestre',
    },
    {
        value: 'Servente',
        label: 'Servente',
    },
    {
        value: 'Encarregado de Obras',
        label: 'Encarregado de Obras',
    },
    {
        value: 'Auxiliar de Pintor',
        label: 'Auxiliar de Pintor',
    },
  ];


const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]

const initialFValues = {
    id: 0,
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    gender: 'male',
    departmentId: '',
    hireDate: new Date(),
    isPermanent: false,
}

export default function EditForm() {

    // const validate = (fieldValues = values) => {
    //     let temp = { ...errors }
    //     if ('fullName' in fieldValues)
    //         temp.fullName = fieldValues.fullName ? "" : "This field is required."
    //     if ('email' in fieldValues)
    //         temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
    //     if ('mobile' in fieldValues)
    //         temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
    //     if ('departmentId' in fieldValues)
    //         temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
    //     setErrors({
    //         ...temp
    //     })

    //     if (fieldValues == values)
    //         return Object.values(temp).every(x => x == "")
    // }

    // const {
    //     values,
    //     setValues,
    //     errors,
    //     setErrors,
    //     handleInputChange,
    //     resetForm
    // } = useForm(initialFValues, true, validate);

    //const navigate = useNavigate();
    const history = useNavigate()
    const { id } = useParams();
    const initialFormData = Object.freeze({
		id :'',
        nome: '',
		cpf: '',
        //matricula:'',
		//email: '',
		telefone: '',
        nascimento: '',
        cargo: '',
        status: '',
	});


    

    const [postData, updateFormData] = useState(initialFormData);
	const [postimage, setPostImage] = useState(false);
	const [fileName, setFileName] = useState("");


    useEffect(() => {
		axiosInstance.get('colabdatadetail/' + id).then((res) => {
			updateFormData({
				...postData,
				['nome']: res.data.nome,
				//['email']: res.data.email,
                //['matricula']: res.data.matricula,
				['cpf']: res.data.cpf,
				['telefone']: res.data.telefone,
                ['nascimento']: res.data.nascimento,
                ['cargo']: res.data.cargo,
                ['status']: res.data.status,
			});
			console.log(res.data);
		});
	}, [updateFormData]);

    

    const handleChange = (e) => {
		if ([e.target.name] == 'image') {
			setPostImage({
				image: e.target.files,
			});
			setFileName(e.target.files[0].name);
			console.log(e.target.files);
		}
		if ([e.target.name] == 'sobrenome') {
			updateFormData({
				...postData,
				[e.target.name]: e.target.value.trim(),
				//['slug']: slugify(e.target.value.trim()),
			});
		} else {
			updateFormData({
				...postData,
				[e.target.name]: e.target.value,
			});
		}
	};

    // function parseJwt(token) {
	// 	if (!token) { return; }
	// 	const base64Url = token.split('.')[1];
	// 	const base64 = base64Url.replace('-', '+').replace('_', '/');
	// 	return JSON.parse(window.atob(base64));
	// }
	
	// const userInfo = parseJwt(localStorage.getItem('access_token'))
	// const userID = userInfo.user_id


    const handleChange2 = (event) => {
        console.log(event.target.value)
        updateFormData(event.target.value);
      };

    const handleSubmit = (e) => {
		e.preventDefault();
		console.log(postData)
		let formData = new FormData();
		formData.append('nome', postData.nome);
		//formData.append('email', postData.email);
        //formData.append('matricula', postData.matricula);
		formData.append('cpf', postData.cpf);
		formData.append('telefone', postData.telefone);
        formData.append('nascimento', postData.nascimento);
        formData.append('cargo', postData.cargo);
        formData.append('status', postData.status);
		// if (postimage) {
		// 	formData.append('image', postimage.image[0]);
		// }
		axiosInstance.put(`editcolab/` + id + '/', formData);
		history.push({
			pathname: '/app/colaboradores/',
		});
		//window.location.reload();
	};

    // const handleSubmit = e => {
    //     e.preventDefault()
    //     if (validate()){
    //         employeeService.insertEmployee(values)
    //         resetForm()
    //     }
    // }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="nome"
                    label="Nome Completo"
                    name="nome"
                    autoComplete="nome"
                    value={postData.nome}
                    onChange={handleChange}
                />
                {/* <TextField
                    variant="outlined"
                    //required
                    fullWidth
                    id="matricula"
                    label="Matricula"
                    name="matricula"
                    autoComplete="matricula"
                    value={postData.matricula}
                    onChange={handleChange}
                /> */}
                <InputMask
                    mask="999.999.999-99"
                    //value={this.state.phone}
                    disabled={false}
                    maskChar=" "
                    onChange={handleChange}
                    >
                    {() => <TextField  
                    variant="outlined"
                    fullWidth
                    id="matricula"
                    label="Matricula"
                    name="matricula"
                    autoComplete="matricula"
                    />}
                </InputMask>

                {/* <TextField
                    variant="outlined"
                    //required
                    fullWidth
                    id="cpf"
                    label="CPF"
                    name="cpf"
                    
                    //autoComplete="nome"
                    value={postData.cpf}
                    onChange={handleChange}
                /> */}
                <InputMask
                    mask="999.999.999-99"
                    //value={this.state.phone}
                    disabled={false}
                    maskChar=" "
                    value={postData.cpf}
                    onChange={handleChange}
                    >
                    {() => <TextField  
                    variant="outlined"
                    fullWidth
                    id="cpf"
                    label="CPF"
                    name="cpf"
                    autoComplete="cpf"
                    />}
                </InputMask>
                <TextField
                    variant="outlined"
                    //required
                    fullWidth
                    id="telefone"
                    label="Telefone"
                    name="telefone"
                    
                    autoComplete="telefone"
                    value={postData.telefone}
                    onChange={handleChange}
                />
                    
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        variant="outlined"
                        id="outlined-select-currency"
                        select
                        //required
                        fullWidth
                        //id="cargo"
                        label="Cargo"
                        name="cargo"
                        autoComplete="cargo"
                        value={postData.cargo}
                        onChange={handleChange}
							>
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                    </TextField>        
                    <TextField
                            variant="outlined"
                            //required
                            fullWidth
                            type="date"
                            id="nascimento"
                            label="Data de Nascimento"
                            name="nascimento"
                            InputLabelProps={{ shrink: true }}
                            autoComplete="nascimento"
                            value={postData.nascimento}
                            onChange={handleChange}
							/>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="status"
                                id="status"
                                value={postData.status}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="Ativo" control={<Radio />} label="Ativo" />
                                <FormControlLabel value="Demitido" control={<Radio />} label="Demitido" />
                            </RadioGroup>
                        </FormControl>

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Atualizar" />
                        {/* <Controls.Button
                            text="Upload Foto"
                            color="default"
                            //onClick={resetForm} 
                            /> */}
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}