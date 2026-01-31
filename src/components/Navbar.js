import React from "react";

const Navbar = ({ onAdminClick }) => (
  <nav className="navbar">
    <div className="container navbar-container">
      <a href="/" className="navbar-logo">
        <div className="navbar-logo-icon"></div>
        Lost & Found
      </a>
      <button className="btn btn-outline" onClick={onAdminClick}>
        Staff & Admin
      </button>
    </div>
  </nav>
);