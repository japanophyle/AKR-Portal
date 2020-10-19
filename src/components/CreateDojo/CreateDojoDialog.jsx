import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router';
import CreateDojo from './CreateDojo';
// MATERIAL-UI
import {
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core'

class CreateDojoDialog extends Component {

    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({
            open: !false
        })
    };

    handleClose = () => {
        this.setState({
            open: false
        })
    };

   

    render() {
        return (
            <div>
                <Button
                    style={{ marginBottom: 10}} 
                    variant="contained" 
                    color="primary" 
                    onClick={this.handleClickOpen}
                >
                    Create Dojo
                </Button>
                <Dialog
                    style={{maxWidth: false}}
                    open={this.state.open} 
                    onClose={this.handleClose}
                >
                    <DialogContent style={{backgroundColor:"#945C39"}}>
                        <CreateDojo handleClose={this.handleClose}/>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}



export default connect(mapStoreToProps)(CreateDojoDialog);