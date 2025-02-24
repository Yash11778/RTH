import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import "./styles/IdeaVerification.css";

const IdeaVerification = () => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    const response = await fetch("http://localhost:5000/ideas");
    const data = await response.json();
    setIdeas(data);
  };

  const toggleVerification = async (id, status) => {
    const newStatus = status === "verified" ? "pending" : "verified";

    await fetch(`http://localhost:5000/ideas/${id}/${newStatus === "verified" ? "verify" : "not-verify"}`, {
      method: "PUT",
    });

    // Update state to toggle status
    setIdeas((prevIdeas) =>
      prevIdeas.map((idea) =>
        idea._id === id ? { ...idea, status: newStatus } : idea
      )
    );
  };

  const deleteEntry = async (id) => {
    await fetch(`http://localhost:5000/ideas/${id}`, {
      method: "DELETE",
    });

    // Remove the deleted entry from state
    setIdeas((prevIdeas) => prevIdeas.filter((idea) => idea._id !== id));
  };

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      <h1>Idea Verification</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Email</th>
              <th>Domain</th>
              <th>SubDomain</th>
              <th>Description</th>
              <th>UID</th>
              <th>PDF</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ideas.map((idea) => (
              <tr key={idea._id}>
                <td>{idea.title}</td>
                <td>{idea.email}</td>
                <td>{idea.domain}</td>
                <td>{idea.subDomain}</td>
                <td>{idea.description}</td>
                <td>{idea.uid}</td>
                <td>
                  {idea.pdf ? (
                    <a href={idea.pdf} target="_blank" rel="noopener noreferrer">
                      View PDF
                    </a>
                  ) : (
                    "No PDF"
                  )}
                </td>
                <td>{idea.status}</td>
                <td>
                  <button
                    className={`verify-btn ${idea.status === "verified" ? "verified" : ""}`}
                    onClick={() => toggleVerification(idea._id, idea.status)}
                  >
                    {idea.status === "verified" ? "Undo Verify" : "Verify"}
                  </button>
                  <button className="delete-btn" onClick={() => deleteEntry(idea._id)}>
                    Delete Entry
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IdeaVerification;