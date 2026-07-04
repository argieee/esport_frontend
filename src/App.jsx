// App.jsx
import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// --- LANDING PAGES (Lagyan ng .jsx sa dulo) ---
import Home from './screens/landing/Home.jsx';
import AboutUs from './screens/landing/AboutUs.jsx';
import Projects from './screens/landing/Projects.jsx';
import Services from './screens/landing/Services.jsx';

// --- MAIN PORTAL SCREEN (Lagyan ng .jsx sa dulo) ---
import MainUIScreen from "./screens/main/MainUIScreen.jsx"; 

const App = () => {
  const navigate = useNavigate();
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/dashboard'); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    navigate('/'); 
  };

  return (
    <Routes>
      <Route path="/" element={<Home onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/about" element={<AboutUs onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/projects" element={<Projects onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/services" element={<Services onLoginSuccess={handleLoginSuccess} />} />

      <Route
        path="/dashboard"
        element={
          isLoggedIn ? (
            <MainUIScreen onLogout={handleLogout} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;