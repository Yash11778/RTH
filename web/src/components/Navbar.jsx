import { Link } from 'react-router-dom';
import "../styles/Navbar.css";
function Navbar() {
  return (
    <nav className="navbar">
    <ul>
      <li><a href="#">Idea Submission</a></li>
      <li><a href="#">Admin Verification</a></li>
      <li><a href="#">Find Mentor</a></li>
      <li><a href="#">User Profile</a></li>
    </ul>
  </nav>
  );
}

export default Navbar;