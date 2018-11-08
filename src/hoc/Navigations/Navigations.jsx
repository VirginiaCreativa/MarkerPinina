import React from 'react';
import SignedInLinks from './Signed/SignedInLinks';
import SignedOutnLinks from './Signed/SignedOutLinks';

const Navigations = () => (
  <div className="justify-content-end">
    <SignedInLinks />
    <SignedOutnLinks />
  </div>
);

export default Navigations;
