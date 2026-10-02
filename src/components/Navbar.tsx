import React from 'react';
import { GithubIcon, LinkedinIcon } from './Icons';

interface NavbarProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeFilter: _activeFilter, setActiveFilter: _setActiveFilter }) => {
  return (
    <header className="navbar">
      <div className="container nav-content">
        <a href="#hero" className="nav-brand">
          <div className="brand-badge">SM</div>
          <div>
            <div>Sidharth Menon</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)' }}>
              Business & Data Analyst
            </div>
          </div>
        </a>

        <nav className="nav-links">
          <a href="#projects" className="nav-link">Case Studies</a>
          <a href="#interactive-lab" className="nav-link">Interactive Lab</a>
          <a href="#philosophy" className="nav-link">Methodology</a>
        </nav>

        <div className="nav-actions">
          <a
            href="https://github.com/sidharthmenon626-lab"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
            title="GitHub Profile"
          >
            <GithubIcon size={16} />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/sidharthpmenon"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
            title="LinkedIn Profile"
          >
            <LinkedinIcon size={16} />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </header>
  );
};
