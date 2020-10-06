import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import moment from 'moment';

//MATERIAL-UI
import {
    Grid,
    TextField,
} from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    DatePicker,
} from '@material-ui/pickers';



function NewUserPersonal(props) {

    // Sets date for now without breaking when selecting a new date
    const [selectedDate, handleDateChange] = useState(new Date());
    let dateToSend = moment(selectedDate).format('L')
    console.log(JSON.stringify(dateToSend));

    let age = moment(selectedDate, "MM/DD/YYYY").fromNow().split(" ")[0]
    const [heading, setHeading] = useState('Personal Info');

    return (
        <div>
            <h3>{heading}</h3>
            <Grid container>
                <Grid item>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            disableFuture
                            openTo="year"
                            format="MM/dd/yyyy"
                            label="Date of birth"
                            views={["year", "month", "date"]}
                            value={dateToSend}
                            onChange={handleDateChange}
                            // onAccept={props.handleChange('date_of_birth')}
                            name="date_of_birth"
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <h5>Age: {age}</h5>
                <Grid item>
                    <TextField
                        label="Gender"
                        margin="dense"
                        variant="outlined"
                        name="gender"
                        onChange={props.handleChange('gender')}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="Citizenship"
                        margin="dense"
                        variant="outlined"
                        helperText="Give your country code(s) of citizenship"
                        name="citizenship"
                        onChange={props.handleChange('citizenship')}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default connect(mapStoreToProps)(NewUserPersonal);