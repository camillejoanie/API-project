import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSpots } from "../../store/spots";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteSpotModal from "../DeleteSpotModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import './ManageSpot.css'
import { useHistory } from "react-router-dom";

export default function ManageSpots() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.allSpots);
  const history = useHistory();

  const heartIcon = process.env.PUBLIC_URL + "/images/fullheart.svg";

  let spotsList = Object.values(spots)


  useEffect(() => {
    dispatch(getUserSpots());
  }, [dispatch]);


  const createSpot = () => {
    return history.push('/spots/new')

  }
  if (!spotsList.length) {
    return (
      <div className="no-spots-manage-spots">
        <h1 className="manage-spots-heading">Manage Spots</h1>
        <Link to={"/spots/new"}>
        <button className="manage-spots-create-button" onClick={createSpot}>Create a new Spot</button>
        </Link>
      </div>
    );
  }

  spotsList.map((spot) => {
    if (typeof spot.avgRating === "string") {
      spot.avgRating = "New";
      return (spot.avgRating = "New");
    }
  });


  return (
    <div className="all-Spots">
      <div>
        <h1 className="manage-spots-heading">Manage Spots</h1>
      </div>

      <div className="no-spots-manage-spots">
        <Link to={"/spots/new"}>
          <button className="manage-spots-create-button" onClick={createSpot}>Create a new Spot</button>
        </Link>
      </div>

      <div className="manage-all-spots-container">
        {spotsList.map(
          ({ id, previewImage, name, city, state, price, avgRating }) => (
            <div key={id}>
              <div className="manage-spot">
                <Link to={`/spots/${id}`}>
                  <div className="manage-spot-image-div">
                  {console.log("Preview Image URL:", previewImage)}
                    <img
                      src={
                        previewImage ||
                        "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                      }
                      alt="sorry picture not available"
                    />
                  </div>
                  <div className="manage-spot-name-and-rating">
                    <div className="manage-spot-name">
                      {name}
                    </div>
                    {/* <div classname="manage-spot-star-rating"> */}
                      <img
                        src={heartIcon}
                        alt="Heart"
                        className="manage-spot-heart-image"
                      />
                      <div className="manage-spot-rating">
                        {typeof avgRating === 'number' && avgRating.toFixed(2)}{typeof avgRating === 'string' && avgRating}
                      </div>
                    {/* </div> */}
                  </div>
                  <div className="manage-spot-city-state-price">
                    <div className="manage-spot-city-state">
                      {city}, {state}
                    </div>
                    <div className="manage-spot-price">${price}/night</div>
                  </div>
                </Link>
              <div className="update-delete-buttons">
                <Link to={`/spots/${id}/edit`}>
                  <button className="manage-spots-update-button">Update</button>
                </Link>
                <button>
                  <OpenModalMenuItem
                    className="manage-spots-delete-button"
                    itemText="Delete"
                    modalComponent={<DeleteSpotModal props={id} />}
                    />
                </button>
              </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
