import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import ActiveMembers from '../MemberList/ActiveMembers';
import InactiveMembers from '../MemberList/InactiveMembers';

import { Grid, TextField } from '@material-ui/core';
import DojoDues from '../DojoDues/DojoDues';



function NationalStudentList(props) {

  const [activeHeading, setActiveHeading] = useState('Current Members');
  const [inactiveHeading, setInactiveHeading] = useState('Non-Active Members');

  //get active members by dojo id
  useEffect(() => {
    props.dispatch({ type: 'GET_ACTIVE_USERS', payload: 'national' })
    props.dispatch({ type: 'GET_INACTIVE_USERS', payload: 'national' })
  }, [])

  const search = (event) => {
    console.log(event.target.value)
    props.dispatch({type: 'SEARCH', payload: event.target.value})
    }

  return (

    <div>
      <Grid container justify="center">
        <Grid item xs={12} align="center">
          <h3>{activeHeading}</h3>
        </Grid>
        <Grid item xs={12} align="center">
          <DojoDues />
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            style={{margin: "20px"}}
            label="Filter by Name"
            onChange={search}
            variant='outlined'
          />
        </Grid>
      </Grid>

      <ActiveMembers />
      <Grid container justify="center">
        <Grid item>
          <h3>{inactiveHeading}</h3>
        </Grid>
      </Grid>

      <InactiveMembers />
    </div>
  );


}

export default connect(mapStoreToProps)(NationalStudentList);