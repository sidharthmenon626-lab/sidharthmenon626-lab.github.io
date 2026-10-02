import React, { useState, useEffect } from 'react';
import { ProjectData } from '../data/projectsData';
import { X, Copy, Check, BookOpen } from 'lucide-react';
import { GithubIcon } from './Icons';

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'findings' | 'code' | 'takeaways'>('overview');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(project.codeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{ '--tab-accent': project.accentColor } as React.CSSProperties}
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <span className={`badge ${project.badgeClass}`} style={{ marginBottom: '8px' }}>
              {project.domainLabel}
            </span>
            <h2 style={{ fontSize: '1.45rem', marginBottom: '4px' }}>{project.title}</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-dim)' }}>{project.tagline}</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              title="GitHub Repository"
            >
              <GithubIcon size={15} />
              <span>Repository</span>
            </a>
            {project.caseStudyUrl && (
              <a
                href={project.caseStudyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
                title="Full Notion Memo"
              >
                <BookOpen size={15} />
                <span>Notion Case Study</span>
              </a>
            )}
            <button onClick={onClose} className="modal-close-btn" aria-label="Close dialog">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="modal-tabs">
          <button
            className={`modal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Context & Framing
          </button>
          <button
            className={`modal-tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
            onClick={() => setActiveTab('architecture')}
          >
            Architecture & Pipeline
          </button>
          <button
            className={`modal-tab-btn ${activeTab === 'findings' ? 'active' : ''}`}
            onClick={() => setActiveTab('findings')}
          >
            Empirical Findings
          </button>
          <button
            className={`modal-tab-btn ${activeTab === 'code' ? 'active' : ''}`}
            onClick={() => setActiveTab('code')}
          >
            Audited Code / SQL
          </button>
          <button
            className={`modal-tab-btn ${activeTab === 'takeaways' ? 'active' : ''}`}
            onClick={() => setActiveTab('takeaways')}
          >
            Production Playbooks
          </button>
        </div>

        {/* Body Content */}
        <div className="modal-body">
          {activeTab === 'overview' && (
            <div>
              <h3>Business Problem & Stakes</h3>
              <p style={{ marginBottom: '16px' }}>{project.overview.businessProblem}</p>

              <h3>Technical Challenge & Pitfalls</h3>
              <p style={{ marginBottom: '16px' }}>{project.overview.technicalChallenge}</p>

              <h3>Engineered Solution</h3>
              <p style={{ marginBottom: '16px' }}>{project.overview.solutionStatement}</p>

              <div style={{ marginTop: '24px', padding: '16px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '8px' }}>Verified Deliverables:</h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {project.techStack.map((t, idx) => (
                    <span key={idx} className="tech-chip">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div>
              <h3>System Design & Data Flow</h3>
              <p style={{ marginBottom: '20px' }}>{project.architecture.description}</p>

              <div style={{ display: 'grid', gap: '14px' }}>
                {project.architecture.pipelineStages.map((stage, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '16px 20px',
                      borderRadius: '12px',
                      background: 'rgba(0, 0, 0, 0.35)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '16px'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                        {stage.stage}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        {stage.description}
                      </div>
                    </div>
                    <span className="tech-chip" style={{ whiteSpace: 'nowrap' }}>{stage.tech}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'findings' && (
            <div>
              <div style={{ padding: '14px 18px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)', marginBottom: '20px' }}>
                <span style={{ fontWeight: 700, color: '#34d399', fontSize: '1rem' }}>
                  {project.findings.headline}
                </span>
              </div>

              <h3>Quantified Analytical Breakthroughs</h3>
              <ul>
                {project.findings.bulletPoints.map((point, idx) => (
                  <li key={idx} style={{ marginBottom: '12px', color: 'var(--text-main)' }}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'code' && (
            <div>
              <p style={{ marginBottom: '12px', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                {project.codeSnippet.explanation}
              </p>

              <div className="code-container">
                <div className="code-header">
                  <span>{project.codeSnippet.filename}</span>
                  <button onClick={handleCopyCode} className="copy-btn">
                    {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                    <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>
                <pre>
                  <code>{project.codeSnippet.code}</code>
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'takeaways' && (
            <div>
              <h3>Production Takeaways & Operationalization</h3>
              <ul>
                {project.businessTakeaways.map((takeaway, idx) => (
                  <li key={idx} style={{ marginBottom: '14px', color: 'var(--text-main)' }}>
                    {takeaway}
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: '28px', textAlign: 'center' }}>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <GithubIcon size={16} />
                  <span>Inspect Full Repository on GitHub</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
