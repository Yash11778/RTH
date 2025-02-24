import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import "./styles/IdeaVerification.css";

const IdeaVerification = () => {
    const [ideas, setIdeas] = useState([]);
  
    useEffect(() => {
      fetchIdeas();
    }, []);
  
    const fetchIdeas = async () => {
      const response = await fetch('http://localhost:5000/ideas');
      const data = await response.json();
      setIdeas(data);
    };
  
    const verifyIdea = async (id) => {
      await fetch(`http://localhost:5000/ideas/${id}/verify`, {
        method: 'PUT',
      });
      fetchIdeas(); // Refresh the list
    };
  
    const deleteIdea = async (id) => {
      await fetch(`http://localhost:5000/ideas/${id}`, {
        method: 'DELETE',
      });
      fetchIdeas(); // Refresh the list
    };
  
    return (
      <div>
        <Navbar /><br /><br /><br />
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
                  <td>{idea.pdf ? <a href={idea.pdf} target="_blank" rel="noopener noreferrer">View PDF</a> : "No PDF"}</td>
                  <td>{idea.status}</td>
                  <td>
                    <button className="verify-btn" onClick={() => verifyIdea(idea._id)}>Verify</button>
                    <button className="not-verify-btn" onClick={() => deleteIdea(idea._id)}>Do Not Verify</button>
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