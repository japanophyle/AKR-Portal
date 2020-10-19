import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,MenuItem, Select, InputLabel, FormControl } from '@material-ui/core';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function AuthSelect(props) {

    // useEffect(() => {
    //     setAuth(props.member.auth_level)
    // console.log(props.member.auth_level)
    // },[])

    // handles storing auth level locally fore the dispatch
  const [auth, setAuth] = React.useState(props.member.auth_level);
  // handles dialog open
  const [open, setOpen] = React.useState(false);

  // Open the dialog
  const handleClickOpen = () => {
    setOpen(true);
};

// close will not chnage the auth level ! 
const handleClose = () => {
    setOpen(false); 
    setAuth(props.member.auth_level)
};

// SET UP THE DISPATCH HERE!!!!!!
const handleSave = () => {
    setOpen(false); 
    console.log('WOOOOOO')
    console.log(auth);
    props.dispatch({ type: 'NEW_AUTH_LEVEL', 
    payload: {
        dojo_id: props.member.dojo_id,
        id: props.member.user_id, 
        value: auth
    } })
}

// Open the Dialog when you select a new level of auth
  const handleChange = (event) => {
    setAuth(event.target.value);
    handleClickOpen()
  };

  
  return (
    <div>
        {/* IF auth level of user is 20 you can promote/demote all */}
        {props.store.user.auth_level >= 20 && 
      <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label" color="secondary">Role</InputLabel>
        <Select
          labelId="auth_level"
          id="auth_level"
          value={props.member.auth_level}
          onChange={handleChange}
          label="Age"
          color="secondary"
        >
          {/* <MenuItem value="">
            <em>{auth}</em>
          </MenuItem> */}
          {/* <MenuItem value={0}>Inactive</MenuItem> */}
          <MenuItem value={5}>Member</MenuItem>
          <MenuItem value={10}>Dojo Admin</MenuItem>
          <MenuItem value={20}>National Admin</MenuItem>
          
        </Select>
      </FormControl>
          }

{/* if you are auth level 10 you can only promote and demote people that are at or below your level */}
        {props.store.user.auth_level === 10 && 
        <>
            {props.member.auth_level >= 20 ? 
            <>
                National Admin
            </>
            :
            <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label" color="secondary">Role</InputLabel>
        <Select
          labelId="auth_level"
          id="auth_level"
          value={props.member.auth_level}
          onChange={handleChange}
          label="Age"
          color="secondary"
        >
          {/* <MenuItem value="">
            <em>{auth}</em>
          </MenuItem> */}
          {/* <MenuItem value={0}>Inactive</MenuItem> */}
          <MenuItem value={5}>Member</MenuItem>
          <MenuItem value={10}>Dojo Admin</MenuItem>          
        </Select>
      </FormControl>
        }
        </>
        }

{/* This is the dialog that opens when you try and change a users auth level for conformation */}
<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog"
        aria-describedby={`are you sure you wish to promote/demote ${props.member.fname}`}
      >
        <DialogTitle id="alert-dialog-slide-title">{"Changing Authorization Level"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you with the change the authorization level of {props.member.fname} {props.member.lname}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Yes, I do!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default connect(mapStoreToProps)(AuthSelect);