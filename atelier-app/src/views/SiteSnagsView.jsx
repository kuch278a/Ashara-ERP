import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  ArrowRight 
} from 'lucide-react';

export default function SiteSnagsView({ 
  snags, 
  onUpdateSnagStatus, 
  onOpenNewSnag,
  projects 
}) {
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedProject, setSelectedProject] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const severities = ['All', 'Critical', 'Moderate', 'Cosmetic'];
  const statuses = ['All', 'Open', 'In Rectification', 'Ready for Re-inspection', 'Approved & Closed'];

  const filteredSnags = snags.filter(snag => {
    const matchesSeverity = selectedSeverity === 'All' || snag.severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'All' || snag.status === selectedStatus;
    const matchesProject = selectedProject === 'All' || snag.projectId === selectedProject;
    const matchesSearch = 
      snag.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snag.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snag.contractor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snag.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSeverity && matchesStatus && matchesProject && matchesSearch;
  });

  const getNextStatus = (current) => {
    switch (current) {
      case 'Open': return 'In Rectification';
      case 'In Rectification': return 'Ready for Re-inspection';
      case 'Ready for Re-inspection': return 'Approved & Closed';
      case 'Approved & Closed': return 'Open';
      default: return 'Open';
    }
  };

  return (
    <div className="content-body">
      {/* Header */}
      <div className="view-header">
        <div className="view-title-wrap">
          <span className="view-pretitle">Ashara Site Quality Assurance</span>
          <h1 className="view-title">
            <span>Site Execution & Snagging Matrix</span>
          </h1>
          <p className="view-desc">
            Rigorous on-site architectural inspections, contractor trade punch lists, MEP defect rectifications, and final client handover clearances.
          </p>
        </div>
        <div>
          <button className="btn-primary" onClick={onOpenNewSnag}>
            <Plus size={16} />
            <span>Log Site Snag</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        {/* Severity */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginRight: '4px' }}>Severity:</span>
          {severities.map(sev => (
            <button
              key={sev}
              onClick={() => setSelectedSeverity(sev)}
              className={`filter-chip ${selectedSeverity === sev ? 'active' : ''}`}
            >
              {sev}
            </button>
          ))}
        </div>

        <div style={{ width: '1px', height: '24px', background: 'var(--border-subtle)', margin: '0 8px' }} />

        {/* Status */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flex: 1, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginRight: '4px' }}>Status:</span>
          {statuses.map(st => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`filter-chip ${selectedStatus === st ? 'active' : ''}`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search snag location, trade..."
            className="form-input"
            style={{ paddingLeft: '32px', paddingRight: '12px', fontSize: '12px', width: '220px' }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Project Selector */}
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="form-select"
          style={{ width: '200px', padding: '6px 12px', fontSize: '12.5px' }}
        >
          <option value="All">All Commissions</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      {/* Snags Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '20px' }}>
        {filteredSnags.map((snag) => (
          <div 
            key={snag.id} 
            className="panel-card"
            style={{ 
              margin: 0, 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '14px',
              borderLeft: snag.severity === 'Critical' ? '3px solid var(--status-danger)' : snag.severity === 'Moderate' ? '3px solid var(--status-warning)' : '3px solid var(--border-gold)'
            }}
          >
            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--gold-bright)', fontWeight: 600 }}>
                  {snag.id} • {snag.category}
                </span>
                <h3 style={{ fontSize: '16px', color: 'var(--text-primary)', margin: '2px 0 0 0' }}>
                  {snag.location}
                </h3>
                <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                  {snag.projectName}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                <span className={`badge ${snag.severity === 'Critical' ? 'badge-danger' : snag.severity === 'Moderate' ? 'badge-warning' : 'badge-neutral'}`}>
                  {snag.severity}
                </span>
                <span className={`badge ${snag.status === 'Approved & Closed' ? 'badge-success' : snag.status === 'In Rectification' ? 'badge-gold' : 'badge-neutral'}`} style={{ fontSize: '10px' }}>
                  {snag.status}
                </span>
              </div>
            </div>

            {/* Description */}
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
              {snag.description}
            </p>

            {/* Rectification Note */}
            {snag.rectificationPlan && (
              <div style={{ background: 'var(--bg-tertiary)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '12px' }}>
                <span style={{ color: 'var(--gold-primary)', fontWeight: 600 }}>Rectification Action: </span>
                <span style={{ color: 'var(--text-muted)' }}>{snag.rectificationPlan}</span>
              </div>
            )}

            {/* Footer Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px', fontSize: '11.5px', color: 'var(--text-muted)' }}>
              <div>
                <div>Contractor: <strong style={{ color: 'var(--text-primary)' }}>{snag.contractor}</strong></div>
                <div>Deadline: <strong style={{ color: 'var(--gold-bright)' }}>{snag.dueDate}</strong></div>
              </div>

              <button
                onClick={() => onUpdateSnagStatus(snag.id, getNextStatus(snag.status))}
                className="btn-secondary btn-sm"
                style={{ fontSize: '11px', gap: '4px' }}
                title="Click to advance status"
              >
                <span>Advance to: {getNextStatus(snag.status)}</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
