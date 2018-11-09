import React from 'react';
import classes from './HeadingQuantity.scss';

const HeadingQuantity = ({ quantited, title }) => (
  <>
    <div className={classes.HeadingQuantity}>
      <h6>
        {title}
        <span className={classes.cantCard}>{quantited}</span>
      </h6>
    </div>
  </>
);

export default HeadingQuantity;
