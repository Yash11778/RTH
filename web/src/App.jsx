import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IdeaSubmission from './IdeaSubmission';
import FindMentor from './FindMentor';
import UserProfile from './UserProfile';
import HomePage from './HomePage';
import IdeaVerification from './IdeaVerification';
import Register from "./Register";
import Login from "./Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Use element instead of component */}
        <Route path="/home" element={<HomePage />} /> {/* Use element instead of component */}
        <Route path="/idea-submission" element={<IdeaSubmission />} />
        <Route path="/find-mentor" element={<FindMentor />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/idea-verification" element={<IdeaVerification />} />

      </Routes>
    </Router>
  );
}

export default App;