import React from 'react';
import { 
  Building2, 
  Coins, 
  HardHat, 
  Armchair, 
  AlertCircle, 
  TrendingUp, 
  ArrowUpRight, 
  CheckCircle2, 
  Compass,
  Sparkles
} from 'lucide-react';

export default function DashboardView({ 
  projects, 
  ffeItems, 
  snags, 
  invoices, 
  onSelectProject, 
  setCurrentView,
  onOpenNewProject 
}) {
  // Aggregate Metrics
  const totalProjectValue = projects.reduce((acc, p) => acc + (p.totalBudget || 0), 0);
  const totalDesignFees = projects.reduce((acc, p) => acc + (p.designFee || 0), 0);
  const _totalInvoiced = invoices.filter(i => i.status === 'Paid').reduce((acc, i) => acc + i.amount, 0);
  const openSnags = snags.filter(s => s.status !== 'Approved & Closed');
  const criticalSnags = snags.filter(s => s.severity === 'Critical');
  const totalFfeSpend = ffeItems.reduce((acc, item) => acc + (item.clientPrice * (item.qty || 1)), 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="content-body">
      {/* Header */}
      <div className="view-header">
        <div className="view-title-wrap">
          <span className="view-pretitle">Ashara Atelier — Studio Intelligence</span>
          <h1 className="view-title">
            <span>Executive Architecture & Interior Dashboard</span>
          </h1>
          <p className="view-desc">
            Real-time pipeline monitoring across high-end architectural developments, luxury interior fit-outs, FF&E procurement, and on-site quality benchmarks.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-secondary" onClick={() => setCurrentView('projects')}>
            <span>All Projects</span>
            <ArrowUpRight size={15} />
          </button>
          <button className="btn-primary" onClick={onOpenNewProject}>
            <Sparkles size={16} />
            <span>Commission Project</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-top-row">
            <div className="metric-icon-wrap">
              <Building2 size={20} />
            </div>
            <span className="metric-trend-badge positive">
              <TrendingUp size={12} />
              +18.4% YoY
            </span>
          </div>
          <div className="metric-value">{formatCurrency(totalProjectValue)}</div>
          <div className="metric-label">Active Construction & Fit-out Value</div>
        </div>

        <div className="metric-card">
          <div className="metric-top-row">
            <div className="metric-icon-wrap">
              <Coins size={20} />
            </div>
            <span className="metric-trend-badge positive">
              <CheckCircle2 size={12} />
              94% Realized
            </span>
          </div>
          <div className="metric-value">{formatCurrency(totalDesignFees)}</div>
          <div className="metric-label">Contracted Design & BIM Fees</div>
        </div>

        <div className="metric-card">
          <div className="metric-top-row">
            <div className="metric-icon-wrap">
              <Armchair size={20} />
            </div>
            <span className="metric-trend-badge neutral">
              {ffeItems.length} Curated Specs
            </span>
          </div>
          <div className="metric-value">{formatCurrency(totalFfeSpend)}</div>
          <div className="metric-label">FF&E Procurement Pipeline</div>
        </div>

        <div className="metric-card">
          <div className="metric-top-row">
            <div className="metric-icon-wrap" style={{ color: openSnags.length > 0 ? 'var(--status-warning)' : 'var(--gold-bright)' }}>
              <HardHat size={20} />
            </div>
            <span className={`metric-trend-badge ${criticalSnags.length > 0 ? 'negative' : 'neutral'}`} style={{ color: 'var(--status-warning)' }}>
              <AlertCircle size={12} />
              {criticalSnags.length} Critical
            </span>
          </div>
          <div className="metric-value">{openSnags.length} Open</div>
          <div className="metric-label">Site Quality Snags & Punch Items</div>
        </div>
      </div>

      {/* Live Project Architectural Pipeline */}
      <div className="panel-card">
        <div className="panel-header">
          <div>
            <h2 className="panel-title">
              <Compass size={19} style={{ color: 'var(--gold-bright)' }} />
              Active Architectural & Interior Commissions
              <span className="panel-subtitle">({projects.length} Active Commissions)</span>
            </h2>
          </div>
          <button className="btn-secondary btn-sm" onClick={() => setCurrentView('projects')}>
            View Full Matrix
          </button>
        </div>

        <div className="projects-grid">
          {projects.map((proj) => (
            <div 
              key={proj.id} 
              className="project-card"
              onClick={() => onSelectProject(proj)}
              style={{ cursor: 'pointer' }}
            >
              <div className="project-card-image-wrap">
                <img 
                  src={proj.image} 
                  alt={proj.name} 
                  className="project-card-img" 
                />
                <div className="project-card-overlay">
                  <div className="project-overlay-top">
                    <span className="badge badge-gold">{proj.type}</span>
                    <span className={`badge ${proj.health === 'On Track' ? 'badge-success' : 'badge-warning'}`}>
                      {proj.health}
                    </span>
                  </div>
                  <div className="project-overlay-bottom">
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {proj.location}
                    </span>
                    <h3 style={{ fontSize: '17px', color: '#FFFFFF', margin: 0 }}>
                      {proj.name}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="project-card-body">
                <div className="project-meta-row">
                  <span>Current Stage:</span>
                  <span style={{ fontWeight: 600, color: 'var(--gold-bright)' }}>
                    {proj.stage}
                  </span>
                </div>

                {/* Progress Bar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Commission Completion</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{proj.progress}%</span>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: `${proj.progress}%` }} />
                  </div>
                </div>

                <div className="project-meta-row" style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)' }}>Client</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{proj.client}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)' }}>Total Value</span>
                    <span style={{ fontWeight: 700, color: 'var(--gold-bright)' }}>{formatCurrency(proj.totalBudget)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Critical Snags & FF&E Procurement Pulse */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px' }}>
        {/* Site Snags Alert Panel */}
        <div className="panel-card" style={{ margin: 0 }}>
          <div className="panel-header">
            <h2 className="panel-title">
              <HardHat size={18} style={{ color: 'var(--status-warning)' }} />
              High-Priority Site Snags
            </h2>
            <button className="btn-secondary btn-sm" onClick={() => setCurrentView('snags')}>
              Snag Registry ({openSnags.length})
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {openSnags.slice(0, 3).map((snag) => (
              <div 
                key={snag.id}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {snag.location}
                  </span>
                  <span className={`badge ${snag.severity === 'Critical' ? 'badge-danger' : 'badge-warning'}`}>
                    {snag.severity}
                  </span>
                </div>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                  {snag.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '6px' }}>
                  <span>Contractor: {snag.contractor}</span>
                  <span style={{ color: 'var(--gold-primary)' }}>Due: {snag.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FF&E Specification Pulse */}
        <div className="panel-card" style={{ margin: 0 }}>
          <div className="panel-header">
            <h2 className="panel-title">
              <Armchair size={18} style={{ color: 'var(--gold-bright)' }} />
              FF&E High-Value Curations
            </h2>
            <button className="btn-secondary btn-sm" onClick={() => setCurrentView('ffe')}>
              View FF&E Matrix
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {ffeItems.slice(0, 3).map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--gold-primary)', fontWeight: 600 }}>
                    {item.specCode} • {item.category}
                  </div>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                    {item.vendor} ({item.leadTime})
                  </div>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {formatCurrency(item.clientPrice)}
                  </div>
                  <span className={`badge ${item.poStatus === 'On-Site Delivered' ? 'badge-success' : 'badge-gold'}`} style={{ marginTop: '4px' }}>
                    {item.poStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
