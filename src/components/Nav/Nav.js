import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';
import image from './customLogo.png';

const Nav = (props) => {
  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (props.store.user.id != null) {
    loginLinkData.path = '/mydojo';
    loginLinkData.text = 'Home';
  };


  let dojoAdminMemberList = {
    path: `/memberlist/${props.store.info.dojo_id}`,
    text: 'Member List',
  };

  let siteAdminDojoList = {
    path: '/nationdojos',
    text: 'National Dojos'
  };



  return (
    <div className="nav">

      {/* Logo and Home Link */}
      <Link to="/home">
        <img id="logo-img-id" src={image} alt="American Kyudo Renmei" className="sites-logo"></img>
      </Link>


      {/* <h2 className="nav-title">Prime GROUP Project   >8^) </h2> */}
      <h1 id="title" className="nav-left">American Kyudo Renmei Portal</h1>


      <div className="nav-right">
        <Link className="nav-link" to={loginLinkData.path}>
          {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
          {loginLinkData.text}
        </Link>

        {/* conditional rendering -- if authorized, show members list */}
        {props.store.user.auth_level === 10 && (
          <>
            <Link className="nav-link" to={dojoAdminMemberList.path} >
              {dojoAdminMemberList.text}
            </Link>
          </>
        )}

        {props.store.user.auth_level >= 20 && (
          <>
            <Link className="nav-link" to={siteAdminDojoList.path} >
              {siteAdminDojoList.text}
            </Link>
          </>
        )}


        {/* Show the link to the info page and the logout button if the user is logged in */}
        {props.store.user.id >= 5 && (
          <>
            <Link className="nav-link" to="/user/user">
              Info Page
            </Link>
            <LogOutButton className="nav-link" />
          </>
        )}
        {/* Always show this link since the about page is not protected */}
        <Link className="nav-link" to="/about">
          About
        </Link>
      </div>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
