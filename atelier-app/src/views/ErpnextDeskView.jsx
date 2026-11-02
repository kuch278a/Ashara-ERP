import React, { useState } from 'react';
import { 
  Layers, 
  Receipt, 
  ShoppingBag, 
  Package, 
  Hammer, 
  Building2, 
  Briefcase, 
  FolderKanban, 
  LifeBuoy, 
  Wrench, 
  ClipboardCheck, 
  Users, 
  CheckCircle2, 
  RefreshCw, 
  Server, 
  FileCode,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { INITIAL_API_CONFIG } from '../data/erpnextSchemas';

export default function ErpnextDeskView({ 
  counts, 
  setCurrentView, 
  onOpenDocTypeInspector 
}) {
  const [apiConfig, setApiConfig] = useState(INITIAL_API_CONFIG);
  const [isSyncing, setIsSyncing] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected_ready'); // 'connected_ready' | 'syncing' | 'synced'

  const handleTestConnection = () => {
    setIsSyncing(true);
    setConnectionStatus('syncing');
    setTimeout(() => {
      setIsSyncing(false);
      setConnectionStatus('synced');
      setApiConfig(prev => ({
        ...prev,
        connected: true,
        last_sync: new Date().toISOString()
      }));
    }, 1200);
  };

  const modules = [
    {
      id: 'financials',
      name: 'Accounts & Finance',
      icon: Receipt,
      desc: 'Chart of Accounts, General Ledger, Sales & Purchase Invoices, Journal Entries, UAE VAT 5%.',
      stats: `${counts.invoices} Invoices • 7 GL Entries`,
      doctypes: ['Sales Invoice', 'Journal Entry', 'GL Entry', 'Account'],
      color: '#C5A059'
    },
    {
      id: 'buying',
      name: 'Buying & Procurement',
      icon: ShoppingBag,
      desc: 'Purchase Orders, Master Artisans, Stone Quarries, Supplier Scorecard Ratings, International Freight.',
      stats: `${counts.buying} Active POs • 5 Suppliers`,
      doctypes: ['Purchase Order', 'Supplier', 'Purchase Receipt'],
      color: '#3D7CA8'
    },
    {
      id: 'stock',
      name: 'Stock & Warehouses',
      icon: Package,
      desc: 'Item Master, Central Logistics & On-Site Staging Bins, Stock Transfers, FIFO Valuations.',
      stats: `${counts.stock} SKUs • 4 Warehouses`,
      doctypes: ['Item', 'Warehouse', 'Stock Entry', 'Stock Ledger'],
      color: '#3E885B'
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing & BOM',
      icon: Hammer,
      desc: 'Bill of Materials recipes, Work Orders, Al-Quoz 5-axis CNC router and craft assembly operations.',
      stats: `${counts.manufacturing || 2} Work Orders • 2 BOMs`,
      doctypes: ['BOM', 'Work Order', 'BOM Operation'],
      color: '#D9822B'
    },
    {
      id: 'assets',
      name: 'Fixed Assets Register',
      icon: Building2,
      desc: 'Capitalized studio machinery, dual NVIDIA H100 GPU 3D render clusters, transport fleet depreciation.',
      stats: `${counts.assets || 4} Capital Assets • $690K`,
      doctypes: ['Asset', 'Asset Category', 'Asset Depreciation Schedule'],
      color: '#A259FF'
    },
    {
      id: 'crm',
      name: 'CRM & Tenders Pipeline',
      icon: Briefcase,
      desc: 'High-value architectural proposals, royal family tenders, stage win probabilities, revenue forecast.',
      stats: `${counts.opportunities || 4} Tenders • $61.8M Pipeline`,
      doctypes: ['Opportunity', 'Lead', 'Quotation'],
      color: '#E5C378'
    },
    {
      id: 'projects',
      name: 'Projects & BIM Stages',
      icon: FolderKanban,
      desc: 'Commission tracking across Concept, 3D Schematic, Technical BIM, BOQ, Fit-out, and Handover.',
      stats: `${counts.projects} Commissions Active`,
      doctypes: ['Project', 'Task', 'Timesheet', 'Project Template'],
      color: '#4E9F3D'
    },
    {
      id: 'support',
      name: 'Support & Warranty Care',
      icon: LifeBuoy,
      desc: 'Post-handover warranty tickets, stone resealing service visits, HVAC automation defect triage.',
      stats: `${counts.issues || 3} Care Tickets Logged`,
      doctypes: ['Issue', 'Service Level Agreement', 'Maintenance Visit'],
      color: '#E05D5D'
    },
    {
      id: 'subcontracting',
      name: 'Subcontracting Orders',
      icon: Wrench,
      desc: 'Specialist artisan subcontracting orders: high-pressure waterjet inlay cutting, Lutron automation.',
      stats: `2 Subcontracts Active`,
      doctypes: ['Subcontracting Order', 'Subcontracting BOM'],
      color: '#C5A059'
    },
    {
      id: 'snags',
      name: 'Quality Management (Snags)',
      icon: ClipboardCheck,
      desc: 'Site inspection logs, tolerance deviations against shop drawings, subcontractor rectification plans.',
      stats: `${counts.snags} Quality Punch Items`,
      doctypes: ['Quality Inspection', 'Non-Conformance Report'],
      color: '#D9822B'
    },
    {
      id: 'team',
      name: 'HR & Studio Capacity',
      icon: Users,
      desc: 'Principal architects, BIM detailing engineers, craft directors, resource bandwidth allocation.',
      stats: `8 Studio Professionals`,
      doctypes: ['Employee', 'Department', 'Designation'],
      color: '#3D7CA8'
    },
    {
      id: 'ffe',
      name: 'FF&E Specification Matrix',
      icon: Layers,
      desc: 'Furniture, fixtures & equipment schedules, client markup pricing, sample approval tracking.',
      stats: `${counts.ffe} Bespoke Specifications`,
      doctypes: ['Item Specification', 'Material Request'],
      color: '#BD9548'
    }
  ];

  return (
    <div className="content-body">
      {/* Header */}
      <div className="view-header">
        <div className="view-title-wrap">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="view-pretitle">ERPNext v16 Enterprise Hub</span>
            <span className="badge badge-gold" style={{ fontSize: '10px' }}>12 Core Modules Active</span>
          </div>
          <h1 className="view-title">
            <span>Workspaces, DocType Matrix & Frappe REST API Hub</span>
          </h1>
          <p className="view-desc">
            Complete ecosystem mapped directly to your downloaded <code>C:\Users\X\Downloads\erpnext-16.51.1</code> codebase. Launch any ERP module, inspect schemas, or sync with a live Frappe backend.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button 
            className="btn-secondary" 
            onClick={() => onOpenDocTypeInspector('sales_invoice')}
          >
            <FileCode size={16} />
            <span>DocType Inspector</span>
          </button>
          <button 
            className="btn-primary" 
            onClick={handleTestConnection}
            disabled={isSyncing}
          >
            <RefreshCw size={16} className={isSyncing ? 'spin-icon' : ''} />
            <span>{isSyncing ? 'Synchronizing DocTypes...' : 'Sync with ERPNext'}</span>
          </button>
        </div>
      </div>

      {/* Live Frappe API Connection Bar */}
      <div 
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-gold)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div 
            style={{ 
              width: '42px', 
              height: '42px', 
              borderRadius: '8px', 
              background: 'var(--gold-glow)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: 'var(--gold-bright)' 
            }}
          >
            <Server size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>
                Frappe / ERPNext REST API Bridge
              </span>
              <span className={`badge badge-${connectionStatus === 'syncing' ? 'warning' : 'success'}`} style={{ fontSize: '10.5px' }}>
                <CheckCircle2 size={11} style={{ marginRight: '3px' }} />
                {connectionStatus === 'syncing' ? 'Synchronizing Schema...' : 'v16.51.1 Active & Ready'}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-muted)', marginTop: '3px' }}>
              <span>Endpoint: <code style={{ color: 'var(--gold-bright)' }}>{apiConfig.server_url}</code></span>
              <span>API Key: <code style={{ color: 'var(--text-secondary)' }}>{apiConfig.api_key}</code></span>
              <span>Last Handshake: <strong style={{ color: 'var(--text-primary)' }}>Just now</strong></span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button 
            className="btn-secondary btn-sm"
            onClick={handleTestConnection}
            style={{ fontSize: '12px' }}
          >
            <RefreshCw size={13} className={isSyncing ? 'spin-icon' : ''} />
            <span>Test Handshake</span>
          </button>
        </div>
      </div>

      {/* 12 Core Module Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
        {modules.map((mod) => {
          const Icon = mod.icon;

          return (
            <div 
              key={mod.id} 
              className="panel-card" 
              style={{ 
                margin: 0, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '14px',
                transition: 'transform 0.2s, border-color 0.2s',
                cursor: 'pointer'
              }}
              onClick={() => setCurrentView(mod.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div 
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '8px', 
                      background: 'rgba(255,255,255,0.04)',
                      border: `1px solid ${mod.color}40`,
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      color: mod.color 
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', color: 'var(--text-primary)', margin: 0 }}>
                      {mod.name}
                    </h3>
                    <span style={{ fontSize: '11px', color: 'var(--gold-bright)' }}>
                      {mod.stats}
                    </span>
                  </div>
                </div>

                <ChevronRight size={18} style={{ color: 'var(--text-muted)' }} />
              </div>

              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.45, flex: 1 }}>
                {mod.desc}
              </p>

              {/* DocType Badges */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {mod.doctypes.map((dt, dIdx) => (
                    <span 
                      key={dIdx} 
                      className="badge badge-neutral" 
                      style={{ fontSize: '10px', padding: '2px 6px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        const key = dt.toLowerCase().replace(/\s+/g, '_');
                        onOpenDocTypeInspector(key);
                      }}
                      title="Inspect DocType Schema"
                    >
                      {dt}
                    </span>
                  ))}
                </div>

                <span style={{ fontSize: '11.5px', color: 'var(--gold-bright)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                  <span>Open</span>
                  <ArrowRight size={12} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
