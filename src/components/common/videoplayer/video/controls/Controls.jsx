/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import classes from './Controls.scss';

const Controls = ({ played }) => (
  <>
    <div className={classes.Controls}>
      {played ? (
        <button type="button">
          <i className="bx bx-play-circle" />
        </button>
      ) : null}
    </div>
  </>
);

export default Controls;
