import React from 'react';
import { ProjectData } from '../data/projectsData';
import { ArrowUpRight, Zap } from 'lucide-react';
import { GithubIcon } from './Icons';

interface ProjectCardProps {
  project: ProjectData;
  perspective: 'commercial' | 'technical';
  onOpenModal: (project: ProjectData) => void;
  spanClass?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, perspective: _perspective, onOpenModal, spanClass = 'bento-card-span-6' }) => {
  // Render bespoke mini visualizer based on project ID
  const renderMiniVisualizer = () => {
    switch (project.id) {
      case 'sql-business-insights':
        return (
          <div className="mini-viz-container">
            <div className="viz-label-row">
              <span style={{ color: '#fbbf24' }}>Whale Spend Concentration (LTV Deciles)</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>Top 40% Users → 88% Rev</span>
            </div>
            <div className="viz-bar-track">
              <div className="viz-bar-fill-gold" style={{ width: '88%' }} title="Top 40% Customers generate 88% revenue"></div>
              <div style={{ width: '12%', background: 'rgba(255,255,255,0.1)' }} title="Remaining customers generate 12%"></div>
            </div>
          </div>
        );

      case 'customer-churn-prediction-sql':
        return (
          <div className="mini-viz-container">
            <div className="viz-label-row">
              <span style={{ color: '#fbbf24' }}>Model Recall vs Naive Accuracy Trap</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>p=0.35: 74% Recall ($118k saved)</span>
            </div>
            <div className="viz-bar-track">
              <div className="viz-bar-fill-gold" style={{ width: '74%' }} title="74% Recall achieved at p=0.35"></div>
              <div style={{ width: '26%', background: 'rgba(255,255,255,0.1)' }}></div>
            </div>
          </div>
        );

      case 'ab-testing-product-analytics':
        return (
          <div className="mini-viz-container">
            <div className="viz-label-row">
              <span style={{ color: '#2dd4bf' }}>Step 3→4 Conversion: Mobile vs Desktop</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: '#f87171' }}>Mobile -31.0pp Deficit</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '4px' }}>
              <div>
                <div style={{ fontSize: '0.675rem', color: 'var(--text-dim)', marginBottom: '2px' }}>Desktop: 61.1%</div>
                <div className="viz-bar-track"><div className="viz-bar-fill-teal" style={{ width: '61.1%' }}></div></div>
              </div>
              <div>
                <div style={{ fontSize: '0.675rem', color: 'var(--text-dim)', marginBottom: '2px' }}>Mobile: 30.1%</div>
                <div className="viz-bar-track"><div className="viz-bar-fill-rose" style={{ width: '30.1%' }}></div></div>
              </div>
            </div>
          </div>
        );

      case 'demand-forecasting-ml':
        return (
          <div className="mini-viz-container">
            <div className="viz-label-row">
              <span style={{ color: '#fbbf24' }}>Huber vs Last-Value Naive Baseline</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>19.2% vs 24.7% WMAPE (-22.3% err)</span>
            </div>
            <div className="viz-bar-track">
              <div className="viz-bar-fill-gold" style={{ width: '77.7%' }} title="19.2% WMAPE (Error reduced by 22.3%)"></div>
              <div style={{ width: '22.3%', background: 'rgba(244,63,94,0.4)' }} title="Eliminated Error Margin"></div>
            </div>
          </div>
        );

      case 'end-to-end-data-pipeline':
        return (
          <div className="mini-viz-container">
            <div className="viz-label-row">
              <span style={{ color: '#2dd4bf' }}>Pipeline Stages & Schema Health</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>103 / 103 Tests Passing (100%)</span>
            </div>
            <div className="viz-bar-track">
              <div className="viz-bar-fill-teal" style={{ width: '100%' }}></div>
            </div>
          </div>
        );

      case 'sql-product-analytics':
        return (
          <div className="mini-viz-container">
            <div className="viz-label-row">
              <span style={{ color: '#fbbf24' }}>Activation Horizon Comparison</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>B2C: 2 Days · B2B: 417 Days</span>
            </div>
            <div className="viz-bar-track">
              <div className="viz-bar-fill-gold" style={{ width: '30%' }} title="B2C In-Session / 2-day"></div>
              <div className="viz-bar-fill-teal" style={{ width: '70%' }} title="B2B Long-tail expansion"></div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`bento-card ${spanClass}`}>
      <div>
        <div className="card-top-row">
          <span className="badge badge-gold">
            {project.domainLabel}
          </span>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            title="Inspect Source on GitHub"
            onClick={(e) => e.stopPropagation()}
          >
            <GithubIcon size={18} />
          </a>
        </div>

        <h3 className="card-title">{project.title}</h3>
        <p className="card-tagline">{project.tagline}</p>
        <p className="card-summary">{project.shortSummary}</p>

        {renderMiniVisualizer()}
      </div>

      <div>
        <div className="tech-chips-row">
          {project.techStack.map((tech, i) => (
            <span key={i} className="tech-pill">{tech}</span>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={16} color="#f59e0b" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {project.breakthroughStat.value}
            </span>
          </div>

          <button
            onClick={() => onOpenModal(project)}
            className="btn btn-outline btn-sm"
          >
            <span>Detailed Audit</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
