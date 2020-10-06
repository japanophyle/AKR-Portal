import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { MenuItem, Select, InputLabel, FormControl, Typography, Button, Container, Card, CardContent, Grid, TextField } from '@material-ui/core';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function UserName(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const [nameEdit, toggleNameEdit] = useState(true);

  const handleDateChange = (date) => {
    toggleNameEdit(!nameEdit);
  };

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
                      <h3>{props.store.info.fname}</h3>
                      <h3>{props.store.info.fname_japanese}</h3>
                      <h3>Username: {props.store.info.username}</h3>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <h3>{props.store.info.lname}</h3>
                      <h3>{props.store.info.lname_japanese}</h3>
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            :
            <Card>
              <CardContent>
                <Grid container>
                  <Grid item xs={11}>
                    <h1>Name</h1>
                  </Grid>
                  <Grid item xs={1}>
                    <Button onClick={handleDateChange}>Save</Button>
                    <Button onClick={handleDateChange}>Cancel</Button>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
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
                      <TextField
                        required
                        id="fname_japanese"
                        label="Katakana First Name"
                        defaultValue={props.store.info.fname_japanese}
                        variant="outlined"
                        onChange={handleEditChange}

                      />
                      <h3>Username: {props.store.info.username}</h3>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
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