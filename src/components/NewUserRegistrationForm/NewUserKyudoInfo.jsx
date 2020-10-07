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


const useStyles = makeStyles((theme) => ({
    formControl: {
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
            'Jūdan'
        ]

    return (
        <div>
            <h3>{heading}</h3>

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

            {/* current student rank form */}
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

            {/* teacher rank form */}
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
                        name="date_teaching_rank"
                        type="date"
                        helperText="Date reached current rank"
                        onChange={props.handleChange('date_teaching_rank')}
                    />
                </Grid>
            </Grid>

            {/* Potential information the user might already have.  Given to them from AKR */}
            <Grid container spacing={4}>
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
