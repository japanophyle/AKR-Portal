import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip, IconButton } from '@material-ui/core/';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import DeleteIcon from '@material-ui/icons/Delete';

function DojoDeleteDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false); 
    };

    const handleSend = () => {
        setOpen(false); 
        props.deleteDojo(props.dojo.id)
    }

    return (
        <div>
            <Tooltip title="Delete" >
            <IconButton onClick={handleClickOpen} >
                    <DeleteIcon color="error" /> 
                </IconButton>
              </Tooltip>
            <Dialog open={open} onClose={handleClickOpen} aria-labelledby="form-dialog-title" >
                <DialogContent>
                    <DialogTitle id="form-dialog-title">Delete Dojo?</DialogTitle>
                    <DialogContentText id="alert-dialog-description">
                        This will remove {props.dojo.dojo_name} permanently.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* Close the dialog */}
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    {/* Delete the dojo */}
                    <Button onClick={handleSend} color="primary">
                        Yes, Delete!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default  connect(mapStoreToProps)(DojoDeleteDialog)