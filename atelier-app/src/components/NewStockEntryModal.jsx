import React, { useState } from 'react';
import { X, ArrowRightLeft, Sparkles, Plus, Trash2 } from 'lucide-react';

export default function NewStockEntryModal({ onClose, onSubmit, stockItems, warehouses, projects }) {
  const [purpose, setPurpose] = useState('Material Transfer');
  const [fromWarehouse, setFromWarehouse] = useState(warehouses[0]?.id || 'WH-DEPOT-01');
  const [toWarehouse, setToWarehouse] = useState(warehouses[2]?.id || 'WH-ON-SITE-01');
  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [items, setItems] = useState([
    {
      item_code: stockItems[0]?.item_code || 'MAT-TRV-01',
      item_name: stockItems[0]?.item_name || 'Honed Roman Travertine Slabs',
      qty: 20,
      uom: stockItems[0]?.stock_uom || 'm²',
      valuation_rate: stockItems[0]?.valuation_rate || 266.67
    }
  ]);

  const handleAddItem = () => {
    const defaultItem = stockItems[0] || {};
    setItems([
      ...items,
      {
        item_code: defaultItem.item_code || '',
        item_name: defaultItem.item_name || '',
        qty: 1,
        uom: defaultItem.stock_uom || 'Nos',
        valuation_rate: defaultItem.valuation_rate || 100
      }
    ]);
  };

  const handleItemSelect = (index, itemCode) => {
    const selected = stockItems.find(s => s.item_code === itemCode);
    if (!selected) return;
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      item_code: selected.item_code,
      item_name: selected.item_name,
      uom: selected.stock_uom,
      valuation_rate: selected.valuation_rate
    };
    setItems(updated);
  };

  const handleQtyChange = (index, qty) => {
    const updated = [...items];
    updated[index].qty = Number(qty) || 1;
    setItems(updated);
  };

  const handleRemoveItem = (index) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const totalValue = items.reduce((sum, itm) => sum + (itm.qty * itm.valuation_rate), 0);
  const selectedProject = projects.find(p => p.id === projectId) || projects[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (purpose === 'Material Transfer' && fromWarehouse === toWarehouse) {
      alert('Source warehouse and target warehouse cannot be the same for a transfer.');
      return;
    }

    const seq = Date.now().toString().slice(-4);
    const newStockEntry = {
      id: `STE-2026-${seq}`,
      stock_entry_type: purpose,
      purpose: purpose,
      posting_date: new Date().toISOString().split('T')[0],
      from_warehouse: purpose === 'Material Receipt' ? '' : fromWarehouse,
      to_warehouse: purpose === 'Material Issue' ? '' : toWarehouse,
      project: selectedProject.id,
      projectName: selectedProject.name,
      total_outgoing_value: totalValue,
      docstatus: 1,
      items: items.map(itm => ({
        ...itm,
        amount: itm.qty * itm.valuation_rate
      }))
    };

    onSubmit(newStockEntry);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: '800px' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--gold-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-bright)' }}>
              <ArrowRightLeft size={18} />
            </div>
            <div>
              <h3 className="modal-title" style={{ margin: 0 }}>Create Stock Entry Movement</h3>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ERPNext Stock Module (DocType: Stock Entry)</span>
            </div>
          </div>
          <button className="btn-secondary" style={{ padding: '6px' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Purpose & Project */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Movement Purpose *</label>
                <select
                  className="form-input"
                  value={purpose}
                  onChange={e => setPurpose(e.target.value)}
                  required
                >
                  <option value="Material Transfer">Material Transfer (Between Depots / Sites)</option>
                  <option value="Material Issue">Material Issue (Consumed on Project Site)</option>
                  <option value="Material Receipt">Material Receipt (Inward from Quarry / Atelier)</option>
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

            {/* Warehouses */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {purpose !== 'Material Receipt' && (
                <div className="form-group">
                  <label className="form-label">Source Warehouse (From) *</label>
                  <select
                    className="form-input"
                    value={fromWarehouse}
                    onChange={e => setFromWarehouse(e.target.value)}
                    required
                  >
                    {warehouses.map(w => (
                      <option key={w.id} value={w.id}>
                        {w.warehouse_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {purpose !== 'Material Issue' && (
                <div className="form-group">
                  <label className="form-label">Target Warehouse (To) *</label>
                  <select
                    className="form-input"
                    value={toWarehouse}
                    onChange={e => setToWarehouse(e.target.value)}
                    required
                  >
                    {warehouses.map(w => (
                      <option key={w.id} value={w.id}>
                        {w.warehouse_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Items table */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label className="form-label" style={{ margin: 0, fontWeight: '600' }}>
                  Stock Items to Move
                </label>
                <button
                  type="button"
                  className="btn-secondary btn-sm"
                  onClick={handleAddItem}
                  style={{ fontSize: '11.5px', padding: '4px 10px' }}
                >
                  <Plus size={14} />
                  <span>Add Item</span>
                </button>
              </div>

              <div className="table-container" style={{ margin: 0 }}>
                <table className="data-table" style={{ fontSize: '12.5px' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '45%' }}>Select Item from Master</th>
                      <th style={{ width: '15%' }}>Quantity</th>
                      <th style={{ width: '15%' }}>UOM</th>
                      <th style={{ width: '20%' }}>Valuation Cost</th>
                      <th style={{ width: '5%' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          <select
                            className="form-input"
                            style={{ padding: '6px 8px', fontSize: '12px' }}
                            value={item.item_code}
                            onChange={e => handleItemSelect(idx, e.target.value)}
                          >
                            {stockItems.map(s => (
                              <option key={s.item_code} value={s.item_code}>
                                {s.item_code} - {s.item_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input
                            type="number"
                            min="1"
                            className="form-input"
                            style={{ padding: '6px 8px', fontSize: '12px' }}
                            value={item.qty}
                            onChange={e => handleQtyChange(idx, e.target.value)}
                            required
                          />
                        </td>
                        <td>
                          <span style={{ color: 'var(--text-secondary)' }}>{item.uom}</span>
                        </td>
                        <td>
                          <span style={{ color: 'var(--gold-bright)', fontWeight: '600' }}>
                            ${(item.qty * item.valuation_rate).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </span>
                        </td>
                        <td>
                          {items.length > 1 && (
                            <button
                              type="button"
                              className="btn-secondary"
                              style={{ padding: '6px', color: 'var(--status-danger)' }}
                              onClick={() => handleRemoveItem(idx)}
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

              <div style={{ marginTop: '14px', background: 'var(--bg-secondary)', padding: '12px 18px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'flex-end', gap: '30px', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  Total Movement Valuation: <strong style={{ fontSize: '18px', color: 'var(--gold-bright)' }}>${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
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
              <span>Post Stock Entry (DocStatus: Submitted)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
