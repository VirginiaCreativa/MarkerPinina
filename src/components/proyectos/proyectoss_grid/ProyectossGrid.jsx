import React, { Component } from 'react';
import axios from 'axios';
import GramaticaItem from './gramatica_item/GramaticaItem';
import Spinner from '../../common/spinner/Spinner';

class GramaticaGrid extends Component {
  state = {
    gramaticas: [],
    loading: false,
  };

  componentDidMount() {
    axios
      .get('https://markerpinina.firebaseio.com/gramaticas.json')
      .then(response => {
        this.setState({
          gramaticas: response.data,
          loading: false,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: true });
      });
  }

  render() {
    const { gramaticas, loading } = this.state;

    let gramaticasLoad = <Spinner />;
    let loadingSpinner = null;

    if (loading) {
      loadingSpinner = <Spinner />;
    }

    if (gramaticas) {
      gramaticasLoad = (
        <>
          {gramaticas.map(gram => (
            <GramaticaItem key={gram.id} {...gram} />
          ))}
        </>
      );
    }
    return (
      <>
        {loadingSpinner}
        {gramaticasLoad}
      </>
    );
  }
}
export default GramaticaGrid;
