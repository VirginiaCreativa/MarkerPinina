import React from 'react';
import classes from './Header.scss';
import Navigations from '../Navigations/Navigations';

const header = () => (
  <>
    <header className={classes.Header}>
      <div className="container-full">
        <div className="row">
          <div className="col">
            <div className={classes.Logo}>
              <h1>
                Post
                <span>Pinina</span>
              </h1>
            </div>
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
