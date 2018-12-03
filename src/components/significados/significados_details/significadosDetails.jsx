import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSignificadosID } from '../../../store/actions/significadosActions';
import Spinner from '../../common/spinner/Spinner';
import classes from './SignificadosDetails.scss';
import HeadignDetails from './heading_details/HeadingDetails';
import ContentDetails from './contents_details/ContentDetails';
import ImagesDetails from './images_details/ImagesDetails';
import EjemplosDetails from './ejemplos_details/EjemplosDetails';

class SignificadosDetails extends Component {
  componentDidMount() {
    this.props.dispatch(
      getSignificadosID(this.props.match.params.id, this.props.significados),
    );
  }

  render() {
    const { significados, loading, error } = this.props;
    if (error) return <h1>ERROR! {error}</h1>;
    if (loading) return <Spinner />;

    return (
      <div className={classes.SignificadosDetails}>
        {significados &&
          significados.map(significado => (
            <>
              <HeadignDetails {...significado} key={significado.id} />
              <div className="row">
                <div className="col-7">
                  <div className={classes.BoxItem}>
                    <ContentDetails {...significado} />
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
            </>
          ))}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  significados: state.signs.significados,
  loading: state.signs.loading,
  error: state.signs.error,
});
export default connect(mapStateToProps)(SignificadosDetails);
