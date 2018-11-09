import React, { Component } from 'react';
import axios from 'axios';
import PalabraItem from './palabra_item/PalabraItem';

class PalabrasLists extends Component {
  state = {
    palabras: [],
  };

  componentDidMount() {
    axios
      .get('https://markerpinina.firebaseio.com/palabras.json')
      .then(response => {
        this.setState({ palabras: response.data });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { palabras } = this.state;
    return (
      <>
        {palabras.map(palabra => (
          <PalabraItem key={palabra.id} {...palabra} />
        ))}
      </>
    );
  }
}
export default PalabrasLists;
