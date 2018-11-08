import React from 'react';
import classes from './Layout.scss';
import Header from '../Header/Header';

const layout = ({ children }) => (
  <>
    <div className={classes.layout}>
      <Header />
      <div className="container">{children}</div>
    </div>
  </>
);

export default layout;
