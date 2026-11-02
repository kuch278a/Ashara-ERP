import React, { useState } from 'react';
import { X, LifeBuoy, Sparkles } from 'lucide-react';

export default function NewSupportIssueModal({ onClose, onSubmit, clients, projects }) {
  const [subject, setSubject] = useState('');
  const [customer, setCustomer] = useState(clients[0]?.name || '');
  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [priority, setPriority] = useState('Medium');
  const [issueType, setIssueType] = useState('Maintenance Service');
  const [details, setDetails] = useState('');

  const selectedProject = projects.find(p => p.id === projectId) || projects[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject) return;

    const newIssue = {
      id: `ISS-2026-${Math.floor(100 + Math.random() * 900)}`,
      subject: subject,
      customer: customer,
      project: selectedProject.id,
      projectName: selectedProject.name,
      priority: priority,
      issue_type: issueType,
      status: 'Open',
      opening_date: new Date().toISOString().split('T')[0],
      resolution_details: details || 'Under investigation by atelier client care team.'
    };

    onSubmit(newIssue);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: '620px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--gold-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-bright)' }}>
              <LifeBuoy size={18} />
            </div>
            <div>
              <h3 className="modal-title" style={{ margin: 0 }}>Log Client Warranty & Care Ticket</h3>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ERPNext Support Module (DocType: Issue)</span>
            </div>
          </div>
          <button className="btn-secondary" style={{ padding: '6px' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Issue Subject / Service Claim *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Master Bedroom Acoustic Motorized Drapery Jam"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Client Head *</label>
                <select
                  className="form-input"
                  value={customer}
                  onChange={e => setCustomer(e.target.value)}
                >
                  {clients.map(c => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Project Handover *</label>
                <select
                  className="form-input"
                  value={projectId}
                  onChange={e => setProjectId(e.target.value)}
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Priority Level *</label>
                <select
                  className="form-input"
                  value={priority}
                  onChange={e => setPriority(e.target.value)}
                >
                  <option value="Low">Low - Periodic</option>
                  <option value="Medium">Medium - Standard (48h)</option>
                  <option value="High">High - Priority (24h)</option>
                  <option value="Urgent">Urgent - Emergency VIP (4h)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Issue Category *</label>
                <select
                  className="form-input"
                  value={issueType}
                  onChange={e => setIssueType(e.target.value)}
                >
                  <option value="Defect Warranty">Defect Warranty</option>
                  <option value="Maintenance Service">Maintenance Service</option>
                  <option value="Material Wear">Material Wear</option>
                  <option value="Automation Tune-up">Automation Tune-up</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Initial Assessment & Action Plan</label>
              <textarea
                className="form-input"
                rows={3}
                placeholder="Technical details of maintenance request or subcontractor dispatch..."
                value={details}
                onChange={e => setDetails(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Sparkles size={16} />
              <span>Log Support Ticket</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
