import React, { useState } from 'react';
import { 
  Hammer, 
  Layers, 
  FileCode, 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock, 
  TrendingUp
} from 'lucide-react';

export default function ManufacturingView({ 
  workOrders, 
  boms, 
  onOpenNewWorkOrder, 
  onUpdateWorkOrderStatus,
  onOpenDocTypeInspector 
}) {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'boms'
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const totalWipValue = workOrders.reduce((sum, wo) => sum + (wo.qty * 28000), 0);
  const activeOrders = workOrders.filter(wo => wo.status === 'In Process');

  const filteredOrders = workOrders.filter(wo => {
    const matchesStatus = statusFilter === 'All' || wo.status === statusFilter;
    const matchesSearch = wo.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wo.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (wo.projectName && wo.projectName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
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
            <span className="view-pretitle">Ashara Atelier Production</span>
            <span className="badge badge-gold" style={{ fontSize: '10px' }}>ERPNext Manufacturing Module</span>
          </div>
          <h1 className="view-title">
            <span>Fabrication Studio, Bill of Materials & Work Orders</span>
          </h1>
          <p className="view-desc">
            Directly mapped to ERPNext <code>BOM</code> and <code>Work Order</code> DocTypes. Manage bespoke architectural joinery, Florentine chandeliers, raw material exploded components, and craftsman job scheduling.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button 
            className="btn-secondary" 
            onClick={() => onOpenDocTypeInspector('bom')}
            title="Inspect ERPNext Manufacturing schemas"
          >
            <FileCode size={16} />
            <span>DocType Schema</span>
          </button>
          <button className="btn-primary" onClick={onOpenNewWorkOrder}>
            <Plus size={16} />
            <span>New Work Order</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-top-row">
            <span className="metric-label">Active Work-In-Progress</span>
            <Hammer size={18} style={{ color: 'var(--gold-bright)' }} />
          </div>
          <div className="metric-value">{activeOrders.length} Orders</div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Under craftsmanship at Al-Quoz Mill</span>
        </div>

        <div className="metric-card">
          <div className="metric-top-row">
            <span className="metric-label">WIP Production Value</span>
            <TrendingUp size={18} style={{ color: 'var(--status-info)' }} />
          </div>
          <div className="metric-value" style={{ color: 'var(--status-info)' }}>{formatCurrency(totalWipValue)}</div>
          <span style={{ fontSize: '11px', color: 'var(--status-info)' }}>Committed bespoke architectural components</span>
        </div>

        <div className="metric-card">
          <div className="metric-top-row">
            <span className="metric-label">Verified Bill of Materials (BOM)</span>
            <Layers size={18} style={{ color: 'var(--status-success)' }} />
          </div>
          <div className="metric-value" style={{ color: 'var(--status-success)' }}>{boms.length} Active BOMs</div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Exploded recipes with raw materials & ops</span>
        </div>

        <div className="metric-card">
          <div className="metric-top-row">
            <span className="metric-label">Craft Quality & Handover</span>
            <CheckCircle2 size={18} style={{ color: 'var(--gold-bright)' }} />
          </div>
          <div className="metric-value" style={{ color: 'var(--gold-bright)' }}>98.4%</div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Tolerance compliance against shop drawings</span>
        </div>
      </div>

      {/* Tabs */}
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
            <Hammer size={16} />
            <span>Work Orders ({workOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('boms')}
            className={`pill-btn ${activeTab === 'boms' ? 'active' : ''}`}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-md)',
              fontSize: '13px',
              fontWeight: activeTab === 'boms' ? '600' : '400',
              border: activeTab === 'boms' ? '1px solid var(--gold-bright)' : '1px solid var(--border-subtle)',
              background: activeTab === 'boms' ? 'var(--gold-glow)' : 'var(--bg-secondary)',
              color: activeTab === 'boms' ? 'var(--gold-bright)' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Layers size={16} />
            <span>Bill of Materials / Recipes ({boms.length})</span>
          </button>
        </div>

        {/* Filter & Search */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search work order #, item, commission..."
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
              <option value="In Process">In Process</option>
              <option value="Completed">Completed</option>
              <option value="Draft">Draft</option>
            </select>
          )}
        </div>
      </div>

      {/* Tab: Work Orders */}
      {activeTab === 'orders' && (
        <div className="panel-card" style={{ padding: '0', overflow: 'hidden' }}>
          <div className="table-container" style={{ margin: 0 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Work Order #</th>
                  <th>Fabrication Item</th>
                  <th>BOM Recipe</th>
                  <th>Project Commission</th>
                  <th>Craft Lead & Workshop</th>
                  <th>Target Handover</th>
                  <th>Crafting Progress</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(wo => {
                  const isCompleted = wo.status === 'Completed';

                  return (
                    <tr key={wo.id}>
                      <td>
                        <span style={{ fontWeight: '700', color: 'var(--gold-bright)', fontFamily: 'monospace' }}>
                          {wo.id}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{wo.item_name}</div>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Code: {wo.production_item} • Qty: {wo.qty}</span>
                      </td>
                      <td>
                        <code style={{ fontSize: '11.5px', color: 'var(--gold-bright)' }}>{wo.bom_no}</code>
                      </td>
                      <td>
                        <div style={{ color: 'var(--text-primary)' }}>{wo.projectName}</div>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{wo.project}</span>
                      </td>
                      <td>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{wo.leadCraftsman}</div>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>WIP: {wo.wip_warehouse}</span>
                      </td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={12} style={{ color: 'var(--status-warning)' }} />
                          {wo.expected_delivery_date}
                        </span>
                      </td>
                      <td style={{ minWidth: '130px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Assembly</span>
                          <span style={{ color: 'var(--gold-bright)', fontWeight: '600' }}>{wo.progress || 0}%</span>
                        </div>
                        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div 
                            style={{ 
                              width: `${wo.progress || 0}%`, 
                              height: '100%', 
                              background: isCompleted ? 'var(--status-success)' : 'var(--gold-bright)',
                              transition: 'width 0.3s' 
                            }} 
                          />
                        </div>
                      </td>
                      <td>
                        <span 
                          className={`badge ${
                            isCompleted ? 'badge-success' : 'badge-warning'
                          }`}
                          style={{ fontSize: '11px' }}
                        >
                          {wo.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        {!isCompleted && (
                          <button
                            className="btn-secondary btn-sm"
                            style={{ fontSize: '11px', padding: '4px 8px' }}
                            onClick={() => onUpdateWorkOrderStatus(wo.id, 'Completed')}
                            title="Complete Work Order & Transfer to Finished Goods Staging"
                          >
                            <CheckCircle2 size={12} style={{ color: 'var(--status-success)' }} />
                            <span>Finish Production</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: BOMs */}
      {activeTab === 'boms' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {boms.map(bom => (
            <div key={bom.id} className="panel-card" style={{ margin: 0, padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px', marginBottom: '14px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ fontSize: '17px', color: 'var(--text-primary)', margin: 0 }}>
                      {bom.item_name}
                    </h3>
                    <code style={{ fontSize: '12px', color: 'var(--gold-bright)' }}>{bom.id}</code>
                    <span className="badge badge-success" style={{ fontSize: '10px' }}>Active Default BOM</span>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
                    Finished Item Code: <strong>{bom.item}</strong> • Output: 1 {bom.uom}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '24px', textAlign: 'right' }}>
                  <div>
                    <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', display: 'block' }}>Raw Material Cost</span>
                    <strong style={{ color: 'var(--text-primary)', fontSize: '13.5px' }}>{formatCurrency(bom.total_raw_material_cost)}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', display: 'block' }}>Atelier Operating Cost</span>
                    <strong style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>{formatCurrency(bom.total_operating_cost)}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', display: 'block' }}>Total BOM Rate</span>
                    <strong style={{ color: 'var(--gold-bright)', fontSize: '16px' }}>{formatCurrency(bom.total_cost)}</strong>
                  </div>
                </div>
              </div>

              {/* Raw Materials Child Table */}
              <div style={{ marginBottom: '14px' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                  Raw Materials & Hardware Breakdown (BOM Item Table)
                </span>
                <div className="table-container" style={{ margin: 0 }}>
                  <table className="data-table" style={{ fontSize: '12px' }}>
                    <thead>
                      <tr>
                        <th>Material Code</th>
                        <th>Component Description</th>
                        <th>Quantity</th>
                        <th>UOM</th>
                        <th>Unit Rate</th>
                        <th>Total Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bom.raw_materials.map((rm, idx) => (
                        <tr key={idx}>
                          <td><code style={{ color: 'var(--gold-bright)', fontSize: '11px' }}>{rm.item_code}</code></td>
                          <td style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{rm.item_name}</td>
                          <td>{rm.qty}</td>
                          <td style={{ color: 'var(--text-secondary)' }}>{rm.uom}</td>
                          <td>{formatCurrency(rm.rate)}</td>
                          <td style={{ fontWeight: '600', color: 'var(--gold-bright)' }}>{formatCurrency(rm.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Operations Table */}
              <div>
                <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                  Craft Operations & Workstations (BOM Operation Table)
                </span>
                <div className="table-container" style={{ margin: 0 }}>
                  <table className="data-table" style={{ fontSize: '12px' }}>
                    <thead>
                      <tr>
                        <th>Operation Step</th>
                        <th>Atelier Workstation</th>
                        <th>Time (Minutes)</th>
                        <th>Operating Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bom.operations.map((op, idx) => (
                        <tr key={idx}>
                          <td style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{op.operation}</td>
                          <td><span className="badge badge-neutral" style={{ fontSize: '11px' }}>{op.workstation}</span></td>
                          <td style={{ color: 'var(--text-secondary)' }}>{op.time_mins} mins</td>
                          <td style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{formatCurrency(op.cost)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
