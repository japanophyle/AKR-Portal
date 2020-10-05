import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//MATERIAL-UI
import {
  Paper,
  Grid,
} from '@material-ui/core';

import NewUserRegistrationName from './NewUserRegistrationName';
import NewUserRegistrationContact from './NewUserRegistrationContact';
import NewUserRegistrationPersonal from '../NewUserRegistrationForm/NewUserRegistrationPersonal';
import { AutoComplete } from 'material-ui';


class NewUserRegistrationForm extends Component {
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
              <NewUserRegistrationName />
              <NewUserRegistrationContact />
              <NewUserRegistrationPersonal />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(NewUserRegistrationForm);