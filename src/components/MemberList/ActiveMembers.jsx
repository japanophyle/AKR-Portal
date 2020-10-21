import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';

//MATERIAL-UI
import ViewListIcon from '@material-ui/icons/ViewList';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Tooltip,
    Grid,
    Button,
} from '@material-ui/core';

// IMPORT DIALOG
import NotesDialog from '../StudentNotes/StudentNotes'
import DeactivateDialog from '../DeactivateDialog/DeactivateDialog'
import AuthSelect from '../AuthSelect/AuthSelect'

// styles for table cells
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.highlight.dark,
        color: theme.palette.primary.light,
    },
    body: {
        fontSize: 14,
        padding: 8,
    },

}))(TableCell);

// styling every other table row
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.highlight.main,
        },
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.highlight.light,
        },

    },

}))(TableRow);

// setting styles for table
const useStyles = makeStyles({
    table: {
        maxWidth: '90%',
        marginBottom: 70,
    },
});

function ActiveMembers(props) {


    // function to deactivate a user
    const handleDeactivateMember = (member) => {
        props.dispatch({ type: 'DEACTIVATE_USER', payload: member })
    }

    const deleteUser = (member) => {
        props.dispatch({ type: 'DELETE_USER', payload: member })
    }

    const classes = useStyles();

    return (
        <div>
            <Grid container justify="center" alignItems="center">
                <Grid item xs={12} align="center">
                    <TableContainer component={Paper} className={classes.table}>
                        <Table aria-label="customized table" >
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Name</StyledTableCell>
                                    <StyledTableCell align="center">Rank</StyledTableCell>
                                    <StyledTableCell align="center">Role</StyledTableCell>
                                    <StyledTableCell align="center">Dues</StyledTableCell>
                                    <StyledTableCell align="center">Dues Paydate</StyledTableCell>
                                    <StyledTableCell align="center">Status</StyledTableCell>
                                    <StyledTableCell align="center">More</StyledTableCell>
                                    <StyledTableCell align="center">Notes</StyledTableCell>
                                    {props.store.user.auth_level >= 20 &&
                                        <StyledTableCell align="center">Remove</StyledTableCell>
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.store.members.activeMembersReducer.map((member, id) => {
                                    return (
                                        <StyledTableRow hover component="tr" scope="row" key={id}>
                                            <StyledTableCell align="center">{member.fname} {member.lname}</StyledTableCell>
                                            <StyledTableCell align="center">{member.teaching_rank ? member.teaching_rank : member.student_rank}</StyledTableCell>

                                            <StyledTableCell align="center">
                                                <AuthSelect member={member} />
                                            </StyledTableCell>

                                            <StyledTableCell align="center">{member.dues_amount}</StyledTableCell>
                                            <StyledTableCell align="center">{member.dues_date && moment(member.dues_date).format('ll')}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {member.auth_level > 0 &&
                                                    <>
                                                        <DeactivateDialog handleDeactivateMember={handleDeactivateMember} member={member} />
                                                    </>
                                                }
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Tooltip title={<h1>Member Details</h1>} >
                                                    <IconButton color="secondary" component={Link} to={`/user/${member.user_id}`} >
                                                        <ViewListIcon></ViewListIcon>
                                                    </IconButton>
                                                </Tooltip>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">

                                                {/* STUDENT NOTES DIALOG */}
                                                <NotesDialog member={member} id={member.user_id} />

                                                {member.notes || member.equipment_checkout ?
                                                    <Tooltip title={<h1>Instructor Notes</h1>} >
                                                        <IconButton>
                                                            <SpeakerNotesIcon></SpeakerNotesIcon>
                                                        </IconButton>
                                                    </Tooltip>
                                                    :
                                                    ''
                                                }
                                            </StyledTableCell>
                                            {props.store.user.auth_level >= 20 &&
                                                <StyledTableCell align="center">
                                                    <Tooltip title={<h1>Delete User</h1>} >
                                                        <IconButton onClick={() => deleteUser(member)} >
                                                            <DeleteIcon color="error" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </StyledTableCell>
                                            }
                                        </StyledTableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
}

const withRouteActiveMembers = withRouter(ActiveMembers)


export default connect(mapStoreToProps)(withRouteActiveMembers);