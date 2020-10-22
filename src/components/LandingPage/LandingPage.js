import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

//MATERIAL-UI
import {
  Button,
  Grid
} from '@material-ui/core';

class LandingPage extends Component {
  state = {
    heading: 'Kyudo Promotional Video',
  };

  onLogin = (event) => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <div className="container">
        <Grid container justify="space-evenly" alignItems="center">
          <Grid item>
            <h2>{this.state.heading}</h2>
            <iframe title="American Kyudo Renmei Promotional Video" src="https://www.youtube.com/embed/eCp_ICCIkDw?rel=0&wmode=opaque"
              allowFullScreen={true}
            >
            </iframe>


            {/* <div className="grid">
            <div className="grid-col grid-col_8">
            </div>
            <div className="grid-col grid-col_4"> */}
          </Grid>
          <Grid item>
            <RegisterForm />
            <center>
              <h4>Already a Member?</h4>
              <Button
                className="btn btn_sizeSm"
                onClick={this.onLogin}
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </center>
          </Grid>
          {/* </div> */}
          {/* </div> */}
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
