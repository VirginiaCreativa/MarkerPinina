/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import classes from './Controls.scss';

const Controls = ({ played, errored, currentTime, isDuration }) => {
  const formattedTime = secs => {
    // const min = parseFloat(secs).toFixed(0);
    const min = Math.round((secs * 100) / 100).toFixed(1);
    return min;
  };

  const progressClass = {
    width: currentTime + '%',
  };

  return (
    <>
      <div className={classes.Controls}>
        <h1>
          {formattedTime(currentTime)} / {isDuration}
        </h1>
        {played ? (
          <button type="button">
            <i className="bx bx-play-circle" />
          </button>
        ) : null}
        {errored && <i className="bx bx-error" />}
      </div>
      <div className={classes.Progress}>
        <div className={classes.ProgressBar} style={progressClass} />
        <div className={classes.ProgressFilled} />
      </div>
    </>
  );
};

export default Controls;
