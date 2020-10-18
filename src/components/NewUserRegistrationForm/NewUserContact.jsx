import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//MATERIAL-UI
import {
    Grid,
    TextField,
  } from '@material-ui/core';


function NewUserContact(props) {

  const [heading, setHeading] = useState('Contact Info');

  return (
    <div>
      <h3>{heading}</h3>
      <TextField
        required
        label="name@email.com"
        margin="dense"
        variant="outlined"
        name="email"
        onChange={props.handleChange('email')}
        value={props.state.email}
      />
      <TextField
        required
        label="Phone Number"
        margin="dense"
        variant="outlined"
        name="phone_number"
        onChange={props.handleChange('phone_number')}
        value={props.state.phone_number}
      />
    </div>
  );
}

export default connect(mapStoreToProps)(NewUserContact);