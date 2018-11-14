import React from 'react';
import classes from './Video.scss';

const Video = ({ srcVideo }) => (
  <div className={classes.Video}>
    <video src={srcVideo} autoPlay className="img-fluid" />
  </div>
);

export default Video;
