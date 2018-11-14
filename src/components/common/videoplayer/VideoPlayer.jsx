/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { Component } from 'react';
import axios from 'axios';
import VideoPlayerLayout from './layout/VideoPlayerLayout';
import Spinner from '../spinner/Spinner';
import Video from './video/Video';

class VideoPlayer extends Component {
  state = {
    video: false,
    loading: true,
  };

  componentDidMount() {
    axios
      .get('/palabras')
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

  render() {
    const { video, loading } = this.state;
    const { srcVideo } = this.props;

    let loadingSpinner = null;

    if (loading) {
      loadingSpinner = <Spinner />;
    }

    return (
      <VideoPlayerLayout>
        {video ? <Video srcVideo={srcVideo} /> : loadingSpinner}
      </VideoPlayerLayout>
    );
  }
}
export default VideoPlayer;
