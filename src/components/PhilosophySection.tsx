import React from 'react';
import { ShieldCheck, GitBranch, Binary, BarChart3 } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  const principles = [
    {
      icon: <ShieldCheck size={24} color="#10b981" />,
      title: 'Anti-Leakage First',
      description: 'Temporal data leakage is the silent killer of ML models. Every pipeline I build enforces strict timestamp cutoffs, forward-chaining cross-validation, and segregated feature store calculations.'
    },
    {
      icon: <GitBranch size={24} color="#f59e0b" />,
      title: 'CTEs Over Nested Subqueries',
      description: 'Audited, readable, and defensive SQL. I adhere to a strict house style: modular CTE chains, explicit NULLIF on every denominator, and self-validating sanity assertions.'
    },
    {
      icon: <BarChart3 size={24} color="#06b6d4" />,
      title: 'Hypothesis-Driven Experimentation',
      description: 'Aggregate lift numbers can be fatal illusions. I audit every experiment for Sample Ratio Mismatch (SRM), temporal novelty decay, and platform-level Simpson’s Paradoxes before recommending rollout.'
    },
    {
      icon: <Binary size={24} color="#a855f7" />,
      title: 'Kimball Dimensional Rigor',
      description: 'Data platforms must be built for the enterprise. Star schemas with Slowly Changing Dimensions (SCD Type II) preserve historical state mutations and ensure zero financial ambiguity.'
    }
  ];

  return (
    <section id="philosophy" style={{ padding: '80px 0' }}>
      <div className="container">
        <div className="section-header">
          <span className="badge badge-eng" style={{ marginBottom: '12px' }}>
            Engineering Standards
          </span>
          <h2 className="section-title">Analytical Methodology & Standards</h2>
          <p className="section-desc">
            High-impact business analysis requires rigorous analytical and statistical standards. Here are the 
            four principles that guide every model, query, and pipeline I write.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {principles.map((p, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ marginBottom: '16px' }}>{p.icon}</div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>{p.title}</h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
