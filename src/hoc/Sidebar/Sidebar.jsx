import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import classes from './Sidebar.scss';

const Sidebar = () => (
  <div className={classes.Sidebar}>
    <NavLink to="/" exact activeClassName="selected" className="linkActive">
      <i className="bx bx-home" />
    </NavLink>
    <NavLink
      to="/significados"
      activeClassName="selected"
      className="linkActive"
    >
      <i className="bx bx-pin" />
    </NavLink>
    <NavLink
      to="/notascornell"
      activeClassName="selected"
      className="linkActive"
    >
      <i className="bx bx-book-bookmark" />
    </NavLink>
    <NavLink to="/documentos" activeClassName="selected" className="linkActive">
      <i className="bx bx-detail" />
    </NavLink>
    <NavLink to="/foros" activeClassName="selected" className="linkActive">
      <i className="bx bx-message-rounded" />
    </NavLink>
  </div>
);

export default withRouter(Sidebar);
