import React from 'react';
import classes from './SignedInLinks.scss';
import NavLink from '../NavItem/NavItem';

const SignedInLinks = () => (
  <>
    <ul className={['nav', classes.SignedInLinks].join(' ')}>
      <NavLink toLink="/">Create Palabra</NavLink>
      <NavLink toLink="/">Create Significado</NavLink>
      <NavLink toLink="/">Log Out</NavLink>
      <NavLink toLink="/" activeUser>
        VV
      </NavLink>
    </ul>
  </>
);

export default SignedInLinks;
