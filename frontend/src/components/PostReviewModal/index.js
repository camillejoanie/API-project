import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { postReview } from "../../store/reviews";
import React, { useState } from "react";
import "./PostReviewModal.css";
import HeartRating from "./HeartRating";


function PostReviewModal(props) {

  const spotId  = props.props.spotId;
  const userId  = props.props.currentUserId
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

  // let isDisabled = false;
  // if (review.length < 10 || stars === "") {
  //   isDisabled = true;
  // }

  // const reviewRating = (stars) => {
  //   setStars(stars);
  // };

  const updateDisabledState = () => {
    setIsDisabled(review.length < 10 || stars === "");
  };

  const reviewRating = (stars) => {
    setStars(stars);
    updateDisabledState();
  };

  const submitReview = async (e) => {
    e.preventDefault();

    const newReview = {
      userId,
      spotId,
      review,
      stars,
    };

    await dispatch(postReview(spotId, newReview)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    });
    reset();
    closeModal();
  };

  const handleClose = () => {
    closeModal();
  };

  const reset = () => {
    setReview("");
    setStars("");
  };

  // console.log(stars);

  return (
    <div className="review-form-modal">
      <button className="close-button" onClick={handleClose}>
        X
      </button>
      <h1 className="review-form-header">How was your boba?</h1>
      <>{errors.message}</>
      <textarea
        className="post-review-form-modal"
        placeholder="Leave your review here..."
        onChange={(e) => {
          setReview(e.target.value);
          // Update disabled state when input changes
          updateDisabledState();
        }}
        value={review}
      ></textarea>
      <div className="review-stars-post-review-modal">
        <HeartRating className="heart-rating-buttons" onChange={reviewRating} value={stars} />
        <div className="review-rating-text">Hearts</div>
      </div>
      <button className={`submit-review-button ${isDisabled ? 'submit-review-button-disabled' : ''}`} onClick={submitReview} disabled={isDisabled}>
        Submit Your Review
      </button>
    </div>
  );
}

export default PostReviewModal;
