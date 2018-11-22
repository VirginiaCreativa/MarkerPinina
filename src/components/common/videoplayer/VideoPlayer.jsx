/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import VideoPlayerLayout from './layout/VideoPlayerLayout';
import Spinner from '../spinner/Spinner';
import Video from './video/Video';

class VideoPlayer extends Component {
  state = {};

  render() {
    const { srcVideo, VideoLoading, title } = this.props;
    let videoPlayerShow = <Spinner />;
    if (VideoLoading) {
      videoPlayerShow = <Video srcVideo={srcVideo} title={title} />;
    }

    return <VideoPlayerLayout>{videoPlayerShow}</VideoPlayerLayout>;
  }
}
export default VideoPlayer;
