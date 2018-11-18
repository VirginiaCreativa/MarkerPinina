import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import classes from './SignedInLinks.scss';
import Buscador from './buscador/Buscador';
import BtnCreates from './button_creates/ButtonCreates';
import UserProfile from './user_profile/UserProfile';

class SignedInLinks extends Component {
  state = {};

  render() {
    const { userSign } = this.props;
    return (
      <>
        <div className={classes.SignedInLinks}>
          <div className={classes.Grid}>
            <Buscador />
          </div>
          <div className={classes.Grid}>
            <BtnCreates />
          </div>
          <div className={classes.Grid}>
            <UserProfile userSign={userSign} />
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(SignedInLinks);
