import React from 'react';
import classes from './Layout.scss';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const layout = ({ children }) => (
  <>
    <div className={classes.layout}>
      <Header />
      <Sidebar />
      <div className={classes.Wrapper}>
        <div className="container">{children}</div>
      </div>
    </div>
  </>
);

export default layout;
