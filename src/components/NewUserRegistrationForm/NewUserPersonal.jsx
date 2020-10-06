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
// import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    DatePicker,
} from '@material-ui/pickers';



function NewUserPersonal(props) {
    console.log(props.state.date_of_birth);

    let age2 = moment().diff(props.state.date_of_birth, 'years')
    const [heading, setHeading] = useState('Personal Info');

    return (
        <div>
            <h3>{heading}</h3>
            <Grid container>
                <Grid item>
                    <TextField
                        margin="dense"
                        variant="outlined"
                        name="date_of_birth"
                        type="date"
                        onChange={props.handleChange('date_of_birth')}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        disabled
                        label="Age"
                        margin="dense"
                        variant="outlined"
                        value={!age2 ? '' : age2}
                        name="age"
                        onChange={(event) => props.handleChange(event)}
                    />
                </Grid>
                <Grid container>
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
            </Grid>
        </div>
    );
}

export default connect(mapStoreToProps)(NewUserPersonal);