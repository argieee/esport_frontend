import React, { useState, useEffect } from 'react';
import './LoginScreen.css';

const LoginScreen = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  // Prevent background scrolling kapag bukas ang modal
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      if (onClose) {
        onClose(); // I-close lang ang overlay, wag mag-navigate
      }
    }, 300); // Wait for fade-out animation to finish
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }
    if (onLoginSuccess) {
      onLoginSuccess();
    } else {
      alert('Login Successful!');
      handleClose();
    }
  };

  return (
    <div className={`login-screen-overlay ${isAnimatingOut ? 'fade-out' : 'fade-in'}`}>
      <div 
        className="login-overlay-backdrop" 
        onClick={handleClose}
      ></div>

      <div className={`login-screen-card ${isAnimatingOut ? 'slide-down' : 'slide-up'}`}>
        <button className="login-screen-close" onClick={handleClose} aria-label="Close">
          &times;
        </button>

        <div className="login-screen-header">
          <div className="brand-logo-login">ESPORT</div>
          <h2>ADMIN PORTAL</h2>
          <p>Enter your credentials to access the tournament management system.</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-input-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="admin@esport.ph" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="login-input-group">
            <label htmlFor="password">Security Key</label>
            <div className="login-password-wrapper">
              <input 
                type={showPassword ? 'text' : 'password'} 
                id="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <button 
                type="button" 
                className="login-toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Remember me
            </label>
            <a href="#" className="forgot-password" onClick={(e) => e.preventDefault()}>Forgot Key?</a>
          </div>

          <button type="submit" className="login-submit-btn">
            LOGIN
          </button>
          
          <button type="button" className="login-alt-btn" onClick={() => alert("Redirecting to Access Request form...")}>
            REQUEST ACCESS
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;