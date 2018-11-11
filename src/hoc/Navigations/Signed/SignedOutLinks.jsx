import React from 'react';
import classes from './SignedOutLinks.scss';
import NavLink from '../NavItem/NavItem';

const SignedOutLinks = () => (
  <div className={classes.SignedOutLinks}>
    <ul className="nav justify-content-end">
      <NavLink toLink="/">
        <i className="bx bx-log-in" />
      </NavLink>
      <NavLink toLink="/" className={classes.Notification}>
        <i className="bx bx-lnotification" />
      </NavLink>
      <NavLink toLink="/">
        <i className="bx bx-user-circle" />
      </NavLink>
    </ul>
  </div>
);

export default SignedOutLinks;
