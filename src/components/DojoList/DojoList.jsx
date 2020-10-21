import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import DojoListItem from '../DojoListItem/DojoListItem.jsx'
import { Typography, Grid, Paper, Table, TableContainer, TableCell, TableRow, TableHead, TableBody } from '@material-ui/core';
import CreateDojoDialog from '../CreateDojo/CreateDojoDialog';
import { withStyles } from '@material-ui/core/styles';

class DojoList extends Component {
    state = {
        dojoList: [],
    };

  componentDidMount() {
    this.props.dispatch({ type: 'GET_DOJOS'})
  }

  render() {
    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
        },
      }))(TableCell);
    return (
        <Grid container justify="center" alignItems="center">
             <Grid item xs={12} align="center">
                <CreateDojoDialog />
            </Grid>
            <Grid item align="center">
            <Typography><h2 align="center" >National Dojo List</h2></Typography>
                <Paper className="papertable" style={{  width: "80%", padding: "20px", backgroundColor: "#945C39"}}>
                    <TableContainer className="table" style={{ backgroundColor:"#ECE7D1"}} >
                        <Table stickyHeader>
                            <TableHead style={{color: "blue"}}>
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
