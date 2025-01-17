import React, { useState } from "react";
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';
import { useForm, Form } from './useForm';
import Controls from './Controls';

import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@mui/material";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";

function Login(props) {
  const classes = useStyles();  // This will apply the styles from `styles.js`

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [errorMessages, setErrorMessages] = useState([])
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  let history = useNavigate();

  const initialFValues = {
    username: '',
    email: '',
    password: '',
}

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('username' in fieldValues)
        temp.username = fieldValues.username ? "" : "Esse campo é necessário."
    if ('email' in fieldValues)
        temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Esse Email não é válido"
    if ('password' in fieldValues)
        temp.password = fieldValues.password.length > 7 ? "" : "Mínimo de 8 números necessários."
    setErrors({
        ...temp
    })

    if (fieldValues === values)
        return Object.values(temp).every(x => x === "")
}

const {
  values,
  errors,
  setErrors,
  handleInputChange,
} = useForm(initialFValues, true, validate);

const handleSubmit = (e) => {
  e.preventDefault()
  setIsLoading(true);
  let errorList = []
  if(loginValue === "a"){
    errorList.push("Please enter first name")
  }
  if(nameValue === "a"){
    errorList.push("Please enter last name")
  }

  if(validate){
    axiosInstance
      .post(`create/`, {
          email: values.email,
          user_name: values.username,
          password: values.password,
      })
      .then((res) => {
          history('/login');
          console.log(res.data);
      })
      .catch(error => {
        console.log(error.response)
        setError(true)
        setIsLoading(false)
      })
  } else{
    setErrorMessages(errorList)
    setError(true)
    setIsLoading(false)
  }
};     

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container className={classes.container}>
        <div className={classes.logotypeContainer}>
          <img src={logo} alt="logo" className={classes.logotypeImage} />
          <Typography className={classes.logotypeText}>Pinte</Typography>
        </div>
        <div className={classes.formContainer}>
          <div className={classes.form}>
            <Tabs
              value={activeTabId}
              onChange={(e, id) => {setActiveTabId(id); setError(null)}}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Login" classes={{ root: classes.tab }} />
            </Tabs>
            {activeTabId === 0 && (
              <React.Fragment>
                <Typography variant="h1" className={classes.greeting}>
                  Bom Dia, Usuário(a)
                </Typography>
                <div className={classes.formDividerContainer}>
                  <div className={classes.formDivider} />
                </div>
                <Fade in={error}>
                  <Typography color="secondary" className={classes.errorMessage}>
                    Alguma coisa errada com seu login ou password :(
                  </Typography>
                </Fade>
                  <TextField
                    id="email"
                    variant="outlined"
                    label="E-mail"
                    onChange={e => setLoginValue(e.target.value)}
                    {...(error && {error:true,helperText:error})}
                    margin="normal"
                    placeholder="Email Adress"
                    type="email"
                    fullWidth
                  />
                  <TextField
                    id="password"
                    name="password"
                    variant="outlined"
                    label="Password"
                    onChange={e => setPasswordValue(e.target.value)}
                    margin="normal"
                    autoComplete="current-password"
                    autoFocus
                    placeholder="Password"
                    type="password"
                    fullWidth
                  />
                  <div className={classes.formButtons}>
                    {isLoading ? (
                      <CircularProgress size={26} className={classes.loginLoader} />
                    ) : (
                      <Button
                        disabled={loginValue.length === 0 || passwordValue.length === 0}
                        onClick={() =>
                          loginUser(
                            userDispatch,
                            loginValue,
                            passwordValue,
                            props.history,
                            setIsLoading,
                            setError,
                          )
                        }
                        color="primary"
                        size="large"
                      >
                        Login
                      </Button>
                    )}
                </div>
              </React.Fragment>
            )}
            {activeTabId === 1 && (
              <React.Fragment>
                <Typography variant="h1" className={classes.greeting}>
                  Bem Vindo!
                </Typography>
                <Typography variant="h2" className={classes.subGreeting}>
                  Crie sua conta
                </Typography>
                <Fade in={error}>
                  <Typography color="secondary" className={classes.errorMessage}>
                    Alguma coisa deu errado com seu login ou senha :( {errorMessages}
                  </Typography>
                </Fade>
                <Controls.Input
                    name="username"
                    label="Usuário"
                    value={values.username}
                    onChange={handleInputChange}
                    error={errors.username}
                />
                <Controls.Input
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleInputChange}
                    error={errors.email}
                />
                <Controls.Input
                    label="Senha"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleInputChange}
                    error={errors.password}
                />
    
                <div className={classes.creatingButtonContainer}>
                  {isLoading ? (
                    <CircularProgress size={26} />
                  ) : (
                    <Button
                      type="submit"
                      size="large"
                      variant="contained"
                      color="primary"
                      fullWidth
                      className={classes.createAccountButton}
                    >
                      Create your account
                    </Button>
                  )}
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </Grid>
    </Form>
  );
}

export default Login;
