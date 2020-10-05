import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import NewUserRegistrationName from './NewUserRegistrationName';
import NewUserRegistrationContact from './NewUserRegistrationContact';
import NewUserRegistrationPersonal from '../NewUserRegistrationForm/NewUserRegistrationPersonal';


class NewUserRegistrationForm extends Component {
  state = {
    heading: 'Class Component',
  };

  render() {
    return (
      <div>
        <NewUserRegistrationName />
        <NewUserRegistrationContact />
        <NewUserRegistrationPersonal />

      </div>
    );
  }
}

export default connect(mapStoreToProps)(NewUserRegistrationForm);