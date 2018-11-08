import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.scss';
import Logo from '../Logo/Logo';
import Navigations from '../Navigations/Navigations';

const header = () => (
  <>
    <header className={classes.Header}>
      <div className="container-full">
        <div className="row">
          <div className="col">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="col">
            <Navigations />
          </div>
        </div>
      </div>
    </header>
  </>
);

export default header;
