import React from 'react';
import { ShieldCheck, GitBranch, Binary, BarChart3 } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  const principles = [
    {
      icon: <ShieldCheck size={22} color="#10b981" />,
      title: 'Anti-Leakage First',
      description: 'Strict timestamp cutoff boundaries and expanding-window CV to eliminate lookahead bias.'
    },
    {
      icon: <GitBranch size={22} color="#f59e0b" />,
      title: 'Audited CTE Pipelines',
      description: 'Modular, readable SQL chains with explicit NULLIF denominators and self-validating sanity assertions.'
    },
    {
      icon: <BarChart3 size={22} color="#06b6d4" />,
      title: 'Experimentation Rigor',
      description: 'Pre-flight checks for Sample Ratio Mismatch (SRM), temporal novelty decay, and Simpson’s Paradoxes.'
    },
    {
      icon: <Binary size={22} color="#a855f7" />,
      title: 'Kimball Dimensional Modeling',
      description: 'Star schemas with SCD Type II historical tracking to preserve state changes without data loss.'
    }
  ];

  return (
    <section id="philosophy" style={{ padding: '60px 0' }}>
      <div className="container">
        <div className="section-header" style={{ marginBottom: '28px' }}>
          <span className="badge badge-eng" style={{ marginBottom: '10px' }}>
            Standards
          </span>
          <h2 className="section-title" style={{ fontSize: '1.75rem' }}>Analytical Methodology</h2>
          <p className="section-desc" style={{ fontSize: '0.9rem' }}>
            Four engineering principles guiding every model, query, and pipeline I build.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          {principles.map((p, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ marginBottom: '12px' }}>{p.icon}</div>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '6px' }}>{p.title}</h3>
              <p style={{ fontSize: '0.825rem', lineHeight: 1.5 }}>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
