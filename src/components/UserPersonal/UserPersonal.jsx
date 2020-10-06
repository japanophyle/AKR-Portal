import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { MenuItem, Select, InputLabel, FormControl, Typography, Button, Container, Card, CardContent, Grid, TextField } from '@material-ui/core';
import moment from 'moment';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function UserPersonal(props) {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const [nameEdit, toggleNameEdit] = useState(true);

    const handleDateChange = (date) => {
        toggleNameEdit(!nameEdit);
    };

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
                            <h3>Age: {moment().diff(props.store.info.date_of_birth, 'years')}</h3>
                            <h3>Gender: {props.store.info.gender}</h3>
                        </Typography>
                    </CardContent>
                </Card>
                :
                <Card>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={11}>
                                <h1>Personal Information</h1>
                            </Grid>
                            <Grid item xs={1}>
                            <Button onClick={handleDateChange}>Save</Button>
                    <Button onClick={handleDateChange}>Cancel</Button>
                            </Grid>
                        </Grid>
                        <Typography>
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
                            <TextField
                                type='Date'
                                required
                                id="date_of_birth"
                                label="Birth Date"
                                defaultValue={moment(props.store.info.date_of_birth).format('MM-DD-YYYYD')}
                                variant="outlined"
                                onChange={handleEditChange}
                            />
                            <br />
                            <br />
                            <h3>Age: {moment().diff(props.store.info.date_of_birth, 'years')}</h3>
                            <TextField
                                required
                                id="age"
                                label="Age"
                                defaultValue={props.store.info.state}
                                variant="outlined"
                                onChange={handleEditChange}
                            />
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
