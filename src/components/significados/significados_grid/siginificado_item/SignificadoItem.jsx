import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import classes from './SignificadoItem.scss';
import VideoPlayer from '../../../common/videoplayer/VideoPlayer';

class SignificadoItem extends Component {
  state = {};

  render() {
    const {
      title,
      contentPrim,
      abrev,
      video,
      VideoLoading,
      phrasesPrim,
      link,
    } = this.props;
    return (
      <>
        <Link to={link}>
          <div className={classes.SignificadoItem}>
            <div className={classes.View}>
              <VideoPlayer srcVideo={video} VideoLoading={VideoLoading} />
            </div>
            <div className={classes.Content}>
              <h5>
                {title}
                <span className={[classes.Abrev, 'tag'].join(' ')}>
                  {abrev}
                </span>
              </h5>
              <p>{contentPrim}</p>
              <p className={classes.Phrases}>{phrasesPrim}</p>
            </div>
          </div>
        </Link>
      </>
    );
  }
}
export default withRouter(SignificadoItem);
