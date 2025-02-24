import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import './styles/UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = JSON.parse(localStorage.getItem('user')).email;
        const response = await axios.post('http://localhost:5000/user-profile', { email });
        setUser(response.data.user);
        setIdeas(response.data.ideas);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar /><br /><br />
      <div className="profile-container">
        <h2>User Profile</h2>
        <div className="profile-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Expertise:</strong> {user.expertise.join(', ')}</p>
          {/* Add more fields as needed */}
        </div>
        <h2>User Ideas</h2>
        <div className="ideas-list">
          {ideas.map((idea) => (
            <div key={idea._id} className="idea-item">
              <p><strong>Title:</strong> {idea.title}</p>
              <p><strong>Domain:</strong> {idea.domain}</p>
              <p><strong>Sub-Domain:</strong> {idea.subDomain}</p>
              <p><strong>Tags:</strong> {idea.tags.join(', ')}</p>
              <p><strong>Description:</strong> {idea.description}</p>
              <p><strong>Status:</strong> {idea.status}</p>
              {/* Add more fields as needed */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserProfile;