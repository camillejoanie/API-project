// ManageSpots.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSpots } from "../../store/manageSpots";
import { Link } from 'react-router-dom';
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { deleteSpot } from "../../store/spots";
import "./ManageSpots.css";

function ManageSpots() {
  const dispatch = useDispatch();
  const userSpots = useSelector((state) => (state.manageSpots.userSpots));
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [spotToDelete, setSpotToDelete] = useState(null);
  // const userSpot = Object.values(spots);
  // console.log("Spots from Redux:", userSpots);

  const handleDeleteSpot = (spotId) => {
    setSpotToDelete(spotId)
    setConfirmationModal(true);
  }

  const handleConfirmDelete = () => {
    if(spotToDelete){
      dispatch(deleteSpot(spotToDelete))
      setConfirmationModal(false);
    }
  }

  const handleCancelDelete = () => {
    setSpotToDelete(null);
    setConfirmationModal(false);
  }

  useEffect(() => {
    dispatch(fetchUserSpots());
  }, [dispatch]);

  if (!userSpots || userSpots.length === 0) {
    return (
      <div className="spot-management-page">
        <h2>Manage Spots</h2>
        <p>No spots have been posted yet.</p>
      </div>
    );
  }

  return (
    <div className="spot-management-page">
      <h2>Manage Spots</h2>

      {/* Conditionally show "Create a New Spot" link */}
      {userSpots.length === 0 && (
        <p>
          No spots have been posted yet.{" "}
          <Link to="/new-spot">Create a New Spot</Link>
        </p>
      )}

      <div className="spot-tile-list">
        {userSpots.map((spot) => (
          <Link
            to={`/spot/${spot.id}`} // Navigate to spot detail page
            key={spot.id}
            className="spot-tile"
          >
            {/* Spot Image */}
            <div className="spot-image-container">
              <img
                src={spot.previewImage}
                alt={`${spot.city}, ${spot.state}`}
                className="spot-images"
              />
              {/* Spot details */}
              <div className="spot-details">
                {/* Name, City, State */}
                <div className="spot-name">{spot.name}</div>
                <div className="spot-location">
                  {spot.city}, {spot.state}
                </div>
                {/* Rating */}
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
                {/* Price */}
                <div className="spot-price">${spot.price} / night</div>
                {/* Update and Delete buttons */}
                <div className="spot-buttons">
                <Link to={`/spot/${spot.id}/update`} className="update-link">
                  <button className="update-button">Update</button>
                </Link>
                <button
                    className="delete-button"
                    onClick={() => handleDeleteSpot(spot.id)}>
                    Delete Spot
                  </button>
                </div>
                {spotToDelete === spot.id && (
                  <ConfirmationModal
                    title="Confirm Delete"
                    message="Are you sure you want to remove this spot?"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                  />
                )}
                </div>
              </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ManageSpots;

