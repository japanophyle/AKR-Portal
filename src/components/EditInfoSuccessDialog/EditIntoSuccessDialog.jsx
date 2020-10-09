import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core/';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

function EditInfoSuccessDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        handleSaveEdit();
        console.log('woo00000000000000000000000000')
    };

    const handleClose = () => {
        setOpen(false); 
    };

    

    const handleSaveEdit = (event) => {
        props.dispatch(
          {
            type: 'UPDATE_USER_DATA',
            payload: props.store.editInfo
          })
          
            
        //   props.handleDateChange()
      };

    return (
        <div>
            <Button type="submit" variant="contained" color="primary" onClick={(event) => handleClickOpen}>
                Submit
            </Button>
            <Dialog open={props.openOne} onClose={handleClose} aria-labelledby="form-dialog-title" >
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

export default  connect(mapStoreToProps)(EditInfoSuccessDialog)