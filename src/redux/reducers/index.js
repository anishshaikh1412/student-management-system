import { combineReducers } from 'redux';
import studentReducer from './studentReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  students: studentReducer,
  auth: authReducer,
});

export default rootReducer;
