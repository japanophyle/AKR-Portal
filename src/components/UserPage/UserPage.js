import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Container, } from '@material-ui/core';
import 'date-fns';

// all the imports to display the users information.
import UserName from '../UserName/UserName'
import UserContact from '../UserContact/UserContact'
import UserAddress from '../UserAddress/UserAdress'
import UserPersonal from '../UserPersonal/UserPersonal'
import UserKyudo from '../UserKyudo/UserKyudo'
import UserPayment from '../UserPayment/UserPayment'

class UserPage extends Component {

  // this component doesn't do much to start, just renders some user info to the DOM

  componentDidMount = () => {
    console.log('gonna get the profile');
    this.props.dispatch({
      type: "FETCH_USER_INFO",
    })
  }


  getMyDojo = () => {
    console.log('Getting "my dojo"')
    this.props.dispatch({
      type: "GET_MY_DOJO"
    })

  }
  

    componentDidMount = () => {
      console.log('gonna get the profile');
      this.props.dispatch({
        type: "FETCH_USER_INFO",
      })
    }

    render() {
      return (
        <div>
  <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>
        <p>Your name is: {this.props.store.info.fname} {this.props.store.info.lname}</p>
        <LogOutButton className="log-in" />
        <button onClick={() => this.getMyDojo()}
        >Get My Dojo</button>
          <Container>


          {/* Edit user name data component */}
          <UserName />

          {/* Edit user Contact data component */}
          <UserContact />

          {/* Edit user Address data component */}
          <UserAddress />

          {/* Edit user Personal data component */}
          <UserPersonal />

          {/* Edit user Kyudo data component */}
          <UserKyudo />

          {/* Edit user Payment data data component */}
          {/* Needs to have diff views depending on the admin level of the user */}


          <UserPayment />

        </Container>
      </div>
    )
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage)