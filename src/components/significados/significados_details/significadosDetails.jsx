/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import axios from 'axios';
import { database } from '../../../config/firebase';

class SignificadosDetails extends Component {
  state = {
    significados: [],
  };

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const ids = this.props.match.params.id - 1;
    const significadosRef = database.ref('significados/' + ids);
    significadosRef
      .once('value')
      .then(snapshot => {
        const values = snapshot.val() || {};
        console.log(values.title);
        this.setState({ significados: values });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { significados } = this.state;
    return (
      <div>
        <h3>REDAT</h3>
        <h1>{significados.title}</h1>
        <h3>ID: {this.props.match.params.id}</h3>
      </div>
    );
  }
}
export default SignificadosDetails;
