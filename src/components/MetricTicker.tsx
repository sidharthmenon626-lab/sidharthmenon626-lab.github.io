import React from 'react';
import { Database, DollarSign, TrendingDown, EyeOff, Layers, CheckCircle2 } from 'lucide-react';

export const MetricTicker: React.FC = () => {
  const metrics = [
    {
      icon: <DollarSign size={22} color="#f59e0b" />,
      value: '$118,500+',
      label: 'Retained ARR',
      sub: 'Algorithmic Churn Thresholding',
      accent: '#f59e0b'
    },
    {
      icon: <Layers size={22} color="#f59e0b" />,
      value: '88%',
      label: 'Whale Revenue Concentration',
      sub: 'Top 40% Spenders Diagnosed',
      accent: '#f59e0b'
    },
    {
      icon: <EyeOff size={22} color="#14b8a6" />,
      value: '-31pp',
      label: 'Mobile Conversion Gap',
      sub: 'PulseFlow A/B Experiment Audit',
      accent: '#14b8a6'
    },
    {
      icon: <TrendingDown size={22} color="#f59e0b" />,
      value: '19.20%',
      label: 'Huber Demand WMAPE',
      sub: '+22.3% Error Reduction vs Naive',
      accent: '#f59e0b'
    },
    {
      icon: <Database size={22} color="#14b8a6" />,
      value: '1.15M+',
      label: 'Warehouse Records',
      sub: 'Airflow 3 · Dual Ingestion CDC',
      accent: '#14b8a6'
    },
    {
      icon: <CheckCircle2 size={22} color="#10b981" />,
      value: '103',
      label: 'dbt Schema Contracts',
      sub: '100% Passing CI/CD Build',
      accent: '#10b981'
    }
  ];

  return (
    <section className="metrics-section">
      <div className="container">
        <div className="metrics-grid">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="metric-card"
              style={{ '--card-accent': m.accent } as React.CSSProperties}
            >
              <div style={{ marginBottom: '10px' }}>{m.icon}</div>
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
