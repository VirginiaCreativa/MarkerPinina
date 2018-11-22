/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import classes from './Controls.scss';

const Controls = ({ played, errored, currentTime, isDuration }) => {
  const handleProgress = (current, duration) => {
    const currentTime = parseFloat(current).toFixed(2);
    const isDuration = parseFloat(duration).toFixed(2);

    const percent = (currentTime / isDuration) * 100;
    return percent;
  };

  const progressClass = {
    width: handleProgress(currentTime, isDuration) + '%',
  };

  return (
    <>
      <div className={classes.Controls}>
        {played ? (
          <button type="button">
            <i className="bx bx-play-circle" />
          </button>
        ) : (
          <div className={classes.Progress}>
            <div className={classes.ProgressBar} style={progressClass} />
            <div className={classes.ProgressFilled} />
          </div>
        )}
        {errored && <i className="bx bx-error" />}
      </div>
    </>
  );
};

export default Controls;
