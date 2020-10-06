import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//MATERIAL-UI
import {
  Paper,
  Grid,
} from '@material-ui/core';

import NewUserName from './NewUserName';
import NewUserContact from './NewUserContact';
import NewUserPersonal from './NewUserPersonal';
import NewUserAddress from './NewUserAddress';
import NewUserKyudoInfo from './NewUserKyudoInfo';


class NewUserForm extends Component {
  state = {
    heading: 'Class Component',
  };

  render() {
    return (
      <div>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} >
            <Paper style={{ maxWidth: "80%", margin: "auto", padding: "20px"}}>
              <h6 style={{ color: "red"}}>Fields with * are required.</h6>
              <NewUserName />
              <NewUserContact />
              <NewUserPersonal />
              <NewUserAddress />
              <NewUserKyudoInfo />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(NewUserForm);