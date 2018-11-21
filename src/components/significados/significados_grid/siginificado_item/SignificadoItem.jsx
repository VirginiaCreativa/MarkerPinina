import React, { Component } from 'react';
import classes from './SignificadoItem.scss';
import Spinner from '../../../common/spinner/Spinner';
import VideoPlayer from '../../../common/videoplayer/VideoPlayer';

class SignificadoItem extends Component {
  state = {};

  render() {
    const { title, contentPrim, abrev, video, VideoLoading } = this.props;
    return (
      <>
        <div className={classes.SignificadoItem}>
          <div className={classes.View}>
            <VideoPlayer srcVideo={video} VideoLoading={VideoLoading} />
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
  }
}
export default SignificadoItem;
