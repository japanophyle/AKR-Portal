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
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
                <DialogTitle id="form-dialog-title">Student Notes</DialogTitle>
                <DialogContent>
                    <TextField
                        id="outlined-textarea"
                        label="Student Notes"
                        fullWidth
                        placeholder="Placeholder"
                        multiline
                        variant="outlined"
                        rows={7}

                    />
                </DialogContent>
                <DialogTitle id="form-dialog-title">Equipment Rental</DialogTitle>
                <DialogContent>
                    <TextField
                        id="outlined-textarea"
                        label="Equipment Rental"
                        placeholder="Placeholder"
                        multiline
                        fullWidth
                        rows={7}

                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleClose} color="primary">
                        Save
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}