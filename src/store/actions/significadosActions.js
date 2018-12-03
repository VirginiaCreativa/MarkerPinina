import { database } from '../../config/firebase';

import {
  REQ_SIGNIFICADOS_BEGIN,
  REQ_SIGNIFICADOS_SUCESS,
  REQ_SIGNIFICADOS_FAILURE,
} from './types';

export function getSignificados(significados) {
  return dispatch => {
    dispatch({ type: REQ_SIGNIFICADOS_BEGIN });
    return database
      .ref('significados')
      .once('value')
      .then(snapshot => {
        dispatch({
          type: REQ_SIGNIFICADOS_SUCESS,
          payload: snapshot.val(),
          significados,
        });
      })
      .catch(error => {
        dispatch({
          type: REQ_SIGNIFICADOS_FAILURE,
          error,
        });
        throw error;
      });
  };
}

export function getSignificadosID(params, significados) {
  const ids = params - 1;
  return dispatch => {
    dispatch({ type: REQ_SIGNIFICADOS_BEGIN });
    return database
      .ref('significados' + ids)
      .once('value')
      .then(snapshot => {
        dispatch({
          type: REQ_SIGNIFICADOS_SUCESS,
          payload: snapshot.val(),
          significados,
        });
      })
      .catch(error => {
        dispatch({
          type: REQ_SIGNIFICADOS_FAILURE,
          error,
        });
        throw error;
      });
  };
}
