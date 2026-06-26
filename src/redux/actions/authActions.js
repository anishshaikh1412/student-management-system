import * as types from '../types';

const API_URL = 'http://localhost:5000/users';

// Very simple authentication against the json-server "users" resource.
// In a real app passwords would never be checked client side like this.
export const login = (username, password) => async (dispatch) => {
  try {
    const res = await fetch(`${API_URL}?username=${encodeURIComponent(username)}`);
    if (!res.ok) throw new Error('Login request failed');
    const users = await res.json();
    const user = users.find((u) => u.password === password);

    if (!user) {
      dispatch({ type: types.LOGIN_FAIL, payload: 'Invalid username or password' });
      return false;
    }

    const { password: _pw, ...safeUser } = user;
    localStorage.setItem('sms_user', JSON.stringify(safeUser));
    dispatch({ type: types.LOGIN_SUCCESS, payload: safeUser });
    return true;
  } catch (err) {
    dispatch({
      type: types.LOGIN_FAIL,
      payload: 'Login failed. Is json-server running on port 5000?',
    });
    return false;
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('sms_user');
  dispatch({ type: types.LOGOUT });
};

// Restore session on app load if the user is already logged in
export const loadUserFromStorage = () => (dispatch) => {
  const stored = localStorage.getItem('sms_user');
  if (stored) {
    try {
      dispatch({ type: types.LOGIN_SUCCESS, payload: JSON.parse(stored) });
    } catch (e) {
      localStorage.removeItem('sms_user');
    }
  }
};
