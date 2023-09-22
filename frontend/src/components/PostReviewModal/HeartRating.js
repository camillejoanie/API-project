// StarRating.js

import React, { useState } from 'react';

function HeartRating({ onChange, value }) {
  const [rating, setRating] = useState(value || 0);

  // Function to toggle the rating when a heart is clicked
  const handleHeartClick = (index) => {
    // Calculate the new rating based on the clicked heart's position
    const newRating = index + 1;

    // If the clicked heart is already filled, set the rating to 0 (undo)
    if (newRating === Math.ceil(rating)) {
      setRating(0);
    } else {
      setRating(newRating);
    }

    // Pass the updated rating to the parent component
    onChange(newRating);
  };

  // Function to render heart icons
  const renderHeartIcons = () => {
    const maxRating = 5; // The maximum rating
    const heartIcons = [];

    for (let i = 0; i < maxRating; i++) {
      const heartType = i < rating ? 'fullheart' : 'emptyheart';

      // Attach a click event handler to each heart
      heartIcons.push(
        <img
          key={i}
          src={process.env.PUBLIC_URL + `/images/${heartType}.svg`}
          alt="Heart"
          className="heart-image"
          onClick={() => handleHeartClick(i)}
        />
      );
    }

    return heartIcons;
  };

  return (
    <div className="star-rating">
      <div className="heart-icons">{renderHeartIcons()}</div>
    </div>
  );
}

export default HeartRating;


// import { useState } from "react";
// import React from "react";

// const StarRating = ({ onChange }) => {
//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(0);

//   return (
//     <div className="star-rating">
//       {[...Array(5)].map((_, index) => {
//           const currentRating = index + 1;
//           return (
//             <radio
//               type="button"
//               kay={index}
//               className={
//                 currentRating <= (hover || currentRating) ? "on" : "off"
//               }
//               onClick={() => {
//                 setRating(currentRating);
//                 onChange(currentRating);
//               }}
//               onMouseEnter={() => setHover(currentRating)}
//               onMouseLeave={() => setHover(rating)}
//             >
//               {currentRating <= (hover || rating) ? (
//                 <i className="fa-solid fa-star" />
//               ) : (
//                 <i className="fa-regular fa-star" />
//               )}
//             </radio>
//           );
//         })}
//     </div>
//   );
// };


// export default StarRating
