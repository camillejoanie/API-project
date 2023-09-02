import { csrfFetch } from './csrf';

// Action Types
const UPDATE_SPOT_REQUEST = 'spot/UPDATE_SPOT_REQUEST';
const UPDATE_SPOT_SUCCESS = 'spot/UPDATE_SPOT_SUCCESS';
const UPDATE_SPOT_FAILURE = 'spot/UPDATE_SPOT_FAILURE';

// Action Creators
export const updateSpotRequest = () => ({
  type: UPDATE_SPOT_REQUEST,
});

export const updateSpotSuccess = (updatedSpot) => ({
  type: UPDATE_SPOT_SUCCESS,
  payload: updatedSpot,
});

export const updateSpotFailure = (error) => ({
  type: UPDATE_SPOT_FAILURE,
  payload: error,
});

// Thunk
export const updateSpot = (spotData, spotId) => async (dispatch) => {
  dispatch(updateSpotRequest());
    const response = await csrfFetch(`/api/spot/${spotId}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(spotData),
    });

    if (response.ok) {
      const updatedSpot = await response.json();
      dispatch(updateSpotSuccess(updatedSpot));
    }
};

// Initial State
const initialState = {
  isLoading: false,
  error: null,
  updatedSpot: null,
};

// Reducer
const updateSpotReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SPOT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        updatedSpot: null,
      };
    case UPDATE_SPOT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        updatedSpot: action.payload,
      };
    case UPDATE_SPOT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default updateSpotReducer;
