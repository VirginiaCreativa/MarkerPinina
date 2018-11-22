/* eslint-disable react/no-unused-state */
/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import VideoPlayerLayout from './layout/VideoPlayerLayout';
import Spinner from '../spinner/Spinner';
import Video from './video/Video';

class VideoPlayer extends Component {
  state = {
    play: true,
    currentTime: 0,
    duration: 0,
  };

  handlerTogglePlay = () => {
    const promise = this.VideoRef.play();

    if (promise !== undefined) {
      promise
        .then(_ => {
          this.setState({ play: false });
        })
        .catch(error => {
          this.setState({ play: true });
        });
    }
  };

  handlerToggleOut = () => {
    this.VideoRef.pause();
    this.VideoRef.currentTime = 0;
    const { play } = this.state;
    this.setState({
      play: true,
    });
  };

  handleDuration = e => {
    console.log(e);
  };

  handleTimeUpdate = e => {
    this.VideoRef = e.target;
    console.log(this.VideoRef);
    this.setState({ currentTime: this.VideoRef.currentTime });
  };

  render() {
    const { pause, play, currentTime, duration } = this.state;
    const { srcVideo, VideoLoading } = this.props;
    let videoPlayerShow = <Spinner />;
    if (VideoLoading) {
      videoPlayerShow = (
        <Video
          paused={pause}
          played={play}
          srcVideo={srcVideo}
          videoRef={v => (this.VideoRef = v)}
          clickedOver={this.handlerTogglePlay}
          clickedOut={this.handlerToggleOut}
          onTimeUpdate={this.handleTimeUpdate}
          // onLoadedMetadata={this.handleLoadMeta}
          currentTime={currentTime}
          isDuration={duration}
          onDurationChange={this.handleDuration}
        />
      );
    }

    return <VideoPlayerLayout>{videoPlayerShow}</VideoPlayerLayout>;
  }
}
export default VideoPlayer;
