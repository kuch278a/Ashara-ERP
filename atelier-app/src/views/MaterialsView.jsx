import React from 'react';
import { MATERIAL_PALETTES } from '../data/mockData';

export default function MaterialsView() {
  return (
    <div className="content-body">
      {/* Header */}
      <div className="view-header">
        <div className="view-title-wrap">
          <span className="view-pretitle">Ashara Material Curation</span>
          <h1 className="view-title">
            <span>Finishes & Material Architecture Library</span>
          </h1>
          <p className="view-desc">
            Physical sample archive, tactile finishes, quarry provenance, and master specification guidelines for interior fit-outs.
          </p>
        </div>
      </div>

      {/* Materials Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {MATERIAL_PALETTES.map((mat, i) => (
          <div key={i} className="panel-card" style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div 
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: 'var(--radius-md)',
                  background: mat.tone,
                  border: '2px solid var(--border-gold)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  flexShrink: 0
                }}
              />
              <div>
                <span className="badge badge-neutral" style={{ fontSize: '10.5px' }}>{mat.category}</span>
                <h3 style={{ fontSize: '16px', color: 'var(--text-primary)', margin: '4px 0 0 0' }}>
                  {mat.name}
                </h3>
              </div>
            </div>

            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
              {mat.description}
            </p>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--text-muted)' }}>
              <span>Provenance: <strong style={{ color: 'var(--text-primary)' }}>{mat.origin}</strong></span>
              <span style={{ color: 'var(--gold-bright)' }}>{mat.application}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
