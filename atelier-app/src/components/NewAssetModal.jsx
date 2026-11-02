import React, { useState } from 'react';
import { X, Building2, Sparkles } from 'lucide-react';

export default function NewAssetModal({ onClose, onSubmit }) {
  const [assetName, setAssetName] = useState('');
  const [category, setCategory] = useState('Fabrication Machinery');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [location, setLocation] = useState('Al-Quoz Fabrication Atelier');
  const [usefulLife, setUsefulLife] = useState(60);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!assetName || !purchaseAmount) return;

    const amount = Number(purchaseAmount);
    const newAsset = {
      id: `ASS-2026-${Math.floor(100 + Math.random() * 900)}`,
      asset_name: assetName,
      asset_category: category,
      item_code: `EQUIP-${Math.floor(1000 + Math.random() * 9000)}`,
      purchase_date: purchaseDate,
      gross_purchase_amount: amount,
      depreciation_method: "Straight Line",
      total_number_of_depreciations: Number(usefulLife) || 60,
      value_after_depreciation: amount,
      location: location,
      status: "Submitted"
    };

    onSubmit(newAsset);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: '600px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--gold-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-bright)' }}>
              <Building2 size={18} />
            </div>
            <div>
              <h3 className="modal-title" style={{ margin: 0 }}>Register Capital Fixed Asset</h3>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ERPNext Assets Module (DocType: Asset)</span>
            </div>
          </div>
          <button className="btn-secondary" style={{ padding: '6px' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Asset Name / Equipment Title *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Scantech 3D Optical Laser Material Scanner"
                value={assetName}
                onChange={e => setAssetName(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Asset Category *</label>
                <select
                  className="form-input"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  <option value="Fabrication Machinery">Fabrication Machinery</option>
                  <option value="IT & 3D Compute">IT & 3D Compute</option>
                  <option value="Studio Showroom Fixtures">Studio Showroom Fixtures</option>
                  <option value="Fleet Vehicles">Fleet Vehicles</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Gross Acquisition Cost ($) *</label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  placeholder="e.g. 85000"
                  className="form-input"
                  value={purchaseAmount}
                  onChange={e => setPurchaseAmount(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Commission Date *</label>
                <input
                  type="date"
                  className="form-input"
                  value={purchaseDate}
                  onChange={e => setPurchaseDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Useful Life (Months) *</label>
                <input
                  type="number"
                  min="12"
                  max="240"
                  className="form-input"
                  value={usefulLife}
                  onChange={e => setUsefulLife(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Physical Studio Location *</label>
              <input
                type="text"
                className="form-input"
                value={location}
                onChange={e => setLocation(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Sparkles size={16} />
              <span>Capitalize Asset in Register</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
