import React from 'react';

import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';

import './MyNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  state = {
    isOpen: false,
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { isOpen } = this.state;

    const buildNavbar = () => {
      const { authed } = this.props;
      if (authed) {
        return (
        <div>
        <Navbar color="" light className="d-flex flex-wrap row justify-content-center">
          <div tag={RRNavLink} to='/home'><img className="navImg" src="https://lh3.googleusercontent.com/pw/ACtC-3foZHVsERqYPFIbkpqTZpuKs-Ymc9Pw9VLOz5qexhmLXw04IyiJS3f9cJSCJYCgW4dHeqZ17ajsLApTyAqr108-2pifAwyDFveZpMWDhMvv_dPNJQvxfk-UhVUkZJ-9U_TLy6IOSbk1sDfLCI8H97wc=w1500-h600-no?authuser=0" alt="compass logo"/></div>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={isOpen} navbar>
            <NavItem>
              <NavLink className="logoutButton" onClick={this.logMeOut}>Logout</NavLink>
            </NavItem>
          </Collapse>
        </Navbar>
        </div>

        );
      }
      return <Nav className="ml-auto" navbar></Nav>;
    };

    return (
      <div>
        {buildNavbar()}
      </div>
    );
  }
}

export default MyNavbar;
