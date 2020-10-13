import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { MenuItem, Select, InputLabel, FormControl, Typography, Button, Card, CardContent, Grid, TextField, Tooltip, IconButton } from '@material-ui/core';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function AuthSelect(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const [heading, setHeading] = useState('Functional Component');
  const [auth, setAuth] = React.useState(props.member.auth_level);

  const handleChange = (event) => {
    setAuth(event.target.value);
  };

  return (
    <div>
        {props.store.user.auth_level >= 20 && 
      <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
        <Select
          labelId="auth_level"
          id="auth_level"
          value={auth}
          onChange={handleChange}
          label="Age"
        >
          {/* <MenuItem value="">
            <em>{auth}</em>
          </MenuItem> */}
          <MenuItem value={0}>Inactive</MenuItem>
          <MenuItem value={5}>Member</MenuItem>
          <MenuItem value={10}>Dojo Admin</MenuItem>
          <MenuItem value={20}>National Admin</MenuItem>
          
        </Select>
      </FormControl>
          }

        {props.store.user.auth_level === 10 && 
        <>
            {props.member.auth_level >= 20 ? 
            <>
                National Admin
            </>
            :
            <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
        <Select
          labelId="auth_level"
          id="auth_level"
          value={auth}
          onChange={handleChange}
          label="Age"
        >
          {/* <MenuItem value="">
            <em>{auth}</em>
          </MenuItem> */}
          <MenuItem value={0}>Inactive</MenuItem>
          <MenuItem value={5}>Member</MenuItem>
          <MenuItem value={10}>Dojo Admin</MenuItem>          
        </Select>
      </FormControl>
        }
        </>
        }
    </div>
  );
}

export default connect(mapStoreToProps)(AuthSelect);