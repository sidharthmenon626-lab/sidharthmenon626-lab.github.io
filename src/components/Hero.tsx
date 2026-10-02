import React from 'react';
import { ArrowDown, Sparkles, TrendingUp, Cpu } from 'lucide-react';

interface HeroProps {
  perspective: 'commercial' | 'technical';
  setPerspective: (p: 'commercial' | 'technical') => void;
}

export const Hero: React.FC<HeroProps> = ({ perspective, setPerspective }) => {
  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <div className="hero-pill-track">
          <span className="pulse-amber"></span>
          <span>Open to Business / Data Analyst Roles · SQL & Analytics Stack</span>
        </div>

        <h1 className="hero-title">
          Transforming Complex Data into <span className="gradient-gold">Strategic Business Decisions</span> & Measurable Revenue Growth
        </h1>

        <p className="hero-subtitle">
          {perspective === 'commercial' ? (
            <>
              <strong>Commercial Focus:</strong> Specializing in executive decision support, 
              revenue retention modeling, customer lifetime value optimization, and conversion funnel economics. 
              Delivered verified business outcomes across 6 systems—including <strong>$118k+ in preserved ARR</strong> and 
              diagnosing an <strong>80% revenue volume decline</strong>.
            </>
          ) : (
            <>
              <strong>Technical Rigor:</strong> Expert in audited SQL CTE pipelines, 
              zero-leakage temporal cross-validation, two-proportion hypothesis testing, 
              and Kimball star schema dimensional modeling across <strong>1.15M+ records</strong> and <strong>103 passing dbt contract tests</strong>.
            </>
          )}
        </p>

        <div className="hero-cta">
          <a href="#projects" className="btn btn-gold">
            <span>Explore 6 Audited Systems</span>
            <ArrowDown size={16} />
          </a>
          <a href="#interactive-lab" className="btn btn-teal">
            <Sparkles size={16} />
            <span>Launch Simulation Lab</span>
          </a>
        </div>

        {/* Perspective Switcher */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
            Tailor Your Reading Perspective:
          </div>
          <div className="perspective-bar">
            <button
              onClick={() => setPerspective('commercial')}
              className={`perspective-btn ${perspective === 'commercial' ? 'active' : ''}`}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <TrendingUp size={14} />
                <span>Commercial & Revenue Impact</span>
              </span>
            </button>
            <button
              onClick={() => setPerspective('technical')}
              className={`perspective-btn ${perspective === 'technical' ? 'active' : ''}`}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Cpu size={14} />
                <span>Technical & Analytical Rigor</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
