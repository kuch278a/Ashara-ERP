import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Moon, 
  Sun, 
  Plus, 
  Printer, 
  FolderPlus,
  Armchair,
  ClipboardList,
  FileText,
  ShoppingBag,
  ArrowRightLeft,
  Scale
} from 'lucide-react';

export default function Topbar({ 
  searchQuery, 
  setSearchQuery, 
  theme, 
  toggleTheme, 
  onOpenNewProject,
  onOpenNewFfe,
  onOpenNewSnag,
  onOpenNewInvoice,
  onOpenNewPO,
  onOpenNewStockEntry,
  onOpenNewJournalEntry,
  notifications,
  onDismissNotification
}) {
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="topbar">
      {/* Global Search Bar */}
      <div className="search-box-wrap">
        <Search className="search-icon" size={16} />
        <input
          type="text"
          placeholder="Search projects, FF&E specs, drawings, clients, POs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Right Actions */}
      <div className="topbar-actions">
        {/* Quick Create Dropdown */}
        <div style={{ position: 'relative' }}>
          <button 
            className="btn-primary" 
            onClick={() => setShowQuickMenu(!showQuickMenu)}
          >
            <Plus size={16} />
            <span>New Entry</span>
          </button>

          {showQuickMenu && (
            <div 
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '230px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-gold)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                padding: '6px',
                zIndex: 50,
                display: 'flex',
                flexDirection: 'column',
                gap: '2px'
              }}
            >
              <div style={{ padding: '6px 10px', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Atelier Design
              </div>
              <button
                className="nav-item-btn"
                onClick={() => {
                  setShowQuickMenu(false);
                  onOpenNewProject();
                }}
              >
                <FolderPlus size={15} style={{ color: 'var(--gold-bright)' }} />
                <span>New Project</span>
              </button>
              <button
                className="nav-item-btn"
                onClick={() => {
                  setShowQuickMenu(false);
                  onOpenNewFfe();
                }}
              >
                <Armchair size={15} style={{ color: 'var(--gold-bright)' }} />
                <span>Add FF&E Spec</span>
              </button>
              <button
                className="nav-item-btn"
                onClick={() => {
                  setShowQuickMenu(false);
                  onOpenNewSnag();
                }}
              >
                <ClipboardList size={15} style={{ color: 'var(--gold-bright)' }} />
                <span>Log Site Snag</span>
              </button>

              <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '4px 0' }} />
              <div style={{ padding: '6px 10px', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                ERPNext Core Modules
              </div>
              <button
                className="nav-item-btn"
                onClick={() => {
                  setShowQuickMenu(false);
                  if (onOpenNewPO) onOpenNewPO();
                }}
              >
                <ShoppingBag size={15} style={{ color: 'var(--gold-bright)' }} />
                <span>Issue Purchase Order (PO)</span>
              </button>
              <button
                className="nav-item-btn"
                onClick={() => {
                  setShowQuickMenu(false);
                  if (onOpenNewStockEntry) onOpenNewStockEntry();
                }}
              >
                <ArrowRightLeft size={15} style={{ color: 'var(--gold-bright)' }} />
                <span>Stock Transfer Movement</span>
              </button>
              <button
                className="nav-item-btn"
                onClick={() => {
                  setShowQuickMenu(false);
                  onOpenNewInvoice();
                }}
              >
                <FileText size={15} style={{ color: 'var(--gold-bright)' }} />
                <span>Generate Fee Invoice</span>
              </button>
              <button
                className="nav-item-btn"
                onClick={() => {
                  setShowQuickMenu(false);
                  if (onOpenNewJournalEntry) onOpenNewJournalEntry();
                }}
              >
                <Scale size={15} style={{ color: 'var(--gold-bright)' }} />
                <span>Post Journal Entry</span>
              </button>
            </div>
          )}
        </div>

        {/* Print Presentation View */}
        <button 
          className="btn-secondary"
          onClick={() => window.print()}
          title="Print Client Executive Summary"
        >
          <Printer size={16} />
        </button>

        {/* Theme Toggle */}
        <button 
          className="btn-secondary"
          onClick={toggleTheme}
          title={theme === 'dark' ? "Switch to Travertine Light Mode" : "Switch to Obsidian Dark Mode"}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notifications Popover */}
        <div style={{ position: 'relative' }}>
          <button 
            className="btn-secondary"
            onClick={() => setShowNotifications(!showNotifications)}
            style={{ position: 'relative' }}
          >
            <Bell size={16} />
            {notifications.length > 0 && (
              <span 
                style={{
                  position: 'absolute',
                  top: '-3px',
                  right: '-3px',
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  background: 'var(--status-danger)',
                  border: '2px solid var(--bg-primary)'
                }}
              />
            )}
          </button>

          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '320px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-gold)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                padding: '12px',
                zIndex: 50,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
                  Studio & ERP Alerts
                </span>
                <span className="badge badge-gold" style={{ fontSize: '10px' }}>
                  {notifications.length} Unresolved
                </span>
              </div>

              {notifications.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '16px', color: 'var(--text-muted)', fontSize: '12px' }}>
                  All systems clear. No outstanding alerts.
                </div>
              ) : (
                notifications.map(n => (
                  <div 
                    key={n.id}
                    style={{
                      padding: '10px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255,255,255,0.02)',
                      borderLeft: `3px solid ${n.type === 'warning' ? 'var(--status-warning)' : 'var(--status-info)'}`,
                      fontSize: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ color: 'var(--text-primary)' }}>{n.title}</strong>
                      <button 
                        onClick={() => onDismissNotification(n.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '11px' }}
                      >
                        Dismiss
                      </button>
                    </div>
                    <span style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>{n.message}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
