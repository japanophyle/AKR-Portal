import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//MATERIAL-UI
import {
  Grid,
  TextField,
} from '@material-ui/core';

function NewUserRegistrationName(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const [heading, setHeading] = useState('Name');

  return (
    <div>
      <h3>{heading}</h3>
      <TextField
        required
        label="First"
        margin="dense"
        variant="outlined"
      />
    
      <TextField
        required
        label="Last"
        margin="dense"
        variant="outlined"
      />
      <Grid container>
        <Grid item>
          <TextField
            label="Katakana"
            helperText="If known"
            margin="dense"
            variant="outlined"
          />
          <TextField
            label="Katakana"
            helperText="If known"
            margin="dense"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStoreToProps)(NewUserRegistrationName);