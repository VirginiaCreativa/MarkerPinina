/* eslint-disable no-use-before-define */
import { database } from '../config/firebase';

import {
  REQ_SIGNIFICADOS_BEGIN,
  REQ_SIGNIFICADOS_SUCESS,
  REQ_SIGNIFICADOS_FAILURE,
} from './types';

export const fetchSignificados = () => dispatch => {
  database
    .ref('significados')
    .once('value')
    .then(snapshot => {
      const values = snapshot.val();
      console.log(values);
      dispatch(getSignificadosSucess(values));
    })
    .catch(error => {
      dispatch(getSignificadosFailure(error));
    });
};

function getSignificadosBegin() {
  return { type: REQ_SIGNIFICADOS_BEGIN };
}

function getSignificadosSucess(significados) {
  return {
    type: REQ_SIGNIFICADOS_SUCESS,
    payload: significados,
  };
}

function getSignificadosFailure(error) {
  return {
    type: REQ_SIGNIFICADOS_FAILURE,
    payload: error,
  };
}
