import React from 'react';
import classes from './SignedOutLinks.scss';
import NavLink from '../NavItem/NavItem';

const SignedOutLinks = () => (
  <div className={classes.SignedOutLinks}>
    <ul className="nav justify-content-end">
      <NavLink toLink="/">Sign Up</NavLink>
      <NavLink toLink="/">Login</NavLink>
    </ul>
  </div>
);

export default SignedOutLinks;
