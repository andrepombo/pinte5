import React from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
//import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../../../components/PageTitle";
import Widget from "../../../../components/Widget";
//import Table from "../dashboard/components/Table/Table";

// data
import Cards from './Cards'
import Boards from './Boards'

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function Tables() {
  const classes = useStyles();
  return (
    <>
      <PageTitle title="Obras" />
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

        <Grid item xs={12}>
            <Boards />
        </Grid>

        {/* <Grid item xs={12}>
            <Cards />
        </Grid> */}
      </Grid>
    </>
  );
}
