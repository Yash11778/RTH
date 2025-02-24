import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IdeaSubmission from './IdeaSubmission';
import AdminVerification from './AdminVerification';
import FindMentor from './FindMentor';
import UserProfile from './UserProfile';
import HomePage from './HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Use element instead of component */}
        <Route path="/idea-submission" element={<IdeaSubmission />} />
        <Route path="/admin-verification" element={<AdminVerification />} />
        <Route path="/find-mentor" element={<FindMentor />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;