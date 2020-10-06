import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//MATERIAL-UI
import {
  Grid,
  TextField,
} from '@material-ui/core';

function NewUserName(props) {
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
        name="fname"
        onChange={props.handleChange('fname')}
      />
    
      <TextField
        required
        label="Last"
        margin="dense"
        variant="outlined"
        name="lname"
        onChange={props.handleChange('lname')}
      />
      <Grid container>
        <Grid item>
          <TextField
            label="Katakana"
            helperText="If known"
            margin="dense"
            variant="outlined"
            name="japanese_fname"
            onChange={props.handleChange('japanese_fname')}
          />
          <TextField
            label="Katakana"
            helperText="If known"
            margin="dense"
            variant="outlined"
            name="japanese_lname"
            onChange={props.handleChange('japanese_lname')}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStoreToProps)(NewUserName);