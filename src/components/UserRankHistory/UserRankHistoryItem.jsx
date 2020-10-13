import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import swal from '@sweetalert/with-react';
import { Tooltip, IconButton, TableCell, TableRow } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { withRouter } from "react-router";
import moment from 'moment';

class UserRankHistoryItem extends Component {
  state = {
  };


  deleteRank = (id) => {
    swal({
        title: "Are you sure?",
        text: `${this.props.rank.rank_name} will be removed!`,
        icon: "warning",
        buttons: true,
    }).then((toDelete) => {
        if (toDelete) {
            swal(`${this.props.rank.rank_name} has been removed!`, {
                icon: "success",
            });
            this.props.dispatch({ type: 'REMOVE_RANK', payload: id})
        } else {
            swal(`${this.props.rank.rank_name} was not removed!`);
        }
    })
  }

  render() {
      return (
        <TableRow>
            <TableCell>{this.props.rank.rank_name}</TableCell>
            <TableCell>{moment(this.props.rank.date_rank_made).format('MM-DD-YYYY')}</TableCell>
            <TableCell>
              <Tooltip title="Delete" >
                <IconButton onClick={() => this.deleteRank(this.props.rank.id)} >
                    <DeleteIcon color="error" /> 
                </IconButton>
              </Tooltip>
            </TableCell>
        </TableRow>
      )
  }
}

const UserRankHistoryItemWithRouter = withRouter(UserRankHistoryItem);

export default connect(mapStoreToProps)(UserRankHistoryItemWithRouter);
