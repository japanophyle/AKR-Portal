import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//MATERIAL-UI
import {
    Grid,
    TextField,
  } from '@material-ui/core';


function NewUserRegistrationContact(props) {

  const [heading, setHeading] = useState('Contact Info');

  return (
    <div>
      <h3>{heading}</h3>
      <TextField
        required
        label="name@email.com"
        margin="dense"
        variant="outlined"
      />
      <TextField
        required
        label="Phone Number"
        margin="dense"
        variant="outlined"
      />
    </div>
  );
}

export default connect(mapStoreToProps)(NewUserRegistrationContact);