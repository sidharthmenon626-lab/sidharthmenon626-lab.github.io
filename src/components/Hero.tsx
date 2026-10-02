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
              <strong>Commercial Focus Active:</strong> The entire website is currently tuned to 
              <strong> financial ROI, revenue retention modeling, and executive strategy</strong>. 
              Showing how data analysis preserved <strong>$118k+ in ARR</strong>, diagnosed an <strong>80% revenue volume decline</strong>, 
              and recovered lost transaction GMV across 6 business-critical systems.
            </>
          ) : (
            <>
              <strong>Technical Rigor Active:</strong> The entire website is currently tuned to 
              <strong> engineering depth, statistical methods, and SQL architecture</strong>. 
              Highlighting <strong>audited CTE pipelines, 103 dbt schema contracts, Kimball SCD Type II modeling</strong>, 
              and <strong>zero-leakage temporal cross-validation</strong> across 1.15M+ records.
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
        <div style={{ marginTop: '16px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
            Switch Entire Site Perspective:
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
          <div style={{ fontSize: '0.75rem', color: perspective === 'commercial' ? '#fbbf24' : '#2dd4bf', marginTop: '8px', fontWeight: 700 }}>
            ⚡ All 6 metric cards, project summaries, and data callouts below dynamically adapt to this mode
          </div>
        </div>
      </div>
    </section>
  );
};
