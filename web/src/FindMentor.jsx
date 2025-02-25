import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import "./styles/FindMentor.css";

const FindMentor = () => {
  const [ideas, setIdeas] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const email = JSON.parse(localStorage.getItem('user')).email;
        const response = await axios.post("http://localhost:5000/user-profile", { email });
        setIdeas(response.data.ideas);
      } catch (error) {
        console.error("Error fetching ideas:", error);
      }
    };

    fetchIdeas();
  }, []);

  const handleIdeaSelect = (e) => {
    const idea = JSON.parse(e.target.value);
    setSelectedIdea(idea);
    if (idea.status === 'verified') {
      fetchMentors();
    } else {
      setMentors([]);
    }
  };

  const fetchMentors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/mentors");
      setMentors(response.data);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  };

  const handlePitch = async (mentorId) => {
    try {
      const response = await axios.post("http://localhost:5000/pitch", {
        ideaId: selectedIdea._id,
        mentorId: mentorId,
      });
      alert(`Pitched to mentor with ID: ${mentorId}`);
    } catch (error) {
      console.error("Error pitching to mentor:", error);
      alert("Failed to pitch to mentor.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="find-mentor-container">
        <h1 className="page-title">Find Your Mentor</h1>

        {/* Idea Selection */}
        <div className="dropdown-container">
          <label className="dropdown-label">Select Your Idea:</label>
          <select className="custom-dropdown" onChange={handleIdeaSelect}>
            <option value="">-- Choose an Idea --</option>
            {ideas.map((idea) => (
              <option key={idea._id} value={JSON.stringify(idea)}>
                {idea.title} {idea.status === 'verified' ? "✅" : "❌"}
              </option>
            ))}
          </select>
        </div>

        {/* Mentor Section */}
        {selectedIdea && selectedIdea.status === 'verified' ? (
          <div className="mentors-container">
            <h3 className="mentors-title">Available Mentors</h3>
            {mentors.length > 0 ? (
              <div className="mentors-list">
                {mentors.map((mentor) => (
                  <div className="mentor-card" key={mentor._id}>
                    <h4>{mentor.name}</h4>
                    <p>Expertise: {mentor.expertise.join(', ')}</p>
                    <button onClick={() => handlePitch(mentor._id)}>Pitch</button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-mentors">No mentors available yet.</p>
            )}
          </div>
        ) : selectedIdea ? (
          <p className="not-verified">Your idea is not verified yet. Please wait for approval.</p>
        ) : null}
      </div>
    </>
  );
};

export default FindMentor;