// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// // import Navigation from '../Navigation';
// import './LandingPage.css';

// function LandingPage() {
//     const [spots, setSpots] = useState([]);
//     const [isLoaded, setIsLoaded] = useState(false);

//     useEffect(() => {
//         async function fetchSpots() {
//             const response = await fetch('/api/spots');
//             if(response.ok) {
//                 const data = await response.json();
//                 setSpots(data);
//             } else {
//                 console.log("It didn't work");
//             }
//         }
    
//         fetchSpots().then(() => setIsLoaded(true));
//     }, []);

//     return (
//         <> {isLoaded && (
//             <div className="landing-page-container">
//                 {console.log(Object.values(spots)[0])}
//             <div className="spot-tile-list">
//                 {Object.values(spots)[0].map(spot => (
//                     <Link to={`/spot/${spot.id}`} key={spot.id} className="spot-tile">
//                         {spot.name}
//                         {spot.city}
//                         {spot.state}
//                         {spot.country}
//                         {spot.address}
//                         {spot.price}
//                         {spot.description}
//                     </Link>
//                 ))}
//             </div>
//             </div>
//         )}
//         </>
//     );
// };

// export default LandingPage;

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

    if(!spots.length) return null;
    
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
                  <img src={`/images/${spot.id}_1.jpeg`} alt={`${spot.city}, ${spot.state}`} />
                    <div className="spot-details">
                      {/* Name */}
                      <div className="spot-name">
                        {spot.name}
                      </div>
                      {/* City and State */}
                      <div className="spot-location">
                        {spot.city}, {spot.state}
                      </div>
                      {/* Price and Star Review */}
                      <div className="spot-price">
                        ${spot.price} / hour
                        <div className="spot-star-review">
                          {spot.starRating} Stars
                        </div>
                      </div>
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
