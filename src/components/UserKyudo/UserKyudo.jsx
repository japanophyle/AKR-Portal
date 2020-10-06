import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { MenuItem, Select, InputLabel, FormControl, Typography, Button, Card, CardContent, Grid, TextField } from '@material-ui/core';
import moment from 'moment';

// LIST OF ALL STUDENT RANKS FOR SELECT BELOW 
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
// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function UserKyudo(props) {

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

    // function FOR SELECTS ONLY (Since needs name not id)
    //that dispatches to the edit reducer whenever an edit is made to an input
    const name = (event) => {
        console.log(`Handle change of ${event.target.name}`);
        props.dispatch(
            {
                type: 'SET_EDIT',
                payload: { key: event.target.name, value: event.target.value }
            });
    }

    return (
        <div>
            {/* IF the state is true this a just a view of information */}
            {nameEdit ?
                <Card>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={11}>
                                <h1>Kyudo Information</h1>
                            </Grid>
                            <Grid item xs={1}>
                                <Button onClick={handleDateChange}>Edit</Button>
                            </Grid>
                        </Grid>
                        <Typography variant="h6">
                            Current Student Rank: {props.store.info.student_rank}
                            <br/>
                            Date Reached:{moment(props.store.info.date_student_rank).format('MM-DD-YYYY')}
                            <br/>
                            Current Teacher Rank: {props.store.info.teacher_rank}
                            <br/>
                            Date Reached: {moment(props.store.info.date_teacher_rank).format('MM-DD-YYYY')}
                            <br/>
                            Years Practiced: {props.store.info.years_practice}
                            <br/>
                            Date Began Kyudo: {moment(props.store.info.date_began_kyudo).format('MM-DD-YYYY')}
                            <br/>

                            {/* rank history goes here */}

                            IKYF Member Number: {props.store.info.ikyf}
                            <br/>
                            USA Archery Member ID: {props.store.info.usa_archery_id}
                        </Typography>
                    </CardContent>
                </Card>
                :
                <Card>
                    {/* IF the state is FALSE this You can edit */}
                    <CardContent>
                        <Grid container>
                            <Grid item xs={11}>
                                <h1>Kyudo Information</h1>
                            </Grid>
                            <Grid item xs={1}>
                                {/* THis button will dispatch all changed to the PUT saga/reducer */}
                                <Button onClick={handleDateChange}>Save</Button>
                                {/* cancel will turn the values in the edit reducer back to original info reducer */}
                                <Button onClick={handleDateChange}>Cancel</Button>
                            </Grid>
                        </Grid>
                        <Typography variant="h6">
                            {/* Student rank */}
                            <FormControl variant="outlined">
                                <InputLabel>Current Kyudo Rank</InputLabel>
                                <Select
                                    id="student_rank"
                                    name="student_rank"
                                    label="Current Kyudo Rank"
                                    onChange={(event) => name(event)}
                                >
                                    {ranks.map((rank, id) => {
                                        return (
                                            <MenuItem key={id} value={rank}>{rank}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            <br />
                            <br />
                            {/* date got student rank */}
                            <TextField
                                type='Date'
                                required
                                id="date_student_rank"
                                label="Date Earned"
                                defaultValue={moment(props.store.info.date_student_rank).format('YYYY-MM-DD')}
                                variant="outlined"
                                onChange={handleEditChange}
                            />
                            <br />
                            <br />
                            {/* teacher rank */}
                            <FormControl variant="outlined" >
                                <InputLabel>Current Teaching Rank</InputLabel>
                                <Select
                                    id="teacher_rank"
                                    label="Current Teaching Rank"
                                    name="teacher_rank"
                                    onChange={(event) => name(event)}
                                >
                                    {['Renshi', 'Kyoshi', 'Hanshi'].map((rank, id) => {
                                        return (
                                            <MenuItem key={id} value={rank}>{rank}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            <br />
                            <br />
                            {/* date of teacher rank */}
                            <TextField
                                type='Date'
                                required
                                id="date_teacher_rank"
                                label="Date Earned"
                                defaultValue={moment(props.store.info.date_teacher_rank).format('YYYY-MM-DD')}
                                variant="outlined"
                                onChange={handleEditChange}
                            />
                            <br />
                            <br />
                            {/* years of practice */}
                            <TextField
                                required
                                id="years_practice"
                                label="Years of Practice"
                                defaultValue={props.store.info.years_practice}
                                variant="outlined"
                                onChange={handleEditChange}
                            />
                            <br />
                            <br />
                            {/* date kyudo started for you, why did i phrase it like that ... */}
                            <TextField
                                type='Date'
                                required
                                id="date_began_kyudo"
                                label="Date Began Kyudo"
                                defaultValue={moment(props.store.info.date_began_kyudo).format('YYYY-MM-DD')}
                                variant="outlined"
                                onChange={handleEditChange}
                            />
                            <br />
                            <br />
                            {/* IKYF NUMBER */}
                            <TextField
                                required
                                id="ikyf"
                                label="IKFY Number"
                                defaultValue={props.store.info.ikyf}
                                variant="outlined"
                                onChange={handleEditChange}
                            />
                            <br />
                            <br />
                            {/* USA archery Number */}
                            <TextField
                                required
                                id="usa_archery_id"
                                label="USA archery Number"
                                defaultValue={props.store.info.usa_archery_id}
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
export default connect(mapStoreToProps)(UserKyudo);
