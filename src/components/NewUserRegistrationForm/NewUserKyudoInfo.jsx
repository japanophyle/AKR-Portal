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
    // Sets date for now without breaking when selecting a new date
    const [selectedDate, handleDateChange] = useState(new Date());
    const [selectedRankDate, handleRankDateChange] = useState(new Date());
    const [selectedTeachingRankDate, handleTeachingDateChange] = useState(new Date());


    const classes = useStyles();

    // ranks are mapped over the select menu
    const ranks =
        [
            '(1st Dan) Shodan',
            '(2nd Dan) Nidan',
            '(3rd Dan) Sandan',
            '(4th Dan) Yondan',
            '(5th Dan) Godan',
            '(6th Dan) Rokudan',
            '(7th Dan) Shichidan',
            '(8th Dan) Hachidan',
            '(9th Dan) Kudan',
            '(10th Dan) Judan'
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
                        >
                            {['Minnesota', 'Iowa', 'Indiana'].map((dojo, id) => {
                                return (
                                    <MenuItem key={id}>{dojo}</MenuItem>
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
                        margin="dense"
                        variant="outlined"
                        name="years_practice"
                    />
                </Grid>
                <Grid item>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            required
                            variant="outlined"
                            format="MM/dd/yyyy"
                            margin="normal"
                            name="date_began_kyudo"
                            value={selectedDate}
                            onChange={handleDateChange}
                            helperText="mm/dd/yyyy"
                            label="Start Date"
                        />
                    </MuiPickersUtilsProvider>
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
                        >
                            {ranks.map((rank, id) => {
                                return (
                                    <MenuItem key={id}>{rank}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            required
                            variant="outlined"
                            format="MM/dd/yyyy"
                            margin="normal"
                            name="date_student_rank"
                            value={selectedRankDate}
                            onChange={handleRankDateChange}
                            helperText="mm/dd/yyyy"
                            label="Date Rank Achieved"
                        />
                    </MuiPickersUtilsProvider>
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
                        >
                            {['Renshi', 'Kyoshi', 'Hanshi'].map((rank, id) => {
                                return (
                                    <MenuItem key={id}>{rank}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            required
                            variant="outlined"
                            format="MM/dd/yyyy"
                            margin="normal"
                            name="date_teaching_rank"
                            value={selectedTeachingRankDate}
                            onChange={handleTeachingDateChange}
                            helperText="mm/dd/yyyy"
                            label="Date Rank Achieved"
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
            </Grid>
            <Grid container justify="space-evenly">
                <Grid item>
                    <TextField
                        label="IKYF Number"
                        margin="dense"
                        variant="outlined"
                        name="ikyf"
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="USA Archery Number"
                        margin="dense"
                        variant="outlined"
                        name="usa_archery_id"
                    />
                </Grid>

            </Grid>


        </div>
    );
}

export default connect(mapStoreToProps)(NewUserKyudoInfo);
