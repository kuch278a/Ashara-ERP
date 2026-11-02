import React, { useState } from 'react';
import { X, FileCode, CheckCircle2, Copy, BookOpen, Layers } from 'lucide-react';
import { ERPNEXT_DOCTYPES } from '../data/erpnextSchemas';

export default function DocTypeInspectorModal({ initialDocType = 'sales_invoice', onClose }) {
  const [selectedDocTypeKey, setSelectedDocTypeKey] = useState(initialDocType);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('fields'); // 'fields' | 'json'

  const currentDocType = ERPNEXT_DOCTYPES[selectedDocTypeKey] || ERPNEXT_DOCTYPES.sales_invoice;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(currentDocType, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const doctypeOptions = [
    { key: 'sales_invoice', label: 'Sales Invoice', module: 'Accounts' },
    { key: 'purchase_order', label: 'Purchase Order', module: 'Buying' },
    { key: 'item', label: 'Item Master', module: 'Stock' },
    { key: 'stock_entry', label: 'Stock Entry', module: 'Stock' },
    { key: 'journal_entry', label: 'Journal Entry', module: 'Accounts' },
    { key: 'bom', label: 'Bill of Materials', module: 'Manufacturing' },
    { key: 'work_order', label: 'Work Order', module: 'Manufacturing' },
    { key: 'asset', label: 'Fixed Asset', module: 'Assets' },
    { key: 'opportunity', label: 'CRM Opportunity', module: 'CRM' },
    { key: 'issue', label: 'Support Issue', module: 'Support' },
    { key: 'subcontracting_order', label: 'Subcontracting', module: 'Subcontract' },
    { key: 'supplier', label: 'Supplier Master', module: 'Buying' },
    { key: 'warehouse', label: 'Warehouse Node', module: 'Stock' }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-box" 
        style={{ maxWidth: '960px', width: '92vw', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div 
              style={{ 
                width: '38px', 
                height: '38px', 
                borderRadius: '8px', 
                background: 'linear-gradient(135deg, rgba(197,160,89,0.25), rgba(197,160,89,0.05))',
                border: '1px solid var(--border-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold-bright)'
              }}
            >
              <FileCode size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 className="modal-title" style={{ margin: 0 }}>ERPNext v16 DocType Inspector</h3>
                <span className="badge badge-gold" style={{ fontSize: '10.5px' }}>v16.51.1 Active Schema</span>
              </div>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>
                Directly ported from ERPNext Core Schemas into Ashara Architecture ERP
              </p>
            </div>
          </div>
          <button className="btn-secondary" style={{ padding: '6px' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* DocType Switcher Pills */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {doctypeOptions.map(opt => (
            <button
              key={opt.key}
              onClick={() => setSelectedDocTypeKey(opt.key)}
              className={`pill-btn ${selectedDocTypeKey === opt.key ? 'active' : ''}`}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '12px',
                fontWeight: selectedDocTypeKey === opt.key ? '600' : '400',
                border: selectedDocTypeKey === opt.key ? '1px solid var(--gold-bright)' : '1px solid var(--border-subtle)',
                background: selectedDocTypeKey === opt.key ? 'var(--gold-glow)' : 'transparent',
                color: selectedDocTypeKey === opt.key ? 'var(--gold-bright)' : 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s'
              }}
            >
              <span>{opt.label}</span>
              <span style={{ fontSize: '10px', opacity: 0.7, padding: '1px 5px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)' }}>
                {opt.module}
              </span>
            </button>
          ))}
        </div>

        {/* DocType Summary Banner */}
        <div style={{ padding: '16px 24px', background: 'rgba(197,160,89,0.04)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                {currentDocType.doctype}
              </span>
              <span className="badge badge-neutral" style={{ fontSize: '11px' }}>
                Module: {currentDocType.module}
              </span>
              {currentDocType.is_submittable && (
                <span className="badge badge-success" style={{ fontSize: '11px' }}>
                  Submittable (DocStatus 0/1/2)
                </span>
              )}
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
              {currentDocType.description}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveTab('fields')}
              className={`btn-sm ${activeTab === 'fields' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '12px' }}
            >
              <Layers size={14} />
              <span>Fields ({currentDocType.fields?.length || 0})</span>
            </button>
            <button
              onClick={() => setActiveTab('json')}
              className={`btn-sm ${activeTab === 'json' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '12px' }}
            >
              <FileCode size={14} />
              <span>Raw JSON</span>
            </button>
            <button
              onClick={handleCopyJson}
              className="btn-secondary btn-sm"
              style={{ fontSize: '12px' }}
              title="Copy schema JSON"
            >
              {copied ? <CheckCircle2 size={14} style={{ color: 'var(--status-success)' }} /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
          {activeTab === 'fields' ? (
            <div className="table-container" style={{ margin: 0 }}>
              <table className="data-table" style={{ fontSize: '12.5px' }}>
                <thead>
                  <tr>
                    <th>Field Label</th>
                    <th>Fieldname</th>
                    <th>Field Type</th>
                    <th>Options / Reference</th>
                    <th>Constraints</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDocType.fields?.map((f, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                        {f.label || <span style={{ color: 'var(--text-muted)' }}>—</span>}
                      </td>
                      <td>
                        <code style={{ background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '4px', color: 'var(--gold-bright)', fontSize: '11.5px' }}>
                          {f.fieldname}
                        </code>
                      </td>
                      <td>
                        <span 
                          className="badge" 
                          style={{ 
                            fontSize: '11px',
                            background: f.fieldtype === 'Link' ? 'rgba(61,124,168,0.2)' : f.fieldtype === 'Table' ? 'rgba(217,130,43,0.2)' : 'rgba(255,255,255,0.06)',
                            color: f.fieldtype === 'Link' ? '#8bc34a' : f.fieldtype === 'Table' ? '#ff9800' : 'var(--text-secondary)'
                          }}
                        >
                          {f.fieldtype}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-secondary)' }}>
                        {f.options ? (
                          <span style={{ color: 'var(--text-primary)', fontStyle: 'italic' }}>
                            {f.options.replace(/\n/g, ', ')}
                          </span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)' }}>None</span>
                        )}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                          {f.reqd ? <span className="badge badge-warning" style={{ fontSize: '10px' }}>Mandatory</span> : null}
                          {f.unique ? <span className="badge badge-info" style={{ fontSize: '10px' }}>Unique</span> : null}
                          {f.read_only ? <span className="badge badge-neutral" style={{ fontSize: '10px' }}>Read Only</span> : null}
                          {!f.reqd && !f.unique && !f.read_only && <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Optional</span>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ background: '#070a0e', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '16px', overflowX: 'auto' }}>
              <pre style={{ margin: 0, fontSize: '12px', color: '#8bc34a', fontFamily: 'monospace', lineHeight: 1.5 }}>
                {JSON.stringify(currentDocType, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer" style={{ borderTop: '1px solid var(--border-subtle)', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <BookOpen size={14} />
            <span>Path: <code>C:\Users\X\Downloads\erpnext-16.51.1\erpnext\{currentDocType.module.toLowerCase()}\doctype\{selectedDocTypeKey}</code></span>
          </div>
          <button className="btn-secondary btn-sm" onClick={onClose}>
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
