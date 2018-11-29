import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getSignificados } from '../../../store/actions/significadosActions';
import SignificadoItem from './siginificado_item/SignificadoItem';
import Spinner from '../../common/spinner/Spinner';

class SignificadosGrid extends Component {
  componentDidMount() {
    this.props.dispatch(getSignificados());
  }

  render() {
    const { significados, loading, videoLoading, error } = this.props;

    if (error) {
      return <h1>ERROR! {error}</h1>;
    }
    if (loading) {
      return <Spinner />;
    }
    if (significados) {
      return significados.map(sig => (
        <SignificadoItem
          link={'/significadosdetail/' + sig.id}
          key={sig.id}
          {...sig}
          VideoLoading={videoLoading}
        />
      ));
    }
    return <>{significados}</>;
  }
}
const mapStateToProps = state => ({
  significados: state.signs.significados,
  loading: state.signs.loading,
  error: state.signs.error,
  videoLoading: state.signs.videoLoading,
});
export default connect(mapStateToProps)(SignificadosGrid);
