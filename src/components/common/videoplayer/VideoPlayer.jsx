/* eslint-disable jsx-a11y/media-has-caption */
import React, { Component } from 'react';
import VideoPlayerLayout from './layout/VideoPlayerLayout';
import Video from './video/Video';

class VideoPlayer extends Component {
  state = {};

  render() {
    return (
      <VideoPlayerLayout>
        <Video />
      </VideoPlayerLayout>
    );
  }
}
export default VideoPlayer;
