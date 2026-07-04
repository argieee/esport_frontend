// Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginScreen from './LoginScreen'; 
import './Home.css';

const navItems = [
  { key: 'Home', label: 'HOME', path: '/' },
  { key: 'Projects', label: 'PROJECTS', path: '/projects' },
  { key: 'Services', label: 'SERVICES', path: '/services' },
  { key: 'AboutUs', label: 'ABOUT US', path: '/about' },
];

const highlightsData = [
  {
    id: 1,
    title: 'CROSSFIRE',
    img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070', 
    videoUrl: 'https://www.youtube.com/embed/placeholder1' 
  },
  {
    id: 2,
    title: 'VALORANT',
    img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071',
    videoUrl: 'https://www.youtube.com/embed/e_E9W2vsRbQ' 
  },
  {
    id: 3,
    title: 'CROSSFIRE',
    img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070',
    videoUrl: 'https://www.youtube.com/embed/placeholder3' 
  },
  {
    id: 4,
    title: 'VALORANT',
    img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071',
    videoUrl: 'https://www.youtube.com/embed/placeholder4' 
  },
  {
    id: 5,
    title: 'CROSSFIRE',
    img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070',
    videoUrl: 'https://www.youtube.com/embed/placeholder5' 
  },
  {
    id: 6,
    title: 'VALORANT',
    img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071',
    videoUrl: 'https://www.youtube.com/embed/placeholder6' 
  }
];

const Home = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  // Adjust maxSlide so we don't scroll past the last pair
  const maxSlide = highlightsData.length - 2; 
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activePage, setActivePage] = useState('Home');
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleNavigation = (item) => {
    setActivePage(item.key);
    navigate(item.path);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < maxSlide ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : maxSlide));
  };

  const openVideo = (videoUrl) => {
    setActiveVideo(videoUrl);
  };

  const closeVideo = () => {
    setActiveVideo(null);
  };

  return (
    <div className="maximized-home-wrapper">
      <div className="hero-trophy-bg" />
      <div className="hero-dark-overlay" />

      <header className={`main-navbar ${isLoaded ? 'fade-in-down' : ''}`}>
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
        {/* HERO SECTION - Centered Text */}
        <section className="glass-hero-panel">
          <div className="hero-content-core">
            <h1 className="hero-main-text">ESPORT LEAGUE TOURNAMENT</h1>
            <p className="hero-sub-text">
              with Integration of Player Statistics and Leaderboard Rankings
            </p>
          </div>
        </section>

        {/* CAROUSEL SECTION */}
        <section className="featured-section">
          <div className="section-header-wide">
             <p className="section-label">FEATURED CONTENT</p>
             {/* Carousel Controls Container */}
             <div className="carousel-controls-top">
                <button type="button" className="nav-arrow" onClick={handlePrev} aria-label="Previous slide">
                  ‹
                </button>
                <button type="button" className="nav-arrow" onClick={handleNext} aria-label="Next slide">
                  ›
                </button>
             </div>
          </div>

          <div className="carousel-viewport-max">
            <div 
              className="carousel-track-max" 
              style={{ transform: `translateX(calc(-${currentSlide * 50}% - ${currentSlide * 0.5}rem))` }}
            >
              {highlightsData.map((slide) => (
                <div className="carousel-slide-max" key={slide.id}>
                  <div
                    className="highlight-card-max"
                    style={{ backgroundImage: `url(${slide.img})` }}
                    onClick={() => openVideo(slide.videoUrl)}
                  >
                    <div className="card-gradient-vignette" />
                    
                    {/* Play Button */}
                    <button type="button" className="play-button-massive" aria-label="Play video">
                      <span className="play-icon-large" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Circular Indicators (Dots) */}
          <div className="carousel-indicators-wide">
            {Array.from({ length: maxSlide + 1 }).map((_, index) => (
              <button
                key={index}
                type="button"
                className={`nav-dot ${currentSlide === index ? 'active-dot' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide pair ${index + 1}`}
              />
            ))}
          </div>
        </section>
      </main>

      {/* VIDEO MODAL */}
      {activeVideo && (
        <div className="video-modal-overlay" onClick={closeVideo}>
          <div className="video-modal-content" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="close-modal-btn" onClick={closeVideo}>
              ×
            </button>
            <div className="video-player-frame">
              <iframe
                width="100%"
                height="100%"
                src={activeVideo}
                title="Esport highlight video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {showLogin && <LoginScreen onClose={() => setShowLogin(false)} onLoginSuccess={onLoginSuccess} />}
    </div>
  );
};

export default Home;