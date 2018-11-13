import React, { Component } from 'react';

const urlFound = require('../assets/images/error.gif');

class PalabrasLists extends Component {
  state = {};

  render() {
    return (
      <>
        <div>
          <img src={urlFound} alt="NOT FOUND" />
        </div>
      </>
    );
  }
}
export default PalabrasLists;
