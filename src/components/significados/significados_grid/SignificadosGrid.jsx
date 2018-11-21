import React, { Component } from 'react';
import axios from 'axios';
import SignificadoItem from './siginificado_item/SignificadoItem';
import Spinner from '../../common/spinner/Spinner';

class SignificadosGrid extends Component {
  state = {
    significados: [],
    videoLoading: false,
    loading: true,
  };

  componentDidMount() {
    axios
      .get('/significados')
      .then(response => {
        this.setState({
          significados: response.data,
          videoLoading: true,
          loading: false,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: true });
      });
  }

  render() {
    const { significados, loading, videoLoading } = this.state;

    let significadosLoad = <Spinner />;
    let loadingSpinner = null;

    if (loading) {
      loadingSpinner = <Spinner />;
    }
    if (significados) {
      significadosLoad = (
        <>
          {significados.map(sig => (
            <SignificadoItem
              key={sig.id}
              {...sig}
              VideoLoading={videoLoading}
            />
          ))}
        </>
      );
    }
    return (
      <>
        {loadingSpinner}
        {significadosLoad}
      </>
    );
  }
}
export default SignificadosGrid;
