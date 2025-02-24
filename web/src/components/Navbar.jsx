import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

const Navbar = ({ userName }) => {
  const navigate = useNavigate();
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
        <li><Link to="/idea-verification">Idea Verification</Link></li>
        <li><Link to="/find-mentor">Find Mentor</Link></li>

        {/* Profile Dropdown */}
        <li className="profile-dropdown">
          <span className="dropdown-toggle">Profile 👤 ▼ </span>
          <ul className="dropdown-menu">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </li>
        {userName && <li className="navbar-user">Welcome, {userName}!</li>}
      </ul>
    </nav>
  );
}

export default Navbar;