import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="navbar">
      {/* Company Logo and Name */}
      <div className="navbar-logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <img src={logo} alt="Company Logo" className="logo" />
        <span className="company-name">Idea Spark</span>
      </div>

      {/* Navigation Links */}
      <ul className="navbar-menu">
        <li><Link to="/idea-submission">Idea Submission</Link></li>
        <li><Link to="/admin-verification">Admin Verification</Link></li>
        
        <li><Link to="/find-mentor">Find Mentor</Link></li>
      {/* Profile Dropdown */}
      <li className="profile-dropdown">
          <span 
            className="dropdown-toggle" 
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Profile ▼
          </span>
          {showDropdown && (
            <ul className="dropdown-menu">
              <li><Link to="/login" onClick={() => setShowDropdown(false)}>Login</Link></li>
              <li><Link to="/register" onClick={() => setShowDropdown(false)}>Register</Link></li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
