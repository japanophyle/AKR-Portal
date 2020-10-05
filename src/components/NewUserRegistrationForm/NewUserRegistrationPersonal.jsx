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
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';



function NewUserRegistrationPersonal(props) {
    const [selectedDate, handleDateChange] = useState(new Date());

    const [heading, setHeading] = useState('Personal Info');

    return (
        <div>
            <h3>{heading}</h3>
            <Grid container>
               
                <Grid item>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            required
                            variant="outlined"
                            format="MM/dd/yyyy"
                            margin="normal"
                            value={selectedDate}
                            onChange={handleDateChange}
                            helperText="mm/dd/yyyy"
                            label="Date of Birth"
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item>
                    <TextField
                        label="Gender"
                        margin="dense"
                        variant="outlined"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="Citizenship"
                        margin="dense"
                        variant="outlined"
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default connect(mapStoreToProps)(NewUserRegistrationPersonal);