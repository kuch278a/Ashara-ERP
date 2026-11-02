import React, { useState } from 'react';
import { 
  Building2, 
  Calendar, 
  FileCode, 
  Plus, 
  Search, 
  MapPin, 
  TrendingDown, 
  ShieldCheck,
  Cpu
} from 'lucide-react';

export default function AssetsView({ 
  assets, 
  onOpenNewAsset, 
  onOpenDocTypeInspector 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const totalGrossValue = assets.reduce((sum, a) => sum + a.gross_purchase_amount, 0);
  const totalNetBookValue = assets.reduce((sum, a) => sum + a.value_after_depreciation, 0);
  const totalDepreciation = totalGrossValue - totalNetBookValue;

  const filteredAssets = assets.filter(a => {
    const matchesCategory = categoryFilter === 'All' || a.asset_category === categoryFilter;
    const matchesSearch = a.asset_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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
            <span className="view-pretitle">Ashara Capital Equipment</span>
            <span className="badge badge-gold" style={{ fontSize: '10px' }}>ERPNext Assets Module</span>
          </div>
          <h1 className="view-title">
            <span>Fixed Assets Register & Capital Depreciation</span>
          </h1>
          <p className="view-desc">
            Directly mapped to ERPNext <code>Asset</code> DocType. Track atelier 5-axis CNC stone routers, dual NVIDIA H100 3D render clusters, mobile sample transport fleet, and straight-line depreciation schedules.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button 
            className="btn-secondary" 
            onClick={() => onOpenDocTypeInspector('asset')}
            title="Inspect ERPNext Asset schema"
          >
            <FileCode size={16} />
            <span>DocType Schema</span>
          </button>
          <button className="btn-primary" onClick={onOpenNewAsset}>
            <Plus size={16} />
            <span>Register Fixed Asset</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-top-row">
            <span className="metric-label">Gross Capitalized Assets</span>
            <Building2 size={18} style={{ color: 'var(--gold-bright)' }} />
          </div>
          <div className="metric-value">{formatCurrency(totalGrossValue)}</div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Historical Acquisition Value</span>
        </div>

        <div className="metric-card">
          <div className="metric-top-row">
            <span className="metric-label">Current Net Book Value (NBV)</span>
            <ShieldCheck size={18} style={{ color: 'var(--status-success)' }} />
          </div>
          <div className="metric-value" style={{ color: 'var(--status-success)' }}>{formatCurrency(totalNetBookValue)}</div>
          <span style={{ fontSize: '11px', color: 'var(--status-success)' }}>Active Balance Sheet Asset Value</span>
        </div>

        <div className="metric-card">
          <div className="metric-top-row">
            <span className="metric-label">Accumulated Depreciation</span>
            <TrendingDown size={18} style={{ color: 'var(--status-warning)' }} />
          </div>
          <div className="metric-value" style={{ color: 'var(--status-warning)' }}>{formatCurrency(totalDepreciation)}</div>
          <span style={{ fontSize: '11px', color: 'var(--status-warning)' }}>Straight-line monthly amortizations</span>
        </div>

        <div className="metric-card">
          <div className="metric-top-row">
            <span className="metric-label">Registered Capital Units</span>
            <Cpu size={18} style={{ color: 'var(--status-info)' }} />
          </div>
          <div className="metric-value" style={{ color: 'var(--status-info)' }}>{assets.length} Units</div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Machinery, IT compute, fleet</span>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search asset ID, machine name, location..."
              className="form-input"
              style={{ paddingLeft: '32px', paddingRight: '12px', fontSize: '12px', width: '250px' }}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="form-input"
            style={{ fontSize: '12px', padding: '6px 10px', width: 'auto' }}
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Fabrication Machinery">Fabrication Machinery</option>
            <option value="IT & 3D Compute">IT & 3D Compute</option>
            <option value="Studio Showroom Fixtures">Studio Showroom Fixtures</option>
            <option value="Fleet Vehicles">Fleet Vehicles</option>
          </select>
        </div>
      </div>

      {/* Assets Table */}
      <div className="panel-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div className="table-container" style={{ margin: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Asset ID</th>
                <th>Asset Name & Item Code</th>
                <th>Category</th>
                <th>Commission Date</th>
                <th>Physical Location</th>
                <th>Gross Purchase</th>
                <th>Net Book Value</th>
                <th>Depreciation Policy</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map(asset => (
                <tr key={asset.id}>
                  <td>
                    <span style={{ fontWeight: '700', color: 'var(--gold-bright)', fontFamily: 'monospace' }}>
                      {asset.id}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{asset.asset_name}</div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Item Code: {asset.item_code}</span>
                  </td>
                  <td>
                    <span className="badge badge-neutral" style={{ fontSize: '11px' }}>
                      {asset.asset_category}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} style={{ color: 'var(--text-muted)' }} />
                      {asset.purchase_date}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                      <MapPin size={12} style={{ color: 'var(--gold-bright)' }} />
                      <span>{asset.location}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                    {formatCurrency(asset.gross_purchase_amount)}
                  </td>
                  <td>
                    <span style={{ fontWeight: '700', color: 'var(--gold-bright)', fontSize: '14px' }}>
                      {formatCurrency(asset.value_after_depreciation)}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)', display: 'block' }}>
                      {asset.depreciation_method}
                    </span>
                    <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                      {asset.total_number_of_depreciations} mos useful life
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-success" style={{ fontSize: '11px' }}>
                      {asset.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
