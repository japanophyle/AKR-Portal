import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import swal from '@sweetalert/with-react';
import { TextField, Tooltip, IconButton, TableCell, TableRow } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';

class DojoListItem extends Component {
  state = {
  };


  deleteDojo = (id) => {
    swal({
        title: "Are you sure?",
        text: `${this.props.dojo.dojo_name} will be removed!`,
        icon: "warning",
        buttons: true,
    }).then((toDelete) => {
        if (toDelete) {
            swal(`${this.props.dojo.dojo_name} has been removed!`, {
                icon: "success",
            });
            this.props.dispatch({ type: 'REMOVE_DOJO', payload: id})
        } else {
            swal(`${this.props.dojo.dojo_name} was not removed!`);
        }
    })
  }


  manageDojo = (id) => {
    console.log('Route to individual dojo view;', id);
  }

  render() {
      return (
        <TableRow>
            <TableCell>{this.props.dojo.dojo_name}</TableCell>
            <TableCell>{this.props.dojo.region_name}</TableCell>
            <TableCell>
              <Tooltip title="Manage" >
                <IconButton onClick={() => this.manageDojo(this.props.dojo.id)} >
                    <LaunchIcon color="primary" /> 
                </IconButton>
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip title="Delete" >
                <IconButton onClick={() => this.deleteDojo(this.props.dojo.id)} >
                    <DeleteIcon fontSize="medium" color="error" /> 
                </IconButton>
              </Tooltip>
            </TableCell>
        </TableRow>
      )
  }
}

export default connect(mapStoreToProps)(DojoListItem);
