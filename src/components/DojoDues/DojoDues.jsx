import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router';

// MATERIAL-UI
import {
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputAdornment,
} from '@material-ui/core'

class DojoDues extends Component {

    state = {
        open: false,
        newDues: {
            dues_amount: '',
            dues_date: '',
            dojo_id: this.props.match.params.id,
        }
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
    handleDues= (propertyValue) => (event) => {
        console.log(`changing dues ${propertyValue}`);
        this.setState({
            newDues: {
                ...this.state.newDues,
                [propertyValue]: event.target.value,
            }
        })
    };

    render() {
        console.log(this.state.newDues);
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Set Dues
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Set Dues</DialogTitle>
                    <DialogContent>
                        <TextField 
                            autoFocus
                            required
                            margin="dense"
                            variant="outlined"
                            name="dues_amount"
                            label="Dues Amount"
                            onChange={this.handleDues('dues_amount')}
                            fullWidth
                        />
                         <TextField 
                            autoFocus
                            required
                            margin="dense"
                            variant="outlined"
                            name="dues_date"
                            type="date"
                            onChange={this.handleDues('dues_date')}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const DojoDuesItemWithRouter = withRouter(DojoDues);

export default connect(mapStoreToProps)(DojoDuesItemWithRouter);