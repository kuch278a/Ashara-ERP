import React, { useState } from 'react';
import { X, Receipt } from 'lucide-react';

export default function NewInvoiceModal({ onClose, onSubmit, projects }) {
  const [formData, setFormData] = useState({
    projectId: projects[0]?.id || '',
    milestone: 'Phase 2: 3D Visualizations & VR Experience Sign-off',
    amount: 120000,
    dueDate: '2026-11-20',
    status: 'Pending',
    paymentMethod: 'Wire Transfer'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount) return;

    const matchedProject = projects.find(p => p.id === formData.projectId);

    const newInvoice = {
      ...formData,
      id: `INV-2026-${Math.floor(Math.random() * 900 + 100)}`,
      projectName: matchedProject?.name || 'Ashara Commission',
      clientName: matchedProject?.client || 'VIP Client',
      issueDate: new Date().toISOString().split('T')[0],
      taxRate: 5,
      totalWithTax: Math.round(formData.amount * 1.05)
    };

    onSubmit(newInvoice);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Generate Milestone Fee Invoice</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Commission Project</label>
              <select
                value={formData.projectId}
                onChange={e => setFormData({ ...formData, projectId: e.target.value })}
                className="form-select"
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.client})</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Architectural Milestone / Scope Draw</label>
              <input
                type="text"
                required
                value={formData.milestone}
                onChange={e => setFormData({ ...formData, milestone: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Milestone Fee Draw ($)</label>
                <input
                  type="number"
                  required
                  value={formData.amount}
                  onChange={e => setFormData({ ...formData, amount: Number(e.target.value) })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Payment Due Date</label>
                <input
                  type="date"
                  required
                  value={formData.dueDate}
                  onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Initial Status</label>
                <select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  className="form-select"
                >
                  <option value="Pending">Pending (Sent to Client)</option>
                  <option value="Paid">Paid / Settled</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Payment Method</label>
                <input
                  type="text"
                  value={formData.paymentMethod}
                  onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Receipt size={16} />
              <span>Issue Tax Invoice</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
