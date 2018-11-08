import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.scss';
import Navigations from '../Navigations/Navigations';

const header = () => (
  <>
    <header className={classes.Header}>
      <div className="container-full">
        <div className="row">
          <div className="col">
            <Link to="/">
              <div className={classes.Logo}>
                <h1>
                  P<span>P</span>
                </h1>
              </div>
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
