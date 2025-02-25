import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getPitchedIdeas, getUserRole } from './api/ideas'; // Assume these API calls are defined
import './styles/FindMentor.css'; // Reuse existing styles

const PitchAccept = () => {
  const history = useHistory();
  const [ideas, setIdeas] = useState([]);
  const [role, setRole] = useState('');
  const userId = JSON.parse(localStorage.getItem('user')).id;

  useEffect(() => {
    fetchUserRole();
  }, []);

  const fetchUserRole = async () => {
    const userEmail = JSON.parse(localStorage.getItem('user')).email;
    const response = await getUserRole(userEmail);
    setRole(response.data.role);
    if (response.data.role !== 'mentor') {
      history.push('/'); // Redirect if not a mentor
    } else {
      fetchPitchedIdeas();
    }
  };

  const fetchPitchedIdeas = async () => {
    const response = await getPitchedIdeas(userId);
    setIdeas(response.data);
  };

  const acceptIdea = (id) => {
    // Implement the logic to accept the idea
    console.log(`Idea ${id} accepted`);
  };

  return (
    <div className="find-mentor-container">
      <h2 className="page-title">Pitched Ideas</h2>
      <div className="mentors-container">
        {ideas.length > 0 ? (
          <div className="mentor-list">
            {ideas.map((idea) => (
              <div key={idea.id} className="mentor-card">
                <div>
                  <h4>{idea.title}</h4>
                  <p>{idea.description}</p>
                </div>
                <button onClick={() => acceptIdea(idea.id)}>Accept</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-mentors">No ideas pitched yet.</p>
        )}
      </div>
    </div>
  );
};

export default PitchAccept;
