// import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import React from "react";

export function ToyPreview({ toy, removeToy, user }) {
  return (
    <div className="preview-card">
      <h2>{toy.name}</h2>
      <div className="image-container">
        <img className="toy-image" src={toy.img} alt="toy img" />
      </div>
      <h3>${toy.price}</h3>
      <h5>{toy.type}</h5>
      <div className="btn-toy-container">
        <div>
          <Link
            className="btn-toy-details decoration-none"
            to={`/toy/${toy._id}/read`}
          >
            <Button variant="outlined" color="primary">
              Read More
            </Button>
          </Link>
        </div>

        {user && user.isAdmin ? (
          <div>
            <button
              className="btn-remove"
              onClick={() => {
                const toyId = toy._id;
                removeToy(toyId);
              }}
            >
              <i className="fas fa-trash"></i>
            </button>

            <Link
              className="btn-edit decoration-none"
              to={`/toy/${toy._id}/edit`}
            >
              <i className="far fa-edit"></i>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
