import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Tooltip, IconButton, TableCell, TableRow } from '@material-ui/core';
import LaunchIcon from '@material-ui/icons/Launch';
import { withRouter } from "react-router";
import DojoDeleteDialog from '../DojoDeleteDialog/DojoDeleteDialog.jsx';

class DojoListItem extends Component {
  state = {
  };


  deleteDojo = (id) => {
    this.props.dispatch({ type: 'REMOVE_DOJO', payload: id})
  }


  manageDojo = (id) => {
    console.log('Route to individual dojo view;', id);
    this.props.history.push(`/memberlist/${id}`)
  }

  render() {

    return (
      <TableRow>
        <TableCell>{this.props.dojo.dojo_name}</TableCell>
        <TableCell>{this.props.dojo.region_name}</TableCell>
        <TableCell>
          <Tooltip title={<h1>Manage</h1>} >
            <IconButton onClick={() => this.manageDojo(this.props.dojo.id)} >
              <LaunchIcon color="primary" />
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell>

          {/* <Tooltip title={<h1>Delete</h1>} >
            <IconButton onClick={() => this.deleteDojo(this.props.dojo.id)} >
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip> */}
          <DojoDeleteDialog dojo={this.props.dojo} deleteDojo={this.deleteDojo}/>
        </TableCell>
      </TableRow>
    )

  }
}

const DojoListItemWithRouter = withRouter(DojoListItem);

export default connect(mapStoreToProps)(DojoListItemWithRouter);
