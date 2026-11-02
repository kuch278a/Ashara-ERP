import React, { useState } from 'react';
import { X, Briefcase, Sparkles } from 'lucide-react';

export default function NewOpportunityModal({ onClose, onSubmit }) {
  const [partyName, setPartyName] = useState('');
  const [opportunityType, setOpportunityType] = useState('Luxury Residential');
  const [amount, setAmount] = useState('');
  const [probability, setProbability] = useState(60);
  const [expectedClosing, setExpectedClosing] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 45);
    return d.toISOString().split('T')[0];
  });
  const [contactEmail, setContactEmail] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!partyName || !amount) return;

    const newOpp = {
      id: `CRM-OPP-2026-${Math.floor(10 + Math.random() * 90)}`,
      party_name: partyName,
      opportunity_type: opportunityType,
      opportunity_amount: Number(amount) || 0,
      stage: 'Prospecting',
      probability: Number(probability) || 50,
      expected_closing: expectedClosing,
      contact_email: contactEmail,
      description: description || 'High-value bespoke architectural commission enquiry.'
    };

    onSubmit(newOpp);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: '620px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--gold-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-bright)' }}>
              <Briefcase size={18} />
            </div>
            <div>
              <h3 className="modal-title" style={{ margin: 0 }}>Log New Opportunity / Bid</h3>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ERPNext CRM Module (DocType: Opportunity)</span>
            </div>
          </div>
          <button className="btn-secondary" style={{ padding: '6px' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Client / Family Office Prospect *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Al-Nahyan Family Office / Villa Palm Jumeirah"
                value={partyName}
                onChange={e => setPartyName(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Commission Type *</label>
                <select
                  className="form-input"
                  value={opportunityType}
                  onChange={e => setOpportunityType(e.target.value)}
                >
                  <option value="Luxury Residential">Luxury Residential</option>
                  <option value="Boutique Hospitality">Boutique Hospitality</option>
                  <option value="Private Commercial">Private Commercial</option>
                  <option value="Turnkey Yacht Fit-out">Turnkey Yacht Fit-out</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Estimated Deal Value ($) *</label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  placeholder="e.g. 7500000"
                  className="form-input"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Win Probability ({probability}%)</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  className="form-input"
                  style={{ padding: '4px' }}
                  value={probability}
                  onChange={e => setProbability(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Expected Decision Date *</label>
                <input
                  type="date"
                  className="form-input"
                  value={expectedClosing}
                  onChange={e => setExpectedClosing(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Contact Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="vip-desk@familyoffice.ae"
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Scope Description</label>
              <textarea
                className="form-input"
                rows={3}
                placeholder="Project brief, total square footage, aesthetic direction..."
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Sparkles size={16} />
              <span>Create Opportunity</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
