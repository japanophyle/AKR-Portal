import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Typography, Button, Container, Card, CardContent, Grid, TextField } from '@material-ui/core';

class UserPage extends Component {

  state = {
    nameEdit: true,
    contactEdit: true,
    addressEdit: true,
    personalEdit: true,
    kyudoEdit: true,
    paymentEdit: true,
  };

  toggleNameEdit = (input) => {
    
    this.setState({
      nameEdit: !this.state.nameEdit
    })
    console.log(this.state)
  }

  render() {
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
                      <br/>
                      <br/>
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
                      <br/>
                      <br/>
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
                <Button onClick={this.toggleNameEdit}>Edit</Button>
                </Grid>
              </Grid>
              <Typography>
                <h3>Emailadress@email.what</h3>
                <h3>612-280-0987</h3>
              </Typography>
            </CardContent>
          </Card>
          : 
  
          }

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
                <h3>Address block 1</h3>
                <h3>Address block 2</h3>
                <h3>City, State, Zipcode, Country</h3>
              </Typography>
            </CardContent>
          </Card>

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
                <h3>Citizenship: USA, JPN</h3>
                <h3>Date of birth: 09/09/99</h3>
                <h3>Age: Math done by moment</h3>
                <h3>Gender: Male</h3>
              </Typography>
            </CardContent>
          </Card>

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
                <h3>Dues: $50</h3>
                <h3>Amount Payed: $50</h3>
                <h3>Date of Payment: 01/23/20</h3>
                <h3>Payment method: barter system</h3>
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
