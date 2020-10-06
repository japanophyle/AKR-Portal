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
  const [heading, setHeading] = useState('Functional Component');
  const [nameEdit, toggleNameEdit] = useState(true);
  const [fname, setFName] = useState('a');
  const [lname, setLName] = useState('true');
  const [fname_japanese, setFNameJapanese] = useState('スシ');
  const [lname_japanese, setLNameJapanese] = useState('スシ');

  const handleDateChange = (date) => {
    toggleNameEdit(!nameEdit);
  };

  const handleFName = (event) => {
    setFName(event.target.value)
    console.log(fname)
  }
  const handleLName = (event) => {
    setLName(event.target.value)
  }
  const handleFNameJapanese = (event) => {
    setFNameJapanese(event.target.value)
  }
  const handleLNameJapanese = (event) => {
    setLNameJapanese(event.target.value)
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
                      <h3>Karl</h3>
                      <h3>Katakana First Name</h3>
                      <h3>Username</h3>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <h3>Beck</h3>
                      <h3>Katakana Last Name</h3>
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
                        defaultValue={fname}
                        variant="outlined"
                        onChange={handleFName}
                      />
                      <br />
                      <br />
                      <TextField
                        required
                        id="fname_japanese"
                        label="Katakana First Name"
                        defaultValue={fname_japanese}
                        variant="outlined"
                        onChange={handleFNameJapanese}

                      />
                      <h3>Username</h3>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <TextField
                        required
                        id="lname"
                        label="Last Name"
                        defaultValue={lname}
                        variant="outlined"
                        onChange={handleLName}

                      />
                      <br />
                      <br />
                      <TextField
                        required
                        id="lname_japanese"
                        label="Katakana Last Name"
                        defaultValue={lname_japanese}
                        variant="outlined"
                        onChange={handleLNameJapanese}

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