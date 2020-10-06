import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';

class UserPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM
  
  componentDidMount = () => {
    // upon loading, get the currently logged-in user's user_data etc.
    this.props.dispatch({
      type: "FETCH_USER_INFO",
    })    
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

  render() {
    return (
      <div>
        <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>
        <p>Your name is: {this.props.store.info.fname} {this.props.store.info.lname}</p>
        <LogOutButton className="log-in" />
        <button onClick={() => {this.postNewUser()}}
        >Post new User</button>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
