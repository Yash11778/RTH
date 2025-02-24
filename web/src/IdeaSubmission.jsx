import React from "react";
import "./styles/IdeaSubmission.css";

export default function IdeaSubmission() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <ul>
          <li><a href="#">Idea Submission</a></li>
          <li><a href="#">Admin Verification</a></li>
          <li><a href="#">Find Mentor</a></li>
          <li><a href="#">User Profile</a></li>
        </ul>
      </nav>

      {/* Page Content */}
      <div className="container">
        <h1>Submit Your Idea</h1>
        <form>
          <div className="form-group">
            <label>Idea Title:</label>
            <input type="text" placeholder="Enter your idea title" />
          </div>

          <div className="form-group">
            <label>Domains:</label>
            <select>
              <option>Select a domain</option>
            </select>
          </div>

          <div className="form-group">
            <label>Sub-Domains:</label>
            <select>
              <option>Select a sub-domain</option>
            </select>
          </div>

          <div className="form-group">
            <label>Tags:</label>
            <input type="text" placeholder="Enter tags associated with the project" />
          </div>

          <div className="form-group">
            <label>Project Description:</label>
            <textarea placeholder="Describe your project"></textarea>
          </div>

          <div className="form-group">
            <label>Attach PDF (optional):</label>
            <input type="file" />
          </div>

          <div className="form-group">
            <label>Unique UID:</label>
            <input type="text" placeholder="Your unique UID" />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
