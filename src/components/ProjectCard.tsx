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
              tagline: 'Diagnosed an 80% Revenue Volume Slide & Isolated 88% Whale Revenue Concentration',
              summary: 'Uncovered that an 80% revenue crash was driven by customer acquisition volume collapse while AOV held steady at ₹7k-8k. Revealed that top 40% spenders generate 88% of all revenue, recommending high-touch VIP retention.',
              stat: '$120k+ Whales = 88% Revenue',
              statSub: 'Commercial Impact'
            }
          : {
              tagline: 'Audited CTE Pipelines, Window Trend Functions & Sanitized NULLIF Denominators',
              summary: 'Modular SQL pipelines built on strict house style: CTE chains over subqueries, self-validating sanity assertions, and decile revenue concentration window aggregations against Postgres ecom warehouse.',
              stat: '10 Production CTE Queries',
              statSub: 'SQL Architecture'
            };

      case 'customer-churn-prediction-sql':
        return perspective === 'commercial'
          ? {
              tagline: 'Rescuing $118,500+ in Lost SaaS Annual Recurring Revenue via Algorithmic Early Warnings',
              summary: 'Replaced reactive exit-interview churn post-mortems with 30-day algorithmic early warnings, intercepting 221 at-risk enterprise accounts and saving $118k+ in ARR through prioritized CS intervention playbooks.',
              stat: '+$118,500 Preserved ARR',
              statSub: 'Net Retained Revenue'
            }
          : {
              tagline: 'Zero-Leakage Cohort Feature Store & Classification Threshold Calibration (p=0.35)',
              summary: 'Escaped the naive 72.6% accuracy trap (0% recall) by calibrating decision threshold at p=0.35 to achieve 74% recall. Audited strict cutoff timestamp boundaries to eliminate lookahead feature leakage.',
              stat: '74% Recall @ p=0.35 vs 0% Naive',
              statSub: 'Model Calibration'
            };

      case 'ab-testing-product-analytics':
        return perspective === 'commercial'
          ? {
              tagline: 'Averted a Fatal 100% Rollout Disaster by Diagnosing Mobile Checkout Abandonment',
              summary: 'Prevented leadership from shipping a flawed redesign that had a reported +13% lift. Discovered that mobile checkouts collapsed by -31pp, delivering a CPO memorandum recommending a desktop-only rollout.',
              stat: 'Averted 50% Mobile Collapse',
              statSub: 'Executive Rollout Memo'
            }
          : {
              tagline: 'Two-Proportion Z-Testing, Simpson’s Paradox Segment Audit & Novelty Decay Check',
              summary: 'Conducted rigorous statistical diagnostics: Sample Ratio Mismatch (SRM) chi-square test, Wald 95% confidence intervals, and longitudinal novelty decay showing week-1 lift (+18%) fading to +8% in week-2.',
              stat: 'Z = 5.46 · p = 0.015 Audit',
              statSub: 'Statistical Rigor'
            };

      case 'demand-forecasting-ml':
        return perspective === 'commercial'
          ? {
              tagline: 'Minimizing High-Velocity Stockouts and Reducing Inventory Holding Costs by 14%',
              summary: 'Optimized purchasing replenishment across 40,000 customer orders and 14 categories. Reduced forecasting error by 22.3%, dampening artificial promotional surges and preventing warehouse inventory glut.',
              stat: '+22.3% Better than Naive',
              statSub: 'Stockout Prevention'
            }
          : {
              tagline: 'Rolling-Origin TimeSeriesSplit Cross-Validation with Outlier-Resistant Huber Regression',
              summary: 'Forward-chaining expanding window cross-validation preventing future lookahead bias. Robust Huber loss dynamically damps extreme promotional spikes, achieving 19.20% WMAPE and 60.77 RMSE.',
              stat: '19.20% WMAPE · Huber Regressor',
              statSub: 'TimeSeriesSplit Validation'
            };

      case 'end-to-end-data-pipeline':
        return perspective === 'commercial'
          ? {
              tagline: 'Single Source of Truth for Subscriptions, Orders & Telemetry Across 1.15M+ Records',
              summary: 'Consolidated transactional commerce, SaaS billing, and web telemetry into a unified Kimball star schema. Eliminated conflicting executive revenue metrics between Finance, Product, and Operations.',
              stat: 'Single Source of Truth',
              statSub: 'Executive Alignment'
            }
          : {
              tagline: 'Airflow 3 Orchestration, Kimball Star Schema, SCD Type II & 103 Passing dbt Tests',
              summary: 'Dual-mode ingestion engine extracting from Neon PostgreSQL & Parquet lakehouse with sub-minute incremental CDC. Enforces 103 strict dbt schema tests with SCD Type II historical dimension tracking.',
              stat: '103 / 103 dbt Tests Passing',
              statSub: 'Pipeline Integrity'
            };

      case 'sql-product-analytics':
        return perspective === 'commercial'
          ? {
              tagline: 'Deconstructing B2C In-Session GMV Loss vs B2B Multi-Month Net MRR Expansion',
              summary: 'Showed founders that B2C and B2B have inverted unit economics: saving 5% of high-value abandoned carts yields 3x the revenue of saving low-value carts, while B2B revenue is won through year-2 expansion.',
              stat: '65% Lost GMV in Top Carts',
              statSub: 'Unit Economics'
            }
          : {
              tagline: 'Comparative Dual-Schema Window Analytics: Sessionization vs 12-Month Cohort NRR',
              summary: 'Paired benchmark of 10 queries across two PostgreSQL schemas (ecom vs saas), contrasting 5-step minute-level session funnels against 14/30/60-day enterprise trial activation horizons.',
              stat: '2-Day vs 417-Day Velocity',
              statSub: 'Comparative Analytics'
            };

      default:
        return {
          tagline: project.tagline,
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
              <span style={{ color: '#fbbf24' }}>
                {perspective === 'commercial' ? 'Revenue Concentration (Top 40% Spenders)' : 'Window Decile Spend Partitioning'}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>88% of Total GMV</span>
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
              <span style={{ color: '#fbbf24' }}>
                {perspective === 'commercial' ? 'ARR Rescued by CS Interventions' : 'Recall at Calibrated Threshold p=0.35'}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>$118.5k Saved (74% Recall)</span>
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
              <span style={{ color: '#2dd4bf' }}>
                {perspective === 'commercial' ? 'Conversion Gap: Mobile Deficit' : 'Platform Segmentation (Simpson’s Paradox)'}
              </span>
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
              <span style={{ color: '#fbbf24' }}>
                {perspective === 'commercial' ? 'Stockout Reduction Accuracy' : 'Huber Regressor WMAPE Improvement'}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>19.2% WMAPE (-22.3% error)</span>
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
              <span style={{ color: '#2dd4bf' }}>
                {perspective === 'commercial' ? 'Data Reliability & Metrics Trust' : 'dbt Schema Contracts & SCD Type II'}
              </span>
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
              <span style={{ color: '#fbbf24' }}>
                {perspective === 'commercial' ? 'Activation Horizon (B2C vs B2B)' : 'Windowed Time-to-Event Analysis'}
              </span>
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
        <p className="card-tagline" style={{ color: perspective === 'commercial' ? '#fbbf24' : '#2dd4bf' }}>
          {dynamicContent.tagline}
        </p>
        <p className="card-summary">{dynamicContent.summary}</p>

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
            {perspective === 'commercial' ? <TrendingUp size={16} color="#f59e0b" /> : <Cpu size={16} color="#14b8a6" />}
            <div>
              <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-main)', display: 'block' }}>
                {dynamicContent.stat}
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                {dynamicContent.statSub}
              </span>
            </div>
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
