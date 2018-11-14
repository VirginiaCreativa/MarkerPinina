import React from 'react';
import classes from './VideoPlayerLayout.scss';

const VideoPlayerLayout = ({ children }) => (
  <>
    <div className={classes.VideoPlayerLayout}>{children}</div>
  </>
);

export default VideoPlayerLayout;
