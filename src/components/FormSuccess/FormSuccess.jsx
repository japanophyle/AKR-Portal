import React from 'react';
import { TextareaAutosize, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core/';

export default function FormSuccess() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
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