// import React, { Component } from 'react'

import { ToyPreview } from "./ToyPreview";

export function ToyList({ toys, removeToy, user }) {
  return (
    <div>
      <section className="toy-list">
        {toys.map((toy, idx) => {
          return (
            <ToyPreview key={idx} toy={toy} removeToy={removeToy} user={user} />
          );
        })}
      </section>
    </div>
  );
}
