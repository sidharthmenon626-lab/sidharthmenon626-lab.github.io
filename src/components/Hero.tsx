import React from 'react';
import { ArrowDown, Sparkles, TrendingUp, Cpu } from 'lucide-react';

interface HeroProps {
  perspective: 'commercial' | 'technical';
  setPerspective: (p: 'commercial' | 'technical') => void;
}

export const Hero: React.FC<HeroProps> = ({ perspective, setPerspective }) => {
  return (
    <section id="hero" className="hero-section" style={{ padding: '70px 0 45px' }}>
      <div className="container">
        <div className="hero-pill-track">
          <span className="pulse-amber"></span>
          <span>Open to Business / Data Analyst Roles</span>
        </div>

        <h1 className="hero-title" style={{ maxWidth: '850px', marginBottom: '18px' }}>
          Turning Data into <span className="gradient-gold">Revenue Impact</span> & Strategic Decisions
        </h1>

        <p className="hero-subtitle" style={{ maxWidth: '680px', marginBottom: '28px', fontSize: '1.1rem' }}>
          {perspective === 'commercial' ? (
            <>
              <strong>Commercial Focus:</strong> Specializing in revenue intelligence, churn retention, 
              and product experimentation. Delivered <strong>$118k+ in ARR preservation</strong> and 
              diagnosed an <strong>80% revenue decline</strong> across 6 audited systems.
            </>
          ) : (
            <>
              <strong>Technical Rigor:</strong> Expert in audited SQL CTE pipelines, 
              Kimball star schemas (<strong>103 dbt tests</strong>), and zero-leakage machine learning 
              across <strong>1.15M+ records</strong>.
            </>
          )}
        </p>

        <div className="hero-cta" style={{ marginBottom: '28px' }}>
          <a href="#projects" className="btn btn-gold">
            <span>View 6 Case Studies</span>
            <ArrowDown size={16} />
          </a>
          <a href="#interactive-lab" className="btn btn-teal">
            <Sparkles size={16} />
            <span>Interactive Simulators</span>
          </a>
        </div>

        {/* Perspective Switcher */}
        <div>
          <div className="perspective-bar">
            <button
              onClick={() => setPerspective('commercial')}
              className={`perspective-btn ${perspective === 'commercial' ? 'active' : ''}`}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <TrendingUp size={14} />
                <span>Commercial Perspective</span>
              </span>
            </button>
            <button
              onClick={() => setPerspective('technical')}
              className={`perspective-btn ${perspective === 'technical' ? 'active' : ''}`}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Cpu size={14} />
                <span>Technical Perspective</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
