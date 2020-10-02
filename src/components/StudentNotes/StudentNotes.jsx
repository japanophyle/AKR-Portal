import React from 'react';
import { TextareaAutosize, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core/';

export default function StudentNotes() {
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
                notes
      </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Student Notes</DialogTitle>
                <DialogContent>
                    <TextareaAutosize aria-label="minimum height" rowsMin={3} placeholder="Minimum 3 rows">
                        wowee
                    </TextareaAutosize>
                </DialogContent>
                <DialogTitle id="form-dialog-title">Equipment Rental</DialogTitle>
                <DialogContent>
                <TextareaAutosize aria-label="minimum height" rowsMin={3} placeholder="Minimum 3 rows">
                        wowee
                </TextareaAutosize>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleClose} color="primary">
                        Subscribe
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}