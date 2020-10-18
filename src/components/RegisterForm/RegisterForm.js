import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import {
  Button,
  TextField,
} from '@material-ui/core';

class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    this.props.dispatch({
      type: 'REGISTER',
      payload: {
        username: this.state.username,
        password: this.state.password,
      },
    });
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <form className="formPanel" onSubmit={this.registerUser}>
        <h2>Register User</h2>
        {this.props.store.errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.registrationMessage}
          </h3>
        )}
        <div>
          <TextField
            label="Username"
            type="text"
            name="username"
            variant="outlined"
            margin="dense"
            value={this.state.username}
            required
            onChange={this.handleInputChangeFor('username')}
          />
          
          {/* <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              required
              
            />
          </label> */}
        </div>
        <div>
        <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            margin="dense"
            value={this.state.password}
            required
            onChange={this.handleInputChangeFor('password')}
          />
          {/* <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              required
              onChange={this.handleInputChangeFor('password')}
            />
          </label> */}
        </div>
        <div>
          <Button
            style={{ marginTop: 10 }}
            variant="contained"
            color="primary"
            className="btn"
            value="submit"
            type="submit"
          >
            Register
          </Button>
          {/* <input className="btn" type="submit" name="submit" value="Register" /> */}
        </div>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(RegisterForm);
