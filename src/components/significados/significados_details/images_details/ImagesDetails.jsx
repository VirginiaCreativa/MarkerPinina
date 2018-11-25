import React from 'react';
import classes from './ImagesDetails.scss';

const ImagesDetails = ({ title, images }) => (
  <div className={classes.ImagesDetails}>
    {images.map(img => (
      <div className={classes.Images} key={img}>
        <img src={img} alt={title} />
      </div>
    ))}
  </div>
);

export default ImagesDetails;
