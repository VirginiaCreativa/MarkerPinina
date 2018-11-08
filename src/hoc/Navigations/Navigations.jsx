import React from 'react';
import classes from './Navigations.scss';
import NavLink from './Navigation/Navigation';

const Navigations = () => (
  <div className={classes.Navigations}>
    <ul className="nav justify-content-end">
      <NavLink toLink="/" activeClassName>
        Home
      </NavLink>
      <NavLink toLink="/about" activeClassName>
        About
      </NavLink>
      <NavLink toLink="/blog" activeClassName>
        Blog
      </NavLink>
      <NavLink
        toLink={{
          pathname: '/newpost',
          hash: '#submit',
          search: '?quick-subtime=true',
        }}
        activeClassName
      >
        New Post
      </NavLink>
    </ul>
  </div>
);

export default Navigations;
