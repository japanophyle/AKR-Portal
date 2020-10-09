import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core/';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

function DeactivateDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        console.log('woo00000000000000000000000000')
    };

    const handleClose = () => {
        setOpen(false); 
    };

    const handleSend = () => {
        setOpen(false); 
        props.handleDeactivateMember(props.member)
    }

    

    return (
        <div>
            <Button type="submit" variant="contained" color="primary" onClick={handleClickOpen}>
                Deactivate
            </Button>
            <Dialog open={open} onClose={handleClickOpen} aria-labelledby="form-dialog-title" >
                <DialogContent>
                    <DialogTitle id="form-dialog-title">Deactivate? </DialogTitle>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to deactivate this member? 
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* Cancel the edits and close the dialog */}
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    {/* Should trigger a PUT request to update the information */}
                    <Button onClick={handleSend} color="primary">
                        Yes, Deactivate
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default  connect(mapStoreToProps)(DeactivateDialog)