import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { MenuItem, Select, InputLabel, FormControl, Typography, Button, Container, Card, CardContent, Grid, TextField } from '@material-ui/core';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function UserName(props) {

  // State used to toggle the edit button on and off
  const [nameEdit, toggleNameEdit] = useState(true);

  // function used to toggle edit and non edit views
  const handleDateChange = (date) => {
    toggleNameEdit(!nameEdit);
  };

  // function that dispatches to the edit reducer whenever an edit is made to an input 
  const handleEditChange = (event) => {
    console.log(`Handle change of ${event.target.id}`);
    props.dispatch(
      {
        type: 'SET_EDIT',
        payload: { key: event.target.id, value: event.target.value }
      });
  }

  return (
    <div>
      {/* IF the state is true this a just a view of information */}
      {nameEdit ?
        <Card>
          <CardContent>
            <Grid container>
              <Grid item xs={11}>
                <h1>Name</h1>
              </Grid>
              <Grid item xs={1}>
                <Button onClick={handleDateChange}>Edit</Button>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <Typography>
                  {/* First name */}
                  <h3>{props.store.info.fname}</h3>
                  {/* japanese first name */}
                  <h3>{props.store.info.fname_japanese}</h3>
                  {/* username */}
                  <h3>Username: {props.store.info.username}</h3>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {/* last name */}
                  <h3>{props.store.info.lname}</h3>
                  {/* japanese last name */}
                  <h3>{props.store.info.lname_japanese}</h3>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        :
        <Card>
          {/* IF the state is FALSE this You can edit */}

          <CardContent>
            <Grid container>
              <Grid item xs={11}>
                <h1>Name</h1>
              </Grid>
              <Grid item xs={1}>
                {/* THis button will dispatch all changed to the PUT saga/reducer */}
                <Button onClick={handleDateChange}>Save</Button>
                {/* cancel will turn the values in the edit reducer back to original info reducer */}
                <Button onClick={handleDateChange}>Cancel</Button>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <Typography>
                  {/* Firstname */}
                  <TextField
                    required
                    id="fname"
                    label="First Name"
                    defaultValue={props.store.info.fname}
                    variant="outlined"
                    onChange={handleEditChange}
                  />
                  <br />
                  <br />
                  {/* japanese first name */}
                  <TextField
                    required
                    id="fname_japanese"
                    label="Katakana First Name"
                    defaultValue={props.store.info.fname_japanese}
                    variant="outlined"
                    onChange={handleEditChange}

                  />
                  {/* username */}
                  <h3>Username: {props.store.info.username}</h3>

                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {/* last name */}
                  <TextField
                    required
                    id="lname"
                    label="Last Name"
                    defaultValue={props.store.info.lname}
                    variant="outlined"
                    onChange={handleEditChange}

                  />
                  <br />
                  <br />
                  {/* japanese last name */}
                  <TextField
                    required
                    id="lname_japanese"
                    label="Katakana Last Name"
                    defaultValue={props.store.info.lname_japanese}
                    variant="outlined"
                    onChange={handleEditChange}

                  />
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      }
    </div>
  );
}

export default connect(mapStoreToProps)(UserName);