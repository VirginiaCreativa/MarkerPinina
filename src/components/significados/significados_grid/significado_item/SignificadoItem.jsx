import React from 'react';
import classes from './SignificadoItem.scss';

import { CURRENT_MESES } from '../../../../config/date';

const SignificadoItem = ({ title, date }) => (
  <>
    <div className={classes.SignificadoItem}>
      <div className={classes.Slider}>
        <img
          src="http://www.fce.unan.edu.ni/wp-content/uploads/2016/04/fortalecimiento.jpg"
          alt={title}
          className="img-fluid"
        />
      </div>
      <div className={classes.Wrapper}>
        <h4>{title || `Implicar`}</h4>
        <p className={classes.DateStyle}>
          <i className="bx bx-calendar" />
          {CURRENT_MESES || date}
        </p>
      </div>
    </div>
  </>
);

export default SignificadoItem;
