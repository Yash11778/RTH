import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Register.css";
import Navbar from "./components/Navbar";
import axios from 'axios';

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Login successful!");
        localStorage.setItem("token", result.token); // Store token (if using authentication)
        localStorage.setItem("user", JSON.stringify(result.user)); // Store user info
        navigate("/home"); // Redirect after login
      } else {
        alert(result.error || "Login failed.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <>
    <Navbar />
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <br /><a href="/register">Register</a></p>
      </div>
    </div>
    </>
  );
}
