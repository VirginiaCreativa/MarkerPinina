/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import VideoPlayerLayout from './layout/VideoPlayerLayout';
import Spinner from '../spinner/Spinner';
import Video from './video/Video';

class VideoPlayer extends Component {
  state = {
    play: false,
  };

  componentDidMount() {
    const { play } = this.state;
    this.setState({ play: !play });
  }

  handlerTogglePlay = () => {
    this.VideoRef.play();
    const { play } = this.state;
    this.setState({
      play: !play,
    });
  };

  handlerToggleOut = () => {
    this.VideoRef.pause();
    this.VideoRef.currentTime = 0;
    const { play } = this.state;
    this.setState({
      play: !play,
    });
  };

  handleTimeUpdate = () => {
    console.log('HGolaaa');
  };

  render() {
    const { pause, play } = this.state;
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
        />
      );
    }

    return <VideoPlayerLayout>{videoPlayerShow}</VideoPlayerLayout>;
  }
}
export default VideoPlayer;
