import React, { useState } from 'react';
import { Sliders, Calculator } from 'lucide-react';

export const InteractiveLab: React.FC = () => {
  const [threshold, setThreshold] = useState<number>(0.35);
  const [mrr, setMrr] = useState<number>(175);
  const [saveRate, setSaveRate] = useState<number>(45);

  const baselineChurners = 235;

  const recallPct = Math.min(95, Math.max(20, Math.round(105 - (threshold * 100))));
  const precisionPct = Math.min(85, Math.max(30, Math.round(25 + (threshold * 95))));
  
  const interceptedChurners = Math.round(baselineChurners * (recallPct / 100));
  const flaggedTotal = Math.round(interceptedChurners / (precisionPct / 100));
  const successfullySaved = Math.round(interceptedChurners * (saveRate / 100));
  const arrPreserved = successfullySaved * mrr * 12;

  const [ctrlVisitors, setCtrlVisitors] = useState<number>(25000);
  const [ctrlConversions, setCtrlConversions] = useState<number>(3250);
  const [varVisitors, setVarVisitors] = useState<number>(25000);
  const [varConversions, setVarConversions] = useState<number>(3672);

  const pCtrl = ctrlConversions / Math.max(1, ctrlVisitors);
  const pVar = varConversions / Math.max(1, varVisitors);
  const relLift = ((pVar - pCtrl) / Math.max(0.0001, pCtrl)) * 100;

  const pPooled = (ctrlConversions + varConversions) / Math.max(1, (ctrlVisitors + varVisitors));
  const sePooled = Math.sqrt(pPooled * (1 - pPooled) * ((1 / ctrlVisitors) + (1 / varVisitors)));
  const zScore = sePooled > 0 ? (pVar - pCtrl) / sePooled : 0;
  
  const pValue = 2 * (1 - normalCdf(Math.abs(zScore)));
  const isSignificant = pValue < 0.05;

  function normalCdf(x: number) {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return x > 0 ? 1 - prob : prob;
  }

  return (
    <section id="interactive-lab" className="lab-section" style={{ padding: '70px 0' }}>
      <div className="container">
        <div className="section-header" style={{ marginBottom: '28px' }}>
          <span className="badge badge-ml" style={{ marginBottom: '10px' }}>
            Simulators
          </span>
          <h2 className="section-title" style={{ fontSize: '1.75rem' }}>Interactive Strategy Lab</h2>
          <p className="section-desc" style={{ fontSize: '0.9rem' }}>
            Test threshold trade-offs and calculate experimental significance in real-time.
          </p>
        </div>

        <div className="lab-grid">
          {/* Tool 1 */}
          <div className="lab-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', marginBottom: '8px' }}>
              <Sliders size={18} />
              <h3 className="lab-tool-title" style={{ fontSize: '1.15rem' }}>Churn Threshold & ARR Simulator</h3>
            </div>
            <p className="lab-tool-desc" style={{ fontSize: '0.825rem', marginBottom: '18px' }}>
              Adjust decision threshold to observe the trade-off between recall, precision, and net ARR saved.
            </p>

            <div className="slider-group">
              <div className="slider-label-row">
                <span>Decision Threshold (p):</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#fbbf24' }}>p = {threshold.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.15"
                max="0.65"
                step="0.05"
                value={threshold}
                onChange={(e) => setThreshold(parseFloat(e.target.value))}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                <span>p=0.15 (High Recall)</span>
                <span>p=0.35 (Optimal)</span>
                <span>p=0.65 (High Precision)</span>
              </div>
            </div>

            <div className="slider-group">
              <div className="slider-label-row">
                <span>Average Account MRR:</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>${mrr} / mo</span>
              </div>
              <input
                type="range"
                min="100"
                max="300"
                step="5"
                value={mrr}
                onChange={(e) => setMrr(parseInt(e.target.value))}
              />
            </div>

            <div className="slider-group">
              <div className="slider-label-row">
                <span>CS Retention Save Rate:</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{saveRate}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="60"
                step="5"
                value={saveRate}
                onChange={(e) => setSaveRate(parseInt(e.target.value))}
              />
            </div>

            <div className="lab-results-grid">
              <div className="lab-result-box">
                <div className="lab-res-val" style={{ color: '#34d399' }}>
                  ${arrPreserved.toLocaleString()}
                </div>
                <div className="lab-res-lbl">ARR Saved</div>
              </div>

              <div className="lab-result-box">
                <div className="lab-res-val" style={{ color: '#fbbf24' }}>
                  {recallPct}%
                </div>
                <div className="lab-res-lbl">Model Recall</div>
              </div>

              <div className="lab-result-box">
                <div className="lab-res-val">{flaggedTotal}</div>
                <div className="lab-res-lbl">Accounts Flagged</div>
              </div>

              <div className="lab-result-box">
                <div className="lab-res-val">{successfullySaved}</div>
                <div className="lab-res-lbl">Accounts Rescued</div>
              </div>
            </div>
          </div>

          {/* Tool 2 */}
          <div className="lab-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#14b8a6', marginBottom: '8px' }}>
              <Calculator size={18} />
              <h3 className="lab-tool-title" style={{ fontSize: '1.15rem' }}>A/B Testing Significance Calculator</h3>
            </div>
            <p className="lab-tool-desc" style={{ fontSize: '0.825rem', marginBottom: '18px' }}>
              Computes two-proportion pooled Z-statistic, p-value, and deployment recommendations.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
              <div>
                <label style={{ fontSize: '0.725rem', fontWeight: 600, color: 'var(--text-muted)' }}>Control Visitors:</label>
                <input
                  type="number"
                  value={ctrlVisitors}
                  onChange={(e) => setCtrlVisitors(parseInt(e.target.value) || 1)}
                  style={{ width: '100%', padding: '7px 9px', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.725rem', fontWeight: 600, color: 'var(--text-muted)' }}>Control Conversions:</label>
                <input
                  type="number"
                  value={ctrlConversions}
                  onChange={(e) => setCtrlConversions(parseInt(e.target.value) || 0)}
                  style={{ width: '100%', padding: '7px 9px', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '18px' }}>
              <div>
                <label style={{ fontSize: '0.725rem', fontWeight: 600, color: 'var(--text-muted)' }}>Variant Visitors:</label>
                <input
                  type="number"
                  value={varVisitors}
                  onChange={(e) => setVarVisitors(parseInt(e.target.value) || 1)}
                  style={{ width: '100%', padding: '7px 9px', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.725rem', fontWeight: 600, color: 'var(--text-muted)' }}>Variant Conversions:</label>
                <input
                  type="number"
                  value={varConversions}
                  onChange={(e) => setVarConversions(parseInt(e.target.value) || 0)}
                  style={{ width: '100%', padding: '7px 9px', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: 'var(--text-main)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}
                />
              </div>
            </div>

            <div className="lab-results-grid">
              <div className="lab-result-box">
                <div className="lab-res-val" style={{ color: relLift >= 0 ? '#34d399' : '#f87171' }}>
                  {relLift >= 0 ? '+' : ''}{relLift.toFixed(2)}%
                </div>
                <div className="lab-res-lbl">Conversion Lift</div>
              </div>

              <div className="lab-result-box">
                <div className="lab-res-val" style={{ color: isSignificant ? '#2dd4bf' : '#fbbf24' }}>
                  p = {pValue < 0.001 ? '<0.001' : pValue.toFixed(3)}
                </div>
                <div className="lab-res-lbl">Two-Tailed P-Value</div>
              </div>

              <div className="lab-result-box">
                <div className="lab-res-val">Z = {zScore.toFixed(2)}</div>
                <div className="lab-res-lbl">Pooled Z-Score</div>
              </div>

              <div className="lab-result-box">
                <div className="lab-res-val" style={{ fontSize: '0.9rem', color: isSignificant ? '#34d399' : '#fbbf24' }}>
                  {isSignificant ? 'Significant Lift' : 'Inconclusive'}
                </div>
                <div className="lab-res-lbl">Recommendation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
