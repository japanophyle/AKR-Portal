import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import UserRankHistoryItem from '../UserRankHistory/UserRankHistoryItem.jsx'
import { Typography, Grid, Paper, Table, TableContainer, TableCell, TableRow, TableHead, TableBody } from '@material-ui/core';


class UserRankHistory extends Component {
    state = {
    };

  componentDidMount() {
    this.props.dispatch({ type: 'GET_RANKS', payload: this.props.store.info.user_id})
  }

  render() {
    return (
        <Grid container justify="center" alignItems="center">
            <Grid xs={6} item>
                <Paper className="papertable">
                    <TableContainer className="table">
                        <Table stickyHeader>
                            <TableHead >
                                <TableRow >
                                    <TableCell><Typography>Rank</Typography></TableCell>
                                    <TableCell><Typography>Date Earned</Typography></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.store.ranks.map((rank) => {
                                    return (
                                        <UserRankHistoryItem key={rank.id} rank={rank}/>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        </Grid>
    );
  }
}

export default connect(mapStoreToProps)(UserRankHistory);
