import React, { Component } from 'react';
import axios from 'axios';
import SignificadoItem from './significado_item/SignificadoItem';
import Spinner from '../../common/spinner/Spinner';

class PalabrasLists extends Component {
  state = {
    palabras: [],
    loading: false,
  };

  componentDidMount() {
    axios
      .get('/significados')
      .then(response => {
        this.setState({
          palabras: response.data,
          loading: false,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: true });
      });
  }

  render() {
    const { palabras, loading } = this.state;

    let palabrasLoad = <Spinner />;
    let loadingSpinner = null;

    if (loading) {
      loadingSpinner = <Spinner />;
    }
    if (palabras) {
      palabrasLoad = (
        <>
          {palabras.map(palabra => (
            <SignificadoItem key={palabra.id} {...palabra} />
          ))}
        </>
      );
    }
    return (
      <>
        {loadingSpinner}
        {palabrasLoad}
      </>
    );
  }
}
export default PalabrasLists;
