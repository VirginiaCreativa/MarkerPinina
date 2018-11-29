/* eslint-disable indent */
import {
  REQ_SIGNIFICADOS_BEGIN,
  REQ_SIGNIFICADOS_SUCESS,
  REQ_SIGNIFICADOS_FAILURE,
} from '../actions/types';

const initialState = {
  significados: [],
  loading: false,
  error: false,
};

function significadosReducer(state = initialState, action) {
  switch (action.type) {
    case REQ_SIGNIFICADOS_BEGIN:
      return {
        ...state,
        error: false,
        loading: true,
        significados: false,
      };
    case REQ_SIGNIFICADOS_SUCESS:
      console.log('====> REDUCER SIGNF', state);
      return {
        ...state,
        loading: false,
        error: false,
        significados: action.payload,
      };
    case REQ_SIGNIFICADOS_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        significados: false,
      };
    default:
      return state;
  }
}
export default significadosReducer;
