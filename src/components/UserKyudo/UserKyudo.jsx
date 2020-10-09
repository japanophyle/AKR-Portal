import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { MenuItem, Select, InputLabel, FormControl, Typography, Button, Card, CardContent, Grid, TextField, Tooltip, IconButton } from '@material-ui/core';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';

// dialog for save success
import EditInfoSuccessDialog from '../EditInfoSuccessDialog/EditIntoSuccessDialog'

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
    const [moreEdit, toggleMoreEdit] = useState(true);
    const [teacherEdit, toggleTeacher] = useState(true);

    // functions used to toggle edit and non edit views
    const handleDateChange = (date) => {
        toggleNameEdit(!nameEdit);
    };
    const handleMoreChange = (date) => {
        toggleMoreEdit(!moreEdit);
    };
    const handleTeacherChange = (date) => {
        toggleTeacher(!teacherEdit);
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
    // cancel button resets the reducers 
    const handleDateReset = (event) => {
        console.log('cancel')
        props.dispatch(
            {
                type: 'FETCH_USER_INFO',
                payload: props.id
            });
            toggleNameEdit(true)
            toggleMoreEdit(true)
            toggleTeacher(true)
    }

    // when the save button is click it will trigger a saga to start a PUT request using editInfo reducer 
    const handleSaveEdit = (event) => {
        console.log(props.store.editInfo);
        props.dispatch(
            {
                type: 'UPDATE_USER_DATA',
                payload: props.store.editInfo
            })
            toggleNameEdit(true)
            toggleMoreEdit(true)
            toggleTeacher(true)
    };

    return (
        <div>
            {/* IF the state is true this a just a view of information */}
            {nameEdit ?
                <Card>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={11}>
                                <h1>Kyudo Student Rank</h1>
                            </Grid>
                            <Grid item xs={1}>
                                <Tooltip title="Edit">
                                    <IconButton  onClick={handleDateChange} >
                                        <EditIcon fontSize="large" color="primary"/>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                        <Typography variant="h6">
                            Current Student Rank: {props.store.info.student_rank}
                            <br />
                            Date Reached:{moment(props.store.info.date_student_rank).format('MM-DD-YYYY')}
                            
                            
                        </Typography>
                    </CardContent>
                </Card>
                :
                <Card>
                    {/* IF the state is FALSE this You can edit */}
                    <form  onSubmit={handleSaveEdit} >
                    <CardContent>
                        <Grid container>
                            <Grid item xs={11}>
                                <h1>Kyudo Student Rank</h1>
                            </Grid>
                            <Grid item xs={1}>
                                {/* THis button will dispatch all changed to the PUT saga/reducer */}
                                <EditInfoSuccessDialog handleDateChange={handleDateChange}/>
                                {/* cancel will turn the values in the edit reducer back to original info reducer */}
                                <Button onClick={handleDateReset}>Cancel</Button>
                            </Grid>
                        </Grid>
                        <Typography variant="h6">
                            {/* Student rank */}
                            <FormControl variant="outlined">
                                <InputLabel>Kyudo Student Rank</InputLabel>
                                <Select
                                    width="50px"
                                    id="student_rank"
                                    name="student_rank"
                                    label="Current Kyudo Rank"
                                    defaultValue={props.store.info.student_rank}
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
                                
                                id="date_student_rank"
                                label="Date Earned"
                                defaultValue={moment(props.store.info.date_student_rank).format('YYYY-MM-DD')}
                                variant="outlined"
                                onChange={handleEditChange}
                            />
                        
                        </Typography>
                    </CardContent>
                    </form>
                </Card>
            }

            {teacherEdit ?
                <Card>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={11}>
                                <h1>Kyudo Teaching Rank</h1>
                            </Grid>
                            <Grid item xs={1}>
                                <Tooltip title="Edit">
                                    <IconButton  onClick={handleTeacherChange} >
                                        <EditIcon fontSize="large" color="primary"/>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                        <Typography variant="h6">
                          
                            Current Teacher Rank: {props.store.info.teaching_rank}
                            <br />
                            Date Reached: {moment(props.store.info.date_teaching_rank).format('MM-DD-YYYY')}
                            
                        </Typography>
                    </CardContent>
                </Card>
                :
                <Card>
                    {/* IF the state is FALSE this You can edit */}
                    <form  onSubmit={handleSaveEdit} >
                    <CardContent>
                        <Grid container>
                            <Grid item xs={11}>
                                <h1>Kyudo Teaching Rank</h1>
                            </Grid>
                            <Grid item xs={1}>
                                {/* THis button will dispatch all changed to the PUT saga/reducer */}
                                <EditInfoSuccessDialog handleDateChange={handleDateChange}/>
                                {/* cancel will turn the values in the edit reducer back to original info reducer */}
                                <Button onClick={handleDateReset}>Cancel</Button>
                            </Grid>
                        </Grid>
                        <Typography variant="h6">
                            
                            {/* teacher rank */}
                            <FormControl variant="outlined" >
                                <InputLabel>Teaching Rank</InputLabel>
                                <Select
                                    id="teaching_rank"
                                    label="Teaching Rank"
                                    name="teaching_rank"
                                    width="70px"
                                    defaultValue={props.store.info.teaching_rank}
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
                                
                                id="date_teaching_rank"
                                label="Date Earned"
                                defaultValue={moment(props.store.info.date_teaching_rank).format('YYYY-MM-DD')}
                                variant="outlined"
                                onChange={handleEditChange}
                            />
                            
                        </Typography>
                    </CardContent>
                    </form>
                </Card>
            }
            {moreEdit ?
                <Card>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={11}>
                                <h1>More Kyudo Information</h1>
                            </Grid>
                            <Grid item xs={1}>
                                <Tooltip title="Edit">
                                    <IconButton  onClick={handleMoreChange} >
                                        <EditIcon fontSize="large" color="primary"/>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                        <Typography variant="h6">
                            
                            Years Practiced: {props.store.info.years_practice}
                            <br />
                            Date Began Kyudo: {moment(props.store.info.date_began_kyudo).format('MM-DD-YYYY')}
                            <br />

                            {/* rank history goes here */}

                            IKYF Member Number: {props.store.info.ikyf}
                            <br />
                            USA Archery Member ID: {props.store.info.usa_archery_id}
                        </Typography>
                    </CardContent>
                </Card>
                :
                <Card>
                    {/* IF the state is FALSE this You can edit */}
                    <form  onSubmit={handleSaveEdit} >
                    <CardContent>
                        <Grid container>
                            <Grid item xs={11}>
                                <h1>More Kyudo Information</h1>
                            </Grid>
                            <Grid item xs={1}>
                                {/* THis button will dispatch all changed to the PUT saga/reducer */}
                                <EditInfoSuccessDialog handleDateChange={handleMoreChange}/>
                                {/* cancel will turn the values in the edit reducer back to original info reducer */}
                                <Button onClick={handleDateReset}>Cancel</Button>
                            </Grid>
                        </Grid>
                        <Typography variant="h6">
                            {/* years of practice */}
                            <TextField
                                
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
                                
                                id="usa_archery_id"
                                label="USA archery Number"
                                defaultValue={props.store.info.usa_archery_id}
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
export default connect(mapStoreToProps)(UserKyudo);
