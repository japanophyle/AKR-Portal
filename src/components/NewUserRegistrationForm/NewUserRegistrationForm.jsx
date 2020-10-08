import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import moment from 'moment';

// import Dialog for success submit 
import FormSuccess from '../FormSuccess/FormSuccess'

//MATERIAL-UI
import {
  Paper,
  Grid,
  Button,
  FormControlLabel,
  Checkbox,
  MenuItem,
  FormControl,
  Select,
  Typography,
  InputLabel,
} from '@material-ui/core';

import NewUserName from './NewUserName';
import NewUserContact from './NewUserContact';
import NewUserPersonal from './NewUserPersonal';
import NewUserAddress from './NewUserAddress';
import NewUserKyudoInfo from './NewUserKyudoInfo';


class NewUserForm extends Component {
  state = {
    fname: '',
    lname: '',
    user_id: this.props.store.user.id,
    email: '',
    phone_number: '',
    dojo_id: '',
    fname_japanese: '',
    lname_japanese: '',
    student_rank: '',
    date_student_rank: null,
    teaching_rank: '',
    date_teaching_rank: null,
    ikyf: '',
    years_practice: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    gender: '',
    date_of_birth: null,
    date_began_kyudo: null,
    citizenship: '',
    is_current_member: !true,
    usa_archery_id: '',
  };

  componentDidMount = () => {
    this.props.dispatch({
      type: 'GET_DOJOS',
    })
    this.props.dispatch({
      type: 'FETCH_USER',
    })
  }

  // handle change for note state
  handleChange = (propertyName) => (event) => {
    console.log(event.target.value);
    console.log(`Changing ${propertyName}`);
    this.setState({
      ...this.state,
      [propertyName]: event.target.value,
    });
  }

  // handles check box for showing a user new dojo info
  handleCheckChange = (event) => {
    this.setState
      ({
        ...this.state,
        [event.target.name]: event.target.checked
      });
  }

  // submit state to db
  handleSaveNewUser = (event) => {
    event.preventDefault();
    this.props.dispatch
      ({
        type: 'CREATE_USER',
        payload: this.state
      })
  }


  render() {
    console.log(this.state);
    return (
      <div>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} >
            <Paper style={{ maxWidth: "80%", margin: "auto", padding: "20px" }}>
              <h6 style={{ color: "red" }}>Fields with * are required.</h6>
              <form onSubmit={this.handleSaveNewUser} autocomplete="on">
                <NewUserName handleChange={this.handleChange} />
                <NewUserContact handleChange={this.handleChange} />
                <NewUserPersonal state={this.state} handleChange={this.handleChange} />
                <NewUserAddress handleChange={this.handleChange} />

                {/* Choosing the dojo that the new user is trying to join. */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.is_current_member}
                      onChange={this.handleCheckChange}
                      name="is_current_member"
                      color="primary"
                    />
                  }
                  label="Current Member"
                />
                <Grid container justify="center" alignItems="center">
                  <Grid item>
                    <Typography
                      variant="h6"
                      gutterBottom
                      align="center"
                    >
                      Select Dojo
                    </Typography>

                    <FormControl
                      style={{ margin: 8, minWidth: 300 }}
                      variant="outlined"
                    >
                      <InputLabel>Dojo</InputLabel>
                      <Select
                        label="Dojo"
                        name="dojo_id"
                        onChange={this.handleChange('dojo_id')}
                      >
                        
                        {this.props.store.dojos.map((dojo, id) => {
                          return (
                            <MenuItem key={id} value={dojo.id}>{dojo.dojo_name}</MenuItem>
                          )
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                {this.state.is_current_member &&

                  <NewUserKyudoInfo handleChange={this.handleChange} />
                }
                <Grid container justify="center">
                  <Grid item>

                    
                  {/* Dialog button/popup */}
                  <FormSuccess/>


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