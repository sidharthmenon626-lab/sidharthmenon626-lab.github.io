import React from 'react';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-links">
          <a
            href="https://github.com/sidharthmenon626-lab"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <GithubIcon size={16} />
            <span>GitHub (@sidharthmenon626-lab)</span>
          </a>
          <a
            href="https://www.linkedin.com/in/sidharthpmenon"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <LinkedinIcon size={16} />
            <span>LinkedIn</span>
          </a>
          <button onClick={scrollToTop} className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <span>Back to Top</span>
            <ArrowUp size={14} />
          </button>
        </div>

        <p className="footer-credit">
          Designed & Built by Sidharth Menon · Business & Data Analyst · Showcasing 6 Commercial & Product Analytics Systems
        </p>
      </div>
    </footer>
  );
};
