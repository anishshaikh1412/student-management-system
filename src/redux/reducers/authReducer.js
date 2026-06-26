import * as types from '../types';

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return { ...state, user: action.payload, isAuthenticated: true, error: null };
    case types.LOGIN_FAIL:
      return { ...state, user: null, isAuthenticated: false, error: action.payload };
    case types.LOGOUT:
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
};

export default authReducer;
