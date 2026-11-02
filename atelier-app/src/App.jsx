import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

// Core Atelier Views
import DashboardView from './views/DashboardView';
import ProjectsView from './views/ProjectsView';
import FfeScheduleView from './views/FfeScheduleView';
import SiteSnagsView from './views/SiteSnagsView';
import ClientsView from './views/ClientsView';
import MoodboardsView from './views/MoodboardsView';
import MaterialsView from './views/MaterialsView';
import TeamView from './views/TeamView';

// ERPNext Core Ported Modules Views
import FinancialsView from './views/FinancialsView';
import BuyingView from './views/BuyingView';
import StockView from './views/StockView';
import ManufacturingView from './views/ManufacturingView';
import AssetsView from './views/AssetsView';
import CrmPipelineView from './views/CrmPipelineView';
import SupportMaintenanceView from './views/SupportMaintenanceView';
import ErpnextDeskView from './views/ErpnextDeskView';

// Modals
import ProjectDetailModal from './components/ProjectDetailModal';
import NewProjectModal from './components/NewProjectModal';
import NewFfeModal from './components/NewFfeModal';
import NewSnagModal from './components/NewSnagModal';
import NewInvoiceModal from './components/NewInvoiceModal';
import PrintableInvoiceModal from './components/PrintableInvoiceModal';
import NewPurchaseOrderModal from './components/NewPurchaseOrderModal';
import NewStockEntryModal from './components/NewStockEntryModal';
import NewJournalEntryModal from './components/NewJournalEntryModal';
import DocTypeInspectorModal from './components/DocTypeInspectorModal';
import NewWorkOrderModal from './components/NewWorkOrderModal';
import NewAssetModal from './components/NewAssetModal';
import NewOpportunityModal from './components/NewOpportunityModal';
import NewSupportIssueModal from './components/NewSupportIssueModal';

// Mock Data
import { 
  INITIAL_PROJECTS, 
  INITIAL_FFE_ITEMS, 
  INITIAL_SNAGS, 
  INITIAL_INVOICES, 
  INITIAL_CLIENTS 
} from './data/mockData';

// ERPNext Schemas & Ported Master Datasets
import {
  INITIAL_PURCHASE_ORDERS,
  INITIAL_SUPPLIERS,
  INITIAL_STOCK_ITEMS,
  INITIAL_WAREHOUSES,
  INITIAL_STOCK_ENTRIES,
  INITIAL_STOCK_LEDGER_ENTRIES,
  INITIAL_CHART_OF_ACCOUNTS,
  INITIAL_GL_ENTRIES,
  INITIAL_JOURNAL_ENTRIES,
  INITIAL_BOMS,
  INITIAL_WORK_ORDERS,
  INITIAL_ASSETS,
  INITIAL_OPPORTUNITIES,
  INITIAL_SUPPORT_ISSUES,
  INITIAL_SUBCONTRACT_ORDERS
} from './data/erpnextSchemas';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState(() => localStorage.getItem('ashara_theme') || 'dark');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Projects State
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('ashara_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  // 2. FF&E Specifications State
  const [ffeItems, setFfeItems] = useState(() => {
    const saved = localStorage.getItem('ashara_ffe');
    return saved ? JSON.parse(saved) : INITIAL_FFE_ITEMS;
  });

  // 3. Site Snags & Quality Inspections
  const [snags, setSnags] = useState(() => {
    const saved = localStorage.getItem('ashara_snags');
    return saved ? JSON.parse(saved) : INITIAL_SNAGS;
  });

  // 4. Invoices (Accounts & Billing)
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('ashara_invoices');
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  // 5. Clients CRM
  const [clients] = useState(() => {
    const saved = localStorage.getItem('ashara_clients');
    return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
  });

  // 6. Buying (Purchase Orders & Suppliers)
  const [purchaseOrders, setPurchaseOrders] = useState(() => {
    const saved = localStorage.getItem('ashara_purchase_orders');
    return saved ? JSON.parse(saved) : INITIAL_PURCHASE_ORDERS;
  });

  const [suppliers] = useState(() => {
    const saved = localStorage.getItem('ashara_suppliers');
    return saved ? JSON.parse(saved) : INITIAL_SUPPLIERS;
  });

  // 7. Stock (Item Master, Warehouses & Stock Entries)
  const [stockItems, setStockItems] = useState(() => {
    const saved = localStorage.getItem('ashara_stock_items');
    return saved ? JSON.parse(saved) : INITIAL_STOCK_ITEMS;
  });

  const [warehouses] = useState(() => {
    return INITIAL_WAREHOUSES;
  });

  const [stockEntries, setStockEntries] = useState(() => {
    const saved = localStorage.getItem('ashara_stock_entries');
    return saved ? JSON.parse(saved) : INITIAL_STOCK_ENTRIES;
  });

  const [stockLedgerEntries, _setStockLedgerEntries] = useState(() => {
    const saved = localStorage.getItem('ashara_stock_ledger');
    return saved ? JSON.parse(saved) : INITIAL_STOCK_LEDGER_ENTRIES;
  });

  // 8. General Ledger & Chart of Accounts
  const [chartOfAccounts] = useState(() => {
    return INITIAL_CHART_OF_ACCOUNTS;
  });

  const [glEntries, setGlEntries] = useState(() => {
    const saved = localStorage.getItem('ashara_gl_entries');
    return saved ? JSON.parse(saved) : INITIAL_GL_ENTRIES;
  });

  const [journalEntries, setJournalEntries] = useState(() => {
    const saved = localStorage.getItem('ashara_journal_entries');
    return saved ? JSON.parse(saved) : INITIAL_JOURNAL_ENTRIES;
  });

  // 9. Manufacturing (BOMs & Work Orders)
  const [boms] = useState(() => {
    const saved = localStorage.getItem('ashara_boms');
    return saved ? JSON.parse(saved) : INITIAL_BOMS;
  });

  const [workOrders, setWorkOrders] = useState(() => {
    const saved = localStorage.getItem('ashara_work_orders');
    return saved ? JSON.parse(saved) : INITIAL_WORK_ORDERS;
  });

  // 10. Assets Register
  const [assets, setAssets] = useState(() => {
    const saved = localStorage.getItem('ashara_assets');
    return saved ? JSON.parse(saved) : INITIAL_ASSETS;
  });

  // 11. CRM Opportunities & Tenders
  const [opportunities, setOpportunities] = useState(() => {
    const saved = localStorage.getItem('ashara_opportunities');
    return saved ? JSON.parse(saved) : INITIAL_OPPORTUNITIES;
  });

  // 12. Support & Subcontracting
  const [issues, setIssues] = useState(() => {
    const saved = localStorage.getItem('ashara_support_issues');
    return saved ? JSON.parse(saved) : INITIAL_SUPPORT_ISSUES;
  });

  const [subcontractOrders] = useState(() => {
    return INITIAL_SUBCONTRACT_ORDERS;
  });

  // Modal State
  const [inspectingProject, setInspectingProject] = useState(null);
  const [printingInvoice, setPrintingInvoice] = useState(null);
  const [inspectingDocType, setInspectingDocType] = useState(null);
  const [activeModal, setActiveModal] = useState(null); 
  // 'newProject' | 'newFfe' | 'newSnag' | 'newInvoice' | 'newPO' | 'newStockEntry' | 'newJournalEntry' | 'newWorkOrder' | 'newAsset' | 'newOpportunity' | 'newIssue'

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'ERPNext Full Suite Ready', message: 'All 12 ERPNext modules (Accounts, Buying, Stock, Manufacturing, Assets, CRM, Support) active.', type: 'info' },
    { id: 2, title: 'Critical Site Snag', message: 'SNG-102: Dali dimming driver buzzing in Villa Al-Manara cove ceiling.', type: 'warning' },
    { id: 3, title: 'Fabrication Milestone', message: 'MFG-WO-2026-005: Chandelier cold bending finished at Al-Quoz forge.', type: 'info' }
  ]);

  // Sync theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ashara_theme', theme);
  }, [theme]);

  // Persist State Changes
  useEffect(() => {
    localStorage.setItem('ashara_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('ashara_ffe', JSON.stringify(ffeItems));
  }, [ffeItems]);

  useEffect(() => {
    localStorage.setItem('ashara_snags', JSON.stringify(snags));
  }, [snags]);

  useEffect(() => {
    localStorage.setItem('ashara_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('ashara_purchase_orders', JSON.stringify(purchaseOrders));
  }, [purchaseOrders]);

  useEffect(() => {
    localStorage.setItem('ashara_stock_items', JSON.stringify(stockItems));
  }, [stockItems]);

  useEffect(() => {
    localStorage.setItem('ashara_stock_entries', JSON.stringify(stockEntries));
  }, [stockEntries]);

  useEffect(() => {
    localStorage.setItem('ashara_stock_ledger', JSON.stringify(stockLedgerEntries));
  }, [stockLedgerEntries]);

  useEffect(() => {
    localStorage.setItem('ashara_gl_entries', JSON.stringify(glEntries));
  }, [glEntries]);

  useEffect(() => {
    localStorage.setItem('ashara_journal_entries', JSON.stringify(journalEntries));
  }, [journalEntries]);

  useEffect(() => {
    localStorage.setItem('ashara_work_orders', JSON.stringify(workOrders));
  }, [workOrders]);

  useEffect(() => {
    localStorage.setItem('ashara_assets', JSON.stringify(assets));
  }, [assets]);

  useEffect(() => {
    localStorage.setItem('ashara_opportunities', JSON.stringify(opportunities));
  }, [opportunities]);

  useEffect(() => {
    localStorage.setItem('ashara_support_issues', JSON.stringify(issues));
  }, [issues]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleDismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Handlers for Projects
  const handleCreateProject = (newProject) => {
    setProjects(prev => [newProject, ...prev]);
  };

  const handleUpdateProject = (updatedProject) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
    setInspectingProject(updatedProject);
  };

  // Handlers for FF&E
  const handleCreateFfe = (newItem) => {
    setFfeItems(prev => [newItem, ...prev]);
  };

  const handleToggleSample = (id) => {
    setFfeItems(prev => prev.map(item => 
      item.id === id ? { ...item, sampleApproved: !item.sampleApproved } : item
    ));
  };

  const handleUpdateFfeStatus = (id, newStatus) => {
    setFfeItems(prev => prev.map(item => 
      item.id === id ? { ...item, poStatus: newStatus } : item
    ));
  };

  // Handlers for Snags
  const handleCreateSnag = (newSnag) => {
    setSnags(prev => [newSnag, ...prev]);
  };

  const handleUpdateSnagStatus = (id, newStatus) => {
    setSnags(prev => prev.map(snag => 
      snag.id === id ? { ...snag, status: newStatus } : snag
    ));
  };

  // Handlers for Invoices
  const handleCreateInvoice = (newInv) => {
    setInvoices(prev => [newInv, ...prev]);

    // Automatically post ERPNext General Ledger Entries
    const newGleDr = {
      id: `GLE-2026-${Math.floor(100 + Math.random() * 900)}`,
      posting_date: newInv.issueDate,
      voucher_type: "Sales Invoice",
      voucher_no: newInv.id,
      account: "1120 - Accounts Receivable (Debtors)",
      party_type: "Customer",
      party: newInv.clientName,
      project: newInv.projectId,
      debit: newInv.totalWithTax || newInv.amount * 1.05,
      credit: 0,
      remarks: `Sales Invoice billing: ${newInv.milestone}`
    };

    const newGleCr = {
      id: `GLE-2026-${Math.floor(100 + Math.random() * 900)}`,
      posting_date: newInv.issueDate,
      voucher_type: "Sales Invoice",
      voucher_no: newInv.id,
      account: "4110 - Architectural & BIM Design Fees",
      party_type: "Customer",
      party: newInv.clientName,
      project: newInv.projectId,
      debit: 0,
      credit: newInv.amount,
      remarks: `Revenue recognition: ${newInv.milestone}`
    };

    setGlEntries(prev => [newGleDr, newGleCr, ...prev]);
  };

  const handleToggleInvoicePaid = (id) => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === id) {
        const nextStatus = inv.status === 'Paid' ? 'Pending' : 'Paid';
        
        if (nextStatus === 'Paid') {
          const payGleDr = {
            id: `GLE-2026-${Math.floor(100 + Math.random() * 900)}`,
            posting_date: new Date().toISOString().split('T')[0],
            voucher_type: "Payment Entry",
            voucher_no: `PAY-${inv.id}`,
            account: "1110 - Cash and Bank Balances (Emirates NBD)",
            party_type: "Customer",
            party: inv.clientName,
            project: inv.projectId,
            debit: inv.totalWithTax || inv.amount * 1.05,
            credit: 0,
            remarks: `Payment settlement received for ${inv.id}`
          };
          const payGleCr = {
            id: `GLE-2026-${Math.floor(100 + Math.random() * 900)}`,
            posting_date: new Date().toISOString().split('T')[0],
            voucher_type: "Payment Entry",
            voucher_no: `PAY-${inv.id}`,
            account: "1120 - Accounts Receivable (Debtors)",
            party_type: "Customer",
            party: inv.clientName,
            project: inv.projectId,
            debit: 0,
            credit: inv.totalWithTax || inv.amount * 1.05,
            remarks: `Accounts receivable cleared for ${inv.id}`
          };
          setGlEntries(gPrev => [payGleDr, payGleCr, ...gPrev]);
        }

        return { ...inv, status: nextStatus };
      }
      return inv;
    }));
  };

  // Handlers for Buying
  const handleCreatePO = (newPO) => {
    setPurchaseOrders(prev => [newPO, ...prev]);
  };

  const handleUpdatePOStatus = (poId, nextStatus) => {
    setPurchaseOrders(prev => prev.map(po => {
      if (po.id === poId) {
        return { ...po, status: nextStatus };
      }
      return po;
    }));
  };

  // Handlers for Stock
  const handleCreateStockEntry = (newEntry) => {
    setStockEntries(prev => [newEntry, ...prev]);

    setStockItems(prev => prev.map(item => {
      const movedItem = newEntry.items.find(i => i.item_code === item.item_code);
      if (movedItem) {
        if (newEntry.purpose === 'Material Transfer') {
          return {
            ...item,
            qty_reserved: item.qty_reserved + movedItem.qty
          };
        } else if (newEntry.purpose === 'Material Issue') {
          return {
            ...item,
            qty_on_hand: Math.max(0, item.qty_on_hand - movedItem.qty)
          };
        } else if (newEntry.purpose === 'Material Receipt') {
          return {
            ...item,
            qty_on_hand: item.qty_on_hand + movedItem.qty
          };
        }
      }
      return item;
    }));

    const stockGle = {
      id: `GLE-2026-${Math.floor(100 + Math.random() * 900)}`,
      posting_date: newEntry.posting_date,
      voucher_type: "Stock Entry",
      voucher_no: newEntry.id,
      account: "1140 - Project Work In Progress (WIP Fit-out)",
      party_type: "Project",
      party: newEntry.projectName,
      project: newEntry.project,
      debit: newEntry.total_outgoing_value,
      credit: 0,
      remarks: `Stock movement (${newEntry.purpose}) to site staging`
    };
    setGlEntries(prev => [stockGle, ...prev]);
  };

  // Handlers for Accounts (Journal Entry)
  const handleCreateJournalEntry = (newJV) => {
    setJournalEntries(prev => [newJV, ...prev]);

    const newGleRows = newJV.accounts.map((accRow, idx) => ({
      id: `GLE-2026-${Math.floor(100 + Math.random() * 900)}-${idx}`,
      posting_date: newJV.posting_date,
      voucher_type: newJV.voucher_type,
      voucher_no: newJV.id,
      account: accRow.account,
      party_type: accRow.party_type,
      party: accRow.party,
      project: "",
      debit: accRow.debit,
      credit: accRow.credit,
      remarks: newJV.user_remark
    }));

    setGlEntries(prev => [...newGleRows, ...prev]);
  };

  // Handlers for Manufacturing (Work Orders)
  const handleCreateWorkOrder = (newWO) => {
    setWorkOrders(prev => [newWO, ...prev]);
  };

  const handleUpdateWorkOrderStatus = (woId, nextStatus) => {
    setWorkOrders(prev => prev.map(wo => {
      if (wo.id === woId) {
        return { ...wo, status: nextStatus, progress: nextStatus === 'Completed' ? 100 : wo.progress };
      }
      return wo;
    }));
  };

  // Handlers for Fixed Assets
  const handleCreateAsset = (newAsset) => {
    setAssets(prev => [newAsset, ...prev]);
  };

  // Handlers for CRM Opportunities
  const handleCreateOpportunity = (newOpp) => {
    setOpportunities(prev => [newOpp, ...prev]);
  };

  const handleUpdateOpportunityStage = (oppId, nextStage) => {
    setOpportunities(prev => prev.map(opp => {
      if (opp.id === oppId) {
        return { ...opp, stage: nextStage };
      }
      return opp;
    }));
  };

  // Handlers for Support Tickets
  const handleCreateIssue = (newIssue) => {
    setIssues(prev => [newIssue, ...prev]);
  };

  const handleUpdateIssueStatus = (issueId, nextStatus) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === issueId) {
        return { ...issue, status: nextStatus };
      }
      return issue;
    }));
  };

  const openSnagsCount = snags.filter(s => s.status !== 'Approved & Closed').length;

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        counts={{
          projects: projects.length,
          ffe: ffeItems.length,
          snags: snags.length,
          openSnags: openSnagsCount,
          invoices: invoices.length,
          buying: purchaseOrders.length,
          stock: stockItems.length,
          manufacturing: workOrders.length,
          assets: assets.length,
          opportunities: opportunities.length,
          issues: issues.length,
          clients: clients.length
        }}
      />

      {/* Main Layout Area */}
      <div className="main-content">
        <Topbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          theme={theme}
          toggleTheme={toggleTheme}
          onOpenNewProject={() => setActiveModal('newProject')}
          onOpenNewFfe={() => setActiveModal('newFfe')}
          onOpenNewSnag={() => setActiveModal('newSnag')}
          onOpenNewInvoice={() => setActiveModal('newInvoice')}
          onOpenNewPO={() => setActiveModal('newPO')}
          onOpenNewStockEntry={() => setActiveModal('newStockEntry')}
          onOpenNewJournalEntry={() => setActiveModal('newJournalEntry')}
          notifications={notifications}
          onDismissNotification={handleDismissNotification}
        />

        {/* View Routing */}
        {currentView === 'dashboard' && (
          <DashboardView
            projects={projects}
            ffeItems={ffeItems}
            snags={snags}
            invoices={invoices}
            onSelectProject={(p) => setInspectingProject(p)}
            setCurrentView={setCurrentView}
            onOpenNewProject={() => setActiveModal('newProject')}
          />
        )}

        {currentView === 'projects' && (
          <ProjectsView
            projects={projects}
            ffeItems={ffeItems}
            snags={snags}
            invoices={invoices}
            onSelectProject={(p) => setInspectingProject(p)}
            onOpenNewProject={() => setActiveModal('newProject')}
          />
        )}

        {currentView === 'ffe' && (
          <FfeScheduleView
            ffeItems={ffeItems}
            onToggleSample={handleToggleSample}
            onUpdateStatus={handleUpdateFfeStatus}
            onOpenNewFfe={() => setActiveModal('newFfe')}
            projects={projects}
          />
        )}

        {currentView === 'snags' && (
          <SiteSnagsView
            snags={snags}
            onUpdateSnagStatus={handleUpdateSnagStatus}
            onOpenNewSnag={() => setActiveModal('newSnag')}
            projects={projects}
          />
        )}

        {currentView === 'financials' && (
          <FinancialsView
            invoices={invoices}
            onTogglePaid={handleToggleInvoicePaid}
            onOpenNewInvoice={() => setActiveModal('newInvoice')}
            onOpenPrintInvoice={(inv) => setPrintingInvoice(inv)}
            projects={projects}
            glEntries={glEntries}
            journalEntries={journalEntries}
            chartOfAccounts={chartOfAccounts}
            onOpenNewJournalEntry={() => setActiveModal('newJournalEntry')}
            onOpenDocTypeInspector={(dt) => setInspectingDocType(dt || 'sales_invoice')}
          />
        )}

        {currentView === 'buying' && (
          <BuyingView
            purchaseOrders={purchaseOrders}
            suppliers={suppliers}
            onOpenNewPO={() => setActiveModal('newPO')}
            onUpdatePOStatus={handleUpdatePOStatus}
            onOpenDocTypeInspector={(dt) => setInspectingDocType(dt || 'purchase_order')}
          />
        )}

        {currentView === 'stock' && (
          <StockView
            stockItems={stockItems}
            warehouses={warehouses}
            stockEntries={stockEntries}
            stockLedgerEntries={stockLedgerEntries}
            onOpenNewStockEntry={() => setActiveModal('newStockEntry')}
            onOpenDocTypeInspector={(dt) => setInspectingDocType(dt || 'item')}
          />
        )}

        {currentView === 'manufacturing' && (
          <ManufacturingView
            workOrders={workOrders}
            boms={boms}
            onOpenNewWorkOrder={() => setActiveModal('newWorkOrder')}
            onUpdateWorkOrderStatus={handleUpdateWorkOrderStatus}
            onOpenDocTypeInspector={(dt) => setInspectingDocType(dt || 'bom')}
          />
        )}

        {currentView === 'assets' && (
          <AssetsView
            assets={assets}
            onOpenNewAsset={() => setActiveModal('newAsset')}
            onOpenDocTypeInspector={(dt) => setInspectingDocType(dt || 'asset')}
          />
        )}

        {currentView === 'crm' && (
          <CrmPipelineView
            opportunities={opportunities}
            onOpenNewOpportunity={() => setActiveModal('newOpportunity')}
            onUpdateOpportunityStage={handleUpdateOpportunityStage}
            onOpenDocTypeInspector={(dt) => setInspectingDocType(dt || 'opportunity')}
          />
        )}

        {currentView === 'support' && (
          <SupportMaintenanceView
            issues={issues}
            subcontractOrders={subcontractOrders}
            onOpenNewIssue={() => setActiveModal('newIssue')}
            onUpdateIssueStatus={handleUpdateIssueStatus}
            onOpenDocTypeInspector={(dt) => setInspectingDocType(dt || 'issue')}
          />
        )}

        {currentView === 'erpnext_desk' && (
          <ErpnextDeskView
            counts={{
              projects: projects.length,
              ffe: ffeItems.length,
              snags: snags.length,
              invoices: invoices.length,
              buying: purchaseOrders.length,
              stock: stockItems.length,
              manufacturing: workOrders.length,
              assets: assets.length,
              opportunities: opportunities.length,
              issues: issues.length
            }}
            setCurrentView={setCurrentView}
            onOpenDocTypeInspector={(dt) => setInspectingDocType(dt || 'sales_invoice')}
          />
        )}

        {currentView === 'clients' && (
          <ClientsView
            clients={clients}
            projects={projects}
            onOpenNewClient={() => alert('New client onboarding form: enter client credentials in system.')}
          />
        )}

        {currentView === 'moodboards' && (
          <MoodboardsView />
        )}

        {currentView === 'materials' && (
          <MaterialsView />
        )}

        {currentView === 'team' && (
          <TeamView />
        )}
      </div>

      {/* Modals */}
      {inspectingProject && (
        <ProjectDetailModal
          project={inspectingProject}
          onClose={() => setInspectingProject(null)}
          ffeItems={ffeItems}
          snags={snags}
          invoices={invoices}
          onUpdateProject={handleUpdateProject}
        />
      )}

      {inspectingDocType && (
        <DocTypeInspectorModal
          initialDocType={inspectingDocType}
          onClose={() => setInspectingDocType(null)}
        />
      )}

      {activeModal === 'newProject' && (
        <NewProjectModal
          onClose={() => setActiveModal(null)}
          onSubmit={handleCreateProject}
          clients={clients}
        />
      )}

      {activeModal === 'newFfe' && (
        <NewFfeModal
          onClose={() => setActiveModal(null)}
          onSubmit={handleCreateFfe}
          projects={projects}
        />
      )}

      {activeModal === 'newSnag' && (
        <NewSnagModal
          onClose={() => setActiveModal(null)}
          onSubmit={handleCreateSnag}
          projects={projects}
        />
      )}

      {activeModal === 'newInvoice' && (
        <NewInvoiceModal
          onClose={() => setActiveModal(null)}
          onSubmit={handleCreateInvoice}
          projects={projects}
        />
      )}

      {activeModal === 'newPO' && (
        <NewPurchaseOrderModal
          onClose={() => setActiveModal(null)}
          onSubmit={handleCreatePO}
          suppliers={suppliers}
          projects={projects}
          warehouses={warehouses}
        />
      )}

      {activeModal === 'newStockEntry' && (
        <NewStockEntryModal
          onClose={() => setActiveModal(null)}
          onSubmit={handleCreateStockEntry}
          stockItems={stockItems}
          warehouses={warehouses}
          projects={projects}
        />
      )}

      {activeModal === 'newJournalEntry' && (
        <NewJournalEntryModal
          onClose={() => setActiveModal(null)}
          onSubmit={handleCreateJournalEntry}
          accountsList={chartOfAccounts}
          clients={clients}
          suppliers={suppliers}
        />
      )}

      {activeModal === 'newWorkOrder' && (
        <NewWorkOrderModal
          onClose={() => setActiveModal(null)}
          onSubmit={handleCreateWorkOrder}
          boms={boms}
          projects={projects}
          warehouses={warehouses}
        />
      )}

      {activeModal === 'newAsset' && (
        <NewAssetModal
          onClose={() => setActiveModal(null)}
          onSubmit={handleCreateAsset}
        />
      )}

      {activeModal === 'newOpportunity' && (
        <NewOpportunityModal
          onClose={() => setActiveModal(null)}
          onSubmit={handleCreateOpportunity}
        />
      )}

      {activeModal === 'newIssue' && (
        <NewSupportIssueModal
          onClose={() => setActiveModal(null)}
          onSubmit={handleCreateIssue}
          clients={clients}
          projects={projects}
        />
      )}

      {printingInvoice && (
        <PrintableInvoiceModal
          invoice={printingInvoice}
          onClose={() => setPrintingInvoice(null)}
        />
      )}
    </div>
  );
}
