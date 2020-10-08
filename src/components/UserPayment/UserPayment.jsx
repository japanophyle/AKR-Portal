import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Typography, Button, Card, CardContent, Grid, TextField } from '@material-ui/core';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';

// dialog for save success
import EditInfoSuccessDialog from '../EditInfoSuccessDialog/EditIntoSuccessDialog'


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function UserPayment(props) {

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
    // cancel button resets the reducers 
    const handleDateReset = (event) => {
        console.log('cancel')
        props.dispatch(
            {
                type: 'FETCH_USER_INFO'
            });
        handleDateChange()
    }

    // when the save button is click it will trigger a saga to start a PUT request using editInfo reducer 
    const handleSaveEdit = (event) => {
        console.log(props.store.editInfo);
        props.dispatch(
            {
                type: 'UPDATE_USER_DATA',
                payload: props.store.editInfo
            })
        handleDateChange()
    };

    return (
        <div>
            {/* IF the state is true this a just a view of information */}
            {nameEdit ?
                <Card>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={11}>
                                <h1>Payment Information</h1>
                            </Grid>
                            <Grid item xs={1}>
                                {props.store.user.auth_level > 5 &&
                                    <EditIcon fontSize="large" onClick={handleDateChange} />
                                }
                            </Grid>
                        </Grid>
                        <Typography variant="h6">
                            Dues: {props.store.info.dues_amount}
                            <br />
                            Amount Paid: {props.store.info.amount_paid}
                            <br />
                            Date of Payment: {moment(props.store.info.dues_date).format('MM-DD-YYYY')}
                            <br />
                            Payment method: {props.store.info.dues_method}
                        </Typography>
                    </CardContent>
                </Card>
                :
                <Card>
                    {/* IF the state is FALSE this You can edit */}
                    <form  onSubmit={handleSaveEdit}>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={11}>
                                <h1>Payment Information</h1>
                            </Grid>
                            <Grid item xs={1}>
                                {/* THis button will dispatch all changed to the PUT saga/reducer */}
                                <EditInfoSuccessDialog handleDateChange={handleDateChange} />
                                {/* cancel will turn the values in the edit reducer back to original info reducer */}
                                <Button onClick={handleDateReset}>Cancel</Button>
                            </Grid>
                        </Grid>
                        <Typography variant="h6">
                            {/* Dues */}
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
                            {/* Amount paid */}
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
                            {/* date of the payment */}
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
                            {/* payment method */}
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
                    </form>
                </Card>
            }
        </div>
    );
}
export default connect(mapStoreToProps)(UserPayment);