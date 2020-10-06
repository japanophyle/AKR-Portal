import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { MenuItem, Select, InputLabel, FormControl, Typography, Button, Container, Card, CardContent, Grid, TextField } from '@material-ui/core';
import moment from 'moment';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function UserPayment(props) {
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
                                <h1>Payment Information</h1>
                            </Grid>
                            <Grid item xs={1}>
                                <Button onClick={handleDateChange}>Edit</Button>
                            </Grid>
                        </Grid>
                        <Typography>
                            <h3>Dues: {props.store.info.dues_amount}</h3>
                            <h3>Amount Paid: {props.store.info.amount_paid}</h3>
                            <h3>Date of Payment: {moment(props.store.info.dues_date).format('MM-DD-YYYY')}</h3>
                            <h3>Payment method: {props.store.info.dues_method}</h3>
                        </Typography>
                    </CardContent>
                </Card>
                :
                <Card>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={11}>
                                <h1>Payment Information</h1>
                            </Grid>
                            <Grid item xs={1}>
                                <Button onClick={handleDateChange}>Save</Button>
                                <Button onClick={handleDateChange}>Cancel</Button>
                            </Grid>
                        </Grid>
                        <Typography>
                        <TextField
                                required
                                id="dues_amount"
                                label="Dues"
                                defaultValue={props.store.info.dues_amount}
                                variant="outlined"
                                onChange={handleEditChange}
                            />
                            <br />
                            <br />
                            <TextField
                                required
                                id="amount_paid"
                                label="Amount Paid"
                                defaultValue={props.store.info.amount_paid}
                                variant="outlined"
                                onChange={handleEditChange}
                            />
                            <br />
                            <br />
                            <TextField
                                type='Date'
                                required
                                id="dues_date"
                                label="Date of Payment"
                                defaultValue={moment(props.store.info.dues_date).format('YYYY-MM-DD')}
                                variant="outlined"
                                onChange={handleEditChange}
                            />
                            <br />
                            <br />
                            <TextField
                                required
                                id="dues_method"
                                label="Payment Method"
                                defaultValue={props.store.info.dues_method}
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
export default connect(mapStoreToProps)(UserPayment);