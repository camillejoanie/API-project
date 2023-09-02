import { csrfFetch } from "./csrf";

// Action Types
// const FETCH_USER_SPOTS_REQUEST = "manageSpots/FETCH_USER_SPOTS_REQUEST";
const FETCH_USER_SPOTS_SUCCESS = "manageSpots/FETCH_USER_SPOTS_SUCCESS";
const FETCH_USER_SPOTS_FAILURE = "manageSpots/FETCH_USER_SPOTS_FAILURE";
// Action Creators
const fetchUserSpotsSuccess = (userSpots) => ({
  type: FETCH_USER_SPOTS_SUCCESS,
  payload: userSpots,
});

const fetchUserSpotsFailure = (error) => ({
  type: FETCH_USER_SPOTS_FAILURE,
  payload: error,
});

// Async Action Creator
export const fetchUserSpots = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots/current");
    if(response.ok) {
        const { Spots: userSpots } = await response.json();
        dispatch(fetchUserSpotsSuccess(userSpots));
    }
};

// Initial State
const initialState = {
  userSpots: [],
  isLoading: false,
  error: null,
};

// Reducer
const manageSpotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_SPOTS_SUCCESS:
      return {
        ...state,
        userSpots: action.payload,
        isLoading: false,
        error: null,
      };
    case FETCH_USER_SPOTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default manageSpotsReducer;

