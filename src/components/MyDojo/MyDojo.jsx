import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import {
  Paper,
  Grid,
  Typography
} from '@material-ui/core'


function MyDojo(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const [heading, setHeading] = useState('My Dojo');

  useEffect(() => {
    props.dispatch({
      type: "GET_MY_DOJO"
    });
    props.dispatch({
      type: "FETCH_USER_INFO",
      payload: "user",
    });
  }, [])

  return (
    <div>
      {/* map through our myDojo reducer */}
      <Grid container justify="center" alignItems="center">
        <Grid item xs={8} align="center">
          <Paper 
            elevation={10}
            style={{padding:20, margin:20}}>
              <h2>{heading}</h2>
      {props.store.myDojo.map((member, id) => {
        return (
        <Paper 
          elevation={10}
          style={{padding:20, margin:20}}>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={4} align="left">
                <Typography variant="overline" display="block">
                  {member.fname} {member.lname}
                </Typography>
              </Grid>
              <Grid item xs={4} align="center">
                <Typography variant="overline" display="block">
                  {member.fname_japanese} {member.lname_japanese}
                </Typography>
              </Grid>
              <Grid item xs={4} align="right">
                <Typography variant="overline" display="block">
                  {member.student_rank} {member.teaching_rank}
                </Typography>
              </Grid>
            </Grid>
        </Paper>
        )
      })}
          </Paper>
        </Grid>
      </Grid>

    </div>
  );
}

export default connect(mapStoreToProps)(MyDojo);