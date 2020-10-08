import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import ActiveMembers from './ActiveMembers';
import InactiveMembers from './InactiveMembers';

import { Grid } from '@material-ui/core';



function MemberList(props) {

  const [activeHeading, setActiveHeading] = useState('Current Members');
  const [inactiveHeading, setInactiveHeading] = useState('Non-Active Members');

  //get active members by dojo id

  useEffect(() => {
    const id = props.match.params.id
    props.dispatch({ type: 'GET_ACTIVE_USERS', payload: id })

  }, [])


  // get inactive members by dojo id

  useEffect(() => {
    const id = props.match.params.id
      props.dispatch({ type: 'GET_INACTIVE_USERS', payload: id })

  }, [])



  return (
    <div>
      <Grid container justify="center">
        <Grid item>
          <h3>{activeHeading}</h3>

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

export default connect(mapStoreToProps)(MemberList);