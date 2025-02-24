import React, { useState } from "react";
import "./styles/IdeaSubmission.css";
import Navbar from "./components/Navbar";

const domainData = {
  Tech: ["Computer Science", "Electronics", "Mechanical", "AI/ML", "Cybersecurity"],
  Medicine: ["General Medicine", "Surgery", "Pediatrics", "Pharmacy", "Dentistry"],
  Business: ["Marketing", "Finance", "Entrepreneurship", "Human Resources", "Operations"],
  Arts: ["Music", "Painting", "Literature", "Performing Arts", "History"],
};

export default function IdeaSubmission() {
  const [selectedDomain, setSelectedDomain] = useState("");
  const [subDomains, setSubDomains] = useState([]);

  const handleDomainChange = (e) => {
    const domain = e.target.value;
    setSelectedDomain(domain);
    setSubDomains(domainData[domain] || []);
  };

  return (
    <>
      <Navbar />

      {/* Page Content */}
      <div className="container">
        <h1>Submit Your Idea</h1>
        <form>
          <div className="form-group">
            <label>Idea Title</label>
            <input type="text" placeholder="Enter your idea title" />
          </div>

          <div className="form-group">
            <label>Domains</label>
            <select className="border p-2 w-full" onChange={handleDomainChange}>
              <option value="">Select a domain</option>
              {Object.keys(domainData).map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Sub-Domains</label>
            <select className="border p-2 w-full" disabled={!selectedDomain}>
              <option value="">Select a sub-domain</option>
              {subDomains.map((sub, index) => (
                <option key={index} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Tags</label>
            <input type="text" placeholder="Enter tags associated with the project" />
          </div>

          <div className="form-group">
            <label>Project Description</label>
            <textarea placeholder="Describe your project"></textarea>
          </div>

          <div className="form-group">
            <label>Attach PDF (optional)</label>
            <input type="file" />
          </div>

          <div className="form-group">
            <label>Unique UID</label>
            <input type="text" placeholder="Your unique UID" />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
