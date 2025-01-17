import React from "react";
//import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
//import MUIDataTable from "mui-datatables";
import { Link } from 'react-router-dom';
import {
  Grid,
  // LinearProgress,
  // Select,
  // OutlinedInput,
  // MenuItem,
  Button
} from "@mui/material";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
// import Widget from "../../components/Widget/Widget";
// import Table from "../dashboard/components/Table/Table";

// data
// import mock from "../dashboard/mock";
// import Example from "./posts5"
// import Posts from './posts4'
// import Cards from './Cards'
// import Boards from './Boards'
import ColabsObra from './ColabsObra'

// const useStyles = makeStyles(theme => ({
//   tableOverflow: {
//     overflow: 'auto'
//   }
// }))

export default function TableColabs() {
  // const classes = useStyles();
  return (
    <>
      <PageTitle title="Colaboradores" 
      // button={
      //   <Button
      //     component={Link} to={'/app/newcolab/'}
      //     variant="contained"
      //     style={{ fontWeight: 'bold'}}
      //     size="large"
      //     color="secondary"
        
      // >
      //     Novo
      // </Button>
      // }
      />
      <Grid container spacing={4}>
        {/* <Grid item xs={12}>
          <MUIDataTable
            title="Employee List"
            data={datatableData}
            columns={["Name", "Company", "City", "State"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Widget title="Material-UI Table" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
            <Table data={mock.table} />
          </Widget>
        </Grid> */}

        {/* <Grid item xs={12}>
            <Example />
        </Grid> */}

        {/* <Grid item xs={12}>
            <Boards />
        </Grid> */}

        <Grid item xs={12}>
          <ColabsObra />
        </Grid>
      </Grid>
    </>
  );
}
