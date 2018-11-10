import React, { Component } from 'react';
import axios from 'axios';
import SignificadoItem from './significado_item/SignificadoItem';
import Spinner from '../../common/spinner/Spinner';

class SignficadosGrid extends Component {
  state = {
    significados: [],
    loading: false,
  };

  componentDidMount() {
    axios
      .get('https://markerpinina.firebaseio.com/significados.json')
      .then(response => {
        this.setState({
          significados: response.data,
          loading: false,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: true });
      });
  }

  render() {
    const { significados, loading } = this.state;

    let significadosLoad = <Spinner />;
    let loadingSpinner = null;

    if (loading) {
      loadingSpinner = <Spinner />;
    }

    if (significados) {
      significadosLoad = (
        <>
          {significados.map(significado => (
            <SignificadoItem key={significado.id} {...significado} />
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
export default SignficadosGrid;
