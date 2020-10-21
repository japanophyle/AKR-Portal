import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter, Link } from 'react-router-dom';



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

// styles for table cells
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

// styling every other table row
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
    
}))(TableRow);

const useStyles = makeStyles({
    table: {
        maxWidth: '50%',
    },
});

function InactiveMembers(props) {


    // function to Activate a user
    const handleActivateUser = (member) => {

        props.dispatch({ type: 'ACTIVATE_USER', payload: member })
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
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Name</StyledTableCell>
                                    <StyledTableCell align="center">Status</StyledTableCell>
                                    <StyledTableCell align="center">More</StyledTableCell>
                                    {props.store.user.auth_level >= 20 &&
                                        <StyledTableCell align="center">Remove</StyledTableCell>
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.store.members.inactiveMembersReducer.map((member, id) => {
                                    return (
                                        <StyledTableRow hover component="tr" scope="row" key={id}>
                                            <StyledTableCell align="center">{member.fname} {member.lname}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {member.auth_level === 0
                                                    ?
                                                    <Button
                                                        onClick={() => handleActivateUser(member)}
                                                    >
                                                        Activate
                                                    </Button>
                                                    : ''}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Tooltip title={<h1>Member Details</h1>} >
                                                    <IconButton component={Link} to={`/user/${member.user_id}`}>
                                                        <ViewListIcon color="secondary"></ViewListIcon>
                                                    </IconButton>
                                                </Tooltip>
                                            </StyledTableCell>
                                            {props.store.user.auth_level >= 20 &&
                                                <StyledTableCell align="center">
                                                    <Tooltip title={<h1>Delete User</h1>}  >
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
const withRouteInactiveMembers = withRouter(InactiveMembers)


export default connect(mapStoreToProps)(withRouteInactiveMembers);