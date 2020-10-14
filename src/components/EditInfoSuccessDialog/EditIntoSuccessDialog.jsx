import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core/';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

function EditInfoSuccessDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        if (props.store.editInfo.fname == "" ||
            props.store.editInfo.lname == "" ||
            props.store.editInfo.adress_1 == "" ||
            props.store.editInfo.city == "" ||
            props.store.editInfo.state == "" ||
            props.store.editInfo.country == "" ||
            props.store.editInfo.date_of_birth == "" ||
            props.store.editInfo.email == "" ||
            props.store.editInfo.gender == "" ||
            props.store.editInfo.phone_number == "" ||
            props.store.editInfo.years_practiced == "" ||
            props.store.editInfo.zipcode == ""
        ) {

        } else {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
        props.handleDateChange()
    };

    return (
        <div>
            <Button type="submit" variant="contained" color="primary"
                onClick={handleClickOpen}
            >
                Submit
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                <DialogContent>
                    <DialogTitle id="form-dialog-title">Success! </DialogTitle>
                    <DialogContentText id="alert-dialog-description">
                        Your edits have been saved.
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

export default connect(mapStoreToProps)(EditInfoSuccessDialog)