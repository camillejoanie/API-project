// Import your csrfFetch and other necessary imports here
import { csrfFetch } from "./csrf";

// Action Types
const FETCH_SPOT_REQUEST = "spotDetail/FETCH_SPOT_REQUEST";
const FETCH_SPOT_SUCCESS = "spotDetail/FETCH_SPOT_SUCCESS";
const FETCH_SPOT_FAILURE = "spotDetail/FETCH_SPOT_FAILURE";
const FETCH_SPOT_REVIEWS_REQUEST = "spotDetail/FETCH_SPOT_REVIEWS_REQUEST";
const FETCH_SPOT_REVIEWS_SUCCESS = "spotDetail/FETCH_SPOT_REVIEWS_SUCCESS";
const FETCH_SPOT_REVIEWS_FAILURE = "spotDetail/FETCH_SPOT_REVIEWS_FAILURE";
const POST_REVIEW_REQUEST = "spotDetail/POST_REVIEW_REQUEST"; // Define new action type
const POST_REVIEW_SUCCESS = "spotDetail/POST_REVIEW_SUCCESS"; // Define new action type
const POST_REVIEW_FAILURE = "spotDetail/POST_REVIEW_FAILURE"; // Define new action type

// Action Creators
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

const postReviewRequest = () => ({
  type: POST_REVIEW_REQUEST,
});

const postReviewSuccess = (reviewData) => ({
  type: POST_REVIEW_SUCCESS,
  payload: reviewData,
});

const postReviewFailure = (error) => ({
  type: POST_REVIEW_FAILURE,
  payload: error,
});

// Thunks
export const fetchSpotDetails = (spotId) => async (dispatch) => {
  dispatch(fetchSpotRequest());

  try {
    // Use csrfFetch to fetch spot details
    const response = await csrfFetch(`/api/spots/${spotId}`);

    if (response.ok) {
      const spotData = await response.json();
      dispatch(fetchSpotSuccess(spotData));
    } else {
      console.error("Failed to fetch spot details");
      dispatch(fetchSpotFailure("Failed to fetch spot details"));
    }
  } catch (error) {
    console.error("Failed to fetch spot details:", error);
    dispatch(fetchSpotFailure("Failed to fetch spot details"));
  }
};

export const fetchSpotReviewsAsync = (spotId) => async (dispatch) => {
  dispatch(fetchSpotReviewsRequest());

  try {
    // Use csrfFetch to fetch spot reviews
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
      const reviews = await response.json();
      dispatch(fetchSpotReviewsSuccess(reviews.Reviews));
    } else {
      console.error("Failed to fetch spot reviews");
      dispatch(fetchSpotReviewsFailure("Failed to fetch spot reviews"));
    }
  } catch (error) {
    console.error("Failed to fetch spot reviews:", error);
    dispatch(fetchSpotReviewsFailure("Failed to fetch spot reviews"));
  }
};

export const postReview = (spotId, reviewData) => async (dispatch) => {
  dispatch(postReviewRequest());

  if (!reviewData.review.trim()) {
    // Display an error or prevent submission when review text is empty
    dispatch(postReviewFailure('Review text is required.'));
    return;
  }

  try {
    // Make an API request to post a review
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      // Handle the error response
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const newReview = await response.json();
    // Dispatch success action and add the new review to the store
    dispatch(postReviewSuccess(newReview));
  } catch (error) {
    // Handle and log the error
    console.error('Error while posting a review:', error);
    dispatch(postReviewFailure(error.message));
  }
};


// Reducer
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
