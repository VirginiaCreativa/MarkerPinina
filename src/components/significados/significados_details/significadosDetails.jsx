import React, { Component } from 'react';
import { connect } from 'react-redux';
import { database } from '../../../config/firebase';
import Spinner from '../../common/spinner/Spinner';
import classes from './SignificadosDetails.scss';
import HeadignDetails from './heading_details/HeadingDetails';
import ContentDetails from './contents_details/ContentDetails';
import ImagesDetails from './images_details/ImagesDetails';
import EjemplosDetails from './ejemplos_details/EjemplosDetails';

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
          <div className="col-7">
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
              <h4>Ejemplos</h4>
              <EjemplosDetails {...significados} refLists={this.setRef} />
            </div>
          </div>
          <div className="col-5">
            <h2>Video</h2>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  significados: state.significados,
});
export default connect(mapStateToProps)(SignificadosDetails);
