import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { MenuItem, Select, InputLabel, FormControl, Typography, Button, Container, Card, CardContent, Grid, TextField } from '@material-ui/core';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function UserContact(props) {
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
                                <h1>Contact</h1>
                            </Grid>
                            <Grid item xs={1}>
                                <Button onClick={handleDateChange}>Edit</Button>
                            </Grid>
                        </Grid>
                        <Typography>
                            <h3>{props.store.info.email}</h3>
                            <h3>{props.store.info.phone_number}</h3>
                        </Typography>
                    </CardContent>
                </Card>
                :
                <Card>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={11}>
                                <h1>Contact</h1>
                            </Grid>
                            <Grid item xs={1}>
                                <Button onClick={handleDateChange}>Save</Button>
                                <Button onClick={handleDateChange}>Cancel</Button>
                            </Grid>
                        </Grid>
                        <Typography>
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