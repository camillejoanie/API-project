// frontend/src/store/spotDetailPage.js
import { csrfFetch } from "./csrf";

// action type
const FETCH_SPOT_REQUEST = "spotDetail/FETCH_SPOT_REQUEST";
const FETCH_SPOT_SUCCESS = "spotDetail/FETCH_SPOT_SUCCESS";
const FETCH_SPOT_FAILURE = "spotDetail/FETCH_SPOT_FAILURE";
const FETCH_SPOT_REVIEWS_REQUEST = "spotDetail/FETCH_SPOT_REVIEWS_REQUEST";
const FETCH_SPOT_REVIEWS_SUCCESS = "spotDetail/FETCH_SPOT_REVIEWS_SUCCESS";
const FETCH_SPOT_REVIEWS_FAILURE = "spotDetail/FETCH_SPOT_REVIEWS_FAILURE";

const fetchSpotRequest = () => ({
  type: FETCH_SPOT_REQUEST,
});

const fetchSpotSuccess = (spotData) => ({
  type: FETCH_SPOT_SUCCESS,
  payload: spotData,
});

const fetchSpotFailure = (error) => ({
  type: FETCH_SPOT_FAILURE,
  payload: error,
});

const fetchSpotReviewsRequest = () => ({
  type: FETCH_SPOT_REVIEWS_REQUEST,
});

const fetchSpotReviewsSuccess = (reviews) => ({
  type: FETCH_SPOT_REVIEWS_SUCCESS,
  payload: reviews,
});

const fetchSpotReviewsFailure = (error) => ({
  type: FETCH_SPOT_REVIEWS_FAILURE,
  payload: error,
});

export const fetchSpotDetails = (spotId) => async (dispatch) => {
  dispatch(fetchSpotRequest(spotId));
    const response = await csrfFetch(`/api/spots/${spotId}`);
    if (response.ok) {
      const spotData = await response.json();
      dispatch(fetchSpotSuccess(spotData));
    } else {
      console.error("Failed to fetch spot details");
      dispatch(fetchSpotFailure("Failed to fetch spot details"));
    }
};
  
export const fetchSpotReviewsAsync = (spotId) => async (dispatch) => {
  dispatch(fetchSpotReviewsRequest());
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(fetchSpotReviewsSuccess(reviews.Reviews));
  } else {
    console.error("Failed to fetch spot reviews");
    dispatch(fetchSpotReviewsFailure("Failed to fetch spot reviews"));
  }
};

const initialState = {
  spot: {},
  isLoading: false,
  error: null,
  spotReviews: [],
  reviewsLoading: false,
  reviewsError: null,
};

const spotDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SPOT_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_SPOT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        spot: action.payload,
        error: null,
      };
    case FETCH_SPOT_FAILURE:
      return {
        ...state,
        isLoading: false,
        spot: null,
        error: action.payload,
      };
    case FETCH_SPOT_REVIEWS_REQUEST:
      return { ...state, reviewsLoading: true, reviewsError: null };
    case FETCH_SPOT_REVIEWS_SUCCESS:
      return {
        ...state,
        reviewsLoading: false,
        spotReviews: action.payload,
        reviewsError: null,
      };
    case FETCH_SPOT_REVIEWS_FAILURE:
      return {
        ...state,
        reviewsLoading: false,
        spotReviews: [],
        reviewsError: action.payload,
      };
    default:
      return state;
  }
};

export default spotDetailReducer;
