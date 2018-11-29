import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSignificados } from '../../../store/actions/significadosActions';
import SignificadoItem from './significado_item/SignificadoItem';
import Spinner from '../../common/spinner/Spinner';

class SignificadosList extends Component {
  componentDidMount() {
    this.props.dispatch(getSignificados());
  }

  render() {
    const { significados, loading, error } = this.props;

    if (error) {
      return <h1>ERROR! {error}</h1>;
    }
    if (loading) {
      return <Spinner />;
    }
    if (significados) {
      return significados.map(sign => (
        <SignificadoItem
          {...sign}
          key={sign.id}
          images={sign.images[0]}
          link={'/significadosdetail/' + sign.id}
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
});
export default connect(mapStateToProps)(SignificadosList);
