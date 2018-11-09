import React from 'react';
import classes from './Spinner.scss';

const Spinner = () => (
  <>
    <div className={classes.SpinnerWrapper}>
      <div className={classes.Spinner} />
    </div>
  </>
);

export default Spinner;
