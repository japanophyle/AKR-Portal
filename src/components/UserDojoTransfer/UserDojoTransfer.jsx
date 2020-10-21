import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { DialogTitle, DialogContent, DialogActions, DialogContentText, Dialog, InputLabel, Select, MenuItem, FormControl, Typography, Button, Card, CardContent, Grid, Tooltip, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

// dialog for save success
import EditInfoSuccessDialog from '../EditInfoSuccessDialog/EditIntoSuccessDialog'

function UserDojoTransfer(props) {

    // State used to toggle the edit button on and off
    const [nameEdit, toggleNameEdit] = useState(true);
    const [dojo_id, changeDojoId] = useState(props.store.info.dojo_id)
    const [open, setOpen] = React.useState(false);

    // function used to toggle edit and non edit views
    const handleDateChange = (date) => {
        changeDojoId(props.store.info.dojo_id)
        toggleNameEdit(!nameEdit);
    };

    // cancel button resets the reducers 
    const handleDateReset = (event) => {

        props.dispatch(
            {
                type: 'FETCH_USER_INFO',
                payload: props.id
            });
        handleDateChange()
    }

    // when the save button is click it will trigger a saga to start a PUT request using editInfo reducer 
    const handleSaveEdit = (event) => {
        event.preventDefault()

        props.dispatch(
            {
                type: 'UPDATE_USER_DATA',
                payload: props.store.editInfo
            })
    };

    const handleChange = (propertyName) => (event) => {
        changeDojoId(event.target.value)

    }

    const changeDojo = () => {
        handleClose()
        handleDateChange()
        props.dispatch(
            {
                type: 'DOJO_TRANSFER',
                payload: {
                    dojo_id: dojo_id,
                    user_id: props.store.info.user_id,
                    params: props.id 
                }
            });
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    // close will not chnage the auth level ! 
    const handleClose = () => {
        setOpen(false);
        changeDojoId(props.store.info.dojo_id)
    };


    return (
        <div>
            {/* IF the state is true this a just a view of information */}
            {nameEdit ?
                <Card style={{margin:5, backgroundColor:"#ECE7D1"}}>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={11}>
                                <h1>Dojo</h1>
                            </Grid>
                            <Grid item xs={1}>
                                <Tooltip title={<h1>Edit</h1>}>
                                    <IconButton onClick={handleDateChange} >
                                        <EditIcon fontSize="large" color="secondary" />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                        <Typography variant="h5">
                            {props.store.dojos.map((dojo, i) => {
                                if (Number(dojo.id) === props.store.info.dojo_id) {
                                    return (<>Dojo: {dojo.dojo_name}</>)
                                }
                            })}
                        </Typography>
                    </CardContent>
                </Card>
                :
                <Card style={{margin:5, backgroundColor:"#ECE7D1"}}>
                    {/* IF the state is FALSE this You can edit */}
                    <form onSubmit={handleSaveEdit} >
                        <CardContent>
                            <Grid container>
                                <Grid item xs={11}>
                                    <h1>Dojo</h1>
                                </Grid>
                                <Grid item xs={1}>
                                    {/* THis button will dispatch all changed to the PUT saga/reducer */}
                                    <Button variant="contained" color="primary"
                                        onClick={handleClickOpen}
                                        style={{ margin: 5 }}
                                    >
                                        Submit
                                    </Button>
                                    {/* cancel will turn the values in the edit reducer back to original info reducer */}
                                    <Button onClick={handleDateReset}
                                        style={{ margin: 5 }}
                                    >Cancel</Button>
                                </Grid>
                            </Grid>
                            <Typography variant="h5">
                                {/* DOJO! */}
                                <FormControl
                                    style={{ margin: 8, minWidth: 300 }}
                                    variant="outlined"
                                >
                                    <InputLabel color="secondary">Dojo</InputLabel>
                                    <Select
                                        required
                                        label="Dojo"
                                        name="dojo_id"
                                        onChange={handleChange('dojo_id')}
                                        value={dojo_id}
                                        color="secondary"
                                    >

                                        {props.store.dojos.map((dojo, id) => {
                                            return (
                                                <MenuItem key={id} value={dojo.id}>{dojo.dojo_name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Typography>
                        </CardContent>
                    </form>
                </Card>
            }
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog"
                aria-describedby={`Are you sure you with to change dojos?`}
            >
                <DialogTitle id="alert-dialog-slide-title">{"Changing Authorization Level"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Once you change dojos, you will become inactive and will need to contact your new dojos instructors to become active again
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={changeDojo} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={changeDojo} color="primary">
                        Yes, I do!
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}

export default connect(mapStoreToProps)(UserDojoTransfer);