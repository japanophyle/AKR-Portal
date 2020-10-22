import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { TextField, MenuItem, Select, IconButton, Tooltip, Grid, Paper, FormControl, InputLabel, Typography } from '@material-ui/core';
import swal from '@sweetalert/with-react';
import { withRouter } from 'react-router';
import AddBoxIcon from '@material-ui/icons/AddBox';


class CreateDojo extends Component {
    state = {
        newDojo: {
            dojo_name: '',
            region_name: '',
            admin_id: 0,
        }
    };

    componentDidMount() {
        this.props.dispatch({ type: 'GET_ADMINS' })
    }

    handleChangeDojo = (event, propertyToChange) => {
        this.setState({
            newDojo: {
                ...this.state.newDojo,
                [propertyToChange]: event.target.value,
            }
        })
    }

    addDojo = () => {
        if (this.state.newDojo.dojo_name === '' || this.state.newDojo.region_name === '' || this.state.newDojo.admin_id === 0) {
            swal('Please input all fields!');
        } else {

            this.props.dispatch({ type: 'ADD_DOJO', payload: this.state.newDojo })
            this.setState({
                newDojo: {
                    dojo_name: '',
                    region_name: '',
                    admin_id: 0
                }
            })
            this.props.handleClose();
            this.props.history.push('/nationdojos')
            this.props.handleClose();
        }
    }

    render() {
        return (
            <Grid container justify="center" alignItems="center">
                <Paper style={{ width: "80%", padding: "20px", backgroundColor: "#ECE7D1" }}>
                    <Grid container justify="center" alignItems="center">
                        <Grid item><Typography variant="h5">Create A Dojo</Typography></Grid>
                        <Grid item>
                            <Tooltip title={<h1>Create Dojo</h1>} >
                                <IconButton onClick={() => this.addDojo()} >
                                    <AddBoxIcon color="primary" size="medium" />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <TextField color="secondary" style={{ minWidth: "90%" }} label="Dojo Name" variant="outlined" margin="dense" value={this.state.newDojo.dojo_name} onChange={(event) => this.handleChangeDojo(event, 'dojo_name')} />
                    </Grid>
                    <Grid item>
                        <TextField color="secondary" style={{ minWidth: "90%" }} label="Region" variant="outlined" margin="dense" value={this.state.newDojo.region_name} onChange={(event) => this.handleChangeDojo(event, 'region_name')} />
                    </Grid>
                    <Grid item>
                        <FormControl style={{ minWidth: "90%" }} variant="outlined" margin="dense" >
                            <InputLabel color="secondary" >Admin</InputLabel>
                            <Select
                                label="Admin"
                                color="secondary"
                                name="admin_id"
                                // value={this.state.newDojo.admin_id}
                                onChange={(value) => this.handleChangeDojo(value, 'admin_id')}
                            >
                                {this.props.store.admins.map((admin) => {
                                    return (
                                        <MenuItem key={admin.id} value={admin.id}>{admin.fname} {admin.lname}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                </Paper>
            </Grid>
        );
    }
}


const CreateDojoWithRouter = withRouter(CreateDojo);

export default connect(mapStoreToProps)(CreateDojoWithRouter);

