import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { motion } from "framer-motion";
import "./styles/HomePage.css";

function HomePage() {
  const [ideas, setIdeas] = useState(520);
  const [collaborations, setCollaborations] = useState(132);
  const [projects, setProjects] = useState(45);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdeas((prev) => prev + Math.floor(Math.random() * 3));
      setCollaborations((prev) => prev + Math.floor(Math.random() * 2));
      setProjects((prev) => prev + Math.floor(Math.random() * 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar />

      {/* Hero Section with Animated Background */}
      <header className="hero">
        <div className="hero-background"></div>
        <div className="hero-content">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            Welcome to the Innovation Hub
          </motion.h1>
          <p>
            Empowering students to become creators and innovators by providing a digital space where they can bring any idea to life.
          </p>
          <motion.a 
            href="/idea-submission" 
            className="cta-button"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            Submit Your Idea
          </motion.a>
        </div>
      </header>

      {/* Live Stats Section */}
      <section className="stats-section">
        <h2>📊 Live Innovation Stats</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>🚀 {ideas}+</h3>
            <p>Ideas Submitted</p>
          </div>
          <div className="stat-card">
            <h3>🤝 {collaborations}+</h3>
            <p>Collaborations Formed</p>
          </div>
          <div className="stat-card">
            <h3>🌍 {projects}+</h3>
            <p>Projects in Progress</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>📌 How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1️⃣ Submit Your Idea</h3>
            <p>Fill out a quick form and upload your project details.</p>
          </div>
          <div className="step">
            <h3>2️⃣ Connect with Mentors</h3>
            <p>Get guidance from experts and refine your project.</p>
          </div>
          <div className="step">
            <h3>3️⃣ Build & Launch</h3>
            <p>Collaborate with teams and bring your idea to reality.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>💬 What People Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial">
            <p>"This platform helped me find the right team for my startup!"</p>
            <h4>- Rahul S.</h4>
          </div>
          <div className="testimonial">
            <p>"Innovation Hub turned my idea into a working prototype!"</p>
            <h4>- Ananya M.</h4>
          </div>
          <div className="testimonial">
            <p>"Best place for students who want to create impact!"</p>
            <h4>- Karthik V.</h4>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <h2>❓ Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>🔹 Who can submit an idea?</h3>
          <p>Anyone with an innovative idea, regardless of background.</p>
        </div>
        <div className="faq-item">
          <h3>🔹 Is this platform free?</h3>
          <p>Yes! Our goal is to support student innovation.</p>
        </div>
        <div className="faq-item">
          <h3>🔹 How do I find collaborators?</h3>
          <p>Once you submit an idea, you can explore and join teams.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Innovation Hub | All rights reserved</p>
        <div className="social-links">
          <a href="https://github.com" target="_blank">GitHub</a>
          <a href="https://linkedin.com" target="_blank">LinkedIn</a>
          <a href="mailto:support@innovationhub.com">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
