import React, { Component } from 'react';
import { database } from '../../../config/firebase';
import Spinner from '../../common/spinner/Spinner';
import classes from './SignificadosDetails.scss';
import HeadignDetails from './heading_details/HeadingDetails';
import ContentDetails from './contents_details/ContentDetails';
import ImagesDetails from './images_details/ImagesDetails';

class SignificadosDetails extends Component {
  state = {
    significados: [],
    loading: true,
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
        const { loading } = this.state;
        const values = snapshot.val() || loading;
        this.setState({
          significados: values,
          loading: false,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { significados, loading } = this.state;

    if (loading) return <Spinner />;

    return (
      <div className={classes.SignificadosDetails}>
        <HeadignDetails
          title={significados.title}
          abrev={significados.abrev}
          abreviatura={significados.abreviatura}
        />
        <div className="row">
          <div className="col">
            <div className={classes.BoxItem}>
              <ContentDetails
                contentPrim={significados.contentPrim}
                contentSecu={significados.contentSecu}
                phrasesPrim={significados.phrasesPrim}
                phrasesSecu={significados.phrasesSecu}
              />
            </div>
            <div className={classes.BoxItem}>
              <h4>Imagenes</h4>
              <ImagesDetails {...significados} />
            </div>
            <div className={classes.BoxItem}>
              <h4>Grámatica</h4>
            </div>
          </div>
          <div className="col">
            <h2>Video</h2>
          </div>
        </div>
      </div>
    );
  }
}
export default SignificadosDetails;
