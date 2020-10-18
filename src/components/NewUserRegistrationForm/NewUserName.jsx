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
        value={props.state.fname}
      />
    
      <TextField
        required
        label="Last"
        margin="dense"
        variant="outlined"
        name="lname"
        onChange={props.handleChange('lname')}
        value={props.state.lname}
      />
      <Grid container>
        <Grid item>
          <TextField
            label="Katakana"
            helperText="If known"
            margin="dense"
            variant="outlined"
            name="fname_japanese"
            onChange={props.handleChange('fname_japanese')}
            value={props.state.fname_japanese}
          />
          <TextField
            label="Katakana"
            helperText="If known"
            margin="dense"
            variant="outlined"
            name="lname_japanese"
            onChange={props.handleChange('lname_japanese')}
            value={props.state.lname_japanese}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStoreToProps)(NewUserName);