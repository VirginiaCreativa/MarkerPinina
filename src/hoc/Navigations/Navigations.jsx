import React, { Component } from 'react';
import classes from './Navigations.scss';
import SignedInLinks from './Signed/SignedInLinks';
import SignedOutnLinks from './Signed/SignedOutLinks';

class Navigations extends Component {
  state = {
    user: false,
    login: true,
  };

  render() {
    const { user, login } = this.state;
    return (
      <>
        <div className={classes.Navigations}>
          {login ? <SignedInLinks user={user} /> : <SignedOutnLinks />}
        </div>
      </>
    );
  }
}

export default Navigations;
