import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import "./styles/FindMentor.css";

const FindMentor = () => {
  const [ideas, setIdeas] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/ideas")
      .then((response) => setIdeas(response.data))
      .catch((error) => console.error("Error fetching ideas:", error));
  }, []);

  const handleIdeaSelect = (idea) => {
    setSelectedIdea(idea);
    if (idea.verified) {
      fetchMentors();
    } else {
      setMentors([]);
    }
  };

  const fetchMentors = () => {
    axios.get("http://localhost:5000/api/mentors")
      .then((response) => setMentors(response.data))
      .catch((error) => console.error("Error fetching mentors:", error));
  };

  return (
    <>
      <Navbar />
      <div className="find-mentor-container">
        <h1 className="page-title">Find Mentor Here</h1>

        {/* Idea Selection */}
        <div className="dropdown">
          <label>Select Your Idea:</label>
          <select onChange={(e) => handleIdeaSelect(JSON.parse(e.target.value))}>
            <option value="">-- Choose an Idea --</option>
            {ideas.map((idea) => (
              <option key={idea.id} value={JSON.stringify(idea)}>
                {idea.title} {idea.verified ? "✅" : "❌"}
              </option>
            ))}
          </select>
        </div>

        {/* Mentor Section */}
        {selectedIdea && selectedIdea.verified ? (
          <div className="mentors-container">
            <h3>Available Mentors</h3>
            {mentors.length > 0 ? (
              <div className="mentor-list">
                {mentors.map((mentor) => (
                  <div className="mentor-card" key={mentor.id}>
                    <h4>{mentor.name}</h4>
                    <p>Expertise: {mentor.expertise}</p>
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
