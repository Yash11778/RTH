import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";


export default function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <h1>User Profile</h1>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>UID:</strong> {user._id}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Expertise:</strong> {user.expertise.length > 0 ? user.expertise.join(", ") : "None"}</p>
      </div>
    </>
  );
}
