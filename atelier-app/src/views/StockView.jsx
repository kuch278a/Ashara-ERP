import React, { useState } from 'react';
import { 
  Package, 
  Warehouse as WarehouseIcon, 
  ArrowRightLeft, 
  FileCode, 
  Search, 
  AlertTriangle, 
  TrendingUp, 
  MapPin,
  History,
  ShieldCheck,
  ArrowDownLeft,
  ArrowUpRight
} from 'lucide-react';

export default function StockView({ 
  stockItems, 
  warehouses, 
  stockEntries, 
  stockLedgerEntries = [],
  onOpenNewStockEntry, 
  onOpenDocTypeInspector 
}) {
  const [activeTab, setActiveTab] = useState('balance'); // 'balance' | 'ledger' | 'warehouses' | 'entries'
  const [searchQuery, setSearchQuery] = useState('');
  const [warehouseFilter, setWarehouseFilter] = useState('All');
  const [voucherTypeFilter, setVoucherTypeFilter] = useState('All');

  const totalInventoryValuation = stockItems.reduce((sum, itm) => sum + (itm.qty_on_hand * itm.valuation_rate), 0);
  const lowStockItems = stockItems.filter(itm => itm.qty_on_hand <= itm.reorder_level);
  const totalInTransitValuation = stockItems.reduce((sum, itm) => sum + (itm.qty_in_transit * itm.valuation_rate), 0);

  const filteredItems = stockItems.filter(itm => {
    const matchesSearch = itm.item_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      itm.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      itm.item_group.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWarehouse = warehouseFilter === 'All' || itm.default_warehouse === warehouseFilter;
    return matchesSearch && matchesWarehouse;
  });

  const filteredLedgerEntries = stockLedgerEntries.filter(sle => {
    const matchesSearch = sle.item_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sle.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sle.voucher_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sle.batch_no && sle.batch_no.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesWarehouse = warehouseFilter === 'All' || sle.warehouse === warehouseFilter;
    const matchesType = voucherTypeFilter === 'All' || sle.voucher_type === voucherTypeFilter;
    return matchesSearch && matchesWarehouse && matchesType;
  });

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  const totalInwardValue = stockLedgerEntries
    .filter(e => e.actual_qty > 0)
    .reduce((sum, e) => sum + Math.abs(e.stock_value_difference), 0);

  const totalOutwardValue = stockLedgerEntries
    .filter(e => e.actual_qty < 0)
    .reduce((sum, e) => sum + Math.abs(e.stock_value_difference), 0);

  return (
    <div className="content-body">
      {/* Header */}
      <div className="view-header">
        <div className="view-title-wrap">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="view-pretitle">Ashara Atelier Inventory</span>
            <span className="badge badge-gold" style={{ fontSize: '10px' }}>ERPNext Stock Module</span>
          </div>
          <h1 className="view-title">
            <span>Stock Ledger, Warehousing & Material Movements</span>
          </h1>
          <p className="view-desc">
            ERPNext Stock Module integration tracking perpetual FIFO valuation rates, immutable Stock Ledger audits, warehouse bin balances across Central Logistics & On-Site Staging, and Material Transfer vouchers.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button 
            className="btn-secondary" 
            onClick={() => onOpenDocTypeInspector('item')}
            title="Inspect ERPNext Item & Stock Entry schemas"
          >
            <FileCode size={16} />
            <span>DocType Schema</span>
          </button>
          <button className="btn-primary" onClick={onOpenNewStockEntry}>
            <ArrowRightLeft size={16} />
            <span>New Stock Movement</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-top-row">
            <span className="metric-label">Total Stock Valuation</span>
            <Package size={18} style={{ color: 'var(--gold-bright)' }} />
          </div>
          <div className="metric-value">{formatCurrency(totalInventoryValuation)}</div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>FIFO & Moving Average Asset Base</span>
        </div>

        <div className="metric-card">
          <div className="metric-top-row">
            <span className="metric-label">In-Transit Valuation</span>
            <TrendingUp size={18} style={{ color: 'var(--status-info)' }} />
          </div>
          <div className="metric-value" style={{ color: 'var(--status-info)' }}>{formatCurrency(totalInTransitValuation)}</div>
          <span style={{ fontSize: '11px', color: 'var(--status-info)' }}>En-route from Milan & Verona Hubs</span>
        </div>

        <div className="metric-card">
          <div className="metric-top-row">
            <span className="metric-label">Active Warehouses</span>
            <WarehouseIcon size={18} style={{ color: 'var(--status-success)' }} />
          </div>
          <div className="metric-value" style={{ color: 'var(--status-success)' }}>{warehouses.length} Nodes</div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>1 Central Depot, 1 Transit, 2 On-Site</span>
        </div>

        <div className="metric-card">
          <div className="metric-top-row">
            <span className="metric-label">Reorder Level Alerts</span>
            <AlertTriangle size={18} style={{ color: lowStockItems.length > 0 ? 'var(--status-danger)' : 'var(--status-success)' }} />
          </div>
          <div className="metric-value" style={{ color: lowStockItems.length > 0 ? 'var(--status-danger)' : 'var(--status-success)' }}>
            {lowStockItems.length} SKUs
          </div>
          <span style={{ fontSize: '11px', color: lowStockItems.length > 0 ? 'var(--status-danger)' : 'var(--status-success)' }}>
            {lowStockItems.length > 0 ? 'Below safety threshold' : 'Optimal buffer stock'}
          </span>
        </div>
      </div>

      {/* Sub Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('balance')}
            className={`pill-btn ${activeTab === 'balance' ? 'active' : ''}`}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '12.5px',
              fontWeight: activeTab === 'balance' ? '600' : '400',
              border: activeTab === 'balance' ? '1px solid var(--gold-bright)' : '1px solid var(--border-subtle)',
              background: activeTab === 'balance' ? 'var(--gold-glow)' : 'var(--bg-secondary)',
              color: activeTab === 'balance' ? 'var(--gold-bright)' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Package size={15} />
            <span>Stock Balance & Bins ({stockItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('ledger')}
            className={`pill-btn ${activeTab === 'ledger' ? 'active' : ''}`}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '12.5px',
              fontWeight: activeTab === 'ledger' ? '600' : '400',
              border: activeTab === 'ledger' ? '1px solid var(--gold-bright)' : '1px solid var(--border-subtle)',
              background: activeTab === 'ledger' ? 'var(--gold-glow)' : 'var(--bg-secondary)',
              color: activeTab === 'ledger' ? 'var(--gold-bright)' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <History size={15} />
            <span>Perpetual FIFO Ledger ({stockLedgerEntries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('warehouses')}
            className={`pill-btn ${activeTab === 'warehouses' ? 'active' : ''}`}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '12.5px',
              fontWeight: activeTab === 'warehouses' ? '600' : '400',
              border: activeTab === 'warehouses' ? '1px solid var(--gold-bright)' : '1px solid var(--border-subtle)',
              background: activeTab === 'warehouses' ? 'var(--gold-glow)' : 'var(--bg-secondary)',
              color: activeTab === 'warehouses' ? 'var(--gold-bright)' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <WarehouseIcon size={15} />
            <span>Warehouse Nodes ({warehouses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('entries')}
            className={`pill-btn ${activeTab === 'entries' ? 'active' : ''}`}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '12.5px',
              fontWeight: activeTab === 'entries' ? '600' : '400',
              border: activeTab === 'entries' ? '1px solid var(--gold-bright)' : '1px solid var(--border-subtle)',
              background: activeTab === 'entries' ? 'var(--gold-glow)' : 'var(--bg-secondary)',
              color: activeTab === 'entries' ? 'var(--gold-bright)' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ArrowRightLeft size={15} />
            <span>Material Transfers ({stockEntries.length})</span>
          </button>
        </div>

        {/* Search & Filters */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search SKU code, voucher..."
              className="form-input"
              style={{ paddingLeft: '32px', paddingRight: '12px', fontSize: '12px', width: '200px' }}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          {(activeTab === 'balance' || activeTab === 'ledger') && (
            <select
              className="form-input"
              style={{ fontSize: '12px', padding: '6px 10px', width: 'auto' }}
              value={warehouseFilter}
              onChange={e => setWarehouseFilter(e.target.value)}
            >
              <option value="All">All Warehouses</option>
              {warehouses.map(w => (
                <option key={w.id} value={w.id}>{w.warehouse_name}</option>
              ))}
            </select>
          )}

          {activeTab === 'ledger' && (
            <select
              className="form-input"
              style={{ fontSize: '12px', padding: '6px 10px', width: 'auto' }}
              value={voucherTypeFilter}
              onChange={e => setVoucherTypeFilter(e.target.value)}
            >
              <option value="All">All Voucher Types</option>
              <option value="Purchase Receipt">Purchase Receipts</option>
              <option value="Material Transfer">Material Transfers</option>
              <option value="Material Receipt">Material Receipts</option>
              <option value="Work Order Issue">Work Order Issues</option>
            </select>
          )}
        </div>
      </div>

      {/* Tab 1: Stock Balance & Bins */}
      {activeTab === 'balance' && (
        <div className="panel-card" style={{ padding: '0', overflow: 'hidden' }}>
          <div className="table-container" style={{ margin: 0 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Item Code (SKU)</th>
                  <th>Item Name & Atelier</th>
                  <th>Category</th>
                  <th>Default Staging</th>
                  <th>On-Hand Qty</th>
                  <th>Reserved (Project)</th>
                  <th>In Transit</th>
                  <th>Valuation Rate</th>
                  <th>Total Asset Value</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map(itm => {
                  const itemTotalValuation = itm.qty_on_hand * itm.valuation_rate;
                  const isLow = itm.qty_on_hand <= itm.reorder_level;

                  return (
                    <tr key={itm.item_code}>
                      <td>
                        <span style={{ fontWeight: '700', color: 'var(--gold-bright)', fontFamily: 'monospace' }}>
                          {itm.item_code}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{itm.item_name}</span>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Mfr: {itm.brand}</span>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-info" style={{ fontSize: '11px' }}>
                          {itm.item_group}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
                        {warehouses.find(w => w.id === itm.default_warehouse)?.warehouse_name || itm.default_warehouse}
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontWeight: '700', color: isLow ? 'var(--status-danger)' : 'var(--text-primary)', fontSize: '13px' }}>
                            {itm.qty_on_hand} {itm.stock_uom}
                          </span>
                          {isLow && (
                            <span className="badge badge-danger" style={{ fontSize: '10px', padding: '2px 4px' }}>
                              Reorder
                            </span>
                          )}
                        </div>
                      </td>
                      <td style={{ color: 'var(--text-secondary)' }}>
                        {itm.qty_reserved} {itm.stock_uom}
                      </td>
                      <td style={{ color: itm.qty_in_transit > 0 ? 'var(--status-info)' : 'var(--text-muted)' }}>
                        {itm.qty_in_transit > 0 ? `${itm.qty_in_transit} ${itm.stock_uom}` : '—'}
                      </td>
                      <td style={{ color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                        {formatCurrency(itm.valuation_rate)}
                      </td>
                      <td style={{ fontWeight: '700', color: 'var(--gold-bright)', fontFamily: 'monospace' }}>
                        {formatCurrency(itemTotalValuation)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Perpetual FIFO Stock Ledger */}
      {activeTab === 'ledger' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Summary Strip */}
          <div className="panel-card" style={{ padding: '16px 20px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(197,160,89,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-bright)' }}>
                <ShieldCheck size={22} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)' }}>Perpetual Inventory Audit Trail (FIFO Valuation)</h3>
                <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>ERPNext DocType: <code>Stock Ledger Entry</code> • Real-time moving rate & quantity balances</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowDownLeft size={16} style={{ color: 'var(--status-success)' }} />
                <div>
                  <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Inward Value</span>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--status-success)', fontFamily: 'monospace' }}>
                    +{formatCurrency(totalInwardValue)}
                  </div>
                </div>
              </div>
              <div style={{ height: '28px', width: '1px', background: 'var(--border-subtle)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowUpRight size={16} style={{ color: 'var(--status-danger)' }} />
                <div>
                  <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Outward Value</span>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--status-danger)', fontFamily: 'monospace' }}>
                    -{formatCurrency(totalOutwardValue)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stock Ledger Table */}
          <div className="panel-card" style={{ padding: '0', overflow: 'hidden' }}>
            <div className="table-container" style={{ margin: 0 }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Date & Time</th>
                    <th>Voucher Ref</th>
                    <th>Item & SKU</th>
                    <th>Warehouse Node</th>
                    <th style={{ textAlign: 'right' }}>Qty Change</th>
                    <th style={{ textAlign: 'right' }}>Inward Rate ($)</th>
                    <th style={{ textAlign: 'right' }}>Balance Qty</th>
                    <th style={{ textAlign: 'right' }}>Valuation Rate ($)</th>
                    <th style={{ textAlign: 'right' }}>Balance Value ($)</th>
                    <th>Batch / Project</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLedgerEntries.map(sle => (
                    <tr key={sle.id}>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '12px' }}>{sle.posting_date}</span>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{sle.posting_time}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: '700', color: 'var(--gold-bright)', fontFamily: 'monospace', fontSize: '12px' }}>
                            {sle.voucher_no}
                          </span>
                          <span className={`badge badge-${
                            sle.voucher_type === 'Purchase Receipt' ? 'success' :
                            sle.voucher_type === 'Material Transfer' ? 'info' :
                            sle.voucher_type === 'Work Order Issue' ? 'warning' : 'gold'
                          }`} style={{ fontSize: '10px', marginTop: '2px', width: 'fit-content' }}>
                            {sle.voucher_type}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '12.5px' }}>{sle.item_name}</span>
                          <span style={{ fontSize: '11px', color: 'var(--gold-bright)', fontFamily: 'monospace' }}>{sle.item_code}</span>
                        </div>
                      </td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
                        {warehouses.find(w => w.id === sle.warehouse)?.warehouse_name || sle.warehouse}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <span style={{
                          fontWeight: '700',
                          fontSize: '13px',
                          fontFamily: 'monospace',
                          color: sle.actual_qty > 0 ? 'var(--status-success)' : 'var(--status-danger)'
                        }}>
                          {sle.actual_qty > 0 ? `+${sle.actual_qty}` : sle.actual_qty}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
                        {sle.incoming_rate > 0 ? formatCurrency(sle.incoming_rate) : '—'}
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                        {sle.qty_after_transaction}
                      </td>
                      <td style={{ textAlign: 'right', fontFamily: 'monospace', color: 'var(--gold-bright)' }}>
                        {formatCurrency(sle.valuation_rate)}
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: '800', color: 'var(--gold-bright)', fontFamily: 'monospace' }}>
                        {formatCurrency(sle.stock_value)}
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '11.5px', color: 'var(--text-primary)', fontFamily: 'monospace' }}>{sle.batch_no || 'Standard'}</span>
                          <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{sle.project}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Warehouse Nodes */}
      {activeTab === 'warehouses' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {warehouses.map(w => {
            const itemsInWarehouse = stockItems.filter(i => i.default_warehouse === w.id);
            const warehouseValuation = itemsInWarehouse.reduce((acc, i) => acc + (i.qty_on_hand * i.valuation_rate), 0);

            return (
              <div key={w.id} className="panel-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-sm)', background: 'var(--gold-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-bright)' }}>
                      <WarehouseIcon size={20} />
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)' }}>{w.warehouse_name}</h3>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{w.id}</span>
                    </div>
                  </div>
                  <span className="badge badge-info" style={{ fontSize: '11px' }}>
                    {w.warehouse_type}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '12px' }}>
                  <MapPin size={14} style={{ color: 'var(--gold-bright)' }} />
                  <span>{w.location}</span>
                </div>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '12px', marginTop: '4px', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Managed SKUs</span>
                    <div style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '14px' }}>
                      {itemsInWarehouse.length} items
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Assigned Valuation</span>
                    <div style={{ fontWeight: '700', color: 'var(--gold-bright)', fontSize: '14px', fontFamily: 'monospace' }}>
                      {formatCurrency(warehouseValuation)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 4: Stock Transfers & Move Vouchers */}
      {activeTab === 'entries' && (
        <div className="panel-card" style={{ padding: '0', overflow: 'hidden' }}>
          <div className="table-container" style={{ margin: 0 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Voucher ID</th>
                  <th>Entry Purpose</th>
                  <th>Posting Date</th>
                  <th>Source Depot (From)</th>
                  <th>Destination (To)</th>
                  <th>Project Commission</th>
                  <th>Transferred Items</th>
                  <th>Total Valuation</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stockEntries.map(ste => (
                  <tr key={ste.id}>
                    <td>
                      <span style={{ fontWeight: '700', color: 'var(--gold-bright)', fontFamily: 'monospace' }}>
                        {ste.id}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-info" style={{ fontSize: '11px' }}>
                        {ste.purpose}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{ste.posting_date}</td>
                    <td style={{ color: 'var(--text-primary)', fontSize: '12px' }}>
                      {ste.from_warehouse || <span style={{ color: 'var(--text-muted)' }}>Direct Supplier Intake</span>}
                    </td>
                    <td style={{ color: 'var(--gold-bright)', fontSize: '12px', fontWeight: '600' }}>
                      {ste.to_warehouse || <span style={{ color: 'var(--text-muted)' }}>Project Site Consumption</span>}
                    </td>
                    <td>
                      <div style={{ color: 'var(--text-primary)' }}>{ste.projectName}</div>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{ste.project}</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                        {ste.items?.length || 1} lines
                      </span>
                      <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)' }}>
                        {ste.items?.map(i => `${i.qty} ${i.uom} ${i.item_code}`).join(', ')}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontWeight: '700', color: 'var(--gold-bright)', fontSize: '13.5px' }}>
                        {formatCurrency(ste.total_outgoing_value)}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-success" style={{ fontSize: '11px' }}>
                        Submitted (DocStatus: 1)
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
