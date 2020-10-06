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
        {/* <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>
        <LogOutButton className="log-in" /> */}
        <Container>
          {this.state.nameEdit ?
            <Card>
              <CardContent>
                <Grid container>
                  <Grid item xs={11}>
                    <h1>Name</h1>
                  </Grid>
                  <Grid item xs={1}>
                    <Button onClick={this.toggleNameEdit}>Edit</Button>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      <h3>Karl</h3>
                      <h3>Katakana First Name</h3>
                      <h3>Username</h3>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <h3>Beck</h3>
                      <h3>Katakana Last Name</h3>
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            :
            <Card>
              <CardContent>
                <Grid container>
                  <Grid item xs={11}>
                    <h1>Name</h1>
                  </Grid>
                  <Grid item xs={1}>
                    <Button onClick={this.toggleNameEdit}>Save</Button>
                    <Button onClick={this.toggleNameEdit}>Cancel</Button>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      <TextField
                        required
                        id="fname"
                        label="First Name"
                        defaultValue="karl"
                        variant="outlined"
                      />
                      <br />
                      <br />
                      <TextField
                        required
                        id="katakana_fname"
                        label="Katakana First Name"
                        defaultValue="asdf"
                        variant="outlined"
                      />
                      <h3>Username</h3>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <TextField
                        required
                        id="lname"
                        label="Last Name"
                        defaultValue="beck"
                        variant="outlined"
                      />
                      <br />
                      <br />
                      <TextField
                        required
                        id="katakana_lname"
                        label="Katakana Last Name"
                        defaultValue="fdsa"
                        variant="outlined"
                      />
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          }

          {this.state.contactEdit ?
            <Card>
              <CardContent>
                <Grid container>
                  <Grid item xs={11}>
                    <h1>Contact</h1>
                  </Grid>
                  <Grid item xs={1}>
                    <Button onClick={this.toggleContactEdit}>Edit</Button>
                  </Grid>
                </Grid>
                <Typography>
                  <h3>Emailadress@email.what</h3>
                  <h3>612-280-0987</h3>
                </Typography>
              </CardContent>
            </Card>
            :
            <Card>
              <CardContent>
                <Grid container>
                  <Grid item xs={11}>
                    <h1>Contact</h1>
                  </Grid>
                  <Grid item xs={1}>
                    <Button onClick={this.toggleContactEdit}>Edit</Button>
                  </Grid>
                </Grid>
                <Typography>
                  <TextField
                    required
                    id="email"
                    label="Email"
                    defaultValue="Emailadress@email.whau"
                    variant="outlined"
                  />
                  <br />
                  <br />
                  <TextField
                    required
                    id="phone_number"
                    label="Phone Number"
                    defaultValue="6122800987"
                    variant="outlined"
                  />
                </Typography>
              </CardContent>
            </Card>
          }

          {this.state.addressEdit ?
            <Card>
              <CardContent>
                <Grid container>
                  <Grid item xs={11}>
                    <h1>Address</h1>
                  </Grid>
                  <Grid item xs={1}>
                    <Button onClick={this.toggleAddressEdit}>Edit</Button>
                  </Grid>
                </Grid>
                <Typography>
                  <h3>Address block 1</h3>
                  <h3>Address block 2</h3>
                  <h3>City, State, Zipcode, Country</h3>
                </Typography>
              </CardContent>
            </Card>
            :
            <Card>
              <CardContent>
                <Grid container>
                  <Grid item xs={11}>
                    <h1>Address</h1>
                  </Grid>
                  <Grid item xs={1}>
                    <Button onClick={this.toggleNameEdit}>Edit</Button>
                  </Grid>
                </Grid>
                <Typography>
                  <TextField
                    required
                    id="address_1"
                    label="Address line 1"
                    defaultValue="karl"
                    variant="outlined"
                  />
                  <br />
                  <br />
                  <TextField
                    required
                    id="address_2"
                    label="Address line 2"
                    defaultValue="asdf"
                    variant="outlined"
                  />
                  <br />
                  <br />
                  <TextField
                    required
                    id="country"
                    label="Country"
                    defaultValue="karl"
                    variant="outlined"
                  />
                  <TextField
                    required
                    id="state"
                    label="State"
                    defaultValue="asdf"
                    variant="outlined"
                  />
                  <TextField
                    required
                    id="city"
                    label="City"
                    defaultValue="karl"
                    variant="outlined"
                  />
                  <TextField
                    required
                    id="zipcode"
                    label="Zipcode"
                    defaultValue="55104"
                    variant="outlined"
                  />
                  <h3>Address block 1</h3>
                  <h3>Address block 2</h3>
                  <h3>City, State, Zipcode, Country</h3>
                </Typography>
              </CardContent>
            </Card>
          }

          {this.state.personalEdit ?
            <Card>
              <CardContent>
                <Grid container>
                  <Grid item xs={11}>
                    <h1>Personal Information</h1>
                  </Grid>
                  <Grid item xs={1}>
                    <Button onClick={this.togglePersonalEdit}>Edit</Button>
                  </Grid>
                </Grid>
                <Typography>
                  <h3>Citizenship: USA, JPN</h3>
                  <h3>Date of birth: 09/09/99</h3>
                  <h3>Age: Math done by moment</h3>
                  <h3>Gender: Male</h3>
                </Typography>
              </CardContent>
            </Card>
            :
            <Card>
              <CardContent>
                <Grid container>
                  <Grid item xs={11}>
                    <h1>Personal Information</h1>
                  </Grid>
                  <Grid item xs={1}>
                    <Button onClick={this.toggleNameEdit}>Edit</Button>
                  </Grid>
                </Grid>
                <Typography>
                  <TextField
                    required
                    id="citizenship"
                    label="Citizenship"
                    defaultValue="USA"
                    variant="outlined"
                  />
                  <br />
                  <br />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      required
                      id="date_of_birth"
                      variant="outlined"
                      format="MM/dd/yyyy"
                      margin="normal"
                      value="08/11/2000"
                      helperText="Date of Birth"
                      label="Start Date"
                    />
                  </MuiPickersUtilsProvider>
                  <br />
                  <br />
                  <TextField
                    required
                    id="gender"
                    label="Gender"
                    defaultValue="Male"
                    variant="outlined"
                  />
                  <h3>Citizenship: USA, JPN</h3>
                  <h3>Date of birth: 09/09/99</h3>
                  <h3>Age: Math done by moment</h3>
                  <h3>Gender: Male</h3>
                </Typography>
              </CardContent>
            </Card>
          }

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
                  </MuiPickersUtilsProvider>

                  {/* HERE ILL ADD A RANK HISTORY dropdown display */}

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
          }

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