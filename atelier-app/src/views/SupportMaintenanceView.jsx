import React, { useState } from 'react';
import { 
  LifeBuoy, 
  Wrench, 
  CheckCircle2, 
  Clock, 
  FileCode, 
  Plus, 
  Search, 
  Star
} from 'lucide-react';

export default function SupportMaintenanceView({ 
  issues, 
  subcontractOrders, 
  onOpenNewIssue, 
  onUpdateIssueStatus,
  onOpenDocTypeInspector 
}) {
  const [activeTab, setActiveTab] = useState('issues'); // 'issues' | 'subcontracting'
  const [searchQuery, setSearchQuery] = useState('');

  const openIssues = issues.filter(i => i.status !== 'Resolved' && i.status !== 'Closed');
  const resolvedIssues = issues.filter(i => i.status === 'Resolved' || i.status === 'Closed');

  const filteredIssues = issues.filter(i => {
    return i.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.projectName.toLowerCase().includes(searchQuery.toLowerCase());
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="view-pretitle">Ashara Client Assurance</span>
            <span className="badge badge-gold" style={{ fontSize: '10px' }}>ERPNext Support & Subcontracting</span>
          </div>
          <h1 className="view-title">
            <span>Client Warranty, Support Care & Subcontracting Orders</span>
          </h1>
          <p className="view-desc">
            Directly mapped to ERPNext <code>Issue</code> and <code>Subcontracting Order</code> DocTypes. Manage post-handover architectural maintenance, warranty defect claims, and specialist subcontractor contracts.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button 
            className="btn-secondary" 
            onClick={() => onOpenDocTypeInspector('issue')}
            title="Inspect ERPNext Support schema"
          >
            <FileCode size={16} />
            <span>DocType Schema</span>
          </button>
          <button className="btn-primary" onClick={onOpenNewIssue}>
            <Plus size={16} />
            <span>Log Warranty Issue</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-top-row">
            <span className="metric-label">Open Warranty Care Tickets</span>
            <LifeBuoy size={18} style={{ color: openIssues.length > 0 ? 'var(--status-warning)' : 'var(--status-success)' }} />
          </div>
          <div className="metric-value" style={{ color: openIssues.length > 0 ? 'var(--status-warning)' : 'var(--status-success)' }}>
            {openIssues.length} Tickets
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            {resolvedIssues.length} Resolved • {openIssues.length} Active Tickets
          </span>
        </div>

        <div className="metric-card">
          <div className="metric-top-row">
            <span className="metric-label">Average SLA Resolution</span>
            <Clock size={18} style={{ color: 'var(--status-info)' }} />
          </div>
          <div className="metric-value" style={{ color: 'var(--status-info)' }}>24 Hours</div>
          <span style={{ fontSize: '11px', color: 'var(--status-info)' }}>Guaranteed VIP turnaround</span>
        </div>

        <div className="metric-card">
          <div className="metric-top-row">
            <span className="metric-label">Specialist Subcontracting</span>
            <Wrench size={18} style={{ color: 'var(--gold-bright)' }} />
          </div>
          <div className="metric-value">{subcontractOrders.length} Orders</div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Waterjet stone, automation integration</span>
        </div>

        <div className="metric-card">
          <div className="metric-top-row">
            <span className="metric-label">Post-Handover CSAT Score</span>
            <Star size={18} style={{ color: 'var(--gold-bright)' }} />
          </div>
          <div className="metric-value" style={{ color: 'var(--gold-bright)' }}>4.95 / 5.0</div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Bespoke client satisfaction</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('issues')}
            className={`pill-btn ${activeTab === 'issues' ? 'active' : ''}`}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-md)',
              fontSize: '13px',
              fontWeight: activeTab === 'issues' ? '600' : '400',
              border: activeTab === 'issues' ? '1px solid var(--gold-bright)' : '1px solid var(--border-subtle)',
              background: activeTab === 'issues' ? 'var(--gold-glow)' : 'var(--bg-secondary)',
              color: activeTab === 'issues' ? 'var(--gold-bright)' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <LifeBuoy size={16} />
            <span>Support & Warranty Issues ({issues.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('subcontracting')}
            className={`pill-btn ${activeTab === 'subcontracting' ? 'active' : ''}`}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-md)',
              fontSize: '13px',
              fontWeight: activeTab === 'subcontracting' ? '600' : '400',
              border: activeTab === 'subcontracting' ? '1px solid var(--gold-bright)' : '1px solid var(--border-subtle)',
              background: activeTab === 'subcontracting' ? 'var(--gold-glow)' : 'var(--bg-secondary)',
              color: activeTab === 'subcontracting' ? 'var(--gold-bright)' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Wrench size={16} />
            <span>Subcontracting Orders ({subcontractOrders.length})</span>
          </button>
        </div>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search ticket subject, client..."
            className="form-input"
            style={{ paddingLeft: '32px', paddingRight: '12px', fontSize: '12px', width: '230px' }}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tab: Issues */}
      {activeTab === 'issues' && (
        <div className="panel-card" style={{ padding: '0', overflow: 'hidden' }}>
          <div className="table-container" style={{ margin: 0 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Subject & Client</th>
                  <th>Project Commission</th>
                  <th>Issue Category</th>
                  <th>Priority</th>
                  <th>Logged Date</th>
                  <th>Resolution Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredIssues.map(issue => {
                  const isResolved = issue.status === 'Resolved' || issue.status === 'Closed';

                  return (
                    <tr key={issue.id}>
                      <td>
                        <span style={{ fontWeight: '700', color: 'var(--gold-bright)', fontFamily: 'monospace' }}>
                          {issue.id}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{issue.subject}</div>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Client: {issue.customer}</span>
                      </td>
                      <td>
                        <div style={{ color: 'var(--text-primary)' }}>{issue.projectName}</div>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{issue.project}</span>
                      </td>
                      <td>
                        <span className="badge badge-neutral" style={{ fontSize: '11px' }}>
                          {issue.issue_type}
                        </span>
                      </td>
                      <td>
                        <span 
                          className={`badge ${
                            issue.priority === 'High' || issue.priority === 'Urgent' ? 'badge-danger' : 'badge-warning'
                          }`}
                          style={{ fontSize: '11px' }}
                        >
                          {issue.priority}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{issue.opening_date}</td>
                      <td>
                        <span 
                          className={`badge ${
                            isResolved ? 'badge-success' : 'badge-info'
                          }`}
                          style={{ fontSize: '11px' }}
                        >
                          {issue.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        {!isResolved && (
                          <button
                            className="btn-secondary btn-sm"
                            style={{ fontSize: '11px', padding: '4px 8px' }}
                            onClick={() => onUpdateIssueStatus(issue.id, 'Resolved')}
                            title="Mark issue as Resolved"
                          >
                            <CheckCircle2 size={12} style={{ color: 'var(--status-success)' }} />
                            <span>Resolve</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Subcontracting Orders */}
      {activeTab === 'subcontracting' && (
        <div className="panel-card" style={{ padding: '0', overflow: 'hidden' }}>
          <div className="table-container" style={{ margin: 0 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Subcontractor / Specialist</th>
                  <th>Project Commission</th>
                  <th>Specialist Service Performed</th>
                  <th>Subcontract Fee</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {subcontractOrders.map(sco => (
                  <tr key={sco.id}>
                    <td>
                      <span style={{ fontWeight: '700', color: 'var(--gold-bright)', fontFamily: 'monospace' }}>
                        {sco.id}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{sco.supplier}</div>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Artisan Subcontractor</span>
                    </td>
                    <td>
                      <div style={{ color: 'var(--text-primary)' }}>{sco.projectName}</div>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{sco.project}</span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '12.5px' }}>
                      {sco.service_item}
                    </td>
                    <td>
                      <span style={{ fontWeight: '700', color: 'var(--gold-bright)', fontSize: '14px' }}>
                        {formatCurrency(sco.rate)}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-success" style={{ fontSize: '11px' }}>
                        {sco.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
