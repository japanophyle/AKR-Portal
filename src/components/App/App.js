import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UserAuthRoute from '../ProtectedRoute/UserAuthRoute';
import DojoAdminAuthRoute from '../ProtectedRoute/DojoAdminAuthRoute';
import SiteAdminAuthRoute from '../ProtectedRoute/SiteAdminAuthRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import InactiveView from '../InactiveView/InactiveView';
import NationalStudentList from '../NationalStudentList/NationalStudentList';

import './App.css';
import MemberList from '../MemberList/MemberList';
import NewUserRegistrationForm from '../NewUserRegistrationForm/NewUserRegistrationForm';
import DojoList from '../DojoList/DojoList.jsx';
import CreateDojo from '../CreateDojo/CreateDojo.jsx';
import MyDojo from '../MyDojo/MyDojo';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'fontsource-roboto';


class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
    // this.props.dispatch({ type: 'GET_RANKS' });
    this.props.dispatch({ type: 'GET_DOJOS' });
    this.props.dispatch({
      type: "FETCH_USER_INFO",
      payload: "user"
    })
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: '#FCBA03', // Gold
          dark: '#A66E01', // Dark Gold
          light: '#E3BE56', // Light Gold
        },
        secondary: {
          main: '#38542B', // Green
        },
        error: {
          main: '#D03533', // Red
        },
        success: {
          main: '#173A72', // Blue
        },
        highlight: {
          light: '#ECE7D1', // Light Brown
          main: '#EADCC2', // Medium Brown
          dark: '#945C39'  // Dark Brown
        }
      },
      typography: {
        h5: {},
      }
    });
    return (
      <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
              component={AboutPage}
            />

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              path="/user/:id"
              component={UserPage}
            />

            {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LoginPage at /login
              exact
              path="/login"
              component={LoginPage}
              authRedirect="/inactive"
              memberRedirect="/mydojo"
              dojoAdminRedirect="/mydojo"
              siteAdminRedirect="/nationdojos"
            />

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/new-user-registration"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration"
              component={RegisterPage}
              authRedirect="/new-user-registration"
            />

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LandingPage at "/home"
              exact
              path="/home"
              component={LandingPage}
            // authRedirect="/mydojo"
            />

            <UserAuthRoute 
              exact
              path="/mydojo"
              component={MyDojo}
            />

            <DojoAdminAuthRoute
              exact
              path="/memberlist/:id"
              component={MemberList}
            />

            <SiteAdminAuthRoute
              exact
              path="/nationdojos"
              component={DojoList}
            />

            <SiteAdminAuthRoute
              exact
              path="/createdojo"
              component={CreateDojo}
            />

            <SiteAdminAuthRoute
              exact
              path="/nationalstudentlist"
              component={NationalStudentList}
            />
            <ProtectedRoute
              path="/inactive"
              component={InactiveView}
            />

            <ProtectedRoute
              path="/new-user-registration"
              component={NewUserRegistrationForm}
            />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </div>
      </Router>
      </ThemeProvider>
    );
  }
}

export default connect()(App);
