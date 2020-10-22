import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { MenuItem, Select, InputLabel, FormControl, Typography, Button, Card, CardContent, Grid, TextField, Tooltip, IconButton } from '@material-ui/core';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import TimelineIcon from '@material-ui/icons/Timeline';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import UserRankHistory from '../UserRankHistory/UserRankHistory.jsx'

// dialog for save success
import KyudoSuccess from '../EditInfoSuccessDialog/KyudoSuccess'

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


function UserKyudo(props) {

    // State used to toggle the edit button on and off
    const [nameEdit, toggleNameEdit] = useState(true);
    const [moreEdit, toggleMoreEdit] = useState(true);
    const [teacherEdit, toggleTeacher] = useState(true);
    const [historyEdit, toggleHistory] = useState(true);

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
    const handleHistoryChange = () => {
        toggleHistory(!historyEdit);
    };

    // function that dispatches to the edit reducer whenever an edit is made to an input
    const handleEditChange = (event) => {

        props.dispatch(
            {
                type: 'SET_EDIT',
                payload: { key: event.target.id, value: event.target.value }
            });
    }

    // function FOR SELECTS ONLY (Since needs name not id)
    //that dispatches to the edit reducer whenever an edit is made to an input
    const name = (event) => {

        props.dispatch(
            {
                type: 'SET_EDIT',
                payload: { key: event.target.name, value: event.target.value }
            });
    }
    // cancel button resets the reducers 
    const handleDateReset = (event) => {

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
        event.preventDefault()

        props.dispatch(
            {
                type: 'UPDATE_USER_DATA',
                payload: props.store.editInfo
            })
    };

    const submitRankHistory = (event) => {
        props.dispatch(
            {
                type: 'ADD_RANK',
                payload:  props.store.editInfo 
            })
            toggleNameEdit(true)
            toggleMoreEdit(true)
            toggleTeacher(true)

    }

    return (
        <div>
            {/* IF the state is true this a just a view of information */}
            {nameEdit ?
                <Card style={{margin:5, backgroundColor:"#ECE7D1"}}>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={11}>
                                <h1>Kyudo Rank</h1>
                            </Grid>
                            <Grid item xs={1}>
                                <Tooltip title={<h1>Edit</h1>}>
                                    <IconButton  onClick={handleDateChange} >
                                        <EditIcon fontSize="large" color="secondary"/>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                        <Typography variant="h5">
                            Current Rank: {props.store.info.student_rank}
                            <br />
                            Date Reached: {moment(props.store.info.date_student_rank).format('MM-DD-YYYY')}
                            
                            
                        </Typography>
                        {historyEdit ?
                            <Tooltip title={<h1>Show Rank History</h1>}>
                                <IconButton  onClick={handleHistoryChange} >
                                    <TimelineIcon fontSize="large" color="primary"/>
                                </IconButton>
                            </Tooltip>
                        :
                            <>
                            <Tooltip title={<h1>Hide Rank History</h1>}>
                                <IconButton  onClick={handleHistoryChange} >
                                    <VisibilityOffIcon fontSize="large" color="primary"/>
                                </IconButton>
                            </Tooltip>
                            <UserRankHistory />
                            </>
                        }
                    </CardContent>
                </Card>
                :
                <Card style={{margin:5, backgroundColor:"#ECE7D1"}}>
                    {/* IF the state is FALSE this You can edit */}
                    <form  onSubmit={submitRankHistory} >
                    <CardContent>
                        <Grid container>
                            <Grid item xs={11}>
                                <h1>Kyudo Student Rank</h1>
                            </Grid>
                            <Grid item xs={1}>
                                {/* THis button will dispatch all changed to the PUT saga/reducer */}
                                <KyudoSuccess handleDateChange={handleDateChange} toggleNameEdit={toggleNameEdit} toggleMoreEdit={toggleMoreEdit} toggleTeacher={toggleTeacher}/>
                                {/* cancel will turn the values in the edit reducer back to original info reducer */}
                                <Button onClick={handleDateReset}
                                style={{margin:5}}
                                >Cancel</Button>
                            </Grid>
                        </Grid>
                        <Typography variant="h5">
                            {/* Student rank */}
                            <FormControl variant="outlined">
                                <InputLabel color="secondary">Kyudo Rank</InputLabel>
                                <Select
                                    style={{ minWidth: 200 }}
                                    id="student_rank"
                                    name="student_rank"
                                    label="Current Kyudo Rank"
                                    value={props.store.editInfo.student_rank}
                                    onChange={(event) => name(event)}
                                    color="secondary"
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
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                defaultValue={moment(props.store.info.date_student_rank).format('YYYY-MM-DD')}
                                variant="outlined"
                                onChange={handleEditChange}
                                color="secondary"
                            />
                        
                        </Typography>
                        {historyEdit ?
                            <Tooltip title={<h1>Show Rank History</h1>}>
                                <IconButton  onClick={handleHistoryChange} >
                                    <TimelineIcon fontSize="large" color="primary"/>
                                </IconButton>
                            </Tooltip>
                        :
                            <>
                            <Tooltip title="Hide Rank History">
                                <IconButton  onClick={handleHistoryChange} >
                                    <VisibilityOffIcon fontSize="large" color="primary"/>
                                </IconButton>
                            </Tooltip>
                            <UserRankHistory />
                            </>
                        }
                    </CardContent>
                    </form>
                </Card>
            }

            {teacherEdit ?
                <Card style={{margin:5, backgroundColor:"#ECE7D1"}}>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={11}>
                                <h1>Kyudo Teaching Rank</h1>
                            </Grid>
                           
                            <Grid item xs={1}>
                                <Tooltip title={<h1>Edit</h1>}>
                                    <IconButton  onClick={handleTeacherChange} >
                                        <EditIcon fontSize="large" color="secondary"/>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                        {props.store.editInfo.teaching_rank === null || props.store.editInfo.teaching_rank === '' ?
                            <Typography variant="h5">
                          
                            No Teaching Rank Currently
                            
                        </Typography>
                            :
                            <Typography variant="h5">
                          
                            Teaching Rank: {props.store.info.teaching_rank}
                            <br />
                            Date Reached: {moment(props.store.info.date_teaching_rank).format('MM-DD-YYYY')}
                            
                        </Typography>
                            }
                        
                    </CardContent>
                </Card>
                :
                <Card style={{margin:5, backgroundColor:"#ECE7D1"}}>
                    {/* IF the state is FALSE this You can edit */}
                    <form  onSubmit={handleSaveEdit} >
                    <CardContent>
                        <Grid container>
                            <Grid item xs={11}>
                                <h1>Kyudo Teaching Rank</h1>
                            </Grid>
                            <Grid item xs={1}>
                                {/* THis button will dispatch all changed to the PUT saga/reducer */}
                                <KyudoSuccess handleDateChange={handleDateChange} toggleNameEdit={toggleNameEdit} toggleMoreEdit={toggleMoreEdit} toggleTeacher={toggleTeacher}/>
                                {/* cancel will turn the values in the edit reducer back to original info reducer */}
                                <Button onClick={handleDateReset}
                                style={{margin:5}}
                                >Cancel</Button>
                            </Grid>
                        </Grid>
                        <Typography variant="h5">
                            
                            {/* teacher rank */}
                            <FormControl variant="outlined" >
                                <InputLabel color="secondary">Teaching Rank</InputLabel>
                                <Select
                                    id="teaching_rank"
                                    label="Teaching Rank"
                                    name="teaching_rank"
                                    style={{ minWidth: 200 }}
                                    value={props.store.editInfo.teaching_rank}
                                    onChange={(event) => name(event)}
                                    color="secondary"
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
                                style={{ minwidth: 200}}
                                id="date_teaching_rank"
                                label="Date Earned"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                defaultValue={moment(props.store.info.date_teaching_rank).format('YYYY-MM-DD')}
                                variant="outlined"
                                onChange={handleEditChange}
                                color="secondary"
                            />
                            
                        </Typography>
                    </CardContent>
                    </form>
                </Card>
            }
            {moreEdit ?
                <Card style={{margin:5, backgroundColor:"#ECE7D1"}}>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={11}>
                                <h1>More Kyudo Information</h1>
                            </Grid>
                            <Grid item xs={1}>
                                <Tooltip title={<h1>Edit</h1>}>
                                    <IconButton  onClick={handleMoreChange} >
                                        <EditIcon fontSize="large" color="secondary"/>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                        <Typography variant="h5">
                            
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
                <Card style={{margin:5, backgroundColor:"#ECE7D1"}}>
                    {/* IF the state is FALSE this You can edit */}
                    <form  onSubmit={handleSaveEdit} >
                    <CardContent>
                        <Grid container>
                            <Grid item xs={11}>
                                <h1>More Kyudo Information</h1>
                            </Grid>
                            <Grid item xs={1}>
                                {/* THis button will dispatch all changed to the PUT saga/reducer */}
                                <KyudoSuccess handleDateChange={handleDateChange} toggleNameEdit={toggleNameEdit} toggleMoreEdit={toggleMoreEdit} toggleTeacher={toggleTeacher}/>
                                {/* cancel will turn the values in the edit reducer back to original info reducer */}
                                <Button onClick={handleDateReset}
                                style={{margin:5}}
                                >Cancel</Button>
                            </Grid>
                        </Grid>
                        <Typography variant="h5">
                            {/* years of practice */}
                            <TextField
                                
                                id="years_practice"
                                label="Years of Practice"
                                defaultValue={props.store.info.years_practice}
                                variant="outlined"
                                onChange={handleEditChange}
                                color="secondary"
                            />
                            <br />
                            <br />
                            {/* date kyudo started for you, why did i phrase it like that ... */}
                            <TextField
                                type='Date'
                                
                                id="date_began_kyudo"
                                label="Date Began Kyudo"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                defaultValue={moment(props.store.info.date_began_kyudo).format('YYYY-MM-DD')}
                                variant="outlined"
                                onChange={handleEditChange}
                                color="secondary"
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
                                color="secondary"
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
                                color="secondary"
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
