import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { database } from '../../../config/firebase';
import SignificadoItem from './significado_item/SignificadoItem';
import Spinner from '../../common/spinner/Spinner';

class SignificadosList extends Component {
  state = {
    significados: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get('/significados')
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
          {significados.map(sign => (
            <SignificadoItem
              key={sign.id}
              {...sign}
              images={sign.images[0]}
              link={'/significadosdetail/' + sign.id}
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
export default withRouter(SignificadosList);
