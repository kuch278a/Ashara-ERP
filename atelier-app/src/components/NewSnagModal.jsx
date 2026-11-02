import React, { useState } from 'react';
import { X, HardHat } from 'lucide-react';

export default function NewSnagModal({ onClose, onSubmit, projects }) {
  const [formData, setFormData] = useState({
    projectId: projects[0]?.id || '',
    location: '',
    category: 'Stonework & Finishes',
    severity: 'Moderate',
    contractor: 'Apex Bespoke Joinery',
    description: '',
    dueDate: '2026-11-05',
    rectificationPlan: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.location.trim() || !formData.description.trim()) return;

    const matchedProject = projects.find(p => p.id === formData.projectId);

    const newSnag = {
      ...formData,
      id: `SNG-${Math.floor(Math.random() * 900 + 100)}`,
      projectName: matchedProject?.name || 'Ashara Project',
      status: 'Open',
      dateLogged: new Date().toISOString().split('T')[0],
      photoUrl: matchedProject?.image || '/images/villa-interior.jpg',
      loggedBy: 'Sarah Al-Mansoor (Principal)'
    };

    onSubmit(newSnag);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Log Site Inspection Snag / Punch Item</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Commission Project</label>
                <select
                  value={formData.projectId}
                  onChange={e => setFormData({ ...formData, projectId: e.target.value })}
                  className="form-select"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Trade Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="form-select"
                >
                  <option value="Stonework & Finishes">Stonework & Finishes</option>
                  <option value="Joinery & Millwork">Joinery & Millwork</option>
                  <option value="MEP & Automation">MEP & Automation</option>
                  <option value="Glazing & Facades">Glazing & Facades</option>
                  <option value="Paint & Microcement">Paint & Microcement</option>
                  <option value="Landscape & Irrigation">Landscape & Irrigation</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Specific Room / Grid Axis</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Bath Zone 2B (Wall 3)"
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Severity Rating</label>
                <select
                  value={formData.severity}
                  onChange={e => setFormData({ ...formData, severity: e.target.value })}
                  className="form-select"
                >
                  <option value="Critical">Critical (Structural / MEP / Safety)</option>
                  <option value="Moderate">Moderate (Finishes / Alignment)</option>
                  <option value="Cosmetic">Cosmetic (Touchup / Polish)</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Assigned Trade Contractor</label>
                <input
                  type="text"
                  placeholder="e.g. MarbleCraft Italia LLC"
                  value={formData.contractor}
                  onChange={e => setFormData({ ...formData, contractor: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Rectification Target Date</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Defect Observation & Inspection Note</label>
              <textarea
                rows={3}
                required
                placeholder="State the observed variance against architectural drawings..."
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="form-textarea"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Required Remedial Action</label>
              <input
                type="text"
                placeholder="e.g. Re-level anchors, regrout with color-matched epoxy, buff matte seal..."
                value={formData.rectificationPlan}
                onChange={e => setFormData({ ...formData, rectificationPlan: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <HardHat size={16} />
              <span>Issue Snag to Contractor</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
