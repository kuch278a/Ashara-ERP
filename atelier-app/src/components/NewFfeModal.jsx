import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

export default function NewFfeModal({ onClose, onSubmit, projects }) {
  const [formData, setFormData] = useState({
    name: '',
    specCode: 'FFE-2026-099',
    category: 'Loose Furniture',
    room: 'Main Living Hall',
    projectId: projects[0]?.id || '',
    vendor: '',
    finish: '',
    dimensions: '',
    leadTime: '8-10 weeks',
    unitCost: 5000,
    markupPct: 35,
    qty: 1,
    notes: ''
  });

  const clientPrice = Math.round(formData.unitCost * (1 + formData.markupPct / 100));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const matchedProject = projects.find(p => p.id === formData.projectId);

    const newItem = {
      ...formData,
      id: `FFE-${Date.now()}`,
      projectName: matchedProject?.name || 'Ashara Project',
      clientPrice,
      sampleApproved: false,
      poStatus: 'Spec Draft'
    };

    onSubmit(newItem);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add FF&E Specification Item</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Spec Code</label>
                <input
                  type="text"
                  required
                  value={formData.specCode}
                  onChange={e => setFormData({ ...formData, specCode: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="form-select"
                >
                  <option value="Loose Furniture">Loose Furniture</option>
                  <option value="Bespoke Lighting">Bespoke Lighting</option>
                  <option value="Stone & Finishes">Stone & Finishes</option>
                  <option value="Millwork & Joinery">Millwork & Joinery</option>
                  <option value="Sanitaryware">Sanitaryware</option>
                  <option value="Textiles & Rugs">Textiles & Rugs</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Item Description / Model Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Sculptural Travertine Plinth Cocktail Table"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
              />
            </div>

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
                <label className="form-label">Spatial Zone / Room</label>
                <input
                  type="text"
                  placeholder="e.g. Master Suite / Formal Majlis"
                  value={formData.room}
                  onChange={e => setFormData({ ...formData, room: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Vendor / Atelier Source</label>
                <input
                  type="text"
                  placeholder="e.g. Minotti Studio / Henge Florence"
                  value={formData.vendor}
                  onChange={e => setFormData({ ...formData, vendor: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Lead Time</label>
                <input
                  type="text"
                  placeholder="e.g. 10 weeks (Milan)"
                  value={formData.leadTime}
                  onChange={e => setFormData({ ...formData, leadTime: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Trade Unit Cost ($)</label>
                <input
                  type="number"
                  value={formData.unitCost}
                  onChange={e => setFormData({ ...formData, unitCost: Number(e.target.value) })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Markup % (Client Price: ${clientPrice.toLocaleString()})</label>
                <input
                  type="number"
                  value={formData.markupPct}
                  onChange={e => setFormData({ ...formData, markupPct: Number(e.target.value) })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Finish & Material Specification</label>
              <textarea
                rows={2}
                placeholder="e.g. Unfilled open-pore Roman Travertine, brushed brass base with clear matte polyurethane coat..."
                value={formData.finish}
                onChange={e => setFormData({ ...formData, finish: e.target.value })}
                className="form-textarea"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Plus size={16} />
              <span>Save FF&E Spec</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
