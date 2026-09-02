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
  const maxSlide = highlightsData.length - 2; 
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activePage, setActivePage] = useState('Home');
  const [showLogin, setShowLogin] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportForm, setReportForm] = useState({ reporter: '', reported: '', reason: 'Aimbot', statement: '' });
  const [evidenceFile, setEvidenceFile] = useState(null);

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (!reportForm.reported || !reportForm.reason) return alert("Reported IGN and Reason are required!");
    
    const formData = new FormData();
    formData.append('reporter', reportForm.reporter);
    formData.append('reported', reportForm.reported);
    formData.append('reason', reportForm.reason);
    formData.append('statement', reportForm.statement);
    if (evidenceFile) {
      formData.append('evidence', evidenceFile);
    }

    try {
      const res = await fetch('/api/settings/reports', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        alert('Report submitted successfully! Thank you for keeping our community clean.');
        setShowReportModal(false);
        setReportForm({ reporter: '', reported: '', reason: 'Aimbot', statement: '' });
        setEvidenceFile(null);
      } else {
        alert('Error submitting report.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to submit report.');
    }
  };
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
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button type="button" style={{
            background: 'transparent', border: '1px solid #ef4444', color: '#ef4444',
            padding: '8px 16px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer',
            textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px'
          }} onClick={() => setShowReportModal(true)}>
            Report Cheater
          </button>
          <button type="button" className="login-btn" onClick={() => setShowLogin(true)}>
            LOGIN
          </button>
        </div>
      </header>
      <main className="maximized-main-content">
        {}
        <section className="glass-hero-panel">
          <div className="hero-content-core">
            <h1 className="hero-main-text">ESPORT LEAGUE TOURNAMENT</h1>
            <p className="hero-sub-text">
              with Integration of Player Statistics and Leaderboard Rankings
            </p>
          </div>
        </section>
        {}
        <section className="featured-section">
          <div className="section-header-wide">
             <p className="section-label">FEATURED CONTENT</p>
             {}
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
                    {}
                    <button type="button" className="play-button-massive" aria-label="Play video">
                      <span className="play-icon-large" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {}
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
      {}
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
      
      {showReportModal && (
        <div className="video-modal-overlay" style={{ zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => setShowReportModal(false)}>
          <div style={{ background: '#0f1722', padding: '30px', borderRadius: '12px', width: '100%', maxWidth: '500px', border: '1px solid #2a3648' }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ color: '#ef4444', marginBottom: '20px', fontSize: '24px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>Report a Cheater</h2>
            <form onSubmit={handleReportSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>Your Name (Optional)</label>
                <input type="text" value={reportForm.reporter} onChange={e => setReportForm({...reportForm, reporter: e.target.value})} style={{ width: '100%', background: '#151e2b', border: '1px solid #2a3648', color: 'white', padding: '10px', borderRadius: '6px' }} placeholder="Anonymous" />
              </div>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>Suspect IGN (Required)</label>
                <input type="text" required value={reportForm.reported} onChange={e => setReportForm({...reportForm, reported: e.target.value})} style={{ width: '100%', background: '#151e2b', border: '1px solid #2a3648', color: 'white', padding: '10px', borderRadius: '6px' }} placeholder="Enter exactly as seen in game" />
              </div>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>Reason</label>
                <select value={reportForm.reason} onChange={e => setReportForm({...reportForm, reason: e.target.value})} style={{ width: '100%', background: '#151e2b', border: '1px solid #2a3648', color: 'white', padding: '10px', borderRadius: '6px' }}>
                  <option value="Aimbot">Aimbot / Auto-Aim</option>
                  <option value="Wallhack">Wallhack / ESP</option>
                  <option value="Griefing">Griefing / Toxicity</option>
                  <option value="Boosting">Elo Boosting / Smurfing</option>
                  <option value="Other">Other Exploits</option>
                </select>
              </div>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>Statement & Evidence Links</label>
                <textarea rows="4" value={reportForm.statement} onChange={e => setReportForm({...reportForm, statement: e.target.value})} style={{ width: '100%', background: '#151e2b', border: '1px solid #2a3648', color: 'white', padding: '10px', borderRadius: '6px', resize: 'none' }} placeholder="Describe the incident and paste any video/screenshot links here..."></textarea>
              </div>
              <div>
                <label style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>Upload Video / Image</label>
                <input type="file" onChange={e => setEvidenceFile(e.target.files[0])} accept="video/*,image/*" style={{ width: '100%', background: '#151e2b', border: '1px solid #2a3648', color: 'white', padding: '10px', borderRadius: '6px' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowReportModal(false)} style={{ padding: '10px 20px', background: 'transparent', color: '#94a3b8', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Cancel</button>
                <button type="submit" style={{ padding: '10px 20px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Submit Report</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showLogin && <LoginScreen onClose={() => setShowLogin(false)} onLoginSuccess={onLoginSuccess} />}
    </div>
  );
};
export default Home;
