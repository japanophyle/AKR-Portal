import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Typography, Button, Card, CardContent, Grid, TextField, Tooltip, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
// dialog for save success
import EditInfoSuccessDialog from '../EditInfoSuccessDialog/EditIntoSuccessDialog'

function UserName(props) {

  // State used to toggle the edit button on and off
  const [nameEdit, toggleNameEdit] = useState(true);

  // function used to toggle edit and non edit views
  const handleDateChange = (date) => {
    toggleNameEdit(!nameEdit);
  };

  // function that dispatches to the edit reducer whenever an edit is made to an input 
  const handleEditChange = (event) => {

    props.dispatch(
      {
        type: 'SET_EDIT',
        payload: { key: event.target.id, value: event.target.value }
      });
  }
  // cancel button resets the reducers 
  const handleDateReset = (event) => {

    props.dispatch(
      {
        type: 'FETCH_USER_INFO',
                payload: props.id
      });
    handleDateChange()
  }

  // when the save button is click it will trigger a saga to start a PUT request using editInfo reducer 
  const handleSaveEdit = (event) => {
    event.preventDefault()
    props.dispatch(
      {
        type: 'UPDATE_USER_DATA',
        payload: props.store.editInfo
      })
      // handleDateChange()
  };

  return (
    <div>
      {/* IF the state is true this a just a view of information */}
      {nameEdit ?
        <Card style={{margin:5, backgroundColor:"#ECE7D1"}}>
          <CardContent>
            <Grid container>
              <Grid item xs={11}>
                <h1>Name</h1>
              </Grid>
              <Grid item xs={1}>
                <Tooltip title={<h1>Edit</h1>}>
                  <IconButton  onClick={handleDateChange} >
                    <EditIcon fontSize="large" color="secondary"/>
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="h5">
                  {/* First name */}
                  {props.store.info.fname}
                  <br />
                  {/* japanese first name */}
                  {props.store.info.fname_japanese}
                  {/* username */}
                  <p>Username: {props.store.info.username}</p>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5">
                  {/* last name */}
                  {props.store.info.lname}
                  <br />
                  {/* japanese last name */}
                  {props.store.info.lname_japanese}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        :
        <Card style={{margin:5, backgroundColor:"#ECE7D1"}}>
          <form  onSubmit={handleSaveEdit} >
          {/* IF the state is FALSE this You can edit */}

          <CardContent>
            <Grid container>
              <Grid item xs={11}>
                <h1>Name</h1>
              </Grid>
              <Grid item xs={1}>
                {/* THis button will dispatch all changed to the PUT saga/reducer */}
                <EditInfoSuccessDialog handleDateChange={handleDateChange}/>
                {/* cancel will turn the values in the edit reducer back to original info reducer */}
                <Button onClick={handleDateReset}
                style={{margin:5}}
                >Cancel</Button>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="h5">
                  {/* Firstname */}
                  <TextField
                    required
                    id="fname"
                    label="First Name"
                    defaultValue={props.store.info.fname}
                    variant="outlined"
                    onChange={handleEditChange}
                    color="secondary"
                  />
                  <br />
                  <br />
                  {/* japanese first name */}
                  <TextField
                    
                    id="fname_japanese"
                    label="Katakana First Name"
                    defaultValue={props.store.info.fname_japanese}
                    variant="outlined"
                    onChange={handleEditChange}
                    color="secondary"

                  />
                  {/* username */}
                  <p>Username: {props.store.info.username}</p>

                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5">
                  {/* last name */}
                  <TextField
                    required
                    id="lname"
                    label="Last Name"
                    defaultValue={props.store.info.lname}
                    variant="outlined"
                    onChange={handleEditChange}
                    color="secondary"

                  />
                  <br />
                  <br />
                  {/* japanese last name */}
                  <TextField
                    
                    id="lname_japanese"
                    label="Katakana Last Name"
                    defaultValue={props.store.info.lname_japanese}
                    variant="outlined"
                    onChange={handleEditChange}
                    color="secondary"

                  />
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          </form>
        </Card>
      }
    </div>
  );
}

export default connect(mapStoreToProps)(UserName);