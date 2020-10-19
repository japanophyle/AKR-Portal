import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//MATERIAL-UI
import {
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';


function NewUserContact(props) {

  const [heading, setHeading] = useState('Contact Info');

  return (
    <div>
      <Grid container style={{ marginTop: 10 }}>
        <Grid item xs={12}>
          <Typography variant="h6" >
            {heading}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            label="name@email.com"
            margin="dense"
            variant="outlined"
            name="email"
            onChange={props.handleChange('email')}
            value={props.state.email}
            color="secondary"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            label="Phone Number"
            margin="dense"
            variant="outlined"
            name="phone_number"
            onChange={props.handleChange('phone_number')}
            value={props.state.phone_number}
            color="secondary"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStoreToProps)(NewUserContact);