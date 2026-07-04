import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginScreen from './LoginScreen';
import './AboutUs.css';

const navItems = [
  { key: 'Home', label: 'HOME', path: '/' },
  { key: 'Projects', label: 'PROJECTS', path: '/projects' },
  { key: 'Services', label: 'SERVICES', path: '/services' },
  { key: 'AboutUs', label: 'ABOUT US', path: '/about' },
];

const IntegrityIcon = () => (
  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="M9 12l2 2 4-4"></path>
  </svg>
);

const InnovationIcon = () => (
  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
  </svg>
);

const ExecutionIcon = () => (
  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M8 12l2 2 4-4"></path>
  </svg>
);

const CommunityIcon = () => (
  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const EmailIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-neon)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const LocationIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-neon)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const AboutUs = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', contact: '', message: '' });
  const [activePage, setActivePage] = useState('AboutUs');
  
  // Unified state for Global Login Overlay
  const [showLogin, setShowLogin] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(!formData.name || !formData.email || !formData.message) {
      alert("Please fill out the required fields (Name, Email, Message).");
      return;
    }
    alert(`Request Sent Successfully!\n\nThank you, ${formData.name}. Our team will review your message.`);
    setFormData({ name: '', email: '', contact: '', message: '' });
  };

  const handleNavigation = (item) => {
    setActivePage(item.key);
    navigate(item.path);
  };

  return (
    <div className="maximized-about-wrapper">
      <div className="hero-trophy-bg" />
      <div className="hero-dark-overlay" />

      <header className="main-navbar">
        <div className="brand-logo">ESPORT</div>
        <nav className="nav-links">
          {navItems.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`nav-btn ${activePage === item.key ? 'active' : ''}`}
              onClick={() => handleNavigation(item)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button type="button" className="login-btn" onClick={() => setShowLogin(true)}>
          LOGIN
        </button>
      </header>

      <main className="maximized-main-content">
        <div className="glass-about-panel fade-in-up">
          <div className="about-header-glow" />
          <h1 className="about-main-title">
            STUDENT <span className="text-highlight">CAPSTONE PROJECT</span>
          </h1>
          <p className="about-sub-desc">
            As students, our mission is to support our TNC Beneficiary by organizing tournaments, managing teams, and creating seamless content. This centralized dashboard helps us achieve those goals efficiently.
          </p>

          <div className="values-grid-modern">
            {[
              { icon: <IntegrityIcon />, label: 'INTEGRITY' },
              { icon: <InnovationIcon />, label: 'INNOVATION' },
              { icon: <ExecutionIcon />, label: 'EXECUTION' },
              { icon: <CommunityIcon />, label: 'COMMUNITY' }
            ].map((value, idx) => (
              <div key={idx} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <span>{value.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-section-modern fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="contact-info-glass">
            <h2 className="contact-greeting-neon">GET IN TOUCH.</h2>
            <p className="contact-subtext">Have questions about our Capstone Project or want to collaborate? Send us a message.</p>
            <div className="contact-details-list">
              <div className="contact-row-modern">
                <div className="contact-icon-box"><EmailIcon /></div>
                <div className="contact-text-box">
                  <span className="contact-label">Email Us</span>
                  <a href="mailto:support@esport.ph" className="contact-link">support@esport.ph</a>
                </div>
              </div>
              <div className="contact-row-modern">
                <div className="contact-icon-box"><LocationIcon /></div>
                <div className="contact-text-box">
                  <span className="contact-label">Visit Us</span>
                  <span className="contact-text">Tournament HQ, Manila</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-glass">
            <h3 className="form-title">Send a Message</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="form-row-split-modern">
                <input type="text" name="name" className="modern-input" placeholder="Your Name" value={formData.name} onChange={handleInputChange} required />
                <input type="email" name="email" className="modern-input" placeholder="Your Email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <input type="text" name="contact" className="modern-input" placeholder="Contact Number (Optional)" value={formData.contact} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <textarea name="message" className="modern-textarea" placeholder="Your Message" rows="4" value={formData.message} onChange={handleInputChange} required></textarea>
              </div>
              <button type="submit" className="neon-submit-btn">SEND MESSAGE</button>
            </form>
          </div>
        </div>
      </main>

      {/* Render the unified Login Overlay Here */}
      {showLogin && (
        <LoginScreen
          onClose={() => setShowLogin(false)}
          onLoginSuccess={onLoginSuccess}
        />
      )}
    </div>
  );
};

export default AboutUs;