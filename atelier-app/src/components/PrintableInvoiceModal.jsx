import React from 'react';
import { X, Printer } from 'lucide-react';

export default function PrintableInvoiceModal({ invoice, onClose }) {
  if (!invoice) return null;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  const vatAmount = (invoice.amount || 0) * 0.05;
  const totalDue = (invoice.amount || 0) + vatAmount;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-dialog" 
        style={{ maxWidth: '800px', background: '#FFFFFF', color: '#1D1A16' }} 
        onClick={e => e.stopPropagation()}
      >
        <div 
          className="modal-header" 
          style={{ background: '#FFFFFF', borderBottom: '1px solid #EFECE3', display: 'flex', justifyContent: 'space-between' }}
        >
          <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9E7933', fontWeight: 700 }}>
            Official Architectural Fee Draw
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className="btn-primary btn-sm" 
              onClick={() => window.print()}
              style={{ background: '#9E7933', color: '#FFFFFF', borderColor: '#9E7933' }}
            >
              <Printer size={14} />
              <span>Print / Save PDF</span>
            </button>
            <button className="modal-close-btn" onClick={onClose} style={{ color: '#1D1A16' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="modal-body" style={{ padding: '36px', background: '#FFFFFF', color: '#1D1A16' }}>
          {/* Atelier Brand Top */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #C5A059', paddingBottom: '24px' }}>
            <div>
              <h1 style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '26px', letterSpacing: '0.14em', margin: 0, color: '#1D1A16' }}>
                ASHARA
              </h1>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#9E7933', fontWeight: 600, marginTop: '2px' }}>
                Architecture & Interior Atelier
              </div>
              <div style={{ fontSize: '11px', color: '#666', marginTop: '8px', lineHeight: 1.4 }}>
                Dubai Design District (d3), Building 7, Suite 502<br />
                United Arab Emirates • VAT TRN: 100482910400003
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#9E7933', fontFamily: 'monospace' }}>
                {invoice.id}
              </div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                Issue Date: <strong>{invoice.issueDate}</strong>
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                Due Date: <strong>{invoice.dueDate}</strong>
              </div>
              <div style={{ marginTop: '8px' }}>
                <span style={{ 
                  display: 'inline-block', 
                  padding: '4px 10px', 
                  borderRadius: '12px', 
                  fontSize: '11px', 
                  fontWeight: 700,
                  background: invoice.status === 'Paid' ? '#EBF7EE' : '#FFF5EB',
                  color: invoice.status === 'Paid' ? '#2E6B47' : '#B3681D',
                  border: `1px solid ${invoice.status === 'Paid' ? '#55B779' : '#FFA338'}`
                }}>
                  STATUS: {invoice.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Billed To */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', margin: '24px 0' }}>
            <div style={{ background: '#F9F8F5', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9E7933', fontWeight: 700 }}>
                Billed Client:
              </span>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#1D1A16', marginTop: '4px' }}>
                {invoice.clientName}
              </div>
              <div style={{ fontSize: '12px', color: '#555', marginTop: '2px' }}>
                Commission: <strong>{invoice.projectName}</strong>
              </div>
            </div>

            <div style={{ background: '#F9F8F5', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9E7933', fontWeight: 700 }}>
                Payment Method & Routing:
              </span>
              <div style={{ fontSize: '13px', color: '#1D1A16', marginTop: '4px', lineHeight: 1.4 }}>
                <strong>Emirates NBD Corporate Private Bank</strong><br />
                IBAN: AE29 0331 0000 0012 4920 188<br />
                SWIFT / BIC: EBILAEAD
              </div>
            </div>
          </div>

          {/* Items Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
            <thead>
              <tr style={{ background: '#F4F1EA', borderBottom: '2px solid #E5DDCB', textAlign: 'left', fontSize: '12px', textTransform: 'uppercase', color: '#555' }}>
                <th style={{ padding: '12px 14px' }}>Scope & Milestone Description</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>VAT %</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #EEE' }}>
                <td style={{ padding: '16px 14px' }}>
                  <strong style={{ fontSize: '14px', color: '#1D1A16' }}>{invoice.milestone}</strong>
                  <div style={{ fontSize: '12px', color: '#777', marginTop: '4px' }}>
                    Deliverables signed off by Principal Architect & Client Representative.
                  </div>
                </td>
                <td style={{ padding: '16px 14px', textAlign: 'center', fontSize: '13px' }}>5%</td>
                <td style={{ padding: '16px 14px', textAlign: 'right', fontWeight: 700, fontSize: '14px' }}>
                  {formatCurrency(invoice.amount)}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Totals */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#555' }}>
                <span>Subtotal:</span>
                <span>{formatCurrency(invoice.amount)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#555' }}>
                <span>VAT (5%):</span>
                <span>{formatCurrency(vatAmount)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800, color: '#1D1A16', borderTop: '2px solid #C5A059', paddingTop: '10px' }}>
                <span>Total Due:</span>
                <span style={{ color: '#9E7933' }}>{formatCurrency(totalDue)}</span>
              </div>
            </div>
          </div>

          {/* Footer Terms */}
          <div style={{ marginTop: '36px', borderTop: '1px solid #E5DDCB', paddingTop: '16px', fontSize: '11px', color: '#777', textAlign: 'center' }}>
            Ashara Architecture & Spatial Design Atelier • Thank you for your continued partnership.
          </div>
        </div>
      </div>
    </div>
  );
}
