import React from 'react';
import classes from './HeadingDetails.scss';

const HeadingDetails = ({ significado }) => (
  <div className={classes.HeadingDetails}>
    <h2>
      {significado.title}
      <span
        title={significado.abreviatura}
        className={[classes.Abrev, 'tag'].join(' ')}
      >
        {significado.abrev}
      </span>
    </h2>
  </div>
);

export default HeadingDetails;
