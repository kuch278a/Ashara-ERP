import React, { useState } from 'react';
import { 
  Plus, 
  Search 
} from 'lucide-react';

export default function ProjectsView({ 
  projects, 
  onSelectProject, 
  onOpenNewProject,
  ffeItems,
  snags,
  invoices: _invoices 
}) {
  const [selectedStage, setSelectedStage] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  const stages = [
    'All',
    'Concept & Moodboards',
    'Schematic & 3D Visualization',
    'Technical BIM & Detailing',
    'BOQ & Procurement',
    'Site Fit-Out & Execution',
    'Snagging & Handover'
  ];

  const filteredProjects = projects.filter(p => {
    const matchesStage = selectedStage === 'All' || p.stage === selectedStage;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.aesthetic.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStage && matchesSearch;
  });

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  return (
    <div className="content-body">
      {/* Header */}
      <div className="view-header">
        <div className="view-title-wrap">
          <span className="view-pretitle">Ashara Commissions</span>
          <h1 className="view-title">
            <span>Architectural & Interior Design Projects</span>
          </h1>
          <p className="view-desc">
            End-to-end design lifecycle management from schematic inception and high-fidelity 3D visualization to BIM detailing, MEP coordination, and on-site fit-out execution.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ display: 'flex', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '2px' }}>
            <button
              className={`filter-chip ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
            <button
              className={`filter-chip ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
            >
              Table
            </button>
          </div>
          <button className="btn-primary" onClick={onOpenNewProject}>
            <Plus size={16} />
            <span>Commission Project</span>
          </button>
        </div>
      </div>

      {/* Stage Filters */}
      <div className="filter-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', flex: 1 }}>
          {stages.map((stage) => (
            <button
              key={stage}
              onClick={() => setSelectedStage(stage)}
              className={`filter-chip ${selectedStage === stage ? 'active' : ''}`}
            >
              {stage}
              {stage !== 'All' && (
                <span style={{ marginLeft: '6px', opacity: 0.7 }}>
                  ({projects.filter(p => p.stage === stage).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search project name, location..."
            className="form-input"
            style={{ paddingLeft: '32px', paddingRight: '12px', fontSize: '12px', width: '220px' }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="projects-grid">
          {filteredProjects.map((proj) => {
            const projectFfeCount = ffeItems.filter(f => f.projectId === proj.id).length;
            const projectSnagCount = snags.filter(s => s.projectId === proj.id && s.status !== 'Approved & Closed').length;

            return (
              <div 
                key={proj.id} 
                className="project-card"
                onClick={() => onSelectProject(proj)}
                style={{ cursor: 'pointer' }}
              >
                <div className="project-card-image-wrap">
                  <img src={proj.image} alt={proj.name} className="project-card-img" />
                  <div className="project-card-overlay">
                    <div className="project-overlay-top">
                      <span className="badge badge-gold">{proj.type}</span>
                      <span className={`badge ${proj.health === 'On Track' ? 'badge-success' : 'badge-warning'}`}>
                        {proj.health}
                      </span>
                    </div>
                    <div className="project-overlay-bottom">
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
                        {proj.location}
                      </span>
                      <h3 style={{ fontSize: '18px', color: '#FFFFFF', margin: 0 }}>
                        {proj.name}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="project-card-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Aesthetic Language:</span>
                    <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--gold-bright)' }}>
                      {proj.aesthetic}
                    </span>
                  </div>

                  <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0, lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {proj.description}
                  </p>

                  {/* Stage Progress */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Stage: <strong>{proj.stage}</strong></span>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{proj.progress}%</span>
                    </div>
                    <div className="progress-bar-container">
                      <div className="progress-bar-fill" style={{ width: `${proj.progress}%` }} />
                    </div>
                  </div>

                  {/* Badges for linked specs and snags */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="badge badge-neutral">
                      {projectFfeCount} FF&E Specs
                    </span>
                    {projectSnagCount > 0 ? (
                      <span className="badge badge-warning">
                        {projectSnagCount} Open Snags
                      </span>
                    ) : (
                      <span className="badge badge-success">
                        Zero Snags
                      </span>
                    )}
                    <span className="badge badge-neutral">
                      {proj.area}
                    </span>
                  </div>

                  <div className="project-meta-row" style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)' }}>Client</span>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{proj.client}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)' }}>Commission Value</span>
                      <span style={{ fontWeight: 700, color: 'var(--gold-bright)' }}>{formatCurrency(proj.totalBudget)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Project / Code</th>
                <th>Typology</th>
                <th>Location</th>
                <th>Client</th>
                <th>Stage & Progress</th>
                <th>Total Value</th>
                <th>Design Fee</th>
                <th>Handover</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{p.id}</div>
                  </td>
                  <td>
                    <span className="badge badge-neutral">{p.type}</span>
                  </td>
                  <td>{p.location}</td>
                  <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{p.client}</td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '150px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px' }}>
                        <span>{p.stage}</span>
                        <span style={{ fontWeight: 700 }}>{p.progress}%</span>
                      </div>
                      <div className="progress-bar-container" style={{ height: '4px' }}>
                        <div className="progress-bar-fill" style={{ width: `${p.progress}%` }} />
                      </div>
                    </div>
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--gold-bright)' }}>{formatCurrency(p.totalBudget)}</td>
                  <td style={{ fontWeight: 600 }}>{formatCurrency(p.designFee)}</td>
                  <td style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{p.targetHandover}</td>
                  <td>
                    <button
                      className="btn-secondary btn-sm"
                      onClick={() => onSelectProject(p)}
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
