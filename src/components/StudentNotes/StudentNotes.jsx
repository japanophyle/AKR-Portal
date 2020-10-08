import React from 'react';
import { TextareaAutosize, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core/';

export default function StudentNotes() {
    const [open, setOpen] = React.useState(false);

    // when you click the button open the dialog
    const handleClickOpen = () => {
        setOpen(true);
    };

    // WHne you click off the dialog close it
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {/* Button that will open p the dialog */}
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                notes
            </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
                <DialogTitle id="form-dialog-title">Student Notes</DialogTitle>
                <DialogContent>
                    {/* Textfield that can edit the student notes */}
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
                    {/* Textfield that can edit the equipment that student currently has */}

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
                    {/* Cancel the edits and close the dialog */}
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    {/* Should trigger a PUT request to update the information */}
                    <Button onClick={handleClose} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}                                                 