import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <div className="contact-logo">
            <span>📞</span>
          </div>
          <h1 className="contact-title">Get In Touch</h1>
          
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-section">
              <h2>📍 Contact Information</h2>
              <div className="info-items">
                <div className="info-item">
                
                 
                </div>
                
                <div className="info-item">
                  <span className="info-icon">📧</span>
                  <div>
                    <h4>Email</h4>
                    <p>ghaffarbwp786@gmail.com</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <span className="info-icon">📱</span>
                  <div>
                    <h4>Phone</h4>
                    <p>+92 312 6816661</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="social-section">
              <h2>Follow Us</h2>
              <div className="social-links">
                <a href="#" className="social-link">
                  <span></span>
                  <span>Facebook</span>
                </a>
                <a href="#" className="social-link">
                  <span></span>
                  <span>Twitter</span>
                </a>
                <a href="#" className="social-link">
                  <span></span>
                  <span>LinkedIn</span>
                </a>
                <a href="#" className="social-link">
                  <span></span>
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <h2>✉️ Send Us a Message</h2>
            {submitStatus === 'success' && (
              <div className="success-message">
                <span></span>
                <p>Thank you! Your message has been sent successfully.</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    👤 Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your full name"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    📧 Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your email"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  📝 Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="What's this about?"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  💬 Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Tell us more about your inquiry..."
                  rows="5"
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary contact-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Sending Message...
                  </>
                ) : (
                  ' Send Message'
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="contact-footer">
          <p>Powered By <b>GhaffarTechs</b></p>
          <p>Copyright © 2025 GhaffarTechs. All rights reserved.</p>
                
        </div>
      </div>
    </div>
  );
};

export default Contact;