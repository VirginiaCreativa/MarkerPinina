import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import classes from './SignedInLinks.scss';

const SignedInLinks = () => (
  <>
    <ul className={['nav', classes.SignedInLinks].join(' ')}>
      <NavLink to="/" className={classes.btnCreate}>
        <i className="bx bx-plus" />
        Create Palabra
      </NavLink>
      <NavLink to="/" className={classes.btnCreate}>
        <i className="bx bx-plus" />
        Create Significado
      </NavLink>
      <NavLink to="/">
        <i className="bx bx-log-out" />
      </NavLink>
      <NavLink to="/" className={classes.User}>
        VV
      </NavLink>
    </ul>
  </>
);

export default withRouter(SignedInLinks);
