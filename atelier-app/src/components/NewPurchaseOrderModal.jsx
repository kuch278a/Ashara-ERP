import React, { useState } from 'react';
import { X, Plus, Trash2, ShoppingBag, Sparkles } from 'lucide-react';

export default function NewPurchaseOrderModal({ onClose, onSubmit, suppliers, projects, warehouses }) {
  const [supplierId, setSupplierId] = useState(suppliers[0]?.id || '');
  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [warehouseId, setWarehouseId] = useState(warehouses[0]?.id || 'WH-DEPOT-01');
  const [scheduleDate, setScheduleDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 45);
    return d.toISOString().split('T')[0];
  });
  const [currency] = useState('USD');
  const [items, setItems] = useState([
    {
      item_code: 'MAT-TRV-02',
      item_name: 'Calacatta Michelangelo Vein-Matched Marble',
      qty: 45,
      uom: 'm²',
      rate: 380,
      warehouse: warehouses[0]?.id || 'WH-DEPOT-01'
    }
  ]);

  const selectedSupplier = suppliers.find(s => s.id === supplierId) || suppliers[0];
  const selectedProject = projects.find(p => p.id === projectId) || projects[0];

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        item_code: `ITM-SPEC-${Math.floor(100 + Math.random() * 900)}`,
        item_name: '',
        qty: 1,
        uom: 'Nos',
        rate: 0,
        warehouse: warehouseId
      }
    ]);
  };

  const handleRemoveItem = (index) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const totalAmount = items.reduce((sum, item) => sum + (Number(item.qty) || 0) * (Number(item.rate) || 0), 0);
  const totalQty = items.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!supplierId || !projectId || items.length === 0) return;

    const seq = Date.now().toString().slice(-4);
    const newPO = {
      id: `PO-2026-${seq}`,
      naming_series: 'PO-2026-',
      supplier: selectedSupplier.id,
      supplier_name: selectedSupplier.supplier_name,
      project: selectedProject.id,
      projectName: selectedProject.name,
      transaction_date: new Date().toISOString().split('T')[0],
      schedule_date: scheduleDate,
      set_warehouse: warehouseId,
      status: 'To Receive and Bill',
      docstatus: 1, // Submitted
      currency: currency,
      total_qty: totalQty,
      total: totalAmount,
      items: items.map(item => ({
        ...item,
        qty: Number(item.qty) || 1,
        rate: Number(item.rate) || 0,
        amount: (Number(item.qty) || 1) * (Number(item.rate) || 0)
      }))
    };

    onSubmit(newPO);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: '820px' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--gold-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-bright)' }}>
              <ShoppingBag size={18} />
            </div>
            <div>
              <h3 className="modal-title" style={{ margin: 0 }}>New Purchase Order</h3>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ERPNext Buying Module (DocType: Purchase Order)</span>
            </div>
          </div>
          <button className="btn-secondary" style={{ padding: '6px' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Top Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Supplier / Atelier *</label>
                <select
                  className="form-input"
                  value={supplierId}
                  onChange={e => setSupplierId(e.target.value)}
                  required
                >
                  {suppliers.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.supplier_name} ({s.country} • {s.supplier_group})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Project Allocation *</label>
                <select
                  className="form-input"
                  value={projectId}
                  onChange={e => setProjectId(e.target.value)}
                  required
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.id})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Required By (Site Delivery Date) *</label>
                <input
                  type="date"
                  className="form-input"
                  value={scheduleDate}
                  onChange={e => setScheduleDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Destination Warehouse / Staging *</label>
                <select
                  className="form-input"
                  value={warehouseId}
                  onChange={e => setWarehouseId(e.target.value)}
                >
                  {warehouses.map(w => (
                    <option key={w.id} value={w.id}>
                      {w.warehouse_name} ({w.warehouse_type})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Line Items Table */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label className="form-label" style={{ margin: 0, fontWeight: '600' }}>
                  Purchase Order Items (Child Table: Purchase Order Item)
                </label>
                <button
                  type="button"
                  className="btn-secondary btn-sm"
                  onClick={handleAddItem}
                  style={{ fontSize: '11.5px', padding: '4px 10px' }}
                >
                  <Plus size={14} />
                  <span>Add Line Item</span>
                </button>
              </div>

              <div className="table-container" style={{ margin: 0 }}>
                <table className="data-table" style={{ fontSize: '12.5px' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '22%' }}>Item Code</th>
                      <th style={{ width: '38%' }}>Description / Name</th>
                      <th style={{ width: '12%' }}>Qty</th>
                      <th style={{ width: '10%' }}>UOM</th>
                      <th style={{ width: '14%' }}>Unit Rate ($)</th>
                      <th style={{ width: '4%' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          <input
                            type="text"
                            className="form-input"
                            style={{ padding: '6px 8px', fontSize: '12px' }}
                            value={item.item_code}
                            onChange={e => handleItemChange(idx, 'item_code', e.target.value)}
                            placeholder="e.g. MAT-TRV-02"
                            required
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-input"
                            style={{ padding: '6px 8px', fontSize: '12px' }}
                            value={item.item_name}
                            onChange={e => handleItemChange(idx, 'item_name', e.target.value)}
                            placeholder="Specification description"
                            required
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            min="1"
                            className="form-input"
                            style={{ padding: '6px 8px', fontSize: '12px' }}
                            value={item.qty}
                            onChange={e => handleItemChange(idx, 'qty', e.target.value)}
                            required
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-input"
                            style={{ padding: '6px 8px', fontSize: '12px' }}
                            value={item.uom}
                            onChange={e => handleItemChange(idx, 'uom', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            className="form-input"
                            style={{ padding: '6px 8px', fontSize: '12px' }}
                            value={item.rate}
                            onChange={e => handleItemChange(idx, 'rate', e.target.value)}
                            required
                          />
                        </td>
                        <td>
                          {items.length > 1 && (
                            <button
                              type="button"
                              className="btn-secondary"
                              style={{ padding: '6px', color: 'var(--status-danger)' }}
                              onClick={() => handleRemoveItem(idx)}
                              title="Delete row"
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals Summary */}
              <div style={{ marginTop: '14px', background: 'var(--bg-secondary)', padding: '12px 18px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'flex-end', gap: '30px', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Total Units: <strong style={{ color: 'var(--text-primary)' }}>{totalQty}</strong>
                </span>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  Total Valuation: <strong style={{ fontSize: '18px', color: 'var(--gold-bright)' }}>${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
                </span>
              </div>
            </div>
          </div>

          <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Sparkles size={16} />
              <span>Submit Purchase Order (PO)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
