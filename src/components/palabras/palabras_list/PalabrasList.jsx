import React, { Component } from 'react';
import axios from 'axios';
import classes from './PalabrasLists.scss';
import PalabraItem from './palabra_item/PalabraItem';
import Spinner from '../../common/spinner/Spinner';

class PalabrasLists extends Component {
  state = {
    palabras: [],
    loading: false,
  };

  componentDidMount() {
    axios
      .get('https://markerpinina.firebaseio.com/palabra')
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

    // eslint-disable-next-line no-unused-vars
    let palabrasLoad = <Spinner />;
    // eslint-disable-next-line no-unused-vars
    let loadingSpinner = null;

    if (loading) {
      loadingSpinner = <Spinner />;
    }
    if (palabras) {
      palabrasLoad = (
        <>
          {palabras.map(palabra => (
            <PalabraItem key={palabra.id} {...palabra} />
          ))}
        </>
      );
    }
    return (
      <>
        <div className={classes.PalabrasLists}>
          {loadingSpinner}
          {palabrasLoad}
        </div>
      </>
    );
  }
}
export default PalabrasLists;
