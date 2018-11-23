import React, { Component } from 'react';
import axios from 'axios';
import DocumentItem from './documento_item/DocumentoItem';
import Spinner from '../../common/spinner/Spinner';

class DocumentosLists extends Component {
  state = {
    documentos: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get('/documentos')
      .then(response => {
        this.setState({
          documentos: response.data,
          loading: false,
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: true,
        });
      });
  }

  render() {
    const { documentos, loading } = this.state;
    let documentosLoad = <Spinner />;
    let loadingSpinner = null;

    if (loading) {
      loadingSpinner = <Spinner />;
    }

    if (documentos) {
      documentosLoad = (
        <>
          {documentos.map(doc => (
            <DocumentItem key={doc.id} {...doc} />
          ))}
        </>
      );
    }
    return (
      <>
        {loadingSpinner}
        {documentosLoad}
      </>
    );
  }
}
export default DocumentosLists;
