import React from 'react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Armchair, 
  ClipboardCheck, 
  Receipt, 
  ShoppingBag,
  Package,
  Hammer,
  Building2,
  Briefcase,
  LifeBuoy,
  Users, 
  Palette, 
  Layers, 
  UserCheck, 
  ChevronLeft, 
  ChevronRight,
  Server
} from 'lucide-react';

export default function Sidebar({ currentView, setCurrentView, collapsed, setCollapsed, counts }) {
  const navItems = [
    { section: "CORE ATELIER" },
    { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects & BIM Stages', icon: FolderKanban, badge: counts.projects },
    { id: 'ffe', label: 'FF&E Specification', icon: Armchair, badge: counts.ffe },
    { id: 'snags', label: 'Site Snagging & Quality', icon: ClipboardCheck, badge: counts.snags, alert: counts.openSnags > 0 },
    
    { section: "COMMERCIAL & REVENUE" },
    { id: 'financials', label: 'Accounts & Ledger', icon: Receipt, badge: counts.invoices },
    { id: 'buying', label: 'Buying & Procurement', icon: ShoppingBag, badge: counts.buying },
    { id: 'crm', label: 'CRM & Tenders Pipeline', icon: Briefcase, badge: counts.opportunities },
    { id: 'clients', label: 'Client CRM & Briefs', icon: Users, badge: counts.clients },

    { section: "PRODUCTION & OPERATIONS" },
    { id: 'stock', label: 'Stock & Warehouses', icon: Package, badge: counts.stock },
    { id: 'manufacturing', label: 'Manufacturing & BOM', icon: Hammer, badge: counts.manufacturing },
    { id: 'assets', label: 'Fixed Assets Register', icon: Building2, badge: counts.assets },
    { id: 'support', label: 'Warranty & Support Care', icon: LifeBuoy, badge: counts.issues },
    
    { section: "STUDIO & ENTERPRISE" },
    { id: 'moodboards', label: '3D Render Atelier', icon: Palette },
    { id: 'materials', label: 'Material & Finishes', icon: Layers },
    { id: 'team', label: 'Studio Team & Capacity', icon: UserCheck },
    { id: 'erpnext_desk', label: 'ERPNext Workspaces & API', icon: Server, badge: 'v16' }
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Brand Header */}
      <div className="brand-section">
        <div className="brand-logo-badge">
          <span>A</span>
        </div>
        {!collapsed && (
          <div className="brand-text-col">
            <span className="brand-title">ASHARA</span>
            <span className="brand-subtitle">Architecture & Design</span>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        {navItems.map((item, idx) => {
          if (item.section) {
            return !collapsed ? (
              <div key={idx} className="nav-section-label">
                {item.section}
              </div>
            ) : (
              <div key={idx} style={{ height: '12px' }} />
            );
          }

          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`nav-item-btn ${isActive ? 'active' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={18} />
              {!collapsed && (
                <>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className={`nav-badge ${item.alert ? 'badge-warning' : ''}`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse Toggle & User Profile */}
      <div className="sidebar-footer">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="btn-secondary btn-sm"
          style={{ width: '100%', justifyContent: 'center' }}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!collapsed && <span>Collapse Sidebar</span>}
        </button>

        {!collapsed && (
          <div className="user-profile-strip">
            <div className="user-avatar-circle">SM</div>
            <div className="user-meta-name" style={{ overflow: 'hidden' }}>
              <div>Sarah Al-Mansoor</div>
              <div className="user-meta-role">Principal Director</div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
