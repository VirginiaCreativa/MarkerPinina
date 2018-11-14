import React, { Component } from 'react';
import axios from 'axios';
import NotebookItem from './notebook_item/NotebookItem';
import Spinner from '../../common/spinner/Spinner';

class NotebookGrid extends Component {
  state = {
    notebooks: [],
    loading: false,
  };

  componentDidMount() {
    axios
      .get('https://markerpinina.firebaseio.com/notebook.json')
      .then(response => {
        this.setState({
          notebooks: response.data,
          loading: false,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: true });
      });
  }

  render() {
    const { notebooks, loading } = this.state;

    let notebooksLoad = <Spinner />;
    let loadingSpinner = null;

    if (loading) {
      loadingSpinner = <Spinner />;
    }

    if (notebooks) {
      notebooksLoad = (
        <>
          {notebooks.map(note => (
            <NotebookItem key={note.id} {...note} />
          ))}
        </>
      );
    }
    return (
      <>
        {loadingSpinner}
        {notebooksLoad}
      </>
    );
  }
}
export default NotebookGrid;
