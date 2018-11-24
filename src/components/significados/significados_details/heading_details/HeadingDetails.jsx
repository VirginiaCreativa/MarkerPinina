import React from 'react';
import classes from './HeadingDetails.scss';

const HeadingDetails = ({ title, abrev, abreviatura }) => (
  <div className={classes.HeadingDetails}>
    <h1>
      {title}
      <abb title={abreviatura} className={[classes.Abrev, 'tag'].join(' ')}>
        {abrev}
      </abb>
    </h1>
  </div>
);
1;
export default HeadingDetails;
