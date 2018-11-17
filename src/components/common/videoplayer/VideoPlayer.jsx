/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import axios from 'axios';
import VideoPlayerLayout from './layout/VideoPlayerLayout';
import Spinner from '../spinner/Spinner';
import Video from './video/Video';

class VideoPlayer extends Component {
  state = {
    video: false,
    loading: true,
    play: true,
  };

  componentDidMount() {
    axios
      .get('/significados')
      .then(response => {
        this.setState({
          video: true,
          loading: false,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: true });
      });
  }

  handlerTogglePlay = () => {
    this.videoPalabraRef.play();
    this.setState({
      play: false,
    });
  };

  handlerToggleOut = () => {
    this.videoPalabraRef.pause();
    this.videoPalabraRef.currentTime = 0;
    this.setState({
      play: true,
    });
  };

  render() {
    const { video, loading, pause, play } = this.state;
    const { srcVideo } = this.props;

    const videoPlayerShow = (
      <Video
        paused={pause}
        played={play}
        srcVideo={srcVideo}
        videoPalabraRef={v => (this.videoPalabraRef = v)}
        clickedOver={this.handlerTogglePlay}
        clickedOut={this.handlerToggleOut}
      />
    );
    let loadingSpinner = null;

    if (loading) {
      loadingSpinner = <Spinner />;
    }

    return (
      <VideoPlayerLayout>
        {video ? videoPlayerShow : loadingSpinner}
      </VideoPlayerLayout>
    );
  }
}
export default VideoPlayer;
