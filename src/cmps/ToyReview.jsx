// import React, { Component } from 'react'

// import { Link } from "react-router-dom";

export function ToyReview({ review, removeReview, toyId }) {
  return (
    <div className="toy-review-container">
      <h2>{review.content}</h2>
      <h5>By:{review.byUser.fullname}</h5>
      <div>
        {/* <button
            className="btn-remove"
            onClick={() => {
              const reviewId = review._id;
              removeReview(reviewId);
            }}>
            <i className="fas fa-trash"></i>
          </button>
          */}
        {/* <Link
            className="btn-edit decoration-none"
            to={`/toy/${toyId}/read/review/${review._id}/edit`}>
            <i className="far fa-edit"></i>
          </Link> */}
      </div>
    </div>
  );
}
