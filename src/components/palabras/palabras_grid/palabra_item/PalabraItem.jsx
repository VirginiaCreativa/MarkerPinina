/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import GifPlayer from 'react-gif-player';
import classes from './PalabraItem.scss';

const PalabraItem = ({ title, contentPrim, lsc, lscImage }) => (
  <>
    <div className={classes.PalabraItem}>
      <div className={classes.View}>
        <GifPlayer
          gif={lsc}
          still={lscImage}
          alt={title}
          className="img-fluid"
        />
      </div>
      <div className={classes.Grid}>
        <div>
          <i className="bx bx-pin" />
        </div>
        <div className={classes.Content}>
          <h4>{title}</h4>
          <p>{contentPrim}</p>
        </div>
      </div>
    </div>
  </>
);

export default PalabraItem;
