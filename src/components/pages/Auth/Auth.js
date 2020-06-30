import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import './Auth.scss';

class Auth extends React.Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
      <div className="auth justify-content-center text-center">
        <div>
        <img onClick={this.loginClickEvent} className="coverImg" src="https://lh3.googleusercontent.com/pw/ACtC-3dOm1uLde4CbVes9NbXcK2ixekVLr0T5kz-AZ4BBps9q82C7ep1ePb-BXnwkc2velysomzpCu9Nuo6FXXr6zPcI3kN-o9SPHHYAKtkUk6C3GB0QyPBmwkNySubNAYzKUPxjYJxE4f_Z4PDVXFHsExmH=s790-no?authuser=0" alt="compass logo" />
        </div>
        <div>Click Logo to Login</div>
        </div>
    );
  }
}

export default Auth;
