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

    // handleDues for setting state
    // handleDues = (propertyValue) => (event) => {
    //     console.log(`changing dues ${propertyValue}`);
    //     this.setState({
    //         newDues: {
    //             ...this.state.newDues,
    //             [propertyValue]: event.target.value,
    //         }
    //     })
    // };

    // send newDues to dojos saga
    // handleSaveDues = (event) => {
    //     event.preventDefault();
    //     console.log(this.state.newDues);
    //     this.props.dispatch
    //         ({
    //             type: 'SET_DOJO_DUES',
    //             payload: this.state.newDues
    //         })
    //     this.handleClose();
    // };

    render() {
        return (
            <div>
                <Button
                    style={{ marginBottom: 10}} 
                    variant="outlined" 
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
                    <DialogContent>
                        <CreateDojo />
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}



export default connect(mapStoreToProps)(CreateDojoDialog);