import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/idea-submission">Idea Submission</Link>
          </li>
          <li>
            <Link to="/admin-verification">Admin Verification</Link>
          </li>
          <li>
            <Link to="/find-mentor">Find Mentor</Link>
          </li>
          <li>
            <Link to="/user-profile">User Profile</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;