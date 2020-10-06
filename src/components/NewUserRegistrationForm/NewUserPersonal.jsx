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



function NewUserPersonal(props) {

    // Sets date for now without breaking when selecting a new date
    const [selectedDate, handleDateChange] = useState(new Date());

    const [heading, setHeading] = useState('Personal Info');
    let a = moment();
    let b = moment('selectedDate', 'YYYY');
    let diff = a.diff(b, 'years'); // calculates patient's age in years
    

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
                        helperText="Give your country code(s) of citizenship"
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default connect(mapStoreToProps)(NewUserPersonal);