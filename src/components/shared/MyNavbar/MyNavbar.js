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
  NavbarText,
  UncontrolledDropdown,
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
    collapsed: true,
    setCollapsed: true,
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const buildNavbar = () => {
      const { authed } = this.props;
      if (authed) {
        return (
          <div>
          <Navbar className="myNavbar" light expand="md">
            <NavbarBrand><img className="ogLogo" src="https://lh3.googleusercontent.com/TByu_N5uLfy7ARGxByxC99LKUvGxDj3W1xb4mIFwKG6ImWlLNVzK6e8eP8U3L7DkNdWic7GsgYjDtC4TZwmYAQybnbLMop1ZZkYDFsQXpluJHJx2sqmQq6wH3FhjHTHDm8OiTVtuA165Has5DRKCTinpMkGhcsle5leG_t_CweL3wBz66qAlEcbtEee9CTTuBH4WuMbMNpnZvbPGeSfS30ebNF6czBjahOcB78xXt3AzMLH-5pkhfe0AnqzRuvlRQJF3D6CY8Gjn_ILLh6rGsQqN9ZfAXbWLv9iLIthsdmnf9jlAkRI5QUq9UQHGuzvqk7HPtER5jl0vCcc_M0h4DGgXab6MEskpfAy2kY8HGzLIMCPieGQt_xowG00j4jbH7dbX89blanaP8MDyaDsBTKg49XdBKIYKKZZLAR4gBalQJD8yQNUnBVZWZrauPwGiE7It9-3wYXSivIClg4_XjsNSEf2Jthq0IvHZkZZ_2TtGs_zIC3FZ0G1ba39CicbdkfUtFpdfYEHK5TtaEXwZSYp0VEo2CfDrlCALk23zsyRPY-NzqUTrzfqoEViazfx_LWboz9QC8rVceF2KKDq3RLackCKAXICenrWTGjfAGWfu92V6MSXaQMcmDnURAZXM7CevHiL2miLFk4TiSIAtB-WpaIzMdXpPzoZilHmozfIY4e3asC99mWnkDJEl=w641-h193-no?authuser=0" alt="og emoji compass logo"/></NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/home">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/Chart">Chart</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/Journal">Journal</NavLink>
                </NavItem>
                <NavItem>
              <NavLink className="logoutButton" onClick={this.logMeOut}>Logout</NavLink>
            </NavItem>
              </Nav>
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
