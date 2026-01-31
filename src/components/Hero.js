import React from "react";

const Hero = ({ onReportClick, onViewAllClick }) => (
  <section className="hero-section">
    <div className="container hero-content">
      <h1>Lost something on campus?</h1>
      <p>Quickly search the database or report an item you've found or lost.</p>
      <div className="hero-actions">
        <button className="btn btn-primary" onClick={onReportClick}>Report Found Item</button>
        <button className="btn btn-outline" onClick={onViewAllClick}>View All Lost Items</button>
      </div>
    </div>
  </section>
);