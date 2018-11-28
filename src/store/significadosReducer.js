/* eslint-disable indent */
import {
  REQ_SIGNIFICADOS_BEGIN,
  REQ_SIGNIFICADOS_SUCESS,
  REQ_SIGNIFICADOS_FAILURE,
} from '../actions/types';

const initialState = {
  significados: [],
  loading: false,
  error: null,
};

export default function significadosReducer(state = initialState, action) {
  switch (action.type) {
    case REQ_SIGNIFICADOS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REQ_SIGNIFICADOS_SUCESS:
      console.log('====> REDUCER', action.payload);
      return {
        ...state,
        loading: false,
        significados: action.payload.significados,
      };
    case REQ_SIGNIFICADOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        significados: [],
      };
    default:
      return state;
  }
}
