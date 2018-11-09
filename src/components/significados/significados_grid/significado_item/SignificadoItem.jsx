import React from 'react';
import classes from './PalabraItem.scss';

import { CURRENT_MESES } from '../../../../config/date';

const SignificadoItem = ({ date }) => (
  <>
    <div className={classes.SignificadoItem}>
      <h4>Title</h4>
      <p className={classes.DateStyle}>
        <i className="bx bx-calendar" />
        {CURRENT_MESES || date}
      </p>
    </div>
  </>
);

export default SignificadoItem;
