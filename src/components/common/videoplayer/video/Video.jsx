import React, { Component } from 'react';
import classes from './Video.scss';

class Video extends Component {
  state = {};

  render() {
    const { srcVideo } = this.props;
    return (
      <div className={classes.Video}>
        <video src={srcVideo} autoPlay className="img-fluid" />
      </div>
    );
  }
}
export default Video;
