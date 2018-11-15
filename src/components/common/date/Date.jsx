import React from 'react';
import classes from './Date.scss';

import { CURRENT_MESES } from '../../../config/date';

const DateUI = ({ date }) => (
  <>
    <div className={classes.DateStyle}>
      <p>
        <i className="bx bx-calendar" />
        {CURRENT_MESES || date}
      </p>
    </div>
  </>
);

export default DateUI;
