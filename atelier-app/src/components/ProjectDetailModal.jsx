import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function ProjectDetailModal({ 
  project, 
  onClose, 
  ffeItems = [], 
  snags = [], 
  invoices = [],
  onUpdateProject 
}) {
  const [activeTab, setActiveTab] = useState('phases'); // 'phases' | 'ffe' | 'snags' | 'financials'

  if (!project) return null;

  const phases = project.phases || [];
  const projectFfe = (ffeItems || []).filter(f => f.projectId === project.id);
  const projectSnags = (snags || []).filter(s => s.projectId === project.id);
  const projectInvoices = (invoices || []).filter(i => i.projectId === project.id);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  // Toggle Phase Status
  const handleTogglePhase = (phaseIndex) => {
    const updatedPhases = [...phases];
    const currentStatus = updatedPhases[phaseIndex].status;
    let nextStatus = 'Pending';
    if (currentStatus === 'Pending') nextStatus = 'In Progress';
    else if (currentStatus === 'In Progress') nextStatus = 'Completed';
    else if (currentStatus === 'Completed') nextStatus = 'Pending';

    updatedPhases[phaseIndex].status = nextStatus;

    // Recalculate progress %
    const completedCount = updatedPhases.filter(p => p.status === 'Completed').length;
    const inProgressCount = updatedPhases.filter(p => p.status === 'In Progress').length;
    const newProgress = Math.round(((completedCount * 1.0) + (inProgressCount * 0.4)) / updatedPhases.length * 100);

    // Current stage corresponds to the latest non-completed or in-progress phase
    const inProgressPhase = updatedPhases.find(p => p.status === 'In Progress');
    const newStage = inProgressPhase ? inProgressPhase.name : project.stage;

    onUpdateProject({
      ...project,
      phases: updatedPhases,
      progress: Math.min(newProgress, 100),
      stage: newStage
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" style={{ maxWidth: '840px' }} onClick={(e) => e.stopPropagation()}>
        {/* Modal Top Header with Cover Image */}
        <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
          <img 
            src={project.image} 
            alt={project.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(15,20,28,0.95) 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '24px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge badge-gold">{project.type}</span>
              <button 
                onClick={onClose} 
                style={{ 
                  background: 'rgba(0,0,0,0.5)', 
                  border: '1px solid rgba(255,255,255,0.2)', 
                  color: '#FFFFFF', 
                  borderRadius: '50%', 
                  width: '32px', 
                  height: '32px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: 'pointer' 
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div>
              <div style={{ fontSize: '12px', color: 'var(--gold-bright)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {project.location} • {project.area}
              </div>
              <h2 style={{ fontSize: '24px', color: '#FFFFFF', margin: '4px 0 0 0', fontFamily: 'var(--font-display)' }}>
                {project.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', padding: '0 24px' }}>
          <button
            onClick={() => setActiveTab('phases')}
            className={`filter-chip ${activeTab === 'phases' ? 'active' : ''}`}
            style={{ borderRadius: 0, borderBottom: activeTab === 'phases' ? '2px solid var(--gold-bright)' : 'none', padding: '14px 18px' }}
          >
            Architectural Phases & BIM
          </button>
          <button
            onClick={() => setActiveTab('ffe')}
            className={`filter-chip ${activeTab === 'ffe' ? 'active' : ''}`}
            style={{ borderRadius: 0, borderBottom: activeTab === 'ffe' ? '2px solid var(--gold-bright)' : 'none', padding: '14px 18px' }}
          >
            FF&E Specs ({projectFfe.length})
          </button>
          <button
            onClick={() => setActiveTab('snags')}
            className={`filter-chip ${activeTab === 'snags' ? 'active' : ''}`}
            style={{ borderRadius: 0, borderBottom: activeTab === 'snags' ? '2px solid var(--gold-bright)' : 'none', padding: '14px 18px' }}
          >
            Site Snags ({projectSnags.length})
          </button>
          <button
            onClick={() => setActiveTab('financials')}
            className={`filter-chip ${activeTab === 'financials' ? 'active' : ''}`}
            style={{ borderRadius: 0, borderBottom: activeTab === 'financials' ? '2px solid var(--gold-bright)' : 'none', padding: '14px 18px' }}
          >
            Financials & Fees
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ maxHeight: 'calc(90vh - 340px)', overflowY: 'auto' }}>
          {/* Quick Info Strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', background: 'var(--bg-tertiary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Lead Architect</span>
              <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{project.leadArchitect}</strong>
            </div>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Client Principal</span>
              <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{project.client}</strong>
            </div>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Aesthetic Palette</span>
              <strong style={{ fontSize: '13px', color: 'var(--gold-bright)' }}>{project.aesthetic}</strong>
            </div>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Total Commission</span>
              <strong style={{ fontSize: '14px', color: 'var(--gold-bright)' }}>{formatCurrency(project.totalBudget)}</strong>
            </div>
          </div>

          {/* TAB 1: Architectural Phases */}
          {activeTab === 'phases' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h3 style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Commission Design Stages (Click stage to advance)
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                  Advance milestones as deliverables are verified with BIM coordinators, engineers, and client review boards.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {phases.map((phase, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleTogglePhase(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 18px',
                      background: phase.status === 'Completed' ? 'rgba(62, 136, 91, 0.08)' : phase.status === 'In Progress' ? 'rgba(197, 160, 89, 0.08)' : 'var(--bg-tertiary)',
                      border: `1px solid ${phase.status === 'Completed' ? 'var(--status-success)' : phase.status === 'In Progress' ? 'var(--gold-primary)' : 'var(--border-subtle)'}`,
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: phase.status === 'Completed' ? 'var(--status-success)' : phase.status === 'In Progress' ? 'var(--gold-primary)' : 'var(--bg-secondary)',
                          color: phase.status === 'Pending' ? 'var(--text-muted)' : '#090D12',
                          fontWeight: 700,
                          fontSize: '12px'
                        }}
                      >
                        {phase.status === 'Completed' ? '✓' : idx + 1}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '14px' }}>
                          {phase.name}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          Target: {phase.date}
                        </div>
                      </div>
                    </div>

                    <span className={`badge ${phase.status === 'Completed' ? 'badge-success' : phase.status === 'In Progress' ? 'badge-gold' : 'badge-neutral'}`}>
                      {phase.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Spatial Room Schedule */}
              <div style={{ marginTop: '12px' }}>
                <h4 style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '10px' }}>
                  Commission Spatial Zones & Rooms
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {project.roomSchedule?.map((room, i) => (
                    <span key={i} className="badge badge-neutral" style={{ padding: '6px 12px', fontSize: '12px' }}>
                      {room}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FF&E Specs */}
          {activeTab === 'ffe' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  FF&E Specifications Schedule ({projectFfe.length} items)
                </span>
              </div>

              {projectFfe.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                  No FF&E specs logged specifically for this commission yet. Use the top menu to add new specs.
                </div>
              ) : (
                <div className="data-table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Spec Code</th>
                        <th>Item & Category</th>
                        <th>Zone / Room</th>
                        <th>Vendor</th>
                        <th>Client Price</th>
                        <th>PO Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectFfe.map((item) => (
                        <tr key={item.id}>
                          <td style={{ fontWeight: 600, color: 'var(--gold-bright)' }}>{item.specCode}</td>
                          <td>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.name}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.category}</div>
                          </td>
                          <td>{item.room}</td>
                          <td>{item.vendor}</td>
                          <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formatCurrency(item.clientPrice)}</td>
                          <td>
                            <span className={`badge ${item.poStatus === 'On-Site Delivered' ? 'badge-success' : 'badge-gold'}`}>
                              {item.poStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Site Snags */}
          {activeTab === 'snags' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  On-Site Inspection Snags ({projectSnags.length})
                </span>
              </div>

              {projectSnags.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                  Zero active site snags reported for this commission. Site quality verified!
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {projectSnags.map((snag) => (
                    <div 
                      key={snag.id}
                      style={{ 
                        background: 'var(--bg-tertiary)', 
                        padding: '16px', 
                        borderRadius: 'var(--radius-md)', 
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '13.5px' }}>
                          {snag.location}
                        </span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <span className={`badge ${snag.severity === 'Critical' ? 'badge-danger' : 'badge-warning'}`}>
                            {snag.severity}
                          </span>
                          <span className="badge badge-neutral">
                            {snag.status}
                          </span>
                        </div>
                      </div>
                      <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>
                        {snag.description}
                      </p>
                      <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px' }}>
                        Contractor: <strong>{snag.contractor}</strong> • Due: {snag.dueDate}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Financials */}
          {activeTab === 'financials' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                <div className="metric-card" style={{ padding: '16px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total Commission Budget</span>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {formatCurrency(project.totalBudget)}
                  </div>
                </div>
                <div className="metric-card" style={{ padding: '16px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Ashara Design Fee</span>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--gold-bright)' }}>
                    {formatCurrency(project.designFee)}
                  </div>
                </div>
                <div className="metric-card" style={{ padding: '16px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Fee Invoiced / Realized</span>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--status-success)' }}>
                    {formatCurrency(project.invoicedAmount)}
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '10px' }}>
                  Issued Milestone Invoices ({projectInvoices.length})
                </h4>
                {projectInvoices.length === 0 ? (
                  <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                    No milestone invoices issued yet.
                  </div>
                ) : (
                  <div className="data-table-container">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Invoice #</th>
                          <th>Milestone Description</th>
                          <th>Amount</th>
                          <th>Due Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projectInvoices.map((inv) => (
                          <tr key={inv.id}>
                            <td style={{ fontWeight: 600, color: 'var(--gold-bright)' }}>{inv.id}</td>
                            <td>{inv.milestone}</td>
                            <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formatCurrency(inv.amount)}</td>
                            <td>{inv.dueDate}</td>
                            <td>
                              <span className={`badge ${inv.status === 'Paid' ? 'badge-success' : inv.status === 'Pending' ? 'badge-warning' : 'badge-danger'}`}>
                                {inv.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
