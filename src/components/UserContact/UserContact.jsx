import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Typography, Button, Card, CardContent, Grid, TextField } from '@material-ui/core';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function UserContact(props) {

    // State used to toggle the edit button on and off
    const [nameEdit, toggleNameEdit] = useState(true);

    // function used to toggle edit and non edit views
    const handleDateChange = (date) => {
        toggleNameEdit(!nameEdit);
    };

    // function that dispatches to the edit reducer whenever an edit is made to an input
    const handleEditChange = (event) => {
        console.log(`Handle change of ${event.target.id}`);
        props.dispatch(
            {
                type: 'SET_EDIT',
                payload: { key: event.target.id, value: event.target.value }
            });
    }

    return (
        <div>
            {/* IF the state is true this a just a view of information */}
            {nameEdit ?
                <Card>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={11}>
                                <h1>Contact</h1>
                            </Grid>
                            <Grid item xs={1}>
                                <Button onClick={handleDateChange}>Edit</Button>
                            </Grid>
                        </Grid>
                        <Typography variant="h6">
                            Email: {props.store.info.email}
                            <br/>
                            Phone: {props.store.info.phone_number}
                        </Typography>
                    </CardContent>
                </Card>
                :
                <Card>
                    {/* IF the state is FALSE this You can edit */}
                    <CardContent>
                        <Grid container>
                            <Grid item xs={11}>
                                <h1>Contact</h1>
                            </Grid>
                            <Grid item xs={1}>
                                {/* THis button will dispatch all changed to the PUT saga/reducer */}
                                <Button onClick={handleDateChange}>Save</Button>
                                {/* cancel will turn the values in the edit reducer back to original info reducer */}
                                <Button onClick={handleDateChange}>Cancel</Button>
                            </Grid>
                        </Grid>
                        <Typography variant="h6">
                            {/* EMAIL!  */}
                            <TextField
                                required
                                id="email"
                                label="Email"
                                defaultValue={props.store.info.email}
                                variant="outlined"
                                onChange={handleEditChange}
                            />
                            <br />
                            <br />
                            {/* PHONENUMBER?! */}
                            <TextField
                                required
                                id="phone_number"
                                label="Phone Number"
                                defaultValue={props.store.info.phone_number}
                                variant="outlined"
                                onChange={handleEditChange}
                            />
                        </Typography>
                    </CardContent>
                </Card>
            }
        </div>
    );
}

export default connect(mapStoreToProps)(UserContact);