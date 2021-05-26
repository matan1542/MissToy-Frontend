// import React, { useState } from 'react'
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ToyReview } from "./ToyReview";

export function Reviews({ ...props }) {
  const id = props.match.params.toyId;
  if (!props.reviews) return <h2>Work under progress</h2>;
  return (
    <section className="review-section">
      <div className="review-header flex">
        <h2>Reviews</h2>
        {props.loggedInUser && (
          <Link to={`/toy/${id}/read/review/add`} className="decoration-none">
            <Button variant="outlined" color="primary">
              Add
            </Button>
          </Link>
        )}
      </div>

      <div className="toy-reviews-container">
        {props.reviews.map((review, idx) => (
          <ToyReview
            key={idx}
            toyId={id}
            removeReview={props.removeReview}
            review={{ ...review }}
          />
        ))}
      </div>
    </section>
  );
}
