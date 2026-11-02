import React, { useState } from 'react';
import { X, Hammer, Sparkles } from 'lucide-react';

export default function NewWorkOrderModal({ onClose, onSubmit, boms, projects, warehouses: _warehouses }) {
  const [bomId, setBomId] = useState(boms[0]?.id || '');
  const [qty, setQty] = useState(1);
  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [leadCraftsman, setLeadCraftsman] = useState('Master Joiner Tobias Henz');
  const [expectedDate, setExpectedDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  });

  const selectedBom = boms.find(b => b.id === bomId) || boms[0];
  const selectedProject = projects.find(p => p.id === projectId) || projects[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bomId || !projectId) return;

    const newWO = {
      id: `MFG-WO-2026-${Math.floor(100 + Math.random() * 900)}`,
      production_item: selectedBom.item,
      item_name: selectedBom.item_name,
      bom_no: selectedBom.id,
      qty: Number(qty) || 1,
      project: selectedProject.id,
      projectName: selectedProject.name,
      source_warehouse: "WH-DEPOT-01",
      wip_warehouse: "WH-FAB-MILL",
      fg_warehouse: "WH-ON-SITE-01",
      planned_start_date: new Date().toISOString().split('T')[0],
      expected_delivery_date: expectedDate,
      status: "In Process",
      docstatus: 1,
      progress: 10,
      leadCraftsman: leadCraftsman
    };

    onSubmit(newWO);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: '640px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--gold-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-bright)' }}>
              <Hammer size={18} />
            </div>
            <div>
              <h3 className="modal-title" style={{ margin: 0 }}>Create Manufacturing Work Order</h3>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ERPNext Manufacturing (DocType: Work Order)</span>
            </div>
          </div>
          <button className="btn-secondary" style={{ padding: '6px' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Select Bill of Materials (BOM) *</label>
              <select
                className="form-input"
                value={bomId}
                onChange={e => setBomId(e.target.value)}
                required
              >
                {boms.map(b => (
                  <option key={b.id} value={b.id}>
                    {b.item_name} ({b.id})
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Quantity to Produce *</label>
                <input
                  type="number"
                  min="1"
                  className="form-input"
                  value={qty}
                  onChange={e => setQty(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Project Commission *</label>
                <select
                  className="form-input"
                  value={projectId}
                  onChange={e => setProjectId(e.target.value)}
                  required
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
                <label className="form-label">Lead Artisan / Craftsman</label>
                <input
                  type="text"
                  className="form-input"
                  value={leadCraftsman}
                  onChange={e => setLeadCraftsman(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Target Completion Date *</label>
                <input
                  type="date"
                  className="form-input"
                  value={expectedDate}
                  onChange={e => setExpectedDate(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Sparkles size={16} />
              <span>Launch Work Order (DocStatus: 1)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
