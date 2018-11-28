import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSignificados } from '../../../actions/significadosActions';
import SignificadoItem from './significado_item/SignificadoItem';
import Spinner from '../../common/spinner/Spinner';

class SignificadosList extends Component {
  state = {};

  componentDidMount() {
    this.props.dispatch(fetchSignificados());
    console.log('COMPDIDMOUNT:', this.props.dispatch(fetchSignificados()));
  }

  render() {
    const { significados, loading, error } = this.props;

    let significadosLoad;
    let loadingSpinner = null;

    if (error) {
      return <div>Error! {error}</div>;
    }
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
    return <>{significadosLoad}</>;
  }
}
const mapStateToProps = state => {
  console.log('mapStateToProps ====>', state);
  return {
    significados: state.significados,
    loading: state.loading,
    error: state.error,
  };
};
export default connect(mapStateToProps)(SignificadosList);
