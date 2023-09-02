import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpotDetails, fetchSpotReviewsAsync } from "../../store/spotDetailPage";
import "./SpotDetailPage.css";

function SpotDetailPage() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spotDetailPage.spot);
  const isLoading = useSelector((state) => state.spotDetailPage.isLoading);
  const spotReviews = useSelector((state) => state.spotDetailPage.spotReviews);

  const [showNoReviewsMessage, setShowNoReviewsMessage] = useState(false);

  useEffect(() => {
    dispatch(fetchSpotDetails(spotId));
    dispatch(fetchSpotReviewsAsync(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    // Check if there are no reviews and the current user is not the owner
    if (spotReviews.length === 0 && !spot?.isOwner) {
      setShowNoReviewsMessage(true);
    } else {
      setShowNoReviewsMessage(false);
    }
  }, [spotReviews, spot]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

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

  
  const formatDate = (dateString) => {
    const options = { month: 'long', year: 'numeric'};
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
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
  <div className="spot-detail-header">
    <h1 className="spot-name">{spot.name}</h1>
    {/* Location */}
    <p className="spot-location">{`${spot.city}, ${spot.state}, ${spot.country}`}</p>
  </div>
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
