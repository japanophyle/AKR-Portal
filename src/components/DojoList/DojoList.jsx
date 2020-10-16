import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import DojoListItem from '../DojoListItem/DojoListItem.jsx'
import { Typography, Grid, Paper, Table, TableContainer, TableCell, TableRow, TableHead, TableBody } from '@material-ui/core';
import CreateDojoDialog from '../CreateDojo/CreateDojoDialog';


class DojoList extends Component {
    state = {
        dojoList: [],
    };

  componentDidMount() {
    this.props.dispatch({ type: 'GET_DOJOS'})
  }

  render() {
    return (
        <Grid container justify="center" alignItems="center">
             <Grid item xs={12} align="center">
                <CreateDojoDialog />
            </Grid>
            <Grid xs={6} item>
                <h1 align="center">National Dojo List</h1>
                <Paper className="papertable">
                    
                    <TableContainer className="table">
                        <Table stickyHeader>
                            <TableHead >
                                <TableRow >
                                    <TableCell><Typography>Dojo</Typography></TableCell>
                                    <TableCell><Typography>Region</Typography></TableCell>
                                    <TableCell><Typography>Actions</Typography></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.store.dojos.map((dojo) => {
                                    return (
                                        <DojoListItem key={dojo.id} dojo={dojo}/>
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

export default connect(mapStoreToProps)(DojoList);
