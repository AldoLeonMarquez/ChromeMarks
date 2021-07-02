import React, { useState } from 'react'
import EmployeeForm from "./EmployeeForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../components/useTable";
import * as employeeService from "../../services/employeeService";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import { Grid, } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    pageContent: {
        width:'53%',
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        position: 'absolute',
        left: '16%',
        overflow: 'auto'
    },
    folder: {
        width:'15%',
        minHeight:'45%',
        heigh:'45%',
        left: '1px',
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        position: 'absolute',
        overflow: 'hidden',
        position: 'fixed'
    },
    tag: {
        width:'15%',
        minHeight:'45%',
        heigh:'45%',
        left: '1px',
        top:'46%',
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        position: 'absolute',
        overflow: 'hidden',
        position: 'fixed'
    },
    description: {
        width:'25.5%',
        heigh:'100%',
        right: '1px',
        minHeight:'92%',
        maxHeight:'92%',
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        position: 'absolute',
        overflow: 'hidden',
        position: 'fixed',
        overflowWrap: 'break-word'
    },
    searchInput: {
        width:'15%',
        position: 'absolute',
        right: '10px'
    },
    folder1: {
      position: 'relative',
    },
    folder2: {
        position: 'relative',
    },
    folder3: {
      position: 'relative',
    },
    resetB: {
      position: 'relative',
      right:'1px'
    },
    desElem:{
      position: 'relative',
      height: '11vh', /* Magic here */
      overflowWrap: 'break-word',
      display: 'flex',

      alignItems: 'center',
      fontSize:'20px'

    }

}))


const headCells = [
    { id: 'name', label: 'WebMark Name' },
    { id: 'url', label: 'URL' },
    { id: 'department', label: 'Folder' },
    { id: 'tag1', label: 'Main Tag' },
    { id: 'date', label: 'Date Added ' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Employees() {




    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(employeeService.getAllEmployees())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items
                else

                    return items.filter(x => x.name.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (employee, resetForm) => {
        if (employee.id == 0)
            employeeService.insertEmployee(employee)
        else
            employeeService.updateEmployee(employee)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(employeeService.getAllEmployees())
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        employeeService.deleteEmployee(id);
        setRecords(employeeService.getAllEmployees())
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }

    const toggle1 = () => {
      setFilterFn({
          fn: items => {
              return items.filter(x => x.department.toLowerCase().includes("youtube"))
          }
      })
    }
    const toggle2 = () => {
      setFilterFn({
          fn: items => {
              return items.filter(x => x.department.toLowerCase().includes("music"))
          }
      })
    }
    const toggle3 = () => {
      setFilterFn({
          fn: items => {
              return items.filter(x => x.department.toLowerCase().includes("school"))
          }
      })
    }
    const toggleT1 = () => {
      setFilterFn({
          fn: items => {
              return items.filter(x => x.tag1.toLowerCase().includes("songs") || x.tag2.toLowerCase().includes("songs") || x.tag3.toLowerCase().includes("songs"))
          }
      })
    }
    const toggleT2 = () => {
      setFilterFn({
          fn: items => {
              return items.filter(x => (x.tag1.toLowerCase().includes("pdfs") || x.tag2.toLowerCase().includes("pdfs") || x.tag3.toLowerCase().includes("songs")   ))
          }
      })
    }
    const toggleT3 = () => {
      setFilterFn({
          fn: items => {
              return items.filter(x => (x.tag1.toLowerCase().includes("memes") || x.tag2.toLowerCase().includes("memes") || x.tag3.toLowerCase().includes("memes")   ))
          }
      })
    }
    const myFunction5= () =>{
      let x = document.getElementById("Tag1");
      let y = document.getElementById("Des");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
        y.style.display = "none"
        setFilterFn({
            fn: items => {
                return items
            }
        })
      }
    }
    const myFunction6= () =>{
      let x = document.getElementById("Tag2");
      let y = document.getElementById("Des");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
        y.style.display = "none"
        setFilterFn({
            fn: items => {
                return items
            }
        })
      }
    }
    const myFunction7= () =>{
      let x = document.getElementById("Tag3");
      let y = document.getElementById("Des");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
        y.style.display = "none"
        setFilterFn({
            fn: items => {
                return items
            }
        })
      }
    }
    const resetA = () => {
      setFilterFn({
          fn: items => {
              return items
          }
      })
    }
    const myFunction= () =>{
      let x = document.getElementById("myDIV");
      let y = document.getElementById("Des");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
        y.style.display = "none"
        setFilterFn({
            fn: items => {
                return items
            }
        })
      }
    }
    const myFunction2= () =>{
      let x = document.getElementById("myDIV2");
      let y = document.getElementById("Des");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
        y.style.display = "none"
        setFilterFn({
            fn: items => {
                return items
            }
        })
      }
    }
    const myFunction3= () =>{
      let x = document.getElementById("myDIV3");
      let y = document.getElementById("Des");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
        y.style.display = "none"
        setFilterFn({
            fn: items => {
                return items
            }
        })
      }
    }
    const myFunction4= (f) =>{
      let y = document.getElementById("Des");
      console.log(f)

      if (y.style.display === "none") {
        y.style.display = "block";
        setFilterFn({
            fn: items => {
                return items.filter(x => x.name.includes(f))
            }
        })
      } else {
        y.style.display = "none";
        setFilterFn({
            fn: items => {
                return items.filter(x => x.department.toLowerCase().includes("youtube"))
            }
        })
      }
    }
    const myFunction9= (f) =>{
      let y = document.getElementById("Des");
      console.log(f)

      if (y.style.display === "none") {
        y.style.display = "block";
        setFilterFn({
            fn: items => {
                return items.filter(x => x.name.includes(f))
            }
        })
      } else {
        y.style.display = "none";
        setFilterFn({
            fn: items => {
                return items.filter(x => x.department.toLowerCase().includes("music"))
            }
        })
      }
    }
    const myFunction10= (f) =>{
      let y = document.getElementById("Des");
      console.log(f)

      if (y.style.display === "none") {
        y.style.display = "block";
        setFilterFn({
            fn: items => {
                return items.filter(x => x.name.includes(f))
            }
        })
      } else {
        y.style.display = "none";
        setFilterFn({
            fn: items => {
                return items.filter(x => x.department.toLowerCase().includes("school"))
            }
        })
      }
    }
    const myFunction11= (f) =>{
      let y = document.getElementById("Des");
      console.log(f)

      if (y.style.display === "none") {
        y.style.display = "block";
        setFilterFn({
            fn: items => {
                return items.filter(x => x.name.includes(f))
            }
        })
      } else {
        y.style.display = "none";
        setFilterFn({
            fn: items => {
                return items
            }
        })
      }
    }



    const handleCellClick = (e) => {
        console.log(e.target.textContent);
    }

    return (
        <>
            <Paper className={classes.folder}>

              <div className={classes.folder1}>
                <Controls.Button
                    text="Youtube"
                    variant="outlined"
                    onClick={() => { toggle1(null); myFunction(null);}}
                />
                <div id="myDIV" style={{ display: 'none' }} >
                  <TblContainer>
                      <TableBody>
                          {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell onClick={() => {myFunction4(item.name);}} >{item.name}</TableCell>
                                </TableRow>)
                            )
                          }
                      </TableBody>
                  </TblContainer>
                </div>
              </div>

              <div className={classes.folder2} >
                <Controls.Button
                    text="Music"
                    variant="outlined"
                    onClick={() => { toggle2(null) ; myFunction2(null); }}
                />
                <div id="myDIV2" style={{ display: 'none' }} >
                  <TblContainer>
                      <TableBody>
                          {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell onClick={() => {myFunction9(item.name);}} >{item.name}</TableCell>
                                </TableRow>)
                            )
                          }
                      </TableBody>
                  </TblContainer>
                </div>
              </div>

              <div className={classes.folder3}>
                <Controls.Button
                    text="School"
                    variant="outlined"
                    onClick={() => { toggle3(null) ; myFunction3(null); }}
                />
                <div id="myDIV3" style={{ display: 'none' }} >
                  <TblContainer>
                      <TableBody>
                          {
                              recordsAfterPagingAndSorting().map(item =>
                                  (<TableRow key={item.id}>
                                      <TableCell onClick={() => {myFunction10(item.name);}} >{item.name}</TableCell>
                                  </TableRow>)
                              )
                          }
                      </TableBody>
                  </TblContainer>
                </div>
              </div>
            </Paper>
            <Paper className={classes.tag}>
              <div className={classes.folder1} >
                <Controls.Button
                    text="Songs"
                    variant="outlined"
                    onClick={() => { toggleT1(null) ; myFunction5(null); }}
                />
              <div id="Tag1" style={{ display: 'none' }} >
                  Showing matching Tag 1
                </div>
              </div>

              <div className={classes.folder2} >
                <Controls.Button
                    text="PDFs"
                    variant="outlined"
                    onClick={() => { toggleT2(null) ; myFunction6(null); }}
                />
              <div id="Tag2" style={{ display: 'none' }} >
                  Showing matching Tag 2
              </div>
              </div>

              <div className={classes.folder2} >
                <Controls.Button
                    text="Memes"
                    variant="outlined"
                    onClick={() => { toggleT3(null) ; myFunction7(null); }}
                />
              <div id="Tag3" style={{ display: 'none' }} >
                  Showing matching Tag 3
              </div>
              </div>

            </Paper>


            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="Search WebMark"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                    <Controls.Button
                        text="Reset View"
                        variant="outlined"
                        className={classes.reset}
                        onClick={() => { resetA(null); }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell onClick={() => {myFunction11(item.name);}}>{item.name}</TableCell>
                                    <TableCell onClick={() => {myFunction11(item.name);}}><a href={item.url} target="_blank">{item.url}</a></TableCell>
                                    <TableCell onClick={() => {myFunction11(item.name);}}>{item.department}</TableCell>
                                    <TableCell onClick={() => {myFunction11(item.name);}}>{item.tag1}</TableCell>
                                    <TableCell onClick={() => {myFunction11(item.name);}}>{item.date}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this record?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { onDelete(item.id) }
                                                })
                                            }}>
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Paper className={classes.description}>
              <div id="Des" style={{ display: 'none',widht:'100%',  position: 'relative', }}>
                        {
                          recordsAfterPagingAndSorting().map(item =>
                                <Grid container>
                                  <Grid item xs={100}>
                                    <Controls.ActionButton
                                        color="primary"
                                        onClick={() => { openInPopup(item) }}>
                                        <EditOutlinedIcon fontSize="small" />
                                    </Controls.ActionButton>
                                    <Controls.ActionButton
                                        color="secondary"
                                        onClick={() => {
                                            setConfirmDialog({
                                                isOpen: true,
                                                title: 'Are you sure to delete this record?',
                                                subTitle: "You can't undo this operation",
                                                onConfirm: () => { onDelete(item.id) }
                                            })
                                        }}>
                                        <CloseIcon fontSize="small" />
                                    </Controls.ActionButton>
                                    <div className={classes.desElem}>Name: {item.name}</div>
                                    <div className={classes.desElem}>URL: <a href={item.url} target="_blank">{item.url}</a></div>
                                    <div className={classes.desElem}>Folder: {item.department} </div>
                                    <div className={classes.desElem}>Main Tag: {item.tag1}</div>
                                    <div className={classes.desElem}>Second Tag: {item.tag2}
                                    </div>
                                    <div className={classes.desElem}>Third Tag: {item.tag3} </div>
                                    <div className={classes.desElem}>Notes: {item.notes} </div>
                                    <div className={classes.desElem}> Date Added:{item.date} </div>
                                  </Grid>

                                </Grid>
                          )
                        }

              </div>

            </Paper>
            <Popup
                title="WebMark"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <EmployeeForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}
