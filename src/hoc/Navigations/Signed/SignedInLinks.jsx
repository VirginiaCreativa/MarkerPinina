import React from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import classes from './SignedInLinks.scss';

const SignedInLinks = () => (
  <>
    <ul className={['nav', classes.SignedInLinks].join(' ')}>
      <button className={classes.btnCreate} type="button">
        <i className="bx bx-plus" />
        <div className={classes.Menus}>
          <div className={classes.Triangule} />
          <ul>
            <li>
              <Link to="/palabras">
                <i className="bx bx-pin" />
                Palabra
              </Link>
            </li>
            <li>
              <Link to="/enseñanza">
                <i className="bx bx-book-bookmark" />
                Notebook
              </Link>
            </li>
            <li>
              <Link to="/proyecto">
                <i className="bx bx-idea" />
                Proyecto
              </Link>
            </li>
          </ul>
        </div>
      </button>
      <NavLink to="/" className={classes.Notification}>
        <i className="bx bx-notification" />
      </NavLink>
      <NavLink to="/">
        <i className="bx bx-log-out" />
      </NavLink>
      <NavLink to="/" className={classes.User}>
        <div className={classes.Circle}>VS</div>
        <p>Virginia Velásquez</p>
      </NavLink>
    </ul>
  </>
);

export default withRouter(SignedInLinks);
