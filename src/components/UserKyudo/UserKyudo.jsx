import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { MenuItem, Select, InputLabel, FormControl, Typography, Button, Container, Card, CardContent, Grid, TextField } from '@material-ui/core';
import moment from 'moment';

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
// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function UserKyudo(props) {
    // Using hooks we're creating local state for a "heading" variable with
    // a default value of 'Functional Component'
    const [nameEdit, toggleNameEdit] = useState(true);

    const handleDateChange = (date) => {
        toggleNameEdit(!nameEdit);
    };

    const handleEditChange = (event) => {
        console.log(`Handle change of ${event.target.id}`);
        props.dispatch(
            {
                type: 'SET_EDIT',
                payload: { key: event.target.id, value: event.target.value }
            });
    }

    return (
        <div>
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
                            <Typography>
                                <h3>Current Student Rank: {props.store.info.student_rank}</h3>
                                <h3>Date Reached:{moment(props.store.info.date_student_rank).format('YYYY-MM-DD')}</h3>
                                <h3>Current Teacher Rank: {props.store.info.teacher_rank}</h3>
                                <h3>Date Reached: {moment(props.store.info.date_teacher_rank).format('YYYY-MM-DD')}</h3>
                                <h3>Years Practiced: {props.store.info.years_practice}</h3>
                                <h3>Date Began Kyudo: {moment(props.store.info.date_began_kyudo).format('YYYY-MM-DD')}</h3>

                                {/* rank history goes here */}

                                <h3>IKYF Member Number: {props.store.info.ikyf}</h3>
                                <h3>USA Archery Member ID: {props.store.info.usa_archery_id}</h3>
                            </Typography>
                        </CardContent>
                    </Card>
                    :
                    <Card>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={11}>
                                    <h1>Kyudo Information</h1>
                                </Grid>
                                <Grid item xs={1}>
                                    <Button onClick={handleDateChange}>Save</Button>
                                    <Button onClick={handleDateChange}>Cancel</Button>
                                </Grid>
                            </Grid>
                            <Typography>
                                <FormControl
                                    variant="outlined"
                                >
                                    <InputLabel>Current Kyudo Rank</InputLabel>
                                    <Select
                                        id="student_rank"
                                        label="Current Kyudo Rank"
                                        defaultValue={props.store.info.student_rank}
                                    >
                                        {ranks.map((rank, id) => {
                                            return (
                                                <MenuItem key={id}>{rank}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                                <br />
                                <br />
                                <TextField
                                    type='Date'
                                    required
                                    id="student_rank"
                                    label="Date Earned"
                                    defaultValue={moment(props.store.info.date_student_rank).format('YYYY-MM-DD')}
                                    variant="outlined"
                                    onChange={handleEditChange}
                                />
                                <br />
                                <br />
                                <FormControl variant="outlined" >
                                    <InputLabel>Current Teaching Rank</InputLabel>
                                    <Select
                                        id="teacher_rank"
                                        label="Current Teaching Rank"
                                        defaultValue="Renshi"
                                    >
                                        {['Renshi', 'Kyoshi', 'Hanshi'].map((rank, id) => {
                                            return (
                                                <MenuItem key={id}>{rank}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                                <br />
                                <br />
                                <TextField
                                    type='Date'
                                    required
                                    id="date_of_birth"
                                    label="Date Earned"
                                    defaultValue={moment(props.store.info.date_teacher_rank).format('YYYY-MM-DD')}
                                    variant="outlined"
                                    onChange={handleEditChange}
                                />
                                <br />
                                <br />
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
