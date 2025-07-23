import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">🍳 SnapChef</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/search/pasta">Sample Search</Link>
      </div>
    </nav>
  );
}

export default Navbar;
