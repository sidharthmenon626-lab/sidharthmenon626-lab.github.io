import React from 'react';
import { DollarSign, Layers, EyeOff, TrendingDown, Database, CheckCircle2, Cpu, GitCommit } from 'lucide-react';

interface MetricTickerProps {
  perspective: 'commercial' | 'technical';
}

export const MetricTicker: React.FC<MetricTickerProps> = ({ perspective }) => {
  const commercialMetrics = [
    { icon: <DollarSign size={20} color="#f59e0b" />, value: '$118,500+', label: 'Retained ARR', sub: 'Churn Prevention Engine', accent: '#f59e0b' },
    { icon: <Layers size={20} color="#f59e0b" />, value: '88%', label: 'Whale Revenue', sub: 'Top 40% Spenders', accent: '#f59e0b' },
    { icon: <EyeOff size={20} color="#14b8a6" />, value: '-31.0pp', label: 'Mobile Drop-Off', sub: 'Funnel Friction Found', accent: '#14b8a6' },
    { icon: <TrendingDown size={20} color="#f59e0b" />, value: '+22.3%', label: 'Forecast Accuracy', sub: 'Inventory Error Reduced', accent: '#f59e0b' },
    { icon: <DollarSign size={20} color="#14b8a6" />, value: '65%', label: 'Lost GMV', sub: 'High-Value Carts', accent: '#14b8a6' },
    { icon: <TrendingDown size={20} color="#f59e0b" />, value: '80% Slide', label: 'Diagnosed', sub: 'Volume vs Price Decoupled', accent: '#f59e0b' }
  ];

  const technicalMetrics = [
    { icon: <Database size={20} color="#14b8a6" />, value: '1.15M+', label: 'Records', sub: 'Airflow 3 · Dual CDC', accent: '#14b8a6' },
    { icon: <CheckCircle2 size={20} color="#10b981" />, value: '103', label: 'dbt Tests Passing', sub: '100% CI Contract Health', accent: '#10b981' },
    { icon: <TrendingDown size={20} color="#f59e0b" />, value: '19.20%', label: 'Huber WMAPE', sub: 'Expanding Window CV', accent: '#f59e0b' },
    { icon: <EyeOff size={20} color="#14b8a6" />, value: 'p = 0.015', label: 'Z-Test Audit', sub: 'Wald 95% Confidence Interval', accent: '#14b8a6' },
    { icon: <Cpu size={20} color="#14b8a6" />, value: 'SCD Type II', label: 'Historical Tracking', sub: 'Zero Mutation Loss', accent: '#14b8a6' },
    { icon: <GitCommit size={20} color="#f59e0b" />, value: '48 Metrics', label: 'Engineered Features', sub: 'Strict Anti-Leakage', accent: '#f59e0b' }
  ];

  const metrics = perspective === 'commercial' ? commercialMetrics : technicalMetrics;

  return (
    <section className="metrics-section" style={{ padding: '15px 0 45px' }}>
      <div className="container">
        <div className="metrics-grid">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="metric-card"
              style={{ '--card-accent': m.accent } as React.CSSProperties}
            >
              <div style={{ marginBottom: '8px' }}>{m.icon}</div>
              <div className="metric-value">{m.value}</div>
              <div className="metric-label">{m.label}</div>
              <div className="metric-sub">{m.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
