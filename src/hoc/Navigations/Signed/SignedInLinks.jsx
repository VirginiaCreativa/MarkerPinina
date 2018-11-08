import React from 'react';
import classes from './SignedOutLinks.scss';
import NavLink from '../NavItem/NavItem';

const SignedInLinks = () => (
  <div className={classes.SignedInLinks}>
    <ul className="nav justify-content-end">
      <NavLink toLink="/">Create Palabra</NavLink>
      <NavLink toLink="/">Create Significado</NavLink>
      <NavLink toLink="/">Log Out</NavLink>
      <NavLink toLink="/">VV</NavLink>
    </ul>
  </div>
);

export default SignedInLinks;
