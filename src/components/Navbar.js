import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon"></div>
          Lost & Found
        </Link>
        
        {/* Updated: Just navigates to the admin route */}
        <button className="btn btn-outline" onClick={() => navigate('/admin')}>
          Staff & Admin
        </button>
      </div>
    </nav>
  );
};

export default Navbar;