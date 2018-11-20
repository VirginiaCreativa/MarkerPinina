import React from 'react';
import classes from './PalabraItem.scss';
import VideoPlayer from '../../../common/videoplayer/VideoPlayer';

const PalabraItem = ({ title, contentPrim, abrev, video }) => (
  <>
    <div className={classes.PalabraItem}>
      <div className={classes.View}>
        <VideoPlayer srcVideo={video} />
      </div>
      <div className={classes.Grid}>
        <div>
          <i className="bx bx-pin" />
        </div>
        <div className={classes.Content}>
          <h4>
            {title}
            <span className={classes.Abrev}>{abrev}</span>
          </h4>
          <p>{contentPrim}</p>
        </div>
      </div>
    </div>
  </>
);

export default PalabraItem;
