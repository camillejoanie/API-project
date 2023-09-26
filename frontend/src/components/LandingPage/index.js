import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import './LandingPage.css'


export default function LandingPage() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.allSpots);

  const spotsList = Object.values(spots);

  const heartIcon = process.env.PUBLIC_URL + "/images/fullheart.svg";

  spotsList.map(spot => {
    if(typeof spot.avgRating === 'string') {
      spot.avgRating = 'New'
      return (spot.avgRating = "New");
    }
  })

  const landingPage = spotsList.map(
    ({ id, previewImage, city, state, price, avgRating, name }) => (
      <div key={id}>
        <div className="single-spot">
          <Link to={`/spots/${id}`}>
            <div className="single-spot-image-div">
              <img
                src={
                  previewImage ||
                  "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                }
                alt="house you may want to rent"
                title={name}
              />
            </div>
            <div className="spot-name-and-rating">
              <div className="spot-name">{name}</div>
              {/* <div className="single-spot-star-rating"> */}
                <img
                  src={heartIcon}
                  alt="Heart"
                  className="heart-image"
                />
                <div className="average-rating-value">
                  {typeof avgRating === 'number' && avgRating.toFixed(2)}{typeof avgRating === 'string' && avgRating}
                </div>
              {/* </div> */}
            </div>
            <div className="single-spot-city-state-price">
              <div className="single-spot-city-state">
                {city}, {state}
              </div>
              <div className="single-spot-price">${price}/night</div>
            </div>
          </Link>
        </div>
      </div>
    )
  );


  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  if (!spots) return null;
  return (
    <div className="all-Spots">
      <div className="all-spots-container">
        {landingPage}
      </div>
    </div>
  );
}
