import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import moment from 'moment';

//MATERIAL-UI
import {
    Grid,
    TextField,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    input: {
        minWidth: '',
    },
});


function NewUserPersonal(props) {

    let age2 = moment().diff(props.state.date_of_birth, 'years')
    const [heading, setHeading] = useState('Personal Info');

    return (
        <div>
            <Grid container >
                <Grid item style={{ marginTop: 15 }}>
                    <Typography variant="h6">
                        {heading}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        margin="dense"
                        variant="outlined"
                        name="date_of_birth"
                        type="date"
                        onChange={props.handleChange('date_of_birth')}
                        value={props.state.date_of_birth}
                    />
                </Grid>
                <Grid item xs={6}>
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
                    <Grid item xs={6}>
                        <TextField
                            label="Gender"
                            margin="dense"
                            variant="outlined"
                            name="gender"
                            onChange={props.handleChange('gender')}
                            value={props.state.gender}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Citizenship"
                            margin="dense"
                            variant="outlined"
                            helperText="Give your country code(s) of citizenship"
                            name="citizenship"
                            onChange={props.handleChange('citizenship')}
                            value={props.state.citizenship}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default connect(mapStoreToProps)(NewUserPersonal);