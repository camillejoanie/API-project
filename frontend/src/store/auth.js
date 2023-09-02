import { csrfFetch } from './csrf';

// Action Types
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';

// Action Creators
const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: { user },
});

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

// Async Action Creator for Logging In
export const login = (credentials) => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      const user = await response.json();
      dispatch(loginSuccess(user));
    } else {
      // Handle login failure
      // ...
    }
  } catch (error) {
    console.error('An error occurred while logging in:', error);
    // Handle error
    // ...
  }
};

// Async Action Creator for Logging Out
export const logout = () => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/logout', {
      method: 'POST',
    });

    if (response.ok) {
      dispatch(logoutSuccess());
    } else {
      // Handle logout failure
      // ...
    }
  } catch (error) {
    console.error('An error occurred while logging out:', error);
    // Handle error
    // ...
  }
};

// Initial State
const initialState = {
  user: null,
};

// Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
