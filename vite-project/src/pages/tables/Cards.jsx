import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { Link } from "@mui/material";

//import Avatar from 'react-avatar';
import Grid from '@mui/material/Grid'

import { localization }  from '../dashboard/components/Tables/localization';
import { tableIcons }  from '../dashboard/components/Tables/icons';
// import Paper from '@mui/material/Paper'
// import { Button } from "@mui/material";
import axiosInstance from '../../axios';

//import DateFnsUtils from "@date-io/date-fns"; // import
//import { DatePicker,KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialReactTable } from "material-react-table";
//import axios from 'axios'
//import Alert from '@mui/material/Alert';
// import Duplicate from '@mui/icons-material/LibraryAdd';
// import RefreshIcon from '@mui/icons-material/Refresh';
// import { BorderColor } from '@mui/icons-material';
// import { TableCell, Table, TableRow } from '@mui/material';
import  { Chip } from "@mui/material";
//import moment from "moment"

// import useStyles from "../dashboard/components/Tables/styles";
import useStyles from "./styles";
// import { Autocomplete } from '@mui/material';
// import { TextField } from '@mui/material';



// function validateEmail(email){
//   const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
//   return re.test(String(email).toLowerCase());
// }

function Cards() {
  const classes = useStyles();
  const states = {
    complete: "success",
    aquiraz: "warning",
    incomplete: "secondary",
  };

  const [data, setData] = useState([]); //table data
  const [data_update, setDataUpdate] = useState([]); //table data

  console.log(data)

  var obj = data.reduce(function(acc, cur, i) {
    acc[cur.equipe] = cur.equipe;

    return acc;
  }, {});
  
  const removeProp = '';

  const { [removeProp]: remove, ...rest } = obj;


  const ordered = Object.values(rest).sort().reduce(
    (obj, key) => { 
      obj[key] = rest[key]; 
      return obj;
    }, 
    {}
  );

  var obj2 = data.reduce(function(acc, cur, i) {
    acc[cur.med] = cur.med;

    return acc;
  }, {});
  
  

  const removeProp2 = '';

  const { [removeProp2]: remove2, ...rest2 } = obj2;


  const ordered2 = Object.values(rest2).sort().reduce(
    (obj, key) => { 
      obj[key] = rest2[key]; 
      return obj;
    }, 
    {}
  );

  var columns = [
    //{title: "Id", field: "id"},
    {title: "Obra", field: "board",hidden:true},
    {title: "LocalCode", field: "local", render:rowData=> <Link href={`${rowData.cardUrl}`} target="_blank">{rowData.local}</Link>},
    {title: "Macro", field: "macro"},
    {title: "Local", field: "card"},
    //{title: "Atualizado", field: "cardActive",hidden:true},
    {title: "Pacote", field: "pacote"},
    {title: "Descrição", field: "checklist"},
    
    {title: "Item1", field: "item1",hidden:true},
    {title: "Item1_status", field: "i1_status", hidden:true, lookup: {complete: "complete", incomplete: "incomplete"},  
    render: (rowData) => <Chip label={rowData.i1_status}  classes={{root: classes[states[rowData.i1_status.toLowerCase()]]}} />  },
    {title: "Item1_Data_Usuário", field: "i1_data",hidden:true},
    {title: "Item1_Usuário", field: "i1_user", hidden:true, width: 0},
    {title: "Item1_Data_Auto", field: "i1_date_auto",hidden:true, type: "date", render: rowData => moment(rowData.i1_date_auto).format('DD/MM/YYYY')},
    
    {title: "Item2", field: "item2",hidden:true},
    {title: "Item2_status", field: "i2_status", hidden:true, lookup: {complete: "complete", incomplete: "incomplete"},  
    render: (rowData) => <Chip label={rowData.i2_status}  classes={{root: classes[states[rowData.i2_status.toLowerCase()]]}} />  },
    {title: "Item2_Data_Usuário", field: "i2_data"},
    {title: "Item2_Usuário", field: "i2_user", hidden:true, width: 0},
    {title: "Item2_Data_Auto", field: "i2_date_auto",hidden:true, type: "date", render: rowData => moment(rowData.i2_date_auto).format('DD/MM/YYYY')},
  
    {title: "Item3", field: "item3",hidden:true},
    {title: "Item3_status", field: "i3_status", lookup: {complete: "complete", incomplete: "incomplete"},  
    render: (rowData) => <Chip label={rowData.i3_status}  classes={{root: classes[states[rowData.i3_status.toLowerCase()]]}} />  },
    {title: "Item3_Data_Usuário", field: "i3_data"},
    {title: "Item3_Usuário", field: "i3_user", hidden:true, width: 0},
    {title: "Item3_Data_Auto", field: "i3_date_auto",hidden:true, type: "date", render: rowData => moment(rowData.i3_date_auto).format('DD/MM/YYYY')},

    {title: "Item4", field: "item4",hidden:true},
    {title: "Item4_status", field: "i4_status",hidden:true},
    {title: "Medição", field: "med", lookup: ordered2},
    {title: "Item4_Usuário", field: "i4_user", hidden:true, width: 0},
    {title: "Item4_Data_Auto", field: "i4_date_auto",hidden:true, type: "date", render: rowData => moment(rowData.i4_date_auto).format('DD/MM/YYYY')},

    {title: "Item5", field: "item5",hidden:true},
    {title: "Item5_status", field: "i5_status", hidden:true,lookup: {complete: "complete", incomplete: "incomplete"},  
    render: (rowData) => <Chip label={rowData.i5_status}  classes={{root: classes[states[rowData.i5_status.toLowerCase()]]}} />  },
    {title: "Equipe", field: "equipe", lookup: ordered},
    {title: "Item5_Usuário", field: "i5_user", hidden:true, width: 0},
    {title: "Item5_Data_Auto", field: "i5_date_auto",hidden:true,width: 0, type: "date", render: rowData => moment(rowData.i5_date_auto).format('DD/MM/YYYY')},

    {title: "Link", field: "cardUrl",hidden:true, width: 0},
  ]

  const { id } = useParams();
  const { board } = useParams();

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  console.log(board)
  console.log(id)
  
  
  useEffect(() => { 
    axiosInstance.get('carddata/' + id)
        .then(res => {               
            setData(res.data)
            //console.log(res.data)
        })
        .catch(error=>{
            console.log("Error")
        })
    }, [])

    useEffect(() => { 
      axiosInstance.get('update/')
          .then(res => {               
              setDataUpdate(res.data[0]['last_update'])
          })
          .catch(error=>{
              console.log("Error")
          })
      }, [])

      var date = new Date(data_update)
      //console.log(date)
      const dateF = date.toLocaleString("pt-BR")
      //console.log(dateF);
      
    

  // const handleRowUpdate = (newData, oldData, resolve) => {
  //   //validation
  //   let errorList = []
  //   if(newData.nome === ""){
  //     errorList.push("Please enter first name")
  //   }
  //   if(newData.sobrenome === ""){
  //     errorList.push("Please enter last name")
  //   }
  //   // if(newData.email === "" || validateEmail(newData.email) === false){
  //   //   errorList.push("Please enter a valid email")
  //   // }

  //   //date conversion
  //   // function convert(str) {
  //   //   var date = new Date(str),
  //   //     mnth = ("0" + (date.getMonth() + 1)).slice(-2),
  //   //     day = ("0" + date.getDate()).slice(-2);
  //   //   return [date.getFullYear(), mnth, day].join("-");
  //   // }
  //   // const newNasc = convert(newData.nascimento)

  //   function FormataStringData(data) {
  //     var dia  = data.split("/")[0];
  //     var mes  = data.split("/")[1];
  //     var ano  = data.split("/")[2];
    
  //     return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
  //     // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
  //   }
  //   const nascimento = FormataStringData(newData.nascimento)

  //   if(errorList.length < 1){
  //     let formData = new FormData();
  //     formData.append('sobrenome', newData.sobrenome);
  //     //formData.append('slug', newData.slug);
  //     formData.append('author', 1);
  //     formData.append('nome', newData.nome);
  //     formData.append('naturalidade', newData.naturalidade);
  //     formData.append('hobbies', newData.hobbies);
  //     //console.log(newData.nascimento)
  //     formData.append('nascimento', nascimento);
  //     axiosInstance.put("admin/edit/" +newData.id + "/", formData)
  //     .then(res => {
  //       const dataUpdate = [...data];
  //       const index = oldData.tableData.id;
  //       //console.log(oldData)
  //       //console.log(data[0].id)
  //       dataUpdate[index] = newData;
  //       setData([...dataUpdate]);
  //       resolve()
  //       setIserror(false)
  //       setErrorMessages([])
  //     })
  //     .catch(error => {
  //       setErrorMessages(["Update failed! Server error"])
  //       setIserror(true)
  //       resolve()
        
  //     })
  //     }else{
  //       setErrorMessages(errorList)
  //       setIserror(true)
  //       resolve()

  //     }
  // }

  // const handleRowAdd = (newData, resolve) => {
  //   //validation
  //   let errorList = []
  //   if(newData.nome === undefined){
  //     errorList.push("Please enter first name")
  //   }
  //   if(newData.sobrenome === undefined){
  //     errorList.push("Please enter last name")
  //   }
  //   // if(newData.email === undefined || validateEmail(newData.email) === false){
  //   //   errorList.push("Please enter a valid email")
  //   // }

  //   function FormataStringData(data) {
  //     var dia  = data.split("/")[0];
  //     var mes  = data.split("/")[1];
  //     var ano  = data.split("/")[2];
    
  //     return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
  //     // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
  //   }
  //   const nascimento = FormataStringData(newData.nascimento)

  //   if(errorList.length < 1){ //no error
  //     let formData = new FormData();
  //     formData.append('sobrenome', newData.sobrenome);
  //     //formData.append('slug', newData.slug);
  //     formData.append('author', 1);
  //     formData.append('nome', newData.nome);
  //     formData.append('naturalidade', newData.naturalidade);
  //     formData.append('hobbies', newData.hobbies);
  //     formData.append('nascimento', nascimento);
  //     axiosInstance.post("admin/create/", formData)
  //     .then(res => {
  //       const dataToAdd = [...data];
  //       dataToAdd.push(newData);
  //       setData([...dataToAdd]);
  //       resolve()
  //       setErrorMessages([])
  //       setIserror(false)
  //     })
  //     .catch(error => {
  //       setErrorMessages(["Cannot add data. Server error!"])
  //       setIserror(true)
  //       resolve()
  //     })
  //     }else{
  //       setErrorMessages(errorList)
  //       setIserror(true)
  //       resolve()
  //     }
  //     window.location.reload();
  // }

  const handleRowDelete = (oldData, resolve) => {
    console.log(oldData.id)
    axiosInstance.delete('deletecard/'+oldData.id)
      .then(res => {
        
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve()
      })
      .catch(error => {
        setErrorMessages(["Delete failed! Server error"])
        setIserror(true)
        resolve()
      })
  }

  // const handleDuplicate = (newData,resolve) => {
  
  //   function FormataStringData(data) {
  //     var dia  = data.split("/")[0];
  //     var mes  = data.split("/")[1];
  //     var ano  = data.split("/")[2];
    
  //     return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
  //     // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
  //   }
  //   const nascimento = FormataStringData(newData.nascimento)
    
  //   let formData = new FormData();
  //   formData.append('sobrenome', newData.sobrenome);
  //   //formData.append('slug', data.slug);
  //   formData.append('author', 1);
  //   formData.append('nome', newData.nome);
  //   formData.append('nome', 'Novo');
  //   formData.append('naturalidade', newData.naturalidade);
  //   formData.append('hobbies', newData.hobbies);
  //   formData.append('nascimento', nascimento);
  //   // axiosInstance.post("admin/create/", formData)
  //   // .then(res => {
  //   //   let dataToAdd = [...data];
  //   //   dataToAdd.push(data);
  //   //   setData(dataToAdd);
  //   //   console.log(data)
  //   //   resolve()
  //   // })
  //   // .catch(error => {
  //   //   setErrorMessages(["Duplicate failed! Server error"])
  //   //   setIserror(true)
  //   //   resolve()
  //   // })
  //   //window.location.reload();
   
  //   axiosInstance.post("admin/create/", formData)
  //     .then(res => {
  //       const dataToAdd = [...data];
  //       //console.log(newData.id)
  //       //console.log(data[0].id)
  //       //dataToAdd[index] = newData;
  //       //newData['id'] = 200;
       
  //       dataToAdd.push(newData);
  //       setData([...dataToAdd]);
  //       //resolve()
  //       setErrorMessages([])
  //       setIserror(false)
  //     })
  //     .catch(error => {
  //       setErrorMessages(["Cannot add data. Server error!"])
  //       setIserror(true)
  //       //resolve()
  //     })
  //     window.location.reload();
  // };

  return (
    <div className="App">
      <Grid container spacing={1}>
          <Grid item xs={1}></Grid>
          <Grid item xs={12}>
          {/* <div>
            {iserror && 
              <Alert severity="error">
                  {errorMessages.map((msg, i) => {
                      return <div key={i}>{msg}</div>
                  })}
              </Alert>
            }       
          </div> */}
            <MaterialReactTable
              title= {board}
              localization={localization}
              columns={columns}
              data={data}
              icons={tableIcons}
              // components={{
              //   Toolbar: (props) => (
              //     <div
              //       style={{
              //         display: "flex",
              //         justifyContent: "flex-end",
              //         //alignItems: "center"
              //       }}
              //     >
              //       <div style={{ width: "200rem" }}>
              //         <MTableToolbar {...props} />
              //         <Grid style={{padding:15, marginLeft:10}}>
              //           <Button
              //             style={{ height: "fit-content" }}
              //             color="primary"
              //             variant="contained"
              //         >
              //           Test
              //         </Button>
              //         </Grid>
              //       </div>
              //     </div>
              //   ),
              //   Container: (props) => <Paper {...props} elevation={8} />
              // }}
              // actions={[
              //   {
              //     icon: RefreshIcon,
              //     tooltip: 'Refresh Data',
              //     isFreeAction: true,
              //     onClick: () => this.tableRef.current.onQueryChange()
              //   },
              //   // {
              //   //   icon: Duplicate,
              //   //   tooltip: 'Duplicar',
              //   //   //onClick: (event, rowData) => console.log(rowData)
              //   //   onClick: (event,newData) =>
              //   //     new Promise((resolve) => {
              //   //       handleDuplicate(newData, resolve)
              //   //   }),
              //   // },
              // ]}
              options={{
                tableLayout: "auto",
                sorting: true, search: true,
                padding:"dense",
                searchFieldAlignment: "right", searchAutoFocus: true, searchFieldVariant: "standard",
                filtering: true, paging: true, pageSizeOptions: [5, 10, 15, 25, 50, 100], pageSize: 10,
                paginationType: "stepped",  exportButton: true,
                actionsColumnIndex: -1,
                exportAllData: true, 
                //exportFileName: board + '_' + moment().format('DD-MM-YYYYTHH-mm-ss'), 
                exportFileName: board + '_' + dateF, 
                addRowPosition: "first",  
                showFirstLastPageButtons: true,
                //selection: true,
                //paginationPosition: "both",
                // showSelectAllCheckbox: true, showTextRowsSelected: true, selectionProps: rowData => ({
                //   disabled: rowData.age == null,
                //   color:"primary"
                // }),
                // grouping: true, 
                columnsButton: true,
                rowStyle: (data, index) => index % 2 === 0 ? { background: "#f5f5f5" } : null,
                //headerStyle: { background: "#ffc6c4",color: "#f90000aa"}
              }}
              editable={{
                // onRowUpdate: (newData, oldData) =>
                //   new Promise((resolve) => {
                //       handleRowUpdate(newData, oldData, resolve);
                //   }),
                // onRowAdd: (newData) =>
                //   new Promise((resolve) => {
                //     handleRowAdd(newData, resolve)
                //   }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    handleRowDelete(oldData, resolve)
                  }),
              }}
            />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
    </div>
  );
}

export default Cards;
