import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  FileSpreadsheet,
  Clock
} from 'lucide-react';

export default function FfeScheduleView({ 
  ffeItems, 
  onToggleSample, 
  onUpdateStatus, 
  onOpenNewFfe,
  projects 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState('All');

  const categories = [
    'All',
    'Loose Furniture',
    'Bespoke Lighting',
    'Stone & Finishes',
    'Millwork & Joinery',
    'Sanitaryware',
    'Textiles & Rugs'
  ];

  const filteredItems = ffeItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesProject = selectedProject === 'All' || item.projectId === selectedProject;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.specCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.finish.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesProject && matchesSearch;
  });

  const totalProcurementCost = filteredItems.reduce((acc, i) => acc + (i.unitCost * (i.qty || 1)), 0);
  const totalClientPrice = filteredItems.reduce((acc, i) => acc + (i.clientPrice * (i.qty || 1)), 0);
  const totalProfitMargin = totalClientPrice - totalProcurementCost;
  const avgMarginPct = totalClientPrice > 0 ? Math.round((totalProfitMargin / totalClientPrice) * 100) : 0;

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
          <span className="view-pretitle">Ashara Specifications Matrix</span>
          <h1 className="view-title">
            <span>FF&E & Material Schedules</span>
          </h1>
          <p className="view-desc">
            Bespoke Furniture, Fixtures & Equipment curation, millwork joinery shop drawings, stone lot approvals, and luxury vendor procurement tracking.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-secondary" onClick={() => window.print()}>
            <FileSpreadsheet size={16} />
            <span>Export Spec Sheet</span>
          </button>
          <button className="btn-primary" onClick={onOpenNewFfe}>
            <Plus size={16} />
            <span>Add FF&E Spec</span>
          </button>
        </div>
      </div>

      {/* Financial Bar */}
      <div className="metrics-grid" style={{ marginBottom: '24px' }}>
        <div className="metric-card" style={{ padding: '16px 20px' }}>
          <span className="metric-label">Total Curated Value</span>
          <div className="metric-value">{formatCurrency(totalClientPrice)}</div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Billed to Clients ({filteredItems.length} items)</span>
        </div>
        <div className="metric-card" style={{ padding: '16px 20px' }}>
          <span className="metric-label">Procurement Trade Cost</span>
          <div className="metric-value" style={{ color: 'var(--text-secondary)' }}>{formatCurrency(totalProcurementCost)}</div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>At Atelier Trade Discounts</span>
        </div>
        <div className="metric-card" style={{ padding: '16px 20px' }}>
          <span className="metric-label">Atelier Procurement Margin</span>
          <div className="metric-value" style={{ color: 'var(--gold-bright)' }}>{formatCurrency(totalProfitMargin)}</div>
          <span style={{ fontSize: '11px', color: 'var(--status-success)' }}>{avgMarginPct}% Margin Realized</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', flex: 1 }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search FF&E spec, artisan..."
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
          <option value="All">All Projects</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      {/* Spec Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Spec Code</th>
              <th>Item & Spatial Zone</th>
              <th>Category</th>
              <th>Vendor & Provenance</th>
              <th>Finish Specification</th>
              <th>Lead Time</th>
              <th>Trade Cost</th>
              <th>Client Price</th>
              <th>Sample Sign-off</th>
              <th>Procurement Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <span style={{ fontWeight: 700, color: 'var(--gold-bright)', fontFamily: 'monospace' }}>
                    {item.specCode}
                  </span>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.name}</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                    {item.room} • <span style={{ color: 'var(--gold-primary)' }}>{item.projectName}</span>
                  </div>
                </td>
                <td>
                  <span className="badge badge-neutral">{item.category}</span>
                </td>
                <td>
                  <div style={{ fontWeight: 500 }}>{item.vendor}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.dimensions}</div>
                </td>
                <td style={{ maxWidth: '240px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {item.finish}
                </td>
                <td style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>
                  <Clock size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle', color: 'var(--text-muted)' }} />
                  {item.leadTime}
                </td>
                <td style={{ color: 'var(--text-muted)' }}>
                  {formatCurrency(item.unitCost)}
                </td>
                <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                  {formatCurrency(item.clientPrice)}
                </td>
                <td>
                  <button
                    onClick={() => onToggleSample(item.id)}
                    className={`badge ${item.sampleApproved ? 'badge-success' : 'badge-neutral'}`}
                    style={{ cursor: 'pointer', border: 'none' }}
                    title="Click to toggle sample approval status"
                  >
                    {item.sampleApproved ? '✓ Physical Sample Approved' : 'Pending Sample'}
                  </button>
                </td>
                <td>
                  <select
                    value={item.poStatus}
                    onChange={(e) => onUpdateStatus(item.id, e.target.value)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: '11.5px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Spec Draft">Spec Draft</option>
                    <option value="Approved by Client">Approved by Client</option>
                    <option value="PO Issued">PO Issued</option>
                    <option value="Shipped">Shipped / Transit</option>
                    <option value="On-Site Delivered">On-Site Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
