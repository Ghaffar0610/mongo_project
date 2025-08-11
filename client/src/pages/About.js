import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <div className="about-logo">
            <span></span>
          </div>
          <h1 className="about-title">About TaskMaster Pro </h1>
          <p className="about-subtitle">version 1.0.0</p>
        </div>

        <div className="about-content">
          <div className="about-section">
            <h2> Our Mission</h2>
            <p>
              TaskMaster Pro is designed to help individuals and teams stay organized, 
              productive, and focused on what matters most. 
            </p>
          </div>

          <div className="about-section">
            <h2> Key Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <span className="feature-icon"></span>
                <h3>Task Creation</h3>
                <p>Create and organize tasks with ease</p>
              </div>
              <div className="feature-card">
                <span className="feature-icon"></span>
                <h3>Progress Tracking</h3>
                <p>Monitor your productivity and completion rates</p>
              </div>
              <div className="feature-card">
                <span className="feature-icon"></span>
                <h3>Analytics</h3>
                <p>Get insights into your work patterns</p>
              </div>
              <div className="feature-card">
                <span className="feature-icon"></span>
                <h3>Goal Setting</h3>
                <p>Set and achieve your objectives</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>Why Choose Us?</h2>
            <div className="benefits-list">
              <div className="benefit-item">
                <span className="benefit-icon"></span>
                <div>
                  <h4>Secure & Private</h4>
                  <p>Your data is protected with enterprise-grade security</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon"></span>
                <div>
                  <h4>Cross-Platform</h4>
                  <p>Access your tasks from anywhere, on any device</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon"></span>
                <div>
                  <h4>Lightning Fast</h4>
                  <p>Built for speed and efficiency</p>
                </div>
              </div>
            </div>
          </div>

       
        </div>

        <div className="about-footer">
          <p>Powered By <b>GhaffarTechs</b></p>
          <p className="version">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default About;