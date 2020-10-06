import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//MATERIAL-UI
import {
  Paper,
  Grid,
  Button,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

import NewUserName from './NewUserName';
import NewUserContact from './NewUserContact';
import NewUserPersonal from './NewUserPersonal';
import NewUserAddress from './NewUserAddress';
import NewUserKyudoInfo from './NewUserKyudoInfo';


class NewUserForm extends Component {
  state = {
    heading: 'Class Component',
    currentMember: !true,
  };

  handleCurrentMember = (event) => {
   
      this.setState({ ...this.state, [event.target.name]: event.target.checked });

  }


  render() {
    return (
      <div>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} >
            <Paper style={{ maxWidth: "80%", margin: "auto", padding: "20px" }}>
              <h6 style={{ color: "red" }}>Fields with * are required.</h6>
              <form>
                <NewUserName />
                <NewUserContact />
                <NewUserPersonal />
                <NewUserAddress />
                
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.currentMember}
                      onChange={this.handleCurrentMember}
                      name="currentMember"
                      color="primary"
                    />
                  }
                  label="Current Member"
                />
                {this.state.currentMember &&
                  <NewUserKyudoInfo />
                }
                <Grid container justify="center">
                  <Grid item>
                    <Button type="submit" variant="contained" color="primary">
                      Save
                  </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(NewUserForm);