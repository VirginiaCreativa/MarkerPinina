import { combineReducers } from 'redux';
import significadosReducer from './significadosReducer';

export default combineReducers({
  signs: significadosReducer,
});
