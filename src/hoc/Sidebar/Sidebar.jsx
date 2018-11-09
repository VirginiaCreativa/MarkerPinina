import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import classes from './Sidebar.scss';

const Sidebar = () => (
  <div className={classes.Sidebar}>
    <NavLink to="/" exact activeClassName="selected" className="linkActive">
      <i className="bx bx-dashboard" />
    </NavLink>
    <NavLink to="/palabras" activeClassName="selected" className="linkActive">
      <i className="bx bx-font-color" />
    </NavLink>
    <NavLink
      to="/significados"
      activeClassName="selected"
      className="linkActive"
    >
      <i className="bx bx-pin" />
    </NavLink>
  </div>
);

export default withRouter(Sidebar);
