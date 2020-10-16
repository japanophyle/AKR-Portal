import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core/';
import { connect } from 'react-redux';

export default function FormSuccess(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        if (props.formState.fname == "" ||
            props.formState.lname == "" ||
            props.formState.adress_1 == "" ||
            props.formState.city == "" ||
            props.formState.state == "" ||
            props.formState.country == "" ||
            props.formState.date_of_birth == "" ||
            props.formState.email == "" ||
            props.formState.gender == "" ||
            props.formState.phone_number == "" ||
            props.formState.years_practiced == "" ||
            props.formState.zipcode == ""
        ) {

        } else {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
        props.handleGo()
    };

    

    return (
        <div>
            <Button type="submit" variant="contained" color="primary" onClick={handleClickOpen}>
                Submit
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
            <DialogContent>
                <DialogTitle id="form-dialog-title">Success! Your information has been saved.</DialogTitle>
                <DialogContentText id="alert-dialog-description">
            Thanks for signing up. Your account will start out being inactive until you contact
            you local Dojo and request to be come an active member. 
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}