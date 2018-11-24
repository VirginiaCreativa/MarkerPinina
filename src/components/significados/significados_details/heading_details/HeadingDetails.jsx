import React from 'react';
import classes from './HeadingDetails.scss';

const HeadingDetails = ({ title, abrev, abreviatura }) => (
  <div className={classes.HeadingDetails}>
    <h3>
      {title}
      <abb title={abreviatura} className={[classes.Abrev, 'tag'].join(' ')}>
        {abrev}
      </abb>
    </h3>
  </div>
);

export default HeadingDetails;
