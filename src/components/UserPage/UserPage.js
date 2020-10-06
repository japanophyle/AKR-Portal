import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { MenuItem, Select, InputLabel, FormControl, Typography, Button, Container, Card, CardContent, Grid, TextField } from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import UserName from '../UserName/UserName'
import UserContact from '../UserContact/UserContact'
import UserAddress from '../UserAddress/UserAdress'
import UserPersonal from '../UserPersonal/UserPersonal'
import UserKyudo from '../UserKyudo/UserKyudo'

class UserPage extends Component {

  state = {
    nameEdit: true,
    contactEdit: true,
    addressEdit: true,
    personalEdit: true,
    kyudoEdit: true,
    paymentEdit: true,
  };

  toggleContactEdit = () => {
    this.setState({
      contactEdit: !this.state.contactEdit
    })
    console.log(this.state)
  }

  toggleAddressEdit = () => {
    this.setState({
      addressEdit: !this.state.addressEdit
    })
    console.log(this.state)
  }
  togglePersonalEdit = () => {
    this.setState({
      personalEdit: !this.state.personalEdit
    })
    console.log(this.state)
  }

  toggleKyudoEdit = () => {
    this.setState({
      kyudoEdit: !this.state.kyudoEdit
    })
    console.log(this.state)
  }
  togglePaymentEdit = () => {
    this.setState({
      paymentEdit: !this.state.paymentEdit
    })
    console.log(this.state)
  }

  toggleNameEdit = () => {
    this.setState({
      nameEdit: !this.state.nameEdit
    })
    console.log(this.state)
  // this component doesn't do much to start, just renders some user info to the DOM
  }
 

  postNewUser = () => {
    // function for testing new user POST
    console.log('gonna post a new user');
    this.props.dispatch({
      type: "CREATE_USER",
      payload: {
        dues_date : null,
        id : 7,
        lname : "Aagaard",
        country : "USA",
        // -- "usa_archery_id" : null,
        state : "MN",
        // -- "lname_japanese" : null,
        zipcode : 55408,
        // -- "amount_paid" : null,
        phone_number : 1231231234,
        fname : "Emerson",
        // -- "fname_japanese" : null,
        // -- "dues_method" : null,
        date_of_birth : "1991-03-06",
        // -- "is_current_member" : null,
        // -- "date_teaching_rank" : null,
        email : "my.email@gmail.com",
        address_1 : "123 Fake Street",
        // -- "date_student_rank" : null,
        city : "Minneapolis",
        dojo_id : 1,
        student_rank : "Shodan",
        // -- "dues_amount" : null,
        // -- "years_practice" : null,
        user_id : 1,
        gender : "M",
        address_2 : "Apt 3",
        // -- "age" : null,
        // -- "ikyf" : null,
        // -- "date_began_kyudo" : null,
        // -- "citizenship" : null,
        // -- "teaching_rank" : null,
        // -- "notes" : null,
        // -- "equipment_checkout" : null,
        // -- "include_for_akr" : null
      }
    })
  }
  

    componentDidMount = () => {
      console.log('gonna get the profile');
      this.props.dispatch({
        type: "FETCH_USER_INFO",
      })
    }

    render() {
      const ranks =
      [
        '(1st Dan) Shodan',
        '(2nd Dan) Nidan',
        '(3rd Dan) Sandan',
        '(4th Dan) Yondan',
        '(5th Dan) Godan',
        '(6th Dan) Rokudan',
        '(7th Dan) Shichidan',
        '(8th Dan) Hachidan',
        '(9th Dan) Kudan',
        '(10th Dan) Judan'
      ]
      return (
        <div>
  <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>
        <p>Your name is: {this.props.store.info.fname} {this.props.store.info.lname}</p>
        <LogOutButton className="log-in" />
        <button
        >Post new User</button>
          <Container>

            <UserName />

            <UserContact />

            <UserAddress /> 

            <UserPersonal />

            <UserKyudo />
{/* 
            {this.state.kyudoEdit ?
              <Card>
                <CardContent>
                  <Grid container>
                    <Grid item xs={11}>
                      <h1>Kyudo Information</h1>
                    </Grid>
                    <Grid item xs={1}>
                      <Button onClick={this.toggleKyudoEdit}>Edit</Button>
                    </Grid>
                  </Grid>
                  <Typography>
                    <h3>Current Student Rank: Shogon</h3>
                    <h3>Date Reached: 01/23/20</h3>
                    <h3>Current Teacher Rank: None</h3>
                    <h3>Date Reached: None</h3>
                    <h3>Years Practiced: 1</h3>
                    <h3>Date Began Kyudo: 01/23/20</h3>
                    <h3>IKYF Member Number: 122335463</h3>
                    <h3>USA Archery Member ID: 4352457</h3>
                  </Typography>
                </CardContent>
              </Card>
              :
              <Card>
                <CardContent>
                  <Grid container>
                    <Grid item xs={11}>
                      <h1>Kyudo Information</h1>
                    </Grid>
                    <Grid item xs={1}>
                      <Button onClick={this.toggleNameEdit}>Edit</Button>
                    </Grid>
                  </Grid>
                  <Typography>
                    <FormControl
                      variant="outlined"
                    >
                      <InputLabel>Current Kyudo Rank</InputLabel>
                      <Select
                        label="Current Kyudo Rank"
                        defaultValue={ranks[0]}
                      >
                        {ranks.map((rank, id) => {
                          return (
                            <MenuItem key={id}>{rank}</MenuItem>
                          )
                        })}
                      </Select>
                    </FormControl>
                    <br />
                    <br />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        required
                        id="date_current_rank"
                        variant="outlined"
                        format="MM/dd/yyyy"
                        margin="normal"
                        value="08/11/2000"
                        helperText="Date Earned"
                        label="Date Earned"
                      />
                    </MuiPickersUtilsProvider>
                    <br />
                    <br />
                    <FormControl
                      variant="outlined"
                    >
                      <InputLabel>Current Teaching Rank</InputLabel>
                      <Select
                        label="Current Teaching Rank"
                        defaultValue="Renshi"
                      >
                        {['Renshi', 'Kyoshi', 'Hanshi'].map((rank, id) => {
                          return (
                            <MenuItem key={id}>{rank}</MenuItem>
                          )
                        })}
                      </Select>
                    </FormControl>
                    <br />
                    <br />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        required
                        id="date_teacher_rank"
                        variant="outlined"
                        format="MM/dd/yyyy"
                        margin="normal"
                        value="08/11/2000"
                        helperText="Date Earned"
                        label="Date Earned"
                      />
                    </MuiPickersUtilsProvider> */}

                    {/* HERE ILL ADD A RANK HISTORY dropdown display */}
{/* 
                    <br />
                    <br />
                    <TextField
                      required
                      id="years_practice"
                      label="Years Practiced"
                      defaultValue="1"
                      variant="outlined"
                    />
                    <br />
                    <br />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        required
                        id="date_began_kyudo"
                        variant="outlined"
                        format="MM/dd/yyyy"
                        margin="normal"
                        value="08/11/2000"
                        helperText="Start Date"
                        label="Start Date"
                      />
                    </MuiPickersUtilsProvider>
                    <br />
                    <br />
                    <TextField
                      required
                      id="ikyf"
                      label="IKYF Number"
                      defaultValue="1234567789"
                      variant="outlined"
                    />
                    <br />
                    <br />
                    <TextField
                      required
                      id="usa_archery_member_id"
                      label="USA Archery Number"
                      defaultValue="1234567789"
                      variant="outlined"
                    />
                    <h3>Current Student Rank: Shogon</h3>
                    <h3>Date Reached: 01/23/20</h3>
                    <h3>Current Teacher Rank: None</h3>
                    <h3>Date Reached: None</h3>
                    <h3>Years Practiced: 1</h3>
                    <h3>Date Began Kyudo: 01/23/20</h3>
                    <h3>IKYF Member Number: 122335463</h3>
                    <h3>USA Archery Member ID: 4352457</h3>
                  </Typography>
                </CardContent>
              </Card>
            } */}

            {this.state.paymentEdit ?
              <Card>
                <CardContent>
                  <Grid container>
                    <Grid item xs={11}>
                      <h1>Payment Information</h1>
                    </Grid>
                    <Grid item xs={1}>
                      <Button onClick={this.togglePaymentEdit}>Edit</Button>
                    </Grid>
                  </Grid>
                  <Typography>
                    <h3>Dues: $50</h3>
                    <h3>Amount Payed: $50</h3>
                    <h3>Date of Payment: 01/23/20</h3>
                    <h3>Payment method: barter system</h3>
                  </Typography>
                </CardContent>
              </Card>
              :
              <Card>
                <CardContent>
                  <Grid container>
                    <Grid item xs={11}>
                      <h1>Payment Information</h1>
                    </Grid>
                    <Grid item xs={1}>
                      <Button onClick={this.toggleNameEdit}>Edit</Button>
                    </Grid>
                  </Grid>
                  <Typography>
                    <TextField
                      required
                      id="dues_amount"
                      label="Dues"
                      defaultValue="50"
                      variant="outlined"
                    />
                    <br />
                    <br />
                    <TextField
                      required
                      id="amount_paid"
                      label="Amount paid"
                      defaultValue="50"
                      variant="outlined"
                    />
                    <br />
                    <br />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        required
                        id="date_dues_paid"
                        variant="outlined"
                        format="MM/dd/yyyy"
                        margin="normal"
                        value="08/11/2000"
                        helperText="Start Date"
                        label="Start Date"
                      />
                    </MuiPickersUtilsProvider>

                    <br />
                    <br />
                    <TextField
                      required
                      id="dues_payment_method"
                      label="Payment Method"
                      defaultValue="card"
                      variant="outlined"
                    />
                  </Typography>
                </CardContent>
              </Card>
            }

          </Container>
        </div>
      )
    }
  }


// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage)