import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

import {
  Link,
} from '@material-ui/core';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    return (
      <div>
        <RegisterForm />
        <center>
        <Link
            component="button"
            style={{ fontSize: 20, fontWeight: "bold"}}
            color="textPrimary"
            variant="body1"
            size="large"
            className="btn btn_asLink"
            onClick={() => {
              this.props.history.push('/login')
            }}
          >
            Login
          </Link>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RegisterPage);
