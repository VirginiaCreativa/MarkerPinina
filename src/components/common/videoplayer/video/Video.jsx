/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import classes from './Video.scss';
import Controls from './controls/Controls';

class Video extends Component {
  state = {
    played: false,
    duration: 0,
    currentTimeNumber: 0,
  };

  componentDidMount() {
    this.setState({ played: !this.props.autoplay });
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.played !== this.props.played) {
  //     this.togglePlay();
  //   }
  // }

  setRef = element => {
    this.video = element;
  };

  // togglePlay = () => {
  //   const { played } = this.props.played;
  //   if (played) {
  //     this.video.play();
  //   } else {
  //     this.video.pause();
  //     this.video.currentTime = 0;
  //   }
  // };

  handleTimeUpdate = e => {
    console.log(this.video.currentTime);
    this.setState({ currentTimeNumber: this.video.currentTime });
  };

  handleVideoOver = () => {
    this.video.play();
    this.setState({ played: false });
  };

  handleVideoOut = () => {
    this.video.pause();
    this.video.currentTime = 0;
    this.setState({ played: true });
  };

  handleLoadedMetadata = e => {
    this.video = e.target;
    this.setState({ duration: this.video.duration });
  };

  render() {
    const { srcVideo, title } = this.props;
    const { currentTimeNumber, played, duration } = this.state;
    return (
      <>
        <div className={classes.Video}>
          <div className={classes.ControlsVideo}>
            <Controls
              played={played}
              currentTime={currentTimeNumber}
              isDuration={duration}
            />
          </div>
          <video
            autoPlay={this.props.autoplay}
            src={srcVideo}
            ref={this.setRef}
            className="img-fluid"
            onMouseOver={this.handleVideoOver}
            onMouseOut={this.handleVideoOut}
            onTimeUpdate={this.handleTimeUpdate}
            onLoadedMetadata={this.handleLoadedMetadata}
            title={title}
            muted="muted"
          />
        </div>
      </>
    );
  }
}
export default Video;
