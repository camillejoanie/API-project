// import React, { useState } from 'react';
// import "./ReviewModal.css";

// function ReviewModal({ onClose, onSubmit }) {
//     const [comment, setComment] = useState('');
//     const [rating, setRating] = useState(0);

//     const handleSubmit = () => {
//       onSubmit({ comment, rating });
//       onClose();
//     };

//     // 
//     return (
//         <div>
//           {/* Transparent dark background (backdrop) */}
//           <div className="review-modal-backdrop" onClick={onClose} />
    
//           {/* Modal container */}
//           <div className="review-modal-container">
//             {/* Close button */}
//             <button
//               className="review-modal-close-button"
//               onClick={onClose}
//             >
//               X
//             </button>
    
//             {/* Modal content */}
//             <div className="review-modal-content">
//               <h2>How was your stay?</h2>
//               <textarea
//                 className="review-text"
//                 placeholder="Leave your review here..."
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//               />
//               <div>
//                 <label>Stars:</label>
//                 <input
//                   type="number"
//                   min="1"
//                   max="5"
//                   value={rating}
//                   onChange={(e) => setRating(e.target.value)}
//                 />
//               </div>
//               <button
//                 onClick={handleSubmit}
//                 disabled={comment.length < 10 || rating < 1}
//               >
//                 Submit Your Review
//               </button>
//             </div>
//           </div>
//         </div>
//       );
// }

// export default ReviewModal;

import React, { useState } from 'react';
import "./ReviewModal.css";

function ReviewModal({ onClose, onSubmit }) {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

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
    };

    const handleSubmit = () => {
      onSubmit({ comment, rating });
      onClose();
    };

    const renderHeartIcons = () => {
      const maxRating = 5; // The maximum rating
      const heartIcons = [];

      for (let i = 0; i < maxRating; i++) {
        const heartType =
          i < rating ? "fullheart" : "emptyheart";
        
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
        <div>
          {/* Transparent dark background (backdrop) */}
          <div className="review-modal-backdrop" onClick={onClose} />
    
          {/* Modal container */}
          <div className="review-modal-container">
            {/* Close button */}
            <button
              className="review-modal-close-button"
              onClick={onClose}
            >
              X
            </button>
    
            {/* Modal content */}
            <div className="review-modal-content">
              <h2>How was your stay?</h2>
              <textarea
                className="review-text"
                placeholder="Leave your review here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="rating-container">
                <div className="heart-icons">
                  {renderHeartIcons()}
                </div>
              </div>
              <button
                className="submit-review-button"
                onClick={handleSubmit}
                disabled={comment.length < 10 || rating < 1}
              >
                Submit Your Review
              </button>
            </div>
          </div>
        </div>
      );
}

export default ReviewModal;


