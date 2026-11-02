import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Users, 
  Plus, 
  CheckCircle2, 
  Clock, 
  FileCode, 
  Search, 
  Globe, 
  Star
} from 'lucide-react';

export default function BuyingView({ 
  purchaseOrders, 
  suppliers, 
  onOpenNewPO, 
  onUpdatePOStatus,
  onOpenDocTypeInspector 
}) {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'suppliers' | 'rfq'
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculations
  const totalPOValue = purchaseOrders.reduce((sum, po) => sum + (po.total || 0), 0);
  const completedPOs = purchaseOrders.filter(po => po.status === 'Completed');
  const pendingPOs = purchaseOrders.filter(po => po.status === 'To Receive and Bill' || po.status === 'Draft');
  const pendingValue = pendingPOs.reduce((sum, po) => sum + (po.total || 0), 0);

  const filteredPOs = purchaseOrders.filter(po => {
    const matchesStatus = statusFilter === 'All' || po.status === statusFilter;
    const matchesSearch = po.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      po.supplier_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (po.projectName && po.projectName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const filteredSuppliers = suppliers.filter(s => {
    return s.supplier_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.supplier_group.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.country.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  return (
    <div className="content-body">
      {/* Header */}
      <div className="view-header">
        <div className="view-title-wrap">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="view-pretitle">Ashara Atelier Supply Chain</span>
            <span className="badge badge-gold" style={{ fontSize: '10px' }}>ERPNext Buying Module</span>
          </div>
          <h1 className="view-title">
            <span>Procurement & Artisan Atelier Purchase Orders</span>
          </h1>
          <p className="view-desc">
            Directly mapped to ERPNext <code>Purchase Order</code> & <code>Supplier</code> DocTypes. Track stone quarries, Italian lighting ateliers, bespoke joinery contracts, and international shipping milestones.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button 
            className="btn-secondary" 
            onClick={() => onOpenDocTypeInspector('purchase_order')}
            title="Inspect ERPNext schema definition"
          >
            <FileCode size={16} />
            <span>DocType Schema</span>
          </button>
          <button className="btn-primary" onClick={onOpenNewPO}>
            <Plus size={16} />
            <span>Issue Purchase Order (PO)</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-top-row">
            <span className="metric-label">Total Procurement POs</span>
            <ShoppingBag size={18} style={{ color: 'var(--gold-bright)' }} />
          </div>
          <div className="metric-value">{formatCurrency(totalPOValue)}</div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{purchaseOrders.length} Committed Contracts</span>
        </div>

        <div className="metric-card">
          <div className="metric-top-row">
            <span className="metric-label">To Receive & Verify</span>
            <Clock size={18} style={{ color: 'var(--status-warning)' }} />
          </div>
          <div className="metric-value" style={{ color: 'var(--status-warning)' }}>{formatCurrency(pendingValue)}</div>
          <span style={{ fontSize: '11px', color: 'var(--status-warning)' }}>
            {pendingPOs.length} Active Orders in Transit / Production
          </span>
        </div>

        <div className="metric-card">
          <div className="metric-top-row">
            <span className="metric-label">Delivered & Closed</span>
            <CheckCircle2 size={18} style={{ color: 'var(--status-success)' }} />
          </div>
          <div className="metric-value" style={{ color: 'var(--status-success)' }}>
            {formatCurrency(completedPOs.reduce((s, p) => s + p.total, 0))}
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{completedPOs.length} Orders Staged On-Site</span>
        </div>

        <div className="metric-card">
          <div className="metric-top-row">
            <span className="metric-label">Master Artisans & Quarries</span>
            <Globe size={18} style={{ color: 'var(--status-info)' }} />
          </div>
          <div className="metric-value" style={{ color: 'var(--status-info)' }}>{suppliers.length} Ateliers</div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Italy, Germany, UAE Provenance</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pill-btn ${activeTab === 'orders' ? 'active' : ''}`}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-md)',
              fontSize: '13px',
              fontWeight: activeTab === 'orders' ? '600' : '400',
              border: activeTab === 'orders' ? '1px solid var(--gold-bright)' : '1px solid var(--border-subtle)',
              background: activeTab === 'orders' ? 'var(--gold-glow)' : 'var(--bg-secondary)',
              color: activeTab === 'orders' ? 'var(--gold-bright)' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <ShoppingBag size={16} />
            <span>Purchase Orders ({purchaseOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('suppliers')}
            className={`pill-btn ${activeTab === 'suppliers' ? 'active' : ''}`}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-md)',
              fontSize: '13px',
              fontWeight: activeTab === 'suppliers' ? '600' : '400',
              border: activeTab === 'suppliers' ? '1px solid var(--gold-bright)' : '1px solid var(--border-subtle)',
              background: activeTab === 'suppliers' ? 'var(--gold-glow)' : 'var(--bg-secondary)',
              color: activeTab === 'suppliers' ? 'var(--gold-bright)' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Users size={16} />
            <span>Artisan Suppliers ({suppliers.length})</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search PO #, supplier, project..."
              className="form-input"
              style={{ paddingLeft: '32px', paddingRight: '12px', fontSize: '12px', width: '230px' }}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          {activeTab === 'orders' && (
            <select
              className="form-input"
              style={{ fontSize: '12px', padding: '6px 10px', width: 'auto' }}
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Draft">Draft (DocStatus: 0)</option>
              <option value="To Receive and Bill">To Receive and Bill</option>
              <option value="Completed">Completed (DocStatus: 1)</option>
            </select>
          )}
        </div>
      </div>

      {/* Tab: Purchase Orders */}
      {activeTab === 'orders' && (
        <div className="panel-card" style={{ padding: '0', overflow: 'hidden' }}>
          <div className="table-container" style={{ margin: 0 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>PO Reference</th>
                  <th>Supplier / Atelier</th>
                  <th>Project Commission</th>
                  <th>Order Date</th>
                  <th>Required By</th>
                  <th>Items / Qty</th>
                  <th>Total Amount</th>
                  <th>ERPNext Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPOs.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                      No purchase orders match your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredPOs.map((po) => {
                    const isCompleted = po.status === 'Completed';
                    const isDraft = po.status === 'Draft';

                    return (
                      <tr key={po.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: '700', color: 'var(--gold-bright)', fontFamily: 'monospace' }}>
                              {po.id}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{po.supplier_name}</div>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>DocType: Supplier ({po.supplier})</span>
                        </td>
                        <td>
                          <div style={{ color: 'var(--text-primary)' }}>{po.projectName}</div>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{po.project}</span>
                        </td>
                        <td style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{po.transaction_date}</td>
                        <td style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={12} style={{ color: 'var(--status-warning)' }} />
                            {po.schedule_date}
                          </span>
                        </td>
                        <td>
                          <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                            {po.items?.length || 1} lines
                          </span>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>
                            ({po.total_qty} units total)
                          </span>
                        </td>
                        <td>
                          <span style={{ fontWeight: '700', color: 'var(--gold-bright)', fontSize: '14px' }}>
                            {formatCurrency(po.total)}
                          </span>
                        </td>
                        <td>
                          <span 
                            className={`badge ${
                              isCompleted ? 'badge-success' : isDraft ? 'badge-neutral' : 'badge-warning'
                            }`}
                            style={{ fontSize: '11px' }}
                          >
                            {po.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                            {!isCompleted && (
                              <button
                                className="btn-secondary btn-sm"
                                style={{ fontSize: '11px', padding: '4px 8px' }}
                                onClick={() => onUpdatePOStatus(po.id, 'Completed')}
                                title="Mark as fully received on-site"
                              >
                                <CheckCircle2 size={12} style={{ color: 'var(--status-success)' }} />
                                <span>Receive Stock</span>
                              </button>
                            )}
                            <button
                              className="btn-secondary btn-sm"
                              style={{ padding: '4px 8px' }}
                              onClick={() => onOpenDocTypeInspector('purchase_order')}
                              title="Inspect PO DocType Schema"
                            >
                              <FileCode size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Suppliers / Vendors Master */}
      {activeTab === 'suppliers' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
          {filteredSuppliers.map((s) => (
            <div key={s.id} className="panel-card" style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className="badge badge-neutral" style={{ fontSize: '10.5px' }}>
                    {s.supplier_group}
                  </span>
                  <h3 style={{ fontSize: '16px', color: 'var(--text-primary)', margin: '6px 0 2px 0' }}>
                    {s.supplier_name}
                  </h3>
                  <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                    {s.id} • Tax ID: {s.tax_id}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(197,160,89,0.15)', padding: '4px 8px', borderRadius: 'var(--radius-sm)', color: 'var(--gold-bright)' }}>
                  <Star size={13} fill="currentColor" />
                  <span style={{ fontSize: '12px', fontWeight: '700' }}>{s.rating}</span>
                </div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '10.5px' }}>Country / Provenance</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{s.country}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '10.5px' }}>Avg Lead Time</span>
                  <strong style={{ color: 'var(--status-warning)' }}>{s.average_lead_time_days} days</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '10.5px' }}>Total Purchased</span>
                  <strong style={{ color: 'var(--gold-bright)' }}>{formatCurrency(s.total_purchased)}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '10.5px' }}>Payment Terms</span>
                  <strong style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>{s.payment_terms}</strong>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Contact: <strong style={{ color: 'var(--text-primary)' }}>{s.primary_contact}</strong></span>
                <button
                  className="btn-secondary btn-sm"
                  style={{ fontSize: '11px', padding: '3px 8px' }}
                  onClick={() => onOpenDocTypeInspector('supplier')}
                >
                  <FileCode size={12} />
                  <span>Schema</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
