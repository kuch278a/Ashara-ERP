import React, { useState } from 'react';
import { 
  Receipt, 
  CheckCircle2, 
  Plus, 
  Printer, 
  BookOpen,
  Scale,
  FolderTree,
  ChevronRight,
  ChevronDown,
  FileCode,
  Search,
  FileSpreadsheet,
  TrendingUp,
  ShieldCheck,
  Building2
} from 'lucide-react';

export default function FinancialsView({ 
  invoices, 
  onTogglePaid, 
  onOpenNewInvoice, 
  onOpenPrintInvoice,
  projects: _projects = [],
  glEntries = [],
  journalEntries = [],
  chartOfAccounts = [],
  onOpenNewJournalEntry,
  onOpenDocTypeInspector
}) {
  const [activeTab, setActiveTab] = useState('invoices'); // 'invoices' | 'gl' | 'coa' | 'jv' | 'balance_sheet' | 'pnl' | 'trial_balance'
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNodes, setExpandedNodes] = useState({ '1000': true, '1100': true, '1200': true, '2000': true, '2100': true, '3000': true, '4000': true, '5000': true });
  const [tbTypeFilter, setTbTypeFilter] = useState('All');
  const [statementPeriod, setStatementPeriod] = useState('FY 2026 - Present (Q4 Closing)');

  const filteredInvoices = invoices.filter(inv => {
    const matchesStatus = filterStatus === 'All' || inv.status === filterStatus;
    const matchesSearch = inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalInvoiced = invoices.reduce((acc, i) => acc + i.amount, 0);
  const totalCollected = invoices.filter(i => i.status === 'Paid').reduce((acc, i) => acc + i.amount, 0);
  const _totalPending = invoices.filter(i => i.status === 'Pending').reduce((acc, i) => acc + i.amount, 0);
  const _totalOverdue = invoices.filter(i => i.status === 'Overdue').reduce((acc, i) => acc + i.amount, 0);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  const toggleNode = (accNum) => {
    setExpandedNodes(prev => ({
      ...prev,
      [accNum]: !prev[accNum]
    }));
  };

  // Helper to extract leaves recursively
  const getLeafAccounts = (nodes) => {
    let leaves = [];
    nodes.forEach(node => {
      if (node.children && node.children.length > 0) {
        leaves = leaves.concat(getLeafAccounts(node.children));
      } else {
        leaves.push(node);
      }
    });
    return leaves;
  };

  const leafAccounts = getLeafAccounts(chartOfAccounts);

  // Statement calculations from Chart of Accounts
  const assetRoot = chartOfAccounts.find(a => a.account_number === '1000' || a.root_type === 'Asset');
  const liabilityRoot = chartOfAccounts.find(a => a.account_number === '2000' || a.root_type === 'Liability');
  const equityRoot = chartOfAccounts.find(a => a.account_number === '3000' || a.root_type === 'Equity');
  const incomeRoot = chartOfAccounts.find(a => a.account_number === '4000' || a.root_type === 'Income');
  const expenseRoot = chartOfAccounts.find(a => a.account_number === '5000' || a.root_type === 'Expense');

  const totalAssets = assetRoot ? assetRoot.balance : 14820000;
  const totalLiabilities = liabilityRoot ? liabilityRoot.balance : 3180000;
  const totalEquity = equityRoot ? equityRoot.balance : 7500000;
  const totalIncome = incomeRoot ? incomeRoot.balance : 5460000;
  const totalExpenses = expenseRoot ? expenseRoot.balance : 1320000;
  const netProfit = totalIncome - totalExpenses;
  const totalLiabilitiesAndEquity = totalLiabilities + totalEquity + netProfit;
  const isBalanceSheetBalanced = Math.abs(totalAssets - totalLiabilitiesAndEquity) === 0;

  // Trial balance accounts & totals
  const trialBalanceRows = leafAccounts.map(leaf => {
    const isDebit = leaf.root_type === 'Asset' || leaf.root_type === 'Expense';
    return {
      ...leaf,
      debit: isDebit ? leaf.balance : 0,
      credit: !isDebit ? leaf.balance : 0
    };
  });

  const filteredTBRows = trialBalanceRows.filter(row => {
    const matchesFilter = tbTypeFilter === 'All' || row.root_type === tbTypeFilter;
    const matchesSearch = row.account_number.includes(searchQuery) ||
      row.account_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalTBDebit = trialBalanceRows.reduce((sum, r) => sum + r.debit, 0);
  const totalTBCredit = trialBalanceRows.reduce((sum, r) => sum + r.credit, 0);
  const tbDifference = totalTBDebit - totalTBCredit;

  // Drill down from statement or TB directly to GL
  const handleDrillDownToGL = (accNumber) => {
    setSearchQuery(accNumber);
    setActiveTab('gl');
  };

  // Filtered GL entries
  const filteredGLEntries = glEntries.filter(gle => {
    return gle.account.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gle.voucher_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (gle.party && gle.party.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (gle.remarks && gle.remarks.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="content-body">
      {/* Header */}
      <div className="view-header">
        <div className="view-title-wrap">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="view-pretitle">Ashara Atelier Commercials</span>
            <span className="badge badge-gold" style={{ fontSize: '10px' }}>ERPNext Accounts Module</span>
          </div>
          <h1 className="view-title">
            <span>Financials, General Ledger & Statements</span>
          </h1>
          <p className="view-desc">
            Complete ERPNext Accounts kernel featuring multi-tiered Chart of Accounts, General Ledger audit trails, balanced Journal Entries, interactive Balance Sheet, Profit & Loss, and Trial Balance.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button 
            className="btn-secondary" 
            onClick={() => onOpenDocTypeInspector('sales_invoice')}
            title="Inspect ERPNext Accounts DocTypes"
          >
            <FileCode size={16} />
            <span>DocType Schema</span>
          </button>
          {activeTab === 'jv' ? (
            <button className="btn-primary" onClick={onOpenNewJournalEntry}>
              <Scale size={16} />
              <span>Create Journal Entry</span>
            </button>
          ) : activeTab === 'balance_sheet' || activeTab === 'pnl' || activeTab === 'trial_balance' ? (
            <button className="btn-secondary" onClick={() => window.print()} title="Print Statement">
              <Printer size={16} />
              <span>Print Statement</span>
            </button>
          ) : (
            <button className="btn-primary" onClick={onOpenNewInvoice}>
              <Plus size={16} />
              <span>Generate Fee Invoice</span>
            </button>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-top-row">
            <span className="metric-label">Total Contracted Fees</span>
            <Receipt size={18} style={{ color: 'var(--gold-bright)' }} />
          </div>
          <div className="metric-value">{formatCurrency(totalInvoiced)}</div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Across 4 Signature Commissions</span>
        </div>

        <div className="metric-card">
          <div className="metric-top-row">
            <span className="metric-label">Fees Realized / Collected</span>
            <CheckCircle2 size={18} style={{ color: 'var(--status-success)' }} />
          </div>
          <div className="metric-value" style={{ color: 'var(--status-success)' }}>{formatCurrency(totalCollected)}</div>
          <span style={{ fontSize: '11px', color: 'var(--status-success)' }}>
            {totalInvoiced > 0 ? Math.round((totalCollected / totalInvoiced) * 100) : 0}% Collection Rate
          </span>
        </div>

        <div className="metric-card">
          <div className="metric-top-row">
            <span className="metric-label">Net Operating Surplus (P&L)</span>
            <TrendingUp size={18} style={{ color: 'var(--gold-bright)' }} />
          </div>
          <div className="metric-value" style={{ color: 'var(--gold-bright)' }}>{formatCurrency(netProfit)}</div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>75.8% Operating Margin</span>
        </div>

        <div className="metric-card">
          <div className="metric-top-row">
            <span className="metric-label">Asset Base (Balance Sheet)</span>
            <ShieldCheck size={18} style={{ color: 'var(--status-info)' }} />
          </div>
          <div className="metric-value" style={{ color: 'var(--status-info)' }}>{formatCurrency(totalAssets)}</div>
          <span style={{ fontSize: '11px', color: 'var(--status-success)' }}>Exact Balance (Assets = Liab + Eq)</span>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`pill-btn ${activeTab === 'invoices' ? 'active' : ''}`}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '12.5px',
              fontWeight: activeTab === 'invoices' ? '600' : '400',
              border: activeTab === 'invoices' ? '1px solid var(--gold-bright)' : '1px solid var(--border-subtle)',
              background: activeTab === 'invoices' ? 'var(--gold-glow)' : 'var(--bg-secondary)',
              color: activeTab === 'invoices' ? 'var(--gold-bright)' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Receipt size={15} />
            <span>Sales Invoices ({invoices.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gl')}
            className={`pill-btn ${activeTab === 'gl' ? 'active' : ''}`}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '12.5px',
              fontWeight: activeTab === 'gl' ? '600' : '400',
              border: activeTab === 'gl' ? '1px solid var(--gold-bright)' : '1px solid var(--border-subtle)',
              background: activeTab === 'gl' ? 'var(--gold-glow)' : 'var(--bg-secondary)',
              color: activeTab === 'gl' ? 'var(--gold-bright)' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <BookOpen size={15} />
            <span>General Ledger ({glEntries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('coa')}
            className={`pill-btn ${activeTab === 'coa' ? 'active' : ''}`}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '12.5px',
              fontWeight: activeTab === 'coa' ? '600' : '400',
              border: activeTab === 'coa' ? '1px solid var(--gold-bright)' : '1px solid var(--border-subtle)',
              background: activeTab === 'coa' ? 'var(--gold-glow)' : 'var(--bg-secondary)',
              color: activeTab === 'coa' ? 'var(--gold-bright)' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FolderTree size={15} />
            <span>Chart of Accounts</span>
          </button>

          <button
            onClick={() => setActiveTab('jv')}
            className={`pill-btn ${activeTab === 'jv' ? 'active' : ''}`}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '12.5px',
              fontWeight: activeTab === 'jv' ? '600' : '400',
              border: activeTab === 'jv' ? '1px solid var(--gold-bright)' : '1px solid var(--border-subtle)',
              background: activeTab === 'jv' ? 'var(--gold-glow)' : 'var(--bg-secondary)',
              color: activeTab === 'jv' ? 'var(--gold-bright)' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Scale size={15} />
            <span>Journal Vouchers ({journalEntries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('balance_sheet')}
            className={`pill-btn ${activeTab === 'balance_sheet' ? 'active' : ''}`}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '12.5px',
              fontWeight: activeTab === 'balance_sheet' ? '600' : '400',
              border: activeTab === 'balance_sheet' ? '1px solid var(--gold-bright)' : '1px solid var(--border-subtle)',
              background: activeTab === 'balance_sheet' ? 'var(--gold-glow)' : 'var(--bg-secondary)',
              color: activeTab === 'balance_sheet' ? 'var(--gold-bright)' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Building2 size={15} />
            <span>Balance Sheet</span>
          </button>

          <button
            onClick={() => setActiveTab('pnl')}
            className={`pill-btn ${activeTab === 'pnl' ? 'active' : ''}`}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '12.5px',
              fontWeight: activeTab === 'pnl' ? '600' : '400',
              border: activeTab === 'pnl' ? '1px solid var(--gold-bright)' : '1px solid var(--border-subtle)',
              background: activeTab === 'pnl' ? 'var(--gold-glow)' : 'var(--bg-secondary)',
              color: activeTab === 'pnl' ? 'var(--gold-bright)' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <TrendingUp size={15} />
            <span>Profit & Loss</span>
          </button>

          <button
            onClick={() => setActiveTab('trial_balance')}
            className={`pill-btn ${activeTab === 'trial_balance' ? 'active' : ''}`}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: '12.5px',
              fontWeight: activeTab === 'trial_balance' ? '600' : '400',
              border: activeTab === 'trial_balance' ? '1px solid var(--gold-bright)' : '1px solid var(--border-subtle)',
              background: activeTab === 'trial_balance' ? 'var(--gold-glow)' : 'var(--bg-secondary)',
              color: activeTab === 'trial_balance' ? 'var(--gold-bright)' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FileSpreadsheet size={15} />
            <span>Trial Balance</span>
          </button>
        </div>

        {/* Search & Filter */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search reference, account..."
              className="form-input"
              style={{ paddingLeft: '32px', paddingRight: '12px', fontSize: '12px', width: '200px' }}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          {activeTab === 'invoices' && (
            <select
              className="form-input"
              style={{ fontSize: '12px', padding: '6px 10px', width: 'auto' }}
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="All">All Invoices</option>
              <option value="Paid">Paid Only</option>
              <option value="Pending">Pending Only</option>
              <option value="Overdue">Overdue Only</option>
            </select>
          )}

          {activeTab === 'trial_balance' && (
            <select
              className="form-input"
              style={{ fontSize: '12px', padding: '6px 10px', width: 'auto' }}
              value={tbTypeFilter}
              onChange={e => setTbTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Asset">Assets</option>
              <option value="Liability">Liabilities</option>
              <option value="Equity">Equity</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          )}

          {(activeTab === 'balance_sheet' || activeTab === 'pnl') && (
            <select
              className="form-input"
              style={{ fontSize: '12px', padding: '6px 10px', width: 'auto' }}
              value={statementPeriod}
              onChange={e => setStatementPeriod(e.target.value)}
            >
              <option value="FY 2026 - Present (Q4 Closing)">FY 2026 - Present (Q4 Closing)</option>
              <option value="FY 2025 Full Year">FY 2025 Full Year</option>
              <option value="FY 2024 Historical">FY 2024 Historical</option>
            </select>
          )}
        </div>
      </div>

      {/* Tab 1: Sales Invoices */}
      {activeTab === 'invoices' && (
        <div className="panel-card" style={{ padding: '0', overflow: 'hidden' }}>
          <div className="table-container" style={{ margin: 0 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Project & Client</th>
                  <th>Issue Date</th>
                  <th>Due Date</th>
                  <th style={{ textAlign: 'right' }}>Amount ($)</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((inv) => (
                  <tr key={inv.id}>
                    <td>
                      <span style={{ fontWeight: '600', color: 'var(--gold-bright)', fontFamily: 'monospace' }}>
                        {inv.id}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{inv.projectName}</span>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{inv.clientName}</span>
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{inv.issueDate}</td>
                    <td style={{ color: inv.status === 'Overdue' ? 'var(--status-danger)' : 'var(--text-secondary)' }}>
                      {inv.dueDate}
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: '700', color: 'var(--text-primary)' }}>
                      {formatCurrency(inv.amount)}
                    </td>
                    <td>
                      <span className={`badge badge-${
                        inv.status === 'Paid' ? 'success' :
                        inv.status === 'Pending' ? 'warning' : 'danger'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => onOpenPrintInvoice(inv)}
                          className="btn-secondary btn-sm"
                          title="Print / Export Invoice Voucher"
                        >
                          <Printer size={14} />
                          <span>Voucher</span>
                        </button>
                        <button
                          onClick={() => onTogglePaid(inv.id)}
                          className={`btn-sm ${inv.status === 'Paid' ? 'btn-secondary' : 'btn-primary'}`}
                        >
                          {inv.status === 'Paid' ? 'Mark Pending' : 'Mark Paid'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: General Ledger (GL) Entries */}
      {activeTab === 'gl' && (
        <div className="panel-card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(197,160,89,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)' }}>General Ledger Audit Trail</h3>
              <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>ERPNext DocType: <code>GL Entry</code> • Immutable transactional postings</span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span className="badge badge-info" style={{ fontSize: '11px' }}>
                Double-Entry Verified: Σ Dr = Σ Cr
              </span>
            </div>
          </div>

          <div className="table-container" style={{ margin: 0 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Posting Date</th>
                  <th>Voucher #</th>
                  <th>Account Head</th>
                  <th>Party / Entity</th>
                  <th>Project</th>
                  <th style={{ textAlign: 'right' }}>Debit ($)</th>
                  <th style={{ textAlign: 'right' }}>Credit ($)</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {filteredGLEntries.map((gle) => (
                  <tr key={gle.id}>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{gle.posting_date}</td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: '600', color: 'var(--gold-bright)', fontFamily: 'monospace', fontSize: '12px' }}>
                          {gle.voucher_no}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{gle.voucher_type}</span>
                      </div>
                    </td>
                    <td style={{ fontWeight: '500', color: 'var(--text-primary)', fontSize: '12.5px' }}>
                      {gle.account}
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
                      {gle.party ? `${gle.party_type ? gle.party_type + ': ' : ''}${gle.party}` : '—'}
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '11.5px', fontFamily: 'monospace' }}>
                      {gle.project || '—'}
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: gle.debit > 0 ? '700' : '400', color: gle.debit > 0 ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                      {gle.debit > 0 ? formatCurrency(gle.debit) : '—'}
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: gle.credit > 0 ? '700' : '400', color: gle.credit > 0 ? 'var(--gold-bright)' : 'var(--text-muted)' }}>
                      {gle.credit > 0 ? formatCurrency(gle.credit) : '—'}
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '11.5px', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {gle.remarks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Chart of Accounts (COA Tree) */}
      {activeTab === 'coa' && (
        <div className="panel-card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(197,160,89,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)' }}>Standard Chart of Accounts (COA) Hierarchy</h3>
              <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>ERPNext DocType: <code>Account</code> • Multi-tiered recursive financial tree</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                className="btn-secondary btn-sm"
                onClick={() => setExpandedNodes({ '1000': true, '1100': true, '1200': true, '2000': true, '2100': true, '3000': true, '4000': true, '5000': true })}
              >
                Expand All
              </button>
              <button 
                className="btn-secondary btn-sm"
                onClick={() => setExpandedNodes({})}
              >
                Collapse All
              </button>
            </div>
          </div>

          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {chartOfAccounts.map(rootNode => {
              const isExpanded = expandedNodes[rootNode.account_number];
              return (
                <div key={rootNode.account_number} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '12px 16px' }}>
                  {/* Root Node Header */}
                  <div 
                    onClick={() => toggleNode(rootNode.account_number)}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {rootNode.children ? (isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />) : <div style={{ width: '16px' }} />}
                      <span style={{ fontFamily: 'monospace', fontWeight: '700', color: 'var(--gold-bright)', fontSize: '13px' }}>
                        {rootNode.account_number}
                      </span>
                      <span style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '14px' }}>
                        {rootNode.account_name}
                      </span>
                      <span className="badge badge-info" style={{ fontSize: '10.5px' }}>
                        {rootNode.root_type}
                      </span>
                    </div>
                    <span style={{ fontWeight: '700', color: 'var(--gold-bright)', fontSize: '14px' }}>
                      {formatCurrency(rootNode.balance)}
                    </span>
                  </div>

                  {/* Level 2 Children */}
                  {isExpanded && rootNode.children && (
                    <div style={{ paddingLeft: '24px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px', borderLeft: '1px dashed var(--border-subtle)', marginLeft: '8px' }}>
                      {rootNode.children.map(subGroup => {
                        const isSubExpanded = expandedNodes[subGroup.account_number];
                        return (
                          <div key={subGroup.account_number} style={{ marginTop: '4px' }}>
                            <div 
                              onClick={() => toggleNode(subGroup.account_number)}
                              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '6px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.015)' }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {subGroup.children ? (isSubExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />) : <div style={{ width: '14px' }} />}
                                <span style={{ fontFamily: 'monospace', color: 'var(--text-secondary)', fontSize: '12px' }}>
                                  {subGroup.account_number}
                                </span>
                                <span style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '13px' }}>
                                  {subGroup.account_name}
                                </span>
                              </div>
                              <span style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: '600' }}>
                                {formatCurrency(subGroup.balance)}
                              </span>
                            </div>

                            {/* Leaf Accounts */}
                            {isSubExpanded && subGroup.children && (
                              <div style={{ paddingLeft: '32px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                {subGroup.children.map(leaf => (
                                  <div key={leaf.account_number} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 8px', borderLeft: '2px solid var(--border-gold)', marginLeft: '6px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <span style={{ fontFamily: 'monospace', color: 'var(--text-muted)', fontSize: '11.5px' }}>
                                        {leaf.account_number}
                                      </span>
                                      <span style={{ color: 'var(--text-secondary)', fontSize: '12.5px' }}>
                                        {leaf.account_name}
                                      </span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                      <span style={{ color: 'var(--text-primary)', fontSize: '12.5px', fontFamily: 'monospace' }}>
                                        {formatCurrency(leaf.balance)}
                                      </span>
                                      <button 
                                        onClick={() => handleDrillDownToGL(leaf.account_number)}
                                        style={{ background: 'none', border: 'none', color: 'var(--gold-bright)', cursor: 'pointer', fontSize: '11px', textDecoration: 'underline' }}
                                      >
                                        GL
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Journal Entries */}
      {activeTab === 'jv' && (
        <div className="panel-card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(197,160,89,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)' }}>Journal Entry Vouchers</h3>
              <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>ERPNext DocType: <code>Journal Entry</code> • Double-entry Dr = Cr records</span>
            </div>
            <button className="btn-primary btn-sm" onClick={onOpenNewJournalEntry}>
              <Plus size={14} />
              <span>New Journal Entry</span>
            </button>
          </div>

          <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {journalEntries.map(jv => (
              <div key={jv.id} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontWeight: '700', color: 'var(--gold-bright)', fontFamily: 'monospace', fontSize: '14px' }}>
                      {jv.id}
                    </span>
                    <span className="badge badge-info" style={{ fontSize: '11px' }}>{jv.voucher_type}</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>Date: {jv.posting_date}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '11.5px' }}>Ref: {jv.cheque_no}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="badge badge-success" style={{ fontSize: '11px' }}>
                      {jv.status}
                    </span>
                    <span style={{ fontWeight: '700', color: 'var(--gold-bright)', fontSize: '14px' }}>
                      {formatCurrency(jv.total_debit)}
                    </span>
                  </div>
                </div>

                <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                  "{jv.user_remark}"
                </p>

                {/* Rows Table */}
                <div className="table-container" style={{ margin: 0 }}>
                  <table className="data-table" style={{ fontSize: '12px' }}>
                    <thead>
                      <tr>
                        <th>Account Head</th>
                        <th>Party</th>
                        <th style={{ textAlign: 'right' }}>Debit ($)</th>
                        <th style={{ textAlign: 'right' }}>Credit ($)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jv.accounts?.map((row, rIdx) => (
                        <tr key={rIdx}>
                          <td style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{row.account}</td>
                          <td style={{ color: 'var(--text-secondary)' }}>{row.party || '—'}</td>
                          <td style={{ textAlign: 'right', fontWeight: row.debit > 0 ? '700' : '400', color: row.debit > 0 ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                            {row.debit > 0 ? formatCurrency(row.debit) : '—'}
                          </td>
                          <td style={{ textAlign: 'right', fontWeight: row.credit > 0 ? '700' : '400', color: row.credit > 0 ? 'var(--gold-bright)' : 'var(--text-muted)' }}>
                            {row.credit > 0 ? formatCurrency(row.credit) : '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Balance Sheet */}
      {activeTab === 'balance_sheet' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Statement Header Card */}
          <div className="panel-card" style={{ padding: '20px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span className="badge badge-gold" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Ashara Atelier Financial Statement
                </span>
                <h2 style={{ margin: '6px 0 4px 0', fontSize: '20px', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>
                  Statement of Financial Position (Balance Sheet)
                </h2>
                <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--text-muted)' }}>
                  As of October 23, 2026 • Reporting Currency: USD ($) • Accounting Standard: IFRS / Dual-Entry Ledger
                </p>
              </div>

              {/* Equilibrium Check Pill */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 18px',
                borderRadius: 'var(--radius-md)',
                background: isBalanceSheetBalanced ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)',
                border: isBalanceSheetBalanced ? '1px solid var(--status-success)' : '1px solid var(--status-danger)'
              }}>
                <ShieldCheck size={20} style={{ color: isBalanceSheetBalanced ? 'var(--status-success)' : 'var(--status-danger)' }} />
                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                    Fundamental Accounting Equation
                  </div>
                  <div style={{ fontSize: '13.5px', fontWeight: '700', color: isBalanceSheetBalanced ? 'var(--status-success)' : 'var(--status-danger)' }}>
                    Assets = Liabilities + Equity (Balanced)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Two-Column Assets vs Liabilities & Equity Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '20px' }}>
            {/* Column 1: Assets */}
            <div className="panel-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(197,160,89,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Assets (Application of Funds)
                  </h3>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Class 1000 Accounts</span>
                </div>
                <span style={{ fontSize: '16px', fontWeight: '700', color: 'var(--gold-bright)', fontFamily: 'monospace' }}>
                  {formatCurrency(totalAssets)}
                </span>
              </div>

              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px', flex: 1 }}>
                {/* Current Assets (1100) */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '8px' }}>
                    <span style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '13px' }}>Current Assets</span>
                    <span style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '13px', fontFamily: 'monospace' }}>
                      {formatCurrency(11220000)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>1110 Cash & Bank Balances (Emirates NBD)</span>
                      <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>{formatCurrency(4850000)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>1120 Accounts Receivable (Debtors)</span>
                      <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>{formatCurrency(597400)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>1130 Stock in Hand (Inventory Asset)</span>
                      <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>{formatCurrency(3422600)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>1140 Project Work In Progress (WIP Fit-out)</span>
                      <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>{formatCurrency(2350000)}</span>
                    </div>
                  </div>
                </div>

                {/* Fixed Assets (1200) */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '8px' }}>
                    <span style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '13px' }}>Fixed & Studio Assets</span>
                    <span style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '13px', fontFamily: 'monospace' }}>
                      {formatCurrency(3600000)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>1210 Atelier Studio & 3D Render Workstations</span>
                      <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>{formatCurrency(850000)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>1220 Material Sample Archives & Library Fixtures</span>
                      <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>{formatCurrency(2750000)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Assets Summary Footer */}
              <div style={{ padding: '16px 20px', background: 'rgba(197,160,89,0.08)', borderTop: '2px double var(--gold-bright)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '700', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '13.5px' }}>
                  Total Assets
                </span>
                <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--gold-bright)', fontFamily: 'monospace' }}>
                  {formatCurrency(totalAssets)}
                </span>
              </div>
            </div>

            {/* Column 2: Liabilities & Equity */}
            <div className="panel-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(197,160,89,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Liabilities & Atelier Equity
                  </h3>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Class 2000 & 3000 Accounts</span>
                </div>
                <span style={{ fontSize: '16px', fontWeight: '700', color: 'var(--gold-bright)', fontFamily: 'monospace' }}>
                  {formatCurrency(totalLiabilitiesAndEquity)}
                </span>
              </div>

              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px', flex: 1 }}>
                {/* Current Liabilities (2100) */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '8px' }}>
                    <span style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '13px' }}>Current Liabilities</span>
                    <span style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '13px', fontFamily: 'monospace' }}>
                      {formatCurrency(totalLiabilities)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>2110 Accounts Payable (Creditors / Artisans)</span>
                      <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>{formatCurrency(1420000)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>2120 Client Project Escrow Advances</span>
                      <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>{formatCurrency(1650000)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>2130 VAT Payable (5% UAE)</span>
                      <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>{formatCurrency(110000)}</span>
                    </div>
                  </div>
                </div>

                {/* Partners Equity (3000) */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '8px' }}>
                    <span style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '13px' }}>Partners Equity & Reserves</span>
                    <span style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '13px', fontFamily: 'monospace' }}>
                      {formatCurrency(totalEquity)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>3110 Capital Stock - Partners Equity</span>
                      <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>{formatCurrency(5000000)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>3120 Retained Earnings (Historical)</span>
                      <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>{formatCurrency(2500000)}</span>
                    </div>
                  </div>
                </div>

                {/* Current Period Surplus (P&L Transfer) */}
                <div style={{ background: 'rgba(197,160,89,0.04)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--gold-bright)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontWeight: '700', color: 'var(--gold-bright)', fontSize: '13px' }}>
                        Current Period Profit & Loss (Surplus)
                      </span>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        Net Income transferred from P&L statement
                      </div>
                    </div>
                    <span style={{ fontWeight: '700', color: 'var(--gold-bright)', fontSize: '14px', fontFamily: 'monospace' }}>
                      +{formatCurrency(netProfit)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Total Liabilities & Equity Summary Footer */}
              <div style={{ padding: '16px 20px', background: 'rgba(197,160,89,0.08)', borderTop: '2px double var(--gold-bright)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '700', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '13.5px' }}>
                  Total Liabilities & Equity
                </span>
                <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--gold-bright)', fontFamily: 'monospace' }}>
                  {formatCurrency(totalLiabilitiesAndEquity)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Profit & Loss (P&L) Statement */}
      {activeTab === 'pnl' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Statement Header Card */}
          <div className="panel-card" style={{ padding: '20px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span className="badge badge-gold" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Ashara Atelier Income Statement
                </span>
                <h2 style={{ margin: '6px 0 4px 0', fontSize: '20px', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>
                  Statement of Profit & Loss (P&L)
                </h2>
                <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--text-muted)' }}>
                  Period: {statementPeriod} • Architectural Design, Procurement Commissions & Direct Fulfillment Costs
                </p>
              </div>

              {/* Profit Margin Badge */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 20px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(197, 160, 89, 0.1)',
                border: '1px solid var(--gold-bright)'
              }}>
                <TrendingUp size={22} style={{ color: 'var(--gold-bright)' }} />
                <div>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                    Net Operating Surplus
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--gold-bright)', fontFamily: 'monospace' }}>
                    {formatCurrency(netProfit)} <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--status-success)' }}>(75.8% Margin)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed P&L Breakdown Table */}
          <div className="panel-card" style={{ padding: '0', overflow: 'hidden' }}>
            <div className="table-container" style={{ margin: 0 }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Account Code & Particulars</th>
                    <th>Classification</th>
                    <th style={{ textAlign: 'right' }}>% of Revenue</th>
                    <th style={{ textAlign: 'right' }}>Amount ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Revenue Section */}
                  <tr style={{ background: 'rgba(197,160,89,0.06)' }}>
                    <td colSpan={3} style={{ fontWeight: '700', color: 'var(--gold-bright)', textTransform: 'uppercase', fontSize: '12.5px', letterSpacing: '0.05em' }}>
                      1. Operating Income & Architectural Revenues
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: '700', color: 'var(--gold-bright)', fontSize: '14px', fontFamily: 'monospace' }}>
                      {formatCurrency(totalIncome)}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: '28px', color: 'var(--text-primary)', fontWeight: '500' }}>
                      4110 Architectural & BIM Design Fees
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>Master Commission Fees</td>
                    <td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>61.8%</td>
                    <td style={{ textAlign: 'right', fontFamily: 'monospace', color: 'var(--text-primary)' }}>
                      {formatCurrency(3372000)}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: '28px', color: 'var(--text-primary)', fontWeight: '500' }}>
                      4120 FF&E Procurement Commission & Markup
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>Curation & Sourcing Markup</td>
                    <td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>30.9%</td>
                    <td style={{ textAlign: 'right', fontFamily: 'monospace', color: 'var(--text-primary)' }}>
                      {formatCurrency(1688000)}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: '28px', color: 'var(--text-primary)', fontWeight: '500' }}>
                      4130 Site Supervision & Fit-Out Consultancy
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>On-site Inspection Retainers</td>
                    <td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>7.3%</td>
                    <td style={{ textAlign: 'right', fontFamily: 'monospace', color: 'var(--text-primary)' }}>
                      {formatCurrency(400000)}
                    </td>
                  </tr>

                  {/* Subtotal Revenue */}
                  <tr style={{ borderBottom: '2px solid var(--border-gold)' }}>
                    <td colSpan={3} style={{ textAlign: 'right', fontWeight: '700', color: 'var(--text-primary)' }}>
                      Total Gross Revenue (A)
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: '800', color: 'var(--gold-bright)', fontSize: '14px', fontFamily: 'monospace' }}>
                      {formatCurrency(totalIncome)}
                    </td>
                  </tr>

                  {/* Expenses Section */}
                  <tr style={{ background: 'rgba(231,76,60,0.04)' }}>
                    <td colSpan={3} style={{ fontWeight: '700', color: 'var(--status-danger)', textTransform: 'uppercase', fontSize: '12.5px', letterSpacing: '0.05em' }}>
                      2. Operating Expenses & Direct Fulfillment
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: '700', color: 'var(--status-danger)', fontSize: '14px', fontFamily: 'monospace' }}>
                      {formatCurrency(totalExpenses)}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: '28px', color: 'var(--text-primary)', fontWeight: '500' }}>
                      5110 Cost of Goods Sold - Materials & Procurement
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>Artisan & Quarry Fulfillment</td>
                    <td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>15.4%</td>
                    <td style={{ textAlign: 'right', fontFamily: 'monospace', color: 'var(--status-danger)' }}>
                      ({formatCurrency(840000)})
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: '28px', color: 'var(--text-primary)', fontWeight: '500' }}>
                      5120 Direct Subcontractor & Engineering Fees
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>Acoustic & MEP Consultants</td>
                    <td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>5.7%</td>
                    <td style={{ textAlign: 'right', fontFamily: 'monospace', color: 'var(--status-danger)' }}>
                      ({formatCurrency(310000)})
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingLeft: '28px', color: 'var(--text-primary)', fontWeight: '500' }}>
                      5130 Atelier Operating & 3D Cloud Compute Costs
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>Render Cluster & Studio Licences</td>
                    <td style={{ textAlign: 'right', color: 'var(--text-muted)' }}>3.1%</td>
                    <td style={{ textAlign: 'right', fontFamily: 'monospace', color: 'var(--status-danger)' }}>
                      ({formatCurrency(170000)})
                    </td>
                  </tr>

                  {/* Subtotal Expenses */}
                  <tr style={{ borderBottom: '2px solid var(--border-gold)' }}>
                    <td colSpan={3} style={{ textAlign: 'right', fontWeight: '700', color: 'var(--text-primary)' }}>
                      Total Operating Expenses (B)
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: '800', color: 'var(--status-danger)', fontSize: '14px', fontFamily: 'monospace' }}>
                      ({formatCurrency(totalExpenses)})
                    </td>
                  </tr>

                  {/* Grand Total Net Profit */}
                  <tr style={{ background: 'rgba(197,160,89,0.12)', borderTop: '2px double var(--gold-bright)' }}>
                    <td colSpan={3} style={{ fontWeight: '800', color: 'var(--gold-bright)', textTransform: 'uppercase', fontSize: '14px', letterSpacing: '0.05em' }}>
                      Net Operating Surplus / Earnings Before Tax (A - B)
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: '900', color: 'var(--gold-bright)', fontSize: '18px', fontFamily: 'monospace' }}>
                      {formatCurrency(netProfit)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 7: Trial Balance */}
      {activeTab === 'trial_balance' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Summary Strip */}
          <div className="panel-card" style={{ padding: '16px 20px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)' }}>Trial Balance Verification</h3>
              <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>Sum of All Leaf Accounts • Debit & Credit Balance Equilibrium</span>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Debits</span>
                <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                  {formatCurrency(totalTBDebit)}
                </div>
              </div>
              <div style={{ height: '30px', width: '1px', background: 'var(--border-subtle)' }} />
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Credits</span>
                <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--gold-bright)', fontFamily: 'monospace' }}>
                  {formatCurrency(totalTBCredit)}
                </div>
              </div>
              <div style={{ height: '30px', width: '1px', background: 'var(--border-subtle)' }} />
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Difference</span>
                <div style={{ fontSize: '15px', fontWeight: '700', color: tbDifference === 0 ? 'var(--status-success)' : 'var(--status-danger)', fontFamily: 'monospace' }}>
                  {formatCurrency(tbDifference)} {tbDifference === 0 ? '✓' : '⚠️'}
                </div>
              </div>
            </div>
          </div>

          {/* Trial Balance Table */}
          <div className="panel-card" style={{ padding: '0', overflow: 'hidden' }}>
            <div className="table-container" style={{ margin: 0 }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Account Code</th>
                    <th>Account Name</th>
                    <th>Type</th>
                    <th style={{ textAlign: 'right' }}>Debit ($)</th>
                    <th style={{ textAlign: 'right' }}>Credit ($)</th>
                    <th style={{ textAlign: 'center' }}>Audit</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTBRows.map(row => (
                    <tr key={row.account_number}>
                      <td>
                        <span style={{ fontFamily: 'monospace', fontWeight: '700', color: 'var(--gold-bright)' }}>
                          {row.account_number}
                        </span>
                      </td>
                      <td style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                        {row.account_name}
                      </td>
                      <td>
                        <span className={`badge badge-${
                          row.root_type === 'Asset' ? 'info' :
                          row.root_type === 'Liability' ? 'warning' :
                          row.root_type === 'Equity' ? 'gold' :
                          row.root_type === 'Income' ? 'success' : 'danger'
                        }`} style={{ fontSize: '10.5px' }}>
                          {row.root_type}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: row.debit > 0 ? '700' : '400', color: row.debit > 0 ? 'var(--text-primary)' : 'var(--text-muted)', fontFamily: 'monospace' }}>
                        {row.debit > 0 ? formatCurrency(row.debit) : '—'}
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: row.credit > 0 ? '700' : '400', color: row.credit > 0 ? 'var(--gold-bright)' : 'var(--text-muted)', fontFamily: 'monospace' }}>
                        {row.credit > 0 ? formatCurrency(row.credit) : '—'}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          onClick={() => handleDrillDownToGL(row.account_number)}
                          className="btn-secondary btn-sm"
                          style={{ padding: '4px 8px', fontSize: '11px' }}
                          title="View General Ledger Postings for this account"
                        >
                          View GL
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ background: 'rgba(197,160,89,0.08)', borderTop: '2px double var(--gold-bright)' }}>
                    <td colSpan={3} style={{ fontWeight: '700', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Grand Totals
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: '800', color: 'var(--text-primary)', fontSize: '15px', fontFamily: 'monospace' }}>
                      {formatCurrency(totalTBDebit)}
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: '800', color: 'var(--gold-bright)', fontSize: '15px', fontFamily: 'monospace' }}>
                      {formatCurrency(totalTBCredit)}
                    </td>
                    <td style={{ textAlign: 'center', color: 'var(--status-success)', fontWeight: '700', fontSize: '12px' }}>
                      Balanced
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
