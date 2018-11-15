/* eslint-disable no-return-assign */
import React from 'react';
import classes from './Video.scss';
import Controls from './controls/Controls';

const Video = ({
  srcVideo,
  clickedOver,
  clickedOut,
  played,
  videoPalabraRef,
}) => (
  <>
    <div className={classes.Video}>
      <div className={classes.ControlsVideo}>
        <Controls clickedOver={clickedOver} played={played} />
      </div>
      <video
        src={srcVideo}
        ref={videoPalabraRef}
        className="img-fluid"
        onMouseOver={clickedOver}
        onMouseOut={clickedOut}
      />
    </div>
  </>
);

export default Video;
