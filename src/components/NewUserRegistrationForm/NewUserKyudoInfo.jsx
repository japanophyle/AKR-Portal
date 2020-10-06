import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//MATERIAL-UI
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    TextField,
    MenuItem,
    FormControl,
    FormControlLabel,
    Checkbox,
    Select,
    Typography,
    InputLabel,
} from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 220,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function NewUserKyudoInfo(props) {

    const [heading, setHeading] = useState('Kyudo Renmei Information');
    
    const classes = useStyles();

    // ranks are mapped over the select menu
    const ranks =
        [
            'Shodan',
            'Nidan',
            'Sandan',
            'Yondan',
            'Godan',
            'Rokudan',
            'Shichidan',
            'Hachidan',
            'Kudan',
            'Judan'
        ]

    return (
        <div>
            <h3>{heading}</h3>
            {/* Choosing the dojo that the new user is trying to join. */}
            <Grid container justify="center" alignItems="center">
                <Grid item>
                    <Typography variant="h6" gutterBottom>Select Dojo</Typography>
                    <FormControl
                        className={classes.formControl}
                        variant="outlined"
                    >
                        <InputLabel>Dojo</InputLabel>
                        <Select
                            label="Dojo"
                            name="dojo_id"
                        // onChange={props.handleChange('dojo_id')}
                        >
                            {/* placeholder for db */}
                            {['Minnesota', 'Iowa', 'Indiana'].map((dojo, id) => {
                                return (
                                    <MenuItem key={id} value={id}>{dojo}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>


            <Grid container>
                <Grid item>
                    <TextField
                        label="Years Practiced"
                        variant="outlined"
                        name="years_practice"
                        onChange={props.handleChange('years_practice')}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        margin="dense"
                        variant="outlined"
                        name="date_began_kyudo"
                        type="date"
                        helperText="Date you began Kyudo"
                        onChange={props.handleChange('date_began_kyudo')}
                    />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item>
                    <FormControl
                        className={classes.formControl}
                        variant="outlined"
                    >
                        <InputLabel>Current Kyudo Rank</InputLabel>
                        <Select
                            label="Current Kyudo Rank"
                            name="student_rank"
                            onChange={props.handleChange('student_rank')}
                        >
                            {ranks.map((rank, id) => {
                                return (
                                    <MenuItem key={id} value={rank}>{rank}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <TextField
                        margin="dense"
                        variant="outlined"
                        name="date_student_rank"
                        type="date"
                        helperText="Date reached current rank"
                        onChange={props.handleChange('date_student_rank')}
                    />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item>
                    <FormControl
                        className={classes.formControl}
                        variant="outlined"
                    >
                        <InputLabel>Current Teaching Rank</InputLabel>
                        <Select
                            label="Current Teaching Rank"
                            name="teaching_rank"
                            onChange={props.handleChange('teaching_rank')}
                        >
                            {['Renshi', 'Kyoshi', 'Hanshi'].map((rank, id) => {
                                return (
                                    <MenuItem key={id} value={rank}>{rank}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <TextField
                        margin="dense"
                        variant="outlined"
                        name="date_teacher_rank"
                        type="date"
                        helperText="Date reached current rank"
                        onChange={props.handleChange('date_teacher_rank')}
                    />
                </Grid>
            </Grid>
            <Grid container justify="space-evenly">
                <Grid item>
                    <TextField
                        label="IKYF Number"
                        margin="dense"
                        variant="outlined"
                        name="ikyf"
                        onChange={props.handleChange('ikyf')}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="USA Archery Number"
                        margin="dense"
                        variant="outlined"
                        name="usa_archery_id"
                        onChange={props.handleChange('usa_archery_id')}
                    />
                </Grid>

            </Grid>


        </div>
    );
}

export default connect(mapStoreToProps)(NewUserKyudoInfo);
