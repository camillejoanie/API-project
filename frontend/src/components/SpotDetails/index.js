import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpot } from "../../store/spots";
import { useParams } from "react-router-dom";
import SpotReviews from "../SpotReviews";
import "./SpotDetails.css";

export default function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const singleSpot = useSelector((state) => state.spots.singleSpot);
  console.log("AHHHHHHHHHH", singleSpot);

  const fullHeart = process.env.PUBLIC_URL + "/images/fullheart.svg";
  const halfHeart = process.env.PUBLIC_URL + "/images/emptyheart.svg";

  useEffect(() => {
    dispatch(getSpot(spotId));
  }, [dispatch, spotId]);

  if (!singleSpot.id) return null;

  let spotImages = [];
  singleSpot.SpotImages.forEach((image) => {
    spotImages.push(image);
  });

  for (let i = 0; i <= 4; i++) {
    spotImages.push({
      url: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg",
    });
  }

  let averageStartRating;
  if (typeof singleSpot.avgStarRating === "undefined") {
    averageStartRating = null;
  } else if (typeof singleSpot.avgStarRating === "string") {
    averageStartRating = "New";
  } else {
    averageStartRating = singleSpot.avgStarRating.toFixed(2);
  }

  const featureComingSoon = () => {
    alert('Feature coming soon!')
  }


  return (
    <div className="spot-details-container">
    <div className="single-spot-container">
      <div className="spot-name-and-location">
        <h1 className="spot-details-name">{singleSpot.name}</h1>
        <p className="spot-details-location">
          {singleSpot.city}, {singleSpot.state}, {singleSpot.country}
        </p>
      </div>
      <div className="spot-images">
        <img
          className="spot-details-preview-image"
          src={spotImages[0].url}
          alt="boba pic 1"
        />

        <img
          className="spot-details-image-one"
          src={spotImages[1].url}
          alt="boba pic 2"
        />

        <img
          className="spot-details-image-two"
          src={spotImages[2].url}
          alt="boba picc 3"
        />

        <img
          className="spot-details-image-three"
          src={spotImages[3].url}
          alt="boba pic 4"
        />

        <img
          className="spot-details-image-four"
          src={spotImages[4].url}
          alt="boba pic 5"
        />
      </div>

      <div className="hosted-by-description-reserve">
        <div className="hosted-by">
          Hosted by {singleSpot.Owner.firstName} {singleSpot.Owner.lastName}
        </div>
        <div className="description">{singleSpot.description}</div>
        <div className="reserve-box">
          <div className="price-per-night">${singleSpot.price}/night</div>
          <div className="heart-rating-num-reviews">
            {(singleSpot.numReviews === 0 || !singleSpot.numReviews) && (
            <div className="reserve-review-title">
              <img
                src={fullHeart}
                alt="Heart"
                className="reserve-heart-icon-new"
              />
              <div className="heart-text-new">New</div>
            </div>
            )}{" "}
            {singleSpot.numReviews === 1 && (
            <div className="reserve-review-title">
              <img
                src={fullHeart}
                alt="Heart"
                className="reserve-heart-icon"
              />
              <div className="heart-text">
                {averageStartRating} · 1 Review
              </div>
            </div>
            )}{" "}
            {singleSpot.numReviews > 1 && (
            <div className="reserve-review-title">
              <img
                src={fullHeart}
                alt="Heart"
                className="reserve-heart-icon"
              />
              <div className="heart-text">
                {averageStartRating} · {singleSpot.numReviews} Reviews
              </div>
            </div>
            )}
          </div>
          <div className="reserve-button-div">
            <button className="reserve-button" onClick={featureComingSoon}>
              Reserve
            </button>
          </div>
          <div className="reserve-button-div">
            <button className="reserve-button" onClick={featureComingSoon}>
              Reserve
            </button>
          </div>
        </div>
      </div>
      <div className="reviews">
        <div className="star-rating-num-reviews-over-reviews">
          {(singleSpot.numReviews === 0 || !singleSpot.numReviews) && (
            <div className="review-title">
              <img
                src={fullHeart}
                alt="Heart"
                className="heart-icon"
              /> 
              <div className="review-title-text">New</div>
            </div>
          )}{" "}
          {singleSpot.numReviews === 1 && (
            <div className="review-title">
              <img
                src={fullHeart}
                alt="Heart"
                className="heart-icon"
              />
              <div className="review-title-text">
              {averageStartRating}
              {" "}
              · 1 Review
              </div>
            </div>
          )}{" "}
          {singleSpot.numReviews > 1 && (
            <div className="review-title">
              <img
                src={fullHeart}
                alt="Heart"
                className="heart-icon"
              />
              <div className="review-title-text">
              {averageStartRating}{" "}
              ·{" "}
              {singleSpot.numReviews}{" "}
              {singleSpot.numReviews === 1 ? 'Review' : 'Reviews'}
              </div>
            </div>
          )}
        </div>
        <div className="reviews-container">
          <SpotReviews />
        </div>
      </div>
    </div>
    </div>
  );
}
