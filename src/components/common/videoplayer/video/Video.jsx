/* eslint-disable no-return-assign */
import React from 'react';
import classes from './Video.scss';
import Controls from './controls/Controls';

const Video = ({
  srcVideo,
  clickedOver,
  clickedOut,
  played,
  videoRef,
  onTimeUpdate,
}) => (
  <>
    <div className={classes.Video}>
      <div className={classes.ControlsVideo}>
        <Controls clickedOver={clickedOver} played={played} />
      </div>
      <video
        src={srcVideo}
        ref={videoRef}
        className="img-fluid"
        onMouseOver={clickedOver}
        onMouseOut={clickedOut}
        onTimeUpdate={onTimeUpdate}
      />
    </div>
  </>
);

export default Video;
