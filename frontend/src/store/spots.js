import { csrfFetch } from "./csrf";

const GET_SPOTS = "spots/getSpots";
const ADD_SPOT = "spots/addSpot";
const GET_SPOT = "spots/getSpot";
const DISPLAY_USER_SPOTS = "spots/currentUserSpots";
const EDIT_SPOT = "spots/editSpot";
const DELETE_SPOT = "spots/deleteSpot";


//get spots action creator
const getAllSpots = (spots) => {
  return {
    type: GET_SPOTS,
    spots: spots.Spots,
  };
};
//add spot action creator
export const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
    spot,
  };
};

//get spot action creator
export const getSingleSpot = (spot) => {
  return {
    type: GET_SPOT,
    spot,
  };
};

//get current user spots action creator
export const getAllUserSpots = (spots) => {
  return {
    type: DISPLAY_USER_SPOTS,
    spots: spots.Spots,
  };
};

//edit spot action creator
export const editUserSpot = (spot) => {
  return {
    type: EDIT_SPOT,
    spot
  };
}

//delete spot action creator
export const deleteSpotAction = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId,
  }
}

//get all spots thunk action creator
export const getSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "GET",
  });
  const data = await response.json();

  dispatch(getAllSpots(data));

  return response;
};

//create spot thunk creator
export const writeSpot = (payload) => async (dispatch) => {
  let {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    previewImage,
  } = payload;

  const spot = {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  };

  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });
  console.log('were here', response)
  if (response.ok) {
    const spot = await response.json();
    console.log(spot)
    await csrfFetch(`/api/spots/${spot.id}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(previewImage),
    })
    if (response.ok) {
      dispatch(addSpot(spot));
      return spot;
    }
  }
};



//get single spot thunk creator
export const getSpot = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${payload}`, {
    method: "GET",
  });
  const data = await response.json();
  dispatch(getSingleSpot(data));
  return response;
};

//get user spots thunk creator
export const getUserSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/current", {
    method: "GET",
  });
  const data = await response.json();
  dispatch(getAllUserSpots(data));
  return response;
};

//edit spot thunk creator
export const editSpot = (payload) => async (dispatch) => {
  // const spotId = payload; //used to be payload.is.spotId
  // const newEditedSpot = payload.spot;
  // const newPreviewImage = payload.previewImage;
  const { spotId, spot: newEditedSpot, previewImage: newPreviewImage } = payload;


  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newEditedSpot),
  });
      if (response.ok) {
      const spot = await response.json();
    console.log(spot)
    dispatch(editUserSpot(spot));
    return spot;
  }
// }
};

//delete spot thunk action creator
export const deleteSpot = (spotId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      // const spot = await response.json();
      dispatch(deleteSpotAction(spotId));
      return spotId;
    }
  } catch (error) {
    console.error('errorrrrr', error.message);
    return null;
  }
}

// export const deleteSpot = (id, spotId) => async (dispatch) => {
//   try {
//     const response = await csrfFetch(`/api/spots/${id}`, {
//       method: 'DELETE'
//     });
//     if (response.ok) {
//       const spot = await response.json();
//       const waiting = await dispatch(deleteSpotAction(spotId))
//       const stillWaiting = await dispatch(getSpot(spotId))
//       return spot;
//     }
//   } catch (error) {
//       console.error("error deleting the spot", error);
//       throw error;
//   }
// }

const initialState = {
  allSpots: {},
  singleSpot: {},
};

const spotReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_SPOTS:
      newState = Object.assign({}, state);
      newState.allSpots = action.spots;
      return newState;
    case ADD_SPOT:
      newState = Object.assign({}, state);
      newState.allSpots = action.spot;
      return newState;
    case DISPLAY_USER_SPOTS:
      newState = Object.assign({}, state);
      let newObject = {}
      action.spots.forEach(spot => {
        newObject[spot.id] = spot
      })
      newState.allSpots = newObject;
      return newState;
    case GET_SPOT:
      newState = Object.assign({}, state);
      newState.singleSpot = action.spot;
      return newState;
    case DELETE_SPOT:
      console.log("DELETING SPOTTTT", action.spotId);
      newState = Object.assign({}, state);
      delete newState.allSpots[action.spotId];
      console.log("DELETE SUCCESSFUL?", newState);
      return newState;
    default:
      return state;
  }
};

export default spotReducer;
