// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { getReviews } from "../../store/reviews";
// import "./SpotReviews.css";
// import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
// import PostReviewModal from "../PostReviewModal";
// import DeleteReviewModal from "../DeleteReviewModal";

// export default function SpotReviews() {
//   const spotId = useParams().spotId;
//   const dispatch = useDispatch();
//   const reviews = useSelector((state) => state.reviews.spot);
//   const ownerId = useSelector((state) => state.spots.singleSpot.ownerId);
//   const currentUser = useSelector((state) => state.session.user);



//   let currentUserId;
//   if (currentUser && currentUser.id) {
//     currentUserId = currentUser.id;
//   }
//   const props = { spotId, currentUserId };

//   useEffect(() => {
//     dispatch(getReviews(spotId));
//   }, [dispatch, spotId]);

//   const reviewsList = Object.values(reviews);
//   const hasAReview = reviewsList.find((review) => {
//     return review.userId === currentUserId;
//   });
//   const isOwner = (ownerId === currentUserId);

//   let createdAtSplit;
//   let year;
//   let month;
//   if(Object.keys(reviewsList)){
//   let createdAtDate = reviewsList.map((review) => (
//     createdAtSplit = review.createdAt.split('-'),
//     year = createdAtSplit[0],
//     month = createdAtSplit[1],
//     review.createdAt = `${month} ${year}`
//     ))
// }


//   if (!reviewsList.length) {
//     return (
//       <>
//         {currentUser && isOwner &&<></>}
//         {currentUser && currentUserId  && !isOwner && (
//           <>
//             <button className="post-your-review-button">
//               <OpenModalMenuItem
//                 itemText="Post Your Review"
//                 modalComponent={<PostReviewModal props={props} />}
//               />
//             </button>
//             <div>Be the first to post a review!</div>
//           </>
//         )}
//       </>
//     );
//   }

//   return (
//     <div>
//       <div className="div-post-your-review-button">
//         {currentUser &&
//           typeof currentUserId === "null" &&
//           isOwner && <></>}
//         {currentUser && hasAReview === undefined && (
//           <>
//             <button className="post-your-review-button">
//               <OpenModalMenuItem
//                 itemText="Post Your Review"
//                 modalComponent={<PostReviewModal props={props} />}
//               />
//             </button>
//           </>
//         )}
//       </div>
//       <div className="reviews-div-holder">
//         {reviewsList.map(({ id, review, User, createdAt, spotId }) => (
//           <div key={id} className="spot-single-review-div">
//             <div className="spot-single-review-firstname">{User.firstName}</div>
//             <div className="spot-single-review-created-date">{createdAt}</div>
//             <div className="spot-single-review">{review}</div>
//             {User.id === currentUserId && (
//               <>
//                 <button className="review-update-button">Update</button>
//                 <button className="review-delete-button">
//                   {" "}
//                   <OpenModalMenuItem
//                     itemText="Delete"
//                     modalComponent={
//                       <DeleteReviewModal props={{ id, spotId }} />
//                     }
//                   />
//                 </button>
//               </>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getReviews } from "../../store/reviews";
import "./SpotReviews.css";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import PostReviewModal from "../PostReviewModal";
import DeleteReviewModal from "../DeleteReviewModal";

export default function SpotReviews() {
  const spotId = useParams().spotId;
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.spot);
  const ownerId = useSelector((state) => state.spots.singleSpot.ownerId);
  const currentUser = useSelector((state) => state.session.user);

  let currentUserId;
  if (currentUser && currentUser.id) {
    currentUserId = currentUser.id;
  }
  const props = { spotId, currentUserId };

  useEffect(() => {
    dispatch(getReviews(spotId));
  }, [dispatch, spotId]);

  const reviewsList = Object.values(reviews);
  const hasAReview = reviewsList.find((review) => {
    return review.userId === currentUserId;
  });
  const isOwner = ownerId === currentUserId;

  if (!reviewsList.length) {
    return (
      <>
        {currentUser && isOwner && <></>}
        {currentUser && currentUserId && !isOwner && (
          <>
            <button className="post-your-review-button">
              <OpenModalMenuItem
                itemText="Post Your Review"
                modalComponent={<PostReviewModal props={props} />}
              />
            </button>
            <div className="no-review-text">Be the first to post a review! ☺</div>
          </>
        )}
      </>
    );
  }

  return (
    <div>
      <div className="div-post-your-review-button">
        {currentUser && typeof currentUserId === "null" && isOwner && <></>}
        {currentUser && hasAReview === undefined && (
          <>
            <button className="post-your-review-button">
              <OpenModalMenuItem
                itemText="Post Your Review"
                modalComponent={<PostReviewModal props={props} />}
              />
            </button>
          </>
        )}
      </div>
      <div className="reviews-div-holder">
        {reviewsList.map(({ id, review, User, createdAt, spotId }) => {
          const reviewDate = new Date(createdAt);
          const year = reviewDate.getFullYear();
          const month = reviewDate.toLocaleString("default", { month: "long" }); // Get full month name
          
          return (
            <div key={id} className="spot-single-review-div">
              <div className="spot-single-review-firstname">{User.firstName}</div>
              <div className="spot-single-review-created-date">
                {month} {year}
              </div>
              <div className="spot-single-review">{review}</div>
              {User.id === currentUserId && (
                <div className="user-update-delete-review">
                  <button className="review-delete-button">
                    {" "}
                    <OpenModalMenuItem
                      itemText="Delete"
                      modalComponent={
                        <DeleteReviewModal props={{ id, spotId }} />
                      }
                    />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}