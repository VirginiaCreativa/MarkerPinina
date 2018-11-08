import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import classes from './NavItem.scss';

const Navigation = ({
  toLink,
  onClicked,
  children,
  activeClassName,
  activeUser,
}) => (
  <>
    <li
      className={
        activeUser ? [classes.NavItem, classes.User].join(' ') : classes.NavItem
      }
    >
      <NavLink
        to={toLink}
        className="nav-item"
        onClick={onClicked}
        activeClassName={activeClassName ? 'is-selected' : ''}
      >
        {children}
      </NavLink>
    </li>
  </>
);

export default withRouter(Navigation);
