import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { MenuItem, Select, InputLabel, FormControl, Typography, Button, Container, Card, CardContent, Grid, TextField } from '@material-ui/core';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function UserContact(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const [nameEdit, toggleNameEdit] = useState(true);
  const [phone_number, setPhoneNumber] = useState('12345567');
  const [email, setEmail] = useState('me@what.who');
  

  const handleDateChange = (date) => {
    toggleNameEdit(!nameEdit);
  };

  const handlePhone = (event) => {
    setPhoneNumber(event.target.value)
  };

  const handleEmail = (event) => {
    setEmail(event.target.value)
  };
  
  return (
    <div>
      {nameEdit ?
            <Card>
              <CardContent>
                <Grid container>
                  <Grid item xs={11}>
                    <h1>Contact</h1>
                  </Grid>
                  <Grid item xs={1}>
                    <Button onClick={handleDateChange}>Edit</Button>
                  </Grid>
                </Grid>
                <Typography>
                  <h3>Emailadress@email.what</h3>
                  <h3>612-280-0987</h3>
                </Typography>
              </CardContent>
            </Card>
            :
            <Card>
              <CardContent>
                <Grid container>
                  <Grid item xs={11}>
                    <h1>Contact</h1>
                  </Grid>
                  <Grid item xs={1}>
                    <Button onClick={handleDateChange}>Edit</Button>
                  </Grid>
                </Grid>
                <Typography>
                  <TextField
                    required
                    id="email"
                    label="Email"
                    defaultValue={email}
                    variant="outlined"
                    onChange={handlePhone}
                  />
                  <br />
                  <br />
                  <TextField
                    required
                    id="phone_number"
                    label="Phone Number"
                    defaultValue={phone_number}
                    variant="outlined"
                    onChange={handleEmail}
                  />
                </Typography>
              </CardContent>
            </Card>
          }
    </div>
  );
}

export default connect(mapStoreToProps)(UserContact);