import React from 'react';
import { ProjectData } from '../data/projectsData';
import { ArrowUpRight, TrendingUp, Cpu } from 'lucide-react';
import { GithubIcon } from './Icons';

interface ProjectCardProps {
  project: ProjectData;
  perspective: 'commercial' | 'technical';
  onOpenModal: (project: ProjectData) => void;
  spanClass?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, perspective, onOpenModal, spanClass = 'bento-card-span-6' }) => {
  const getCardContent = () => {
    switch (project.id) {
      case 'sql-business-insights':
        return perspective === 'commercial'
          ? {
              summary: 'Diagnosed an 80% revenue volume collapse while AOV held flat. Discovered that the top 40% of customers generate 88% of total revenue.',
              stat: 'Whales = 88% Rev',
              statSub: 'LTV Deciles'
            }
          : {
              summary: 'Production SQL CTE pipelines with window trend rankings, sanitized NULLIF denominators, and automated sanity assertions.',
              stat: '10 Audited CTEs',
              statSub: 'SQL Architecture'
            };

      case 'customer-churn-prediction-sql':
        return perspective === 'commercial'
          ? {
              summary: 'Algorithmic early-warning system intercepting 221 at-risk accounts, preserving $118k+ in Annual Recurring Revenue via proactive playbooks.',
              stat: '+$118,500 ARR',
              statSub: 'Preserved Revenue'
            }
          : {
              summary: 'Calibrated classification threshold at p=0.35 to escape the 0% recall accuracy trap, achieving 74% recall with zero lookahead leakage.',
              stat: '74% Recall @ p=0.35',
              statSub: 'Threshold Tuning'
            };

      case 'ab-testing-product-analytics':
        return perspective === 'commercial'
          ? {
              summary: 'Uncovered a severe -31pp mobile checkout drop-off hiding behind a headline +13% lift, halting a high-risk 100% rollout.',
              stat: 'Averted Rollout Loss',
              statSub: 'CPO Decision Memo'
            }
          : {
              summary: 'Statistical audit across 50,000 visitors: Sample Ratio Mismatch (SRM), Wald 95% confidence intervals, and longitudinal novelty decay.',
              stat: 'Z = 5.46 · p = 0.015',
              statSub: 'Statistical Audit'
            };

      case 'demand-forecasting-ml':
        return perspective === 'commercial'
          ? {
              summary: 'Reduced demand forecast error by 22.3% across 14 categories, preventing costly stockouts on high-velocity items and cutting holding costs.',
              stat: '+22.3% Accuracy',
              statSub: 'Inventory Optimization'
            }
          : {
              summary: 'Expanding-window TimeSeriesSplit CV with robust Huber loss to dynamically damp post-promotional demand spikes without leakage.',
              stat: '19.20% WMAPE',
              statSub: 'Huber Regressor'
            };

      case 'end-to-end-data-pipeline':
        return perspective === 'commercial'
          ? {
              summary: 'Unified transactional commerce, subscriptions, and clickstreams into a single source of truth across 1.15M+ records, ending metric disputes.',
              stat: '1.15M+ Records',
              statSub: 'Single Source of Truth'
            }
          : {
              summary: 'Airflow 3 orchestration with incremental CDC into a Kimball star schema, featuring SCD Type II history and 103 passing dbt tests.',
              stat: '103 / 103 Tests Passing',
              statSub: 'Pipeline Contracts'
            };

      case 'sql-product-analytics':
        return perspective === 'commercial'
          ? {
              summary: 'Deconstructed contrasting unit economics: B2C high-value cart abandonment (65% of lost GMV) vs B2B year-2 net MRR expansion.',
              stat: '65% Lost GMV in Carts',
              statSub: 'Unit Economics'
            }
          : {
              summary: 'Dual-schema PostgreSQL comparative benchmark contrasting 5-step in-session checkouts against 12-month cohort net retention metrics.',
              stat: '2-Day vs 417-Day',
              statSub: 'Activation Horizons'
            };

      default:
        return {
          summary: project.shortSummary,
          stat: project.breakthroughStat.value,
          statSub: project.breakthroughStat.label
        };
    }
  };

  const dynamicContent = getCardContent();

  const renderMiniVisualizer = () => {
    switch (project.id) {
      case 'sql-business-insights':
        return (
          <div className="mini-viz-container">
            <div className="viz-label-row">
              <span style={{ color: '#fbbf24' }}>Whale Spend Concentration</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>Top 40% Users → 88% Rev</span>
            </div>
            <div className="viz-bar-track">
              <div className="viz-bar-fill-gold" style={{ width: '88%' }}></div>
              <div style={{ width: '12%', background: 'rgba(255,255,255,0.1)' }}></div>
            </div>
          </div>
        );

      case 'customer-churn-prediction-sql':
        return (
          <div className="mini-viz-container">
            <div className="viz-label-row">
              <span style={{ color: '#fbbf24' }}>Model Recall @ p=0.35</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>74% Recall ($118.5k Saved)</span>
            </div>
            <div className="viz-bar-track">
              <div className="viz-bar-fill-gold" style={{ width: '74%' }}></div>
              <div style={{ width: '26%', background: 'rgba(255,255,255,0.1)' }}></div>
            </div>
          </div>
        );

      case 'ab-testing-product-analytics':
        return (
          <div className="mini-viz-container">
            <div className="viz-label-row">
              <span style={{ color: '#2dd4bf' }}>Step 3→4 Conversion: Mobile vs Desktop</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: '#f87171' }}>Mobile -31pp Deficit</span>
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
              <span style={{ color: '#fbbf24' }}>Huber vs Naive Error Reduction</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>19.2% WMAPE (+22.3% gain)</span>
            </div>
            <div className="viz-bar-track">
              <div className="viz-bar-fill-gold" style={{ width: '77.7%' }}></div>
              <div style={{ width: '22.3%', background: 'rgba(244,63,94,0.4)' }}></div>
            </div>
          </div>
        );

      case 'end-to-end-data-pipeline':
        return (
          <div className="mini-viz-container">
            <div className="viz-label-row">
              <span style={{ color: '#2dd4bf' }}>dbt Schema Contract Health</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>103 / 103 Passing (100%)</span>
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
              <span style={{ color: '#fbbf24' }}>Activation Horizons</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>2-Day (B2C) vs 417-Day (B2B)</span>
            </div>
            <div className="viz-bar-track">
              <div className="viz-bar-fill-gold" style={{ width: '30%' }}></div>
              <div className="viz-bar-fill-teal" style={{ width: '70%' }}></div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Only take top 3-4 primary tech chips to reduce clutter
  const visibleTech = project.techStack.slice(0, 4);

  return (
    <div className={`bento-card ${spanClass}`} style={{ padding: '24px' }}>
      <div>
        <div className="card-top-row" style={{ marginBottom: '12px' }}>
          <span className="badge badge-gold">
            {project.domainLabel}
          </span>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            title="GitHub"
            onClick={(e) => e.stopPropagation()}
          >
            <GithubIcon size={18} />
          </a>
        </div>

        <h3 className="card-title" style={{ fontSize: '1.25rem', marginBottom: '8px' }}>
          {project.title}
        </h3>
        
        <p className="card-summary" style={{ marginBottom: '16px', fontSize: '0.875rem', lineHeight: '1.5' }}>
          {dynamicContent.summary}
        </p>

        {renderMiniVisualizer()}
      </div>

      <div>
        <div className="tech-chips-row" style={{ marginBottom: '16px' }}>
          {visibleTech.map((tech, i) => (
            <span key={i} className="tech-pill">{tech}</span>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {perspective === 'commercial' ? <TrendingUp size={15} color="#f59e0b" /> : <Cpu size={15} color="#14b8a6" />}
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block' }}>
                {dynamicContent.stat}
              </span>
              <span style={{ fontSize: '0.675rem', color: 'var(--text-dim)' }}>
                {dynamicContent.statSub}
              </span>
            </div>
          </div>

          <button
            onClick={() => onOpenModal(project)}
            className="btn btn-outline btn-sm"
          >
            <span>Case Study</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
