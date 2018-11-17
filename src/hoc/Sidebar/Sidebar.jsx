import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import classes from './Sidebar.scss';

const Sidebar = () => (
  <div className={classes.Sidebar}>
    <NavLink to="/" exact activeClassName="selected" className="linkActive">
      <i className="bx bx-home" />
    </NavLink>
    <NavLink to="/palabras" activeClassName="selected" className="linkActive">
      <i className="bx bx-pin" />
    </NavLink>
    <NavLink to="/notebook" activeClassName="selected" className="linkActive">
      <i className="bx bx-book-bookmark" />
    </NavLink>
    <NavLink to="/proyectos" activeClassName="selected" className="linkActive">
      <i className="bx bx-transfer" />
    </NavLink>
  </div>
);

export default withRouter(Sidebar);
