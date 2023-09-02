// LandingPage.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots } from "../../store/landingPage";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const dispatch = useDispatch();
  const allSpots = useSelector((state) => state.landingPage.spots);
  const spots = Object.values(allSpots);
  const isLoading = useSelector((state) => state.landingPage.isLoading);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  if (!spots.length) return null;

  return (
    <div className="landing-page-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="spot-tile-list">
          {spots.map((spot) => (
            <Link to={`/spot/${spot.id}`} key={spot.id} className="spot-tile">
              {/* Spot Image */}
              <div className="spot-image-container">
                <img
                  src={
                    spot.previewImage 
                    // ||
                    // process.env.PUBLIC_URL + `/images/${spot.id}_1.jpeg`
                  }
                  alt={`${spot.city}, ${spot.state}`}
                  className="spot-images"
                />
                <div className="spot-details">
            {/* Name */}
            <div className="spot-name">{spot.name}</div>
            <div className="spot-star-rating">
              <img
                src={process.env.PUBLIC_URL + `/images/fullHeart.svg`}
                alt="Heart"
                className="heart-image"
              />
              <span className="average-rating-value">
                {spot.avgRating === 0 ? "New" : spot.avgRating.toFixed(1)}
              </span>
            </div>
          </div>
                {/* City and State */}
                <div className="spot-location">
                  {spot.city}, {spot.state}
                </div>
                {/* Price and Star Review */}
                <div className="spot-price">
                  ${spot.price} / night
                  {/* <div className="spot-star-rating">
                    {spot.Reviews && spot.Reviews.length === 0 ? (
                      <span className="new-star-text">New</span>
                    ) : (
                      <div className="average-rating">
                        <img
                          src={process.env.PUBLIC_URL + `/images/fullheart.svg`}
                          alt="Heart"
                          className="heart-image"
                        />
                        <span className="average-rating-value">
                          {spot.avgRating.toFixed(1)}
                        </span>
                      </div>
                      // Array.from({ length: 5 }).map((_, index) => {
                      //   const starType =
                      //     spot.avgRating >= index + 1
                      //       ? "fullheart"
                      //       : spot.avgRating >= index + 0.5
                      //       ? "halfheart"
                      //       : "emptyheart";

                      //   return (
                      //     <img
                      //       key={index}
                      //       src={
                      //         process.env.PUBLIC_URL +
                      //         `/images/${starType}.svg`
                      //       }
                      //       alt={`${starType} Star`}
                      //       className="star-image"
                      //     />
                      //   );
                      // })
                    )}
                  </div> */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default LandingPage;
