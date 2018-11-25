import React from 'react';
import classes from './HeadingDetails.scss';

const HeadingDetails = ({ title, abrev, abreviatura }) => (
  <div className={classes.HeadingDetails}>
    <h1>
      {title}
      <span title={abreviatura} className={[classes.Abrev, 'tag'].join(' ')}>
        {abrev}
      </span>
    </h1>
  </div>
);

export default HeadingDetails;
