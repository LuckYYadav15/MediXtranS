import React from 'react';
import './AboutUs.css';
import Navbar from "../Navbar/Navbar";

export default function () {
  return (
    
    <div>
      <Navbar />
      <h1>About Us</h1>
      <p>Welcome to our company. We are a team of dedicated professionals who are committed to providing the best products and services to our customers. Our mission is to make a positive impact on the world through our work.</p>
      <h2>Our Values</h2>
      <ul>
        <li>Integrity</li>
        <li>Innovation</li>
        <li>Excellence</li>
        <li>Creativity</li>
        <li>Collaboration</li>
      </ul>
      <h2>Our Team</h2>
      <p>Meet our team of experts who are passionate about their work and dedicated to providing the best solutions to our customers.</p>
      <ul>
        <li>
          <img src="team-member-1.jpg" alt="Team Member 1" />
          <h3>John Doe</h3>
          <p>Founder and CEO</p>
        </li>
        <li>
          <img src="team-member-2.jpg" alt="Team Member 2" />
          <h3>Jane Smith</h3>
          <p>Chief Operating Officer</p>
        </li>
        <li>
          <img src="team-member-3.jpg" alt="Team Member 3" />
          <h3>Bob Johnson</h3>
          <p>Chief Technology Officer</p>
        </li>
      </ul>
    </div>
  );
}

