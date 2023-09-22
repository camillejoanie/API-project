import { csrfFetch } from "./csrf";
import { getSpot } from "./spots";

const GET_REVIEWS = "reviews/getReviews";
const POST_REVIEW = "reviews/new";

export const getSpotReviews = (reviews) => {
  return {
    type: GET_REVIEWS,
    reviews: reviews.Reviews,
  };
};

export const addReview = (review) => {
  return {
    type: POST_REVIEW,
    review,
  };
};

export const getReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "GET",
  });
  const data = await response.json();
  if(response.ok) {
    dispatch(getSpotReviews(data));
    return response;
  } else if(!response.ok && data.message) {
    dispatch(getSpotReviews({Reviews: []}))
  }
};

export const postReview = (spotId, payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const review = await response.json();
    dispatch(getReviews(spotId));
    dispatch(getSpot(spotId))
    return review;
  }
};

//delete Review thunk action creator
export const deleteReview = (id, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    const review = await response.json();
    const waiting = await dispatch(getReviews(spotId))
    const stillWaiting = await dispatch(getSpot(spotId))
    return review;
  }
}

const initalState = {
  spot: {},
  user: {},
};

const reviewsReducer = (state = initalState, action) => {
  let newState;
  switch (action.type) {
    case GET_REVIEWS:
      newState = Object.assign({}, state);
      let newObject = {}
      action.reviews.forEach(review => {
        newObject[review.id] = review
      })
      newState.spot = newObject;
      return newState;
    case POST_REVIEW:
      newState = Object.assign({}, state);
      newState.spot = action.review;
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
