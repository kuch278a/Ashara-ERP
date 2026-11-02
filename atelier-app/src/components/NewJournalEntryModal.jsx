import React, { useState } from 'react';
import { X, Scale, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function NewJournalEntryModal({ onClose, onSubmit, accountsList: _accountsList, clients, suppliers: _suppliers }) {
  const [voucherType, setVoucherType] = useState('Journal Entry');
  const [postingDate, setPostingDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [referenceNo, setReferenceNo] = useState('');
  const [userRemark, setUserRemark] = useState('');
  
  const defaultAccounts = [
    { account: '1110 - Cash and Bank Balances (Emirates NBD)', debit: 50000, credit: 0, party_type: '', party: '' },
    { account: '1120 - Accounts Receivable (Debtors)', debit: 0, credit: 50000, party_type: 'Customer', party: clients[0]?.name || '' }
  ];

  const [entries, setEntries] = useState(defaultAccounts);

  const flatAccounts = [
    '1110 - Cash and Bank Balances (Emirates NBD)',
    '1120 - Accounts Receivable (Debtors)',
    '1130 - Stock in Hand (Inventory Asset)',
    '1140 - Project Work In Progress (WIP Fit-out)',
    '1210 - Atelier Studio & 3D Render Workstations',
    '2110 - Accounts Payable (Creditors / Artisans)',
    '2120 - Client Project Escrow Advances',
    '2130 - VAT Payable (5% UAE)',
    '3110 - Capital Stock - Partners Equity',
    '3120 - Retained Earnings',
    '4110 - Architectural & BIM Design Fees',
    '4120 - FF&E Procurement Commission & Markup',
    '4130 - Site Supervision & Fit-Out Consultancy',
    '5110 - Cost of Goods Sold - Materials & Procurement',
    '5120 - Direct Subcontractor & Engineering Fees',
    '5130 - Atelier Operating & 3D Cloud Compute Costs'
  ];

  const handleAddRow = () => {
    setEntries([
      ...entries,
      { account: flatAccounts[0], debit: 0, credit: 0, party_type: '', party: '' }
    ]);
  };

  const handleRemoveRow = (index) => {
    if (entries.length <= 2) return;
    setEntries(entries.filter((_, i) => i !== index));
  };

  const handleRowChange = (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = value;
    setEntries(updated);
  };

  const totalDebit = entries.reduce((sum, r) => sum + (Number(r.debit) || 0), 0);
  const totalCredit = entries.reduce((sum, r) => sum + (Number(r.credit) || 0), 0);
  const difference = Math.abs(totalDebit - totalCredit);
  const isBalanced = difference === 0 && totalDebit > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isBalanced) {
      alert('Debit and Credit must be equal before submitting Journal Entry.');
      return;
    }
    if (!userRemark) {
      alert('Please provide a remark describing this accounting transaction.');
      return;
    }

    const seq = Date.now().toString().slice(-4);
    const newJV = {
      id: `JV-2026-${seq}`,
      voucher_type: voucherType,
      posting_date: postingDate,
      user_remark: userRemark,
      cheque_no: referenceNo || `REF-${seq}`,
      cheque_date: postingDate,
      status: 'Submitted',
      total_debit: totalDebit,
      total_credit: totalCredit,
      difference: 0,
      accounts: entries.map(r => ({
        account: r.account,
        debit: Number(r.debit) || 0,
        credit: Number(r.credit) || 0,
        party_type: r.party_type,
        party: r.party
      }))
    };

    onSubmit(newJV);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth: '860px' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--gold-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-bright)' }}>
              <Scale size={18} />
            </div>
            <div>
              <h3 className="modal-title" style={{ margin: 0 }}>Create Journal Entry Voucher</h3>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ERPNext Accounts Module (DocType: Journal Entry)</span>
            </div>
          </div>
          <button className="btn-secondary" style={{ padding: '6px' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Top Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Voucher Type *</label>
                <select
                  className="form-input"
                  value={voucherType}
                  onChange={e => setVoucherType(e.target.value)}
                >
                  <option value="Journal Entry">Journal Entry</option>
                  <option value="Bank Entry">Bank Entry</option>
                  <option value="Cash Entry">Cash Entry</option>
                  <option value="Credit Card Entry">Credit Card Entry</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Posting Date *</label>
                <input
                  type="date"
                  className="form-input"
                  value={postingDate}
                  onChange={e => setPostingDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Cheque / Reference No</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. TRF-2026-ENBD-88"
                  value={referenceNo}
                  onChange={e => setReferenceNo(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">User Remark / Memo *</label>
              <input
                type="text"
                className="form-input"
                placeholder="Reason for double-entry allocation..."
                value={userRemark}
                onChange={e => setUserRemark(e.target.value)}
                required
              />
            </div>

            {/* Accounting Rows */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label className="form-label" style={{ margin: 0, fontWeight: '600' }}>
                  Accounting Entries (Total Dr must equal Total Cr)
                </label>
                <button
                  type="button"
                  className="btn-secondary btn-sm"
                  onClick={handleAddRow}
                  style={{ fontSize: '11.5px', padding: '4px 10px' }}
                >
                  <Plus size={14} />
                  <span>Add Account Row</span>
                </button>
              </div>

              <div className="table-container" style={{ margin: 0 }}>
                <table className="data-table" style={{ fontSize: '12px' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '40%' }}>Account Head</th>
                      <th style={{ width: '25%' }}>Party (Optional)</th>
                      <th style={{ width: '15%' }}>Debit ($)</th>
                      <th style={{ width: '15%' }}>Credit ($)</th>
                      <th style={{ width: '5%' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((row, idx) => (
                      <tr key={idx}>
                        <td>
                          <select
                            className="form-input"
                            style={{ padding: '6px 8px', fontSize: '11.5px' }}
                            value={row.account}
                            onChange={e => handleRowChange(idx, 'account', e.target.value)}
                          >
                            {flatAccounts.map((acc, aIdx) => (
                              <option key={aIdx} value={acc}>
                                {acc}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-input"
                            style={{ padding: '6px 8px', fontSize: '11.5px' }}
                            placeholder="Customer / Supplier"
                            value={row.party}
                            onChange={e => handleRowChange(idx, 'party', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            className="form-input"
                            style={{ padding: '6px 8px', fontSize: '12px' }}
                            value={row.debit}
                            onChange={e => handleRowChange(idx, 'debit', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            className="form-input"
                            style={{ padding: '6px 8px', fontSize: '12px' }}
                            value={row.credit}
                            onChange={e => handleRowChange(idx, 'credit', e.target.value)}
                          />
                        </td>
                        <td>
                          {entries.length > 2 && (
                            <button
                              type="button"
                              className="btn-secondary"
                              style={{ padding: '6px', color: 'var(--status-danger)' }}
                              onClick={() => handleRemoveRow(idx)}
                            >
                              <Trash2 size={12} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Balance bar */}
              <div 
                style={{ 
                  marginTop: '12px', 
                  padding: '12px 18px', 
                  borderRadius: 'var(--radius-md)', 
                  background: isBalanced ? 'rgba(62,136,91,0.1)' : 'rgba(200,70,48,0.1)',
                  border: isBalanced ? '1px solid var(--status-success)' : '1px solid var(--status-danger)',
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center' 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {isBalanced ? (
                    <>
                      <CheckCircle2 size={16} style={{ color: 'var(--status-success)' }} />
                      <span style={{ fontSize: '12.5px', color: 'var(--status-success)', fontWeight: '600' }}>
                        Ledger Balanced (Dr = Cr)
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle size={16} style={{ color: 'var(--status-danger)' }} />
                      <span style={{ fontSize: '12.5px', color: 'var(--status-danger)', fontWeight: '600' }}>
                        Imbalance: Difference of ${difference.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '20px', fontSize: '13px' }}>
                  <span>Total Debit: <strong style={{ color: 'var(--text-primary)' }}>${totalDebit.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong></span>
                  <span>Total Credit: <strong style={{ color: 'var(--text-primary)' }}>${totalCredit.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong></span>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={!isBalanced}>
              <Scale size={16} />
              <span>Post Journal Entry (DocStatus: Submitted)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
