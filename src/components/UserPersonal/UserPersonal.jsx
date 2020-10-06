import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { MenuItem, Select, InputLabel, FormControl, Typography, Button, Container, Card, CardContent, Grid, TextField } from '@material-ui/core';
import moment from 'moment';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function UserPersonal(props) {

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
                                <h1>Personal Information</h1>
                            </Grid>
                            <Grid item xs={1}>
                                <Button onClick={handleDateChange}>Edit</Button>
                            </Grid>
                        </Grid>
                        <Typography>
                            <h3>Citizenship: {props.store.info.citizenship}</h3>
                            <h3>Date of birth: {moment(props.store.info.date_of_birth).format('MM-DD-YYYY')}</h3>
                            {/* calculated using moment DIFF() operation using the date of birth */}
                            <h3>Age: {moment().diff(props.store.info.date_of_birth, 'years')}</h3>
                            <h3>Gender: {props.store.info.gender}</h3>
                        </Typography>
                    </CardContent>
                </Card>
                :
                <Card>
                    {/* IF the state is FALSE this You can edit */}
                    <CardContent>
                        <Grid container>
                            <Grid item xs={11}>
                                <h1>Personal Information</h1>
                            </Grid>
                            <Grid item xs={1}>
                                {/* THis button will dispatch all changed to the PUT saga/reducer */}
                                <Button onClick={handleDateChange}>Save</Button>
                                {/* cancel will turn the values in the edit reducer back to original info reducer */}
                                <Button onClick={handleDateChange}>Cancel</Button>
                            </Grid>
                        </Grid>
                        <Typography>
                            {/* citizanship */}
                            <TextField
                                required
                                id="citizenship"
                                label="Citizenship"
                                defaultValue={props.store.info.citizenship}
                                variant="outlined"
                                onChange={handleEditChange}
                            />
                            <br />
                            <br />
                            {/* date of birth, if it chaged?  */}
                            <TextField
                                type='Date'
                                required
                                id="date_of_birth"
                                label="Birth Date"
                                defaultValue={moment(props.store.info.date_of_birth).format('YYYY-MM-DD')}
                                variant="outlined"
                                onChange={handleEditChange}
                            />
                            <br />
                            <br />
                            
                            {/* calculated using moment DIFF() operation using the date of birth */}
                            <h3>Age: {moment().diff(props.store.info.date_of_birth, 'years')}</h3>

                            {/* gender */}
                            <TextField
                                required
                                id="gender"
                                label="Gender"
                                defaultValue={props.store.info.gender}
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
export default connect(mapStoreToProps)(UserPersonal);