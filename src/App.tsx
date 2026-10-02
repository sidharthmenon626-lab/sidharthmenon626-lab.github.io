import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MetricTicker } from './components/MetricTicker';
import { ProjectCard } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import { InteractiveLab } from './components/InteractiveLab';
import { PhilosophySection } from './components/PhilosophySection';
import { Footer } from './components/Footer';
import { PROJECTS_DATA, ProjectData } from './data/projectsData';

export function App() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [perspective, setPerspective] = useState<'commercial' | 'technical'>('commercial');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.domain === activeFilter);

  const getBentoSpan = (index: number, isFiltered: boolean) => {
    if (isFiltered) return 'bento-card-span-6';
    if (index === 0) return 'bento-card-span-7';
    if (index === 1) return 'bento-card-span-5';
    if (index === 2) return 'bento-card-span-5';
    if (index === 3) return 'bento-card-span-7';
    if (index === 4) return 'bento-card-span-6';
    if (index === 5) return 'bento-card-span-6';
    return 'bento-card-span-6';
  };

  return (
    <div className="app-wrapper">
      <Navbar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      
      <main>
        <Hero perspective={perspective} setPerspective={setPerspective} />
        <MetricTicker perspective={perspective} />

        <section id="projects" className="projects-section">
          <div className="container">
            <div className="section-header">
              <span className="badge badge-gold" style={{ marginBottom: '12px' }}>
                Executive Case Studies
              </span>
              <h2 className="section-title">
                {perspective === 'commercial' 
                  ? 'Commercial Revenue & Growth Systems'
                  : 'Audited Analytics & Technical Infrastructure'}
              </h2>
              <p className="section-desc">
                {perspective === 'commercial'
                  ? 'Six commercial case studies demonstrating quantified revenue preservation, whale customer economics, and executive rollout decisions.'
                  : 'Six production systems evaluated for zero-leakage cross-validation, SCD Type II dimensional modeling, and statistical hypothesis testing.'}
              </p>
            </div>

            {/* Filter Pills */}
            <div className="filter-bar">
              <button
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All Systems (6)
              </button>
              <button
                className={`filter-btn ${activeFilter === 'sql-strategy' ? 'active' : ''}`}
                onClick={() => setActiveFilter('sql-strategy')}
              >
                Business SQL & Strategy (2)
              </button>
              <button
                className={`filter-btn ${activeFilter === 'product-analytics' ? 'active' : ''}`}
                onClick={() => setActiveFilter('product-analytics')}
              >
                Product Experimentation (1)
              </button>
              <button
                className={`filter-btn ${activeFilter === 'machine-learning' ? 'active' : ''}`}
                onClick={() => setActiveFilter('machine-learning')}
              >
                Predictive Analytics (2)
              </button>
              <button
                className={`filter-btn ${activeFilter === 'data-eng' ? 'active' : ''}`}
                onClick={() => setActiveFilter('data-eng')}
              >
                Data Platform (1)
              </button>
            </div>

            {/* Bento Grid */}
            <div className="bento-container">
              {filteredProjects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  perspective={perspective}
                  onOpenModal={(proj) => setSelectedProject(proj)}
                  spanClass={getBentoSpan(idx, activeFilter !== 'all')}
                />
              ))}
            </div>
          </div>
        </section>

        <InteractiveLab />
        <PhilosophySection />
      </main>

      <Footer />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default App;
