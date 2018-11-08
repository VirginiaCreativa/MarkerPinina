import React from 'react';
import classes from './Navigations.scss';
import SignedInLinks from './Signed/SignedInLinks';
// import SignedOutnLinks from './Signed/SignedOutLinks';

const Navigations = () => (
  <>
    <div className={classes.Navigations}>
      <SignedInLinks />
      {/* <SignedOutnLinks /> */}
    </div>
  </>
);

export default Navigations;
