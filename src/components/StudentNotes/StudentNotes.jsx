import React from 'react';
import {IconButton, Tooltip, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core/';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

function StudentNotes(props) {
    const [open, setOpen] = React.useState(false);

    // when you click the button open the dialog
    const handleClickOpen = () => {
        setOpen(true);
    };

    // WHne you click off the dialog close it
    const handleClose = () => {
        setOpen(false);
    };

    const handleEditChange = (event) => {
        console.log(`Handle change of ${event.target.id}`);
        props.dispatch(
            {
                type: 'SET_EDIT',
                payload: { key: event.target.id, value: event.target.value }
            });
    }

    const handleSaveEdit = (event) => {
        console.log(props.store.editInfo);
        props.dispatch(
            {
                type: 'UPDATE_USER_DATA',
                payload: props.store.editInfo
            })
            handleClose()
    };

    const handleDateReset = (event) => {
        console.log('cancel')
        props.dispatch(
            {
                type: 'FETCH_USER_INFO'
            });
            handleClose()
    }

    return (
        <div>
            {/* Button that will open p the dialog */}
            {/* <Button variant="outlined" color="primary" >
                notes
            </Button> */}
            <Tooltip title="Add Note" placement="left">
                <IconButton onClick={handleClickOpen}>
                    <NoteAddIcon
                        color="primary"
                    ></NoteAddIcon>
                </IconButton>
            </Tooltip>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
                <DialogTitle id="form-dialog-title">Student Notes</DialogTitle>
                <DialogContent>
                    {/* Textfield that can edit the student notes */}
                    <TextField
                        id="notes"
                        label="Student Notes"
                        fullWidth
                        placeholder="Placeholder"
                        defaultValue={props.store.info.notes}
                        onChange={handleEditChange}
                        multiline
                        variant="outlined"
                        rows={7}
                    />
                </DialogContent>
                <DialogTitle id="form-dialog-title">Equipment Rental</DialogTitle>
                <DialogContent>
                    {/* Textfield that can edit the equipment that student currently has */}

                    <TextField
                        id="equipment_checkout"
                        label="Equipment Rental"
                        placeholder="Placeholder"
                        defaultValue={props.store.info.equipment_checkout}
                        multiline
                        fullWidth
                        rows={7}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    {/* Cancel the edits and close the dialog */}
                    <Button onClick={handleDateReset} color="primary">
                        Cancel
                    </Button>
                    {/* Should trigger a PUT request to update the information */}
                    <Button onClick={handleSaveEdit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default connect(mapStoreToProps)(StudentNotes);
