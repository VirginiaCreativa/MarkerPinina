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
  videoLoading: false,
};

function significadosReducer(state = initialState, action) {
  switch (action.type) {
    case REQ_SIGNIFICADOS_BEGIN:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case REQ_SIGNIFICADOS_SUCESS:
      return {
        ...state,
        loading: false,
        error: false,
        significados: action.payload,
        videoLoading: true,
      };
    case REQ_SIGNIFICADOS_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
      };
    default:
      return state;
  }
}
export default significadosReducer;
