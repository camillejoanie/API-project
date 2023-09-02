// frontend/src/store/spots.js
import { csrfFetch } from "./csrf";
import { createSlice } from '@reduxjs/toolkit';

const CREATE_SPOT = "spots/createSpot";
const REMOVE_DELETED_SPOT = "spots/removeDeletedSpot";

const createSpotAction = (spot) => ({
  type: CREATE_SPOT,
  payload: spot,
});

const removeDeletedSpotAction = (spotId) => ({
  type: REMOVE_DELETED_SPOT,
  payload: spotId,
});

const spotsSlice = createSlice({
  name: "spots",
  initialState: {
    userSpots: [],
  },
  reducers: {
    setUserSpots(state, action) {
      state.userSpots = action.payload;
    },
  },
});

export const { setUserSpots } = spotsSlice.actions;

export const fetchUserSpotsAsync = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}/spots`);
  if (response.ok) {
    const userSpots = await response.json();
    dispatch(setUserSpots(userSpots));
  }
};

export const createSpot = (spotData) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spotData),
  });

  if (response.ok) {
    const spot = await response.json();
    dispatch(createSpotAction(spot));
    return spot;
  } else {
    throw new Error("Failed to create spot");
  }
};

export const deleteSpot = (spotId) => async (dispatch) => {
  await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  dispatch(removeDeletedSpotAction(spotId));
}

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SPOT:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };

    case REMOVE_DELETED_SPOT:
      const { [action.payload]: deletedSpot, ...updatedState } = state;
      return updatedState;
    default:
      return state;
  }
};

export default spotsReducer;
