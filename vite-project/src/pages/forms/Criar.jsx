import React from 'react'
//import EmployeeForm from "./EmployeeForm";
import PageHeader from "../../components/ColabHeader";
import PeopleOutlineTwoToneIcon from '@mui/icons-material/PeopleOutlineTwoTone';
import { Paper} from '@mui/material';
import { makeStyles } from '@mui/styles'
import ColabForm from './CriarForm';



const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function Employees() {

    const classes = useStyles();

    return (
        <>
            <PageHeader
                title="Novo Colaborador"
                subTitle="Preencha os campos do formulário"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
               <ColabForm/>
            </Paper>
        </>
    )
}