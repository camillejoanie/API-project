// frontend/src/store/landingPage.js
import { csrfFetch } from "./csrf";
// const SET_SPOTS = "landingPage/setSpots";
// const LOADING_SPOTS = "landingPage/loadingSpots";
const FETCH_SPOTS_REQUEST = "landingPage/fetchSpotsRequest";
const FETCH_SPOTS_SUCCESS = "landingPage/fetchSpotsSuccess";
const FETCH_SPOTS_FAILURE = "landingPage/fetchSpotsFailure";

// const setSpots = (spots) => ({
//     type: SET_SPOTS,
//     payload: spots,
// });

// const setLoadingSpots = (isLoading) => ({
//     type: LOADING_SPOTS,
//     payload: isLoading,
// });

const initialState = {
    spots: {},
    isLoading: false,
    error: null,
};

export const fetchSpotsRequest = () => ({
    type: FETCH_SPOTS_REQUEST,
});

export const fetchSpotsSuccess = (spots) => {
    console.log("Fetched spots:", spots);
    return {
      type: FETCH_SPOTS_SUCCESS,
      payload: spots,
    };
};

export const fetchSpotsFailure = (error) => ({
  type: FETCH_SPOTS_FAILURE,
  payload: error,
});

export const fetchSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');
    const data = await response.json();
    if(response.ok) {
        dispatch(fetchSpotsSuccess(data))
    }
};

const landingPageReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SPOTS_REQUEST:
        return { ...state, isLoading: true };
      case FETCH_SPOTS_SUCCESS:
        console.log("payload:", action.payload);
        const information = {};
        action.payload.Spots.forEach((spot) => {
          information[spot.id] = spot;
        })
        return { ...state, isLoading: false, spots: information };
      case FETCH_SPOTS_FAILURE:
        return { ...state, isLoading: false, error: action.payload };
      default:
        return state;
    }
};

export default landingPageReducer;