import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpotDetails, fetchSpotReviewsAsync, postReview } from "../../store/spotDetailPage";
import ReviewModal from '../ReviewModal/ReviewModal';
import "./SpotDetailPage.css";

function SpotDetailPage() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spotDetailPage.spot);
  const isLoading = useSelector((state) => state.spotDetailPage.isLoading);
  const spotReviews = useSelector((state) => state.spotDetailPage.spotReviews);
  const user = useSelector((state) => state.auth.user);

  const [showNoReviewsMessage, setShowNoReviewsMessage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [serverError, setServerError] = useState('');
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userHasPostedReview = useSelector((state) => state.spotDetailPage.userHasPostedReview);
  const userIsOwner = useSelector((state) => state.spotDetailPage.userIsOwner);

  useEffect(() => {
    dispatch(fetchSpotDetails(spotId));
    dispatch(fetchSpotReviewsAsync(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    // Check if there are no reviews and the current user is not the owner
    if (spotReviews.length === 0) {
      setShowNoReviewsMessage(true);
    } else {
      setShowNoReviewsMessage(false);
    }
  }, [spotReviews]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const openReviewModal = () => {
    setIsModalOpen(true);
  };
  
  const closeReviewModal = () => {
    setIsModalOpen(false);
    setComment('');
    setSelectedRating(0);
    setServerError('');
  };

  const handleSubmitReview = (reviewData) => {
    if (comment.trim() === '') {
      // Display an error or prevent submission when comment is empty
      setServerError('Review text is required.');
    } else {
      dispatch(postReview(spotId, reviewData));
    }
  }  

  // const handleLogin = () => {
  //   // Dispatch the login action with user credentials
  //   dispatch(login({ username: 'example', password: 'password' }));
  // };

  // const handleLogout = () => {
  //   // Dispatch the logout action
  //   dispatch(logout());
  // };

  // if(!spot) {
  //   return <p>Spot Not Found.</p>
  // }

  if (!spot.SpotImages || spot.SpotImages.length === 0) {
    return <p>No images available for this spot.</p>;
  }
  // const imageUrls = [];
  // for (let i = 1; i <= 5; i++) {
  //   const imageUrl = `/images/${spotId}_${i}.jpeg`;
  //   imageUrls.push(imageUrl);
  // }

   // Render reviews data
  const renderReviews = () => {
    if (spotReviews.length === 0) {
      return <p>No reviews available for this spot.</p>;
  }
  
  return (
    <div className="reviews-list">
        {spotReviews.map((review) => (
          <div key={review.id} className="review-item">
            <p className="reviewer-name">{review.User.firstName}</p>
            <p className="review-date">{formatDate(review.createdAt)}</p>
            <p className="review-comment">{review.review}</p>
          </div>
        ))}
      </div>
    );
  };
  const averageRating = spotReviews.reduce((sum, review) => sum + review.stars, 0) / spotReviews.length;
  
  const formatDate = (dateString) => {
    const options = { month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  return (
    <div className="spot-detail-container">
  {/* Heading */}
  {spot && (
  <div className="spot-detail-header">
    <h1 className="spot-name">{spot.name}</h1>
    {/* Location */}
    <p className="spot-location">{`${spot.city}, ${spot.state}, ${spot.country}`}</p>
  </div>
)}

  <div className="spot-detail-images">
    {/* Large Image */}
    <img
      src={spot.SpotImages[0].url}
      alt={spot.name}
      className="spot-large-image"
    />
    {/* Small Images */}
    <div className="spot-small-images">
      {spot && spot.SpotImages && spot.SpotImages.length > 0 ? (
        spot.SpotImages.slice(1).map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Image ${index + 2}`}
            className="spot-small-image"
          />
        ))
      ) : (
        <p>No images available for this spot.</p>
      )}
    </div>
  </div>
  <div className="spot-detail-info">
  <div className="hosted-callout-container">
    <div className="hosted-desc-container">
      {/* Hosted by */}
      <p className="hosted-by">{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}</p>
      {/* Description */}
      <p className="spot-description">{spot.description}</p>
    </div>
    {/* Callout information box */}
    <div className="callout-info-box">
      <div className="callout-header">
        <p className="price">{`$${spot.price} / night`}</p>
        <div className="callout-review">
          <img
            src={process.env.PUBLIC_URL + `/images/fullHeart.svg`}
            alt="Heart"
            className="callout-heart"
          />
          <p className="callout-rating">{averageRating.toFixed(1)} · {spotReviews.length} {spotReviews.length === 1 ? 'Review' : 'Reviews'}</p>
        </div>
      </div>
      <button
        className="reserve-button"
        onClick={() => alert("Feature coming soon")}
      >
        Reserve
      </button>
    </div>
  </div>
</div>
  {/* Display Reviews */}
  <div className="spot-reviews">
  <div className="reviews-header">
    <img 
      src={process.env.PUBLIC_URL + `/images/fullHeart.svg`}
      alt="Heart"
      className="review-heart"
    />
    {spotReviews.length > 0 && (
      <p className="rating-header">
        {averageRating.toFixed(1)} · {spotReviews.length} {spotReviews.length === 1 ? 'Review' : 'Reviews'}
      </p>
    )}
  </div>
  {/* {isLoggedIn ? ( // Use an if statement to conditionally render the button */}
      <button className="post-review-button" onClick={openReviewModal}>Post Your Review</button>
        {/* ) : null} */}
      {/* Modal for review form */}
      {isModalOpen && (
        <ReviewModal
          comment={comment}
          selectedRating={selectedRating}
          serverError={serverError}
          onClose={closeReviewModal}
          onCommentChange={(e) => setComment(e.target.value)}
          onRatingChange={(rating) => setSelectedRating(rating)}
          onSubmit={handleSubmitReview}
        />
      )}
  {spotReviews && spotReviews.length > 0 ? (
    <div className="reviews-list">
      {spotReviews.map((review) => (
        <div key={review.id} className="review-item">
          <p className="reviewer-name">{`${review.User.firstName}`}</p>
          <p className="review-date">{formatDate(review.createdAt)}</p>
          <p className="review-comment">{review.review}</p>
        </div>
      ))}
    </div>
  ) : (
    <p>No reviews available for this spot.</p>
  )}
</div>
</div>
  );
  
}

export default SpotDetailPage;
