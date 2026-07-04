import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginScreen from './LoginScreen';
import './Projects.css';

const navItems = [
  { key: 'Home', label: 'HOME', path: '/' },
  { key: 'Projects', label: 'PROJECTS', path: '/projects' },
  { key: 'Services', label: 'SERVICES', path: '/services' },
  { key: 'AboutUs', label: 'ABOUT US', path: '/about' },
];

const sidebarCategories = [
  'All Projects',
  'Team Management',
  'Tournament Scheduler',
  'Performance Tracker',
  'Community Events'
];

const mockProjects = [
  { 
    id: 1, 
    title: 'Alpha Roster Engine', 
    category: 'Team Management', 
    status: 'Active',
    desc: 'Varsity roster management, scrimmage logistics, and real-time player availability tracking.',
    img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 2, 
    title: 'Winter Clash Bracket', 
    category: 'Tournament Scheduler', 
    status: 'Upcoming',
    desc: 'Collegiate tournament bracket builder supporting turn-based map vetoes and fearless ban/pick protocols.',
    img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 3, 
    title: 'Player Analytics V2', 
    category: 'Performance Tracker', 
    status: 'Beta',
    desc: 'Advanced telemetry dashboard tracking metrics like KDA ratios, objective control, and gold graphs.',
    img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 4, 
    title: 'Intramural LAN Match', 
    category: 'Community Events', 
    status: 'Planning',
    desc: 'On-campus LAN orchestration pipeline, server configuration setups, and physical team coordination.',
    img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 5, 
    title: 'Apex Scrim Arena', 
    category: 'Tournament Scheduler', 
    status: 'Active',
    desc: 'Automated match lobbies and practice session configurations for Tier-1 academy teams.',
    img: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 6, 
    title: 'Academy Tryouts Hub', 
    category: 'Team Management', 
    status: 'Recruiting',
    desc: 'Talent scouting pipeline for junior divisions. Features metric scorecards for rookie evaluations.',
    img: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=600&q=80'
  }
];

const Projects = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activePage, setActivePage] = useState('Projects');
  
  // Unified Login State
  const [showLogin, setShowLogin] = useState(false);

  const filteredProjects = mockProjects.filter(p => {
    const matchesCategory = activeCategory === 'All Projects' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleNavigation = (item) => {
    setActivePage(item.key);
    navigate(item.path);
  };

  return (
    <div className="projects-app-wrapper">
      <div className="bg-image-layer" />
      <div className="bg-gradient-overlay" />

      <div className="app-content-flow">
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

        <section className="hero-section">
          <h1 className="hero-title">PROJECTS & SCHEMES</h1>
          <p className="hero-subtitle">Explore our comprehensive esports management initiatives</p>
        </section>

        <div className="projects-layout">
          <aside className="projects-sidebar">
            <h3 className="sidebar-title">FILTER BY CATEGORY</h3>
            {sidebarCategories.map((category) => (
              <button
                key={category}
                className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </aside>

          <main className="projects-main">
            <div className="projects-header">
              <h2>Displaying {filteredProjects.length} Projects</h2>
              <input
                type="text"
                placeholder="Search projects..."
                className="search-bar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="project-card"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="project-image" style={{ backgroundImage: `url(${project.img})` }} />
                  <div className="project-content">
                    <p className="project-category">{project.category}</p>
                    <h3>{project.title}</h3>
                    <p className="project-desc">{project.desc}</p>
                    <span className={`status-badge status-${project.status.toLowerCase()}`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="no-results">
                <p>No projects match your search criteria.</p>
              </div>
            )}
          </main>
        </div>

        {/* Project Details Modal */}
        {selectedProject && (
          <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
            <div className="project-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedProject(null)}>&times;</button>
              <div className="modal-image" style={{ backgroundImage: `url(${selectedProject.img})` }} />
              <div className="modal-content">
                <h2>{selectedProject.title}</h2>
                <p className="modal-category">{selectedProject.category}</p>
                <p className="modal-desc">{selectedProject.desc}</p>
                <span className={`status-badge status-${selectedProject.status.toLowerCase()}`}>
                  {selectedProject.status}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Render the Global Unified Login Overlay */}
      {showLogin && (
        <LoginScreen
          onClose={() => setShowLogin(false)}
          onLoginSuccess={onLoginSuccess}
        />
      )}
    </div>
  );
};

export default Projects;