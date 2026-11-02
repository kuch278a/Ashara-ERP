// ERPNext v16.51.1 Ported Schemas, DocType Definitions & Master Mock Database
// Derived directly from ERPNext Core Modules: Accounts, Buying, Selling, Stock, Manufacturing, Assets, CRM, Support, Subcontracting

export const ERPNEXT_DOCTYPES = {
  sales_invoice: {
    doctype: "Sales Invoice",
    module: "Accounts",
    is_submittable: true,
    naming_rule: "Expression (old style)",
    autoname: "SINV-.YYYY.-.#####",
    description: "Standard ERPNext Sales Invoice for billing clients against milestones, services, and deliveries.",
    fields: [
      { fieldname: "naming_series", fieldtype: "Select", label: "Series", options: "SINV-.YYYY.-" },
      { fieldname: "customer", fieldtype: "Link", label: "Customer", options: "Customer", reqd: 1 },
      { fieldname: "project", fieldtype: "Link", label: "Project", options: "Project" },
      { fieldname: "posting_date", fieldtype: "Date", label: "Posting Date", reqd: 1 },
      { fieldname: "due_date", fieldtype: "Date", label: "Due Date", reqd: 1 },
      { fieldname: "payment_terms_template", fieldtype: "Link", label: "Payment Terms", options: "Payment Terms Template" },
      { fieldname: "currency", fieldtype: "Link", label: "Currency", options: "Currency", default: "USD" },
      { fieldname: "items", fieldtype: "Table", label: "Invoice Items", options: "Sales Invoice Item", reqd: 1 },
      { fieldname: "net_total", fieldtype: "Currency", label: "Net Total", read_only: 1 },
      { fieldname: "taxes_and_charges", fieldtype: "Link", label: "Tax Category", options: "Sales Taxes and Charges Template" },
      { fieldname: "total_taxes_and_charges", fieldtype: "Currency", label: "Total Taxes (5% VAT)", read_only: 1 },
      { fieldname: "grand_total", fieldtype: "Currency", label: "Grand Total", read_only: 1 },
      { fieldname: "outstanding_amount", fieldtype: "Currency", label: "Outstanding Amount", read_only: 1 },
      { fieldname: "status", fieldtype: "Select", label: "Status", options: "Draft\nSubmitted\nPaid\nUnpaid\nOverdue\nCancelled" }
    ]
  },
  purchase_order: {
    doctype: "Purchase Order",
    module: "Buying",
    is_submittable: true,
    naming_rule: "Expression (old style)",
    autoname: "PO-.YYYY.-.#####",
    description: "ERPNext Purchase Order issued to artisan ateliers, quarries, and specialist subcontractors.",
    fields: [
      { fieldname: "naming_series", fieldtype: "Select", label: "Series", options: "PO-.YYYY.-" },
      { fieldname: "supplier", fieldtype: "Link", label: "Supplier", options: "Supplier", reqd: 1 },
      { fieldname: "supplier_name", fieldtype: "Data", label: "Supplier Name", read_only: 1 },
      { fieldname: "project", fieldtype: "Link", label: "Project", options: "Project" },
      { fieldname: "transaction_date", fieldtype: "Date", label: "Order Date", reqd: 1 },
      { fieldname: "schedule_date", fieldtype: "Date", label: "Required By", reqd: 1 },
      { fieldname: "set_warehouse", fieldtype: "Link", label: "Target Warehouse", options: "Warehouse" },
      { fieldname: "currency", fieldtype: "Link", label: "Currency", options: "Currency", default: "USD" },
      { fieldname: "items", fieldtype: "Table", label: "Items", options: "Purchase Order Item", reqd: 1 },
      { fieldname: "total_qty", fieldtype: "Float", label: "Total Quantity", read_only: 1 },
      { fieldname: "total", fieldtype: "Currency", label: "Total Amount", read_only: 1 },
      { fieldname: "status", fieldtype: "Select", label: "Status", options: "Draft\nTo Receive and Bill\nTo Bill\nCompleted\nCancelled" }
    ]
  },
  item: {
    doctype: "Item",
    module: "Stock",
    is_submittable: false,
    autoname: "item_code",
    description: "ERPNext Item Master for architectural finishes, loose furniture, fixtures, and raw materials.",
    fields: [
      { fieldname: "item_code", fieldtype: "Data", label: "Item Code", reqd: 1, unique: 1 },
      { fieldname: "item_name", fieldtype: "Data", label: "Item Name", reqd: 1 },
      { fieldname: "item_group", fieldtype: "Link", label: "Item Group", options: "Item Group", reqd: 1 },
      { fieldname: "stock_uom", fieldtype: "Link", label: "Default UOM", options: "UOM", reqd: 1 },
      { fieldname: "is_stock_item", fieldtype: "Check", label: "Maintain Stock", default: 1 },
      { fieldname: "valuation_method", fieldtype: "Select", label: "Valuation Method", options: "FIFO\nMoving Average" },
      { fieldname: "valuation_rate", fieldtype: "Currency", label: "Valuation Rate (Cost)" },
      { fieldname: "standard_rate", fieldtype: "Currency", label: "Standard Client Rate" },
      { fieldname: "lead_time_days", fieldtype: "Int", label: "Lead Time (Days)" },
      { fieldname: "default_warehouse", fieldtype: "Link", label: "Default Warehouse", options: "Warehouse" },
      { fieldname: "reorder_level", fieldtype: "Float", label: "Reorder Level" },
      { fieldname: "brand", fieldtype: "Link", label: "Brand / Atelier", options: "Brand" }
    ]
  },
  stock_entry: {
    doctype: "Stock Entry",
    module: "Stock",
    is_submittable: true,
    naming_rule: "Expression (old style)",
    autoname: "MAT-STE-.YYYY.-.#####",
    description: "ERPNext Stock Entry recording material receipts, transfers between ateliers/depots, and issues to project sites.",
    fields: [
      { fieldname: "stock_entry_type", fieldtype: "Link", label: "Stock Entry Type", options: "Stock Entry Type", reqd: 1 },
      { fieldname: "purpose", fieldtype: "Select", label: "Purpose", options: "Material Receipt\nMaterial Transfer\nMaterial Issue" },
      { fieldname: "from_warehouse", fieldtype: "Link", label: "Source Warehouse", options: "Warehouse" },
      { fieldname: "to_warehouse", fieldtype: "Link", label: "Target Warehouse", options: "Warehouse" },
      { fieldname: "posting_date", fieldtype: "Date", label: "Posting Date", reqd: 1 },
      { fieldname: "project", fieldtype: "Link", label: "Project", options: "Project" },
      { fieldname: "items", fieldtype: "Table", label: "Items", options: "Stock Entry Detail", reqd: 1 },
      { fieldname: "total_outgoing_value", fieldtype: "Currency", label: "Total Value", read_only: 1 }
    ]
  },
  journal_entry: {
    doctype: "Journal Entry",
    module: "Accounts",
    is_submittable: true,
    autoname: "JV-.YYYY.-.#####",
    description: "ERPNext Journal Entry recording multi-line double-entry accounting adjustments and settlements.",
    fields: [
      { fieldname: "voucher_type", fieldtype: "Select", label: "Voucher Type", options: "Journal Entry\nBank Entry\nCash Entry\nCredit Card Entry" },
      { fieldname: "posting_date", fieldtype: "Date", label: "Posting Date", reqd: 1 },
      { fieldname: "cheque_no", fieldtype: "Data", label: "Reference / Cheque No" },
      { fieldname: "cheque_date", fieldtype: "Date", label: "Reference Date" },
      { fieldname: "user_remark", fieldtype: "Small Text", label: "User Remark", reqd: 1 },
      { fieldname: "accounts", fieldtype: "Table", label: "Accounting Entries", options: "Journal Entry Account", reqd: 1 },
      { fieldname: "total_debit", fieldtype: "Currency", label: "Total Debit", read_only: 1 },
      { fieldname: "total_credit", fieldtype: "Currency", label: "Total Credit", read_only: 1 },
      { fieldname: "difference", fieldtype: "Currency", label: "Difference (Dr - Cr)", read_only: 1 }
    ]
  },
  bom: {
    doctype: "BOM",
    module: "Manufacturing",
    is_submittable: true,
    autoname: "BOM-.item.-.###",
    description: "ERPNext Bill of Materials defining raw finishes, timber, bronze hardware, and fabrication operations for custom joinery.",
    fields: [
      { fieldname: "item", fieldtype: "Link", label: "Finished Item", options: "Item", reqd: 1 },
      { fieldname: "item_name", fieldtype: "Data", label: "Item Name", read_only: 1 },
      { fieldname: "quantity", fieldtype: "Float", label: "Quantity", default: 1, reqd: 1 },
      { fieldname: "uom", fieldtype: "Link", label: "UOM", options: "UOM" },
      { fieldname: "currency", fieldtype: "Link", label: "Currency", default: "USD" },
      { fieldname: "is_active", fieldtype: "Check", label: "Is Active", default: 1 },
      { fieldname: "is_default", fieldtype: "Check", label: "Is Default", default: 1 },
      { fieldname: "items", fieldtype: "Table", label: "Raw Materials / Components", options: "BOM Item", reqd: 1 },
      { fieldname: "operations", fieldtype: "Table", label: "Atelier Operations", options: "BOM Operation" },
      { fieldname: "total_raw_material_cost", fieldtype: "Currency", label: "Raw Material Cost", read_only: 1 },
      { fieldname: "total_operating_cost", fieldtype: "Currency", label: "Operating & Craft Cost", read_only: 1 },
      { fieldname: "total_cost", fieldtype: "Currency", label: "Total BOM Cost", read_only: 1 }
    ]
  },
  work_order: {
    doctype: "Work Order",
    module: "Manufacturing",
    is_submittable: true,
    autoname: "MFG-WO-.YYYY.-.#####",
    description: "ERPNext Work Order tracking custom studio fabrication, CNC cutting, and on-site assembly.",
    fields: [
      { fieldname: "production_item", fieldtype: "Link", label: "Item to Manufacture", options: "Item", reqd: 1 },
      { fieldname: "bom_no", fieldtype: "Link", label: "BOM No", options: "BOM", reqd: 1 },
      { fieldname: "qty", fieldtype: "Float", label: "Quantity to Produce", reqd: 1 },
      { fieldname: "project", fieldtype: "Link", label: "Project Commission", options: "Project" },
      { fieldname: "source_warehouse", fieldtype: "Link", label: "Raw Material Warehouse", options: "Warehouse" },
      { fieldname: "wip_warehouse", fieldtype: "Link", label: "Work-in-Progress Warehouse", options: "Warehouse" },
      { fieldname: "fg_warehouse", fieldtype: "Link", label: "Target Staging Warehouse", options: "Warehouse" },
      { fieldname: "planned_start_date", fieldtype: "Date", label: "Planned Start" },
      { fieldname: "expected_delivery_date", fieldtype: "Date", label: "Target Completion" },
      { fieldname: "status", fieldtype: "Select", label: "Status", options: "Draft\nIn Process\nCompleted\nStopped" }
    ]
  },
  asset: {
    doctype: "Asset",
    module: "Assets",
    is_submittable: true,
    autoname: "ACC-ASS-.YYYY.-.#####",
    description: "ERPNext Fixed Asset Register tracking studio workstations, 3D render clusters, stone CNC routers, and vehicles.",
    fields: [
      { fieldname: "asset_name", fieldtype: "Data", label: "Asset Name", reqd: 1 },
      { fieldname: "asset_category", fieldtype: "Link", label: "Asset Category", options: "Asset Category", reqd: 1 },
      { fieldname: "item_code", fieldtype: "Link", label: "Item Code", options: "Item" },
      { fieldname: "gross_purchase_amount", fieldtype: "Currency", label: "Purchase Amount", reqd: 1 },
      { fieldname: "purchase_date", fieldtype: "Date", label: "Purchase Date", reqd: 1 },
      { fieldname: "location", fieldtype: "Link", label: "Location", options: "Location" },
      { fieldname: "depreciation_method", fieldtype: "Select", label: "Depreciation Method", options: "Straight Line\nWritten Down Value" },
      { fieldname: "total_number_of_depreciations", fieldtype: "Int", label: "Useful Life (Months)" },
      { fieldname: "value_after_depreciation", fieldtype: "Currency", label: "Net Book Value", read_only: 1 },
      { fieldname: "status", fieldtype: "Select", label: "Status", options: "Draft\nSubmitted\nPartially Depreciated\nFully Depreciated\nSold" }
    ]
  },
  opportunity: {
    doctype: "Opportunity",
    module: "CRM",
    is_submittable: false,
    autoname: "CRM-OPP-.YYYY.-.#####",
    description: "ERPNext CRM Opportunity tracking high-value architectural tenders, villa fit-out bids, and commercial negotiations.",
    fields: [
      { fieldname: "opportunity_from", fieldtype: "Select", label: "Opportunity From", options: "Lead\nCustomer" },
      { fieldname: "party_name", fieldtype: "Data", label: "Client / Prospect Name", reqd: 1 },
      { fieldname: "opportunity_type", fieldtype: "Select", label: "Opportunity Type", options: "Luxury Residential\nBoutique Hospitality\nPrivate Commercial\nTurnkey Yacht Fit-out" },
      { fieldname: "status", fieldtype: "Select", label: "Stage", options: "Prospecting\nConcept Presentation\nTender Submission\nContract Negotiation\nClosed Won\nClosed Lost" },
      { fieldname: "opportunity_amount", fieldtype: "Currency", label: "Expected Value", reqd: 1 },
      { fieldname: "probability", fieldtype: "Percent", label: "Win Probability (%)" },
      { fieldname: "expected_closing", fieldtype: "Date", label: "Expected Closing Date" },
      { fieldname: "contact_email", fieldtype: "Data", label: "Contact Email" },
      { fieldname: "contact_mobile", fieldtype: "Data", label: "Contact Phone" }
    ]
  },
  issue: {
    doctype: "Issue",
    module: "Support",
    is_submittable: false,
    autoname: "ISS-.YYYY.-.#####",
    description: "ERPNext Support Issue tracking post-handover architectural maintenance, warranty defect claims, and client support tickets.",
    fields: [
      { fieldname: "subject", fieldtype: "Data", label: "Subject", reqd: 1 },
      { fieldname: "customer", fieldtype: "Link", label: "Customer", options: "Customer" },
      { fieldname: "project", fieldtype: "Link", label: "Project", options: "Project" },
      { fieldname: "priority", fieldtype: "Select", label: "Priority", options: "Low\nMedium\nHigh\nUrgent" },
      { fieldname: "issue_type", fieldtype: "Link", label: "Issue Type", options: "Defect Warranty\nMaintenance Service\nMaterial Wear\nAutomation Tune-up" },
      { fieldname: "status", fieldtype: "Select", label: "Status", options: "Open\nReplied\nOn Hold\nResolved\nClosed" },
      { fieldname: "opening_date", fieldtype: "Date", label: "Logged Date" },
      { fieldname: "resolution_details", fieldtype: "Text Editor", label: "Resolution Details" }
    ]
  },
  subcontracting_order: {
    doctype: "Subcontracting Order",
    module: "Subcontracting",
    is_submittable: true,
    autoname: "SCO-.YYYY.-.#####",
    description: "ERPNext Subcontracting Order issuing raw materials (e.g. travertine slabs, raw brass) to specialized artisan fabricators.",
    fields: [
      { fieldname: "supplier", fieldtype: "Link", label: "Subcontractor / Artisan", options: "Supplier", reqd: 1 },
      { fieldname: "project", fieldtype: "Link", label: "Project", options: "Project" },
      { fieldname: "service_item", fieldtype: "Link", label: "Service Performed", options: "Item" },
      { fieldname: "rate", fieldtype: "Currency", label: "Service Fee" },
      { fieldname: "status", fieldtype: "Select", label: "Status", options: "Draft\nIn Process\nCompleted\nCancelled" }
    ]
  },
  supplier: {
    doctype: "Supplier",
    module: "Buying",
    is_submittable: false,
    autoname: "supplier_name",
    description: "ERPNext Supplier master record containing terms, country of origin, and scorecard metrics.",
    fields: [
      { fieldname: "supplier_name", fieldtype: "Data", label: "Supplier Name", reqd: 1 },
      { fieldname: "supplier_group", fieldtype: "Link", label: "Supplier Group", options: "Supplier Group", reqd: 1 },
      { fieldname: "country", fieldtype: "Link", label: "Country", options: "Country", reqd: 1 },
      { fieldname: "tax_id", fieldtype: "Data", label: "Tax ID / VAT No" },
      { fieldname: "payment_terms", fieldtype: "Link", label: "Default Payment Terms", options: "Payment Terms Template" },
      { fieldname: "rating", fieldtype: "Float", label: "Atelier Scorecard (1-5)" },
      { fieldname: "average_lead_time_days", fieldtype: "Int", label: "Avg Lead Time (Days)" }
    ]
  },
  warehouse: {
    doctype: "Warehouse",
    module: "Stock",
    is_submittable: false,
    autoname: "warehouse_name",
    description: "ERPNext Warehouse node tracking inventory across central depots, international transit, and project sites.",
    fields: [
      { fieldname: "warehouse_name", fieldtype: "Data", label: "Warehouse Name", reqd: 1 },
      { fieldname: "warehouse_type", fieldtype: "Select", label: "Warehouse Type", options: "Central Depot\nInternational Transit\nOn-Site Staging\nFabrication Mill" },
      { fieldname: "city", fieldtype: "Data", label: "City / Location" },
      { fieldname: "is_group", fieldtype: "Check", label: "Is Group Warehouse" },
      { fieldname: "parent_warehouse", fieldtype: "Link", label: "Parent Warehouse", options: "Warehouse" }
    ]
  }
};

// ERPNext Standard Chart of Accounts (COA) Tree for Atelier Design Firm
export const INITIAL_CHART_OF_ACCOUNTS = [
  {
    account_number: "1000",
    account_name: "Application of Funds (Assets)",
    root_type: "Asset",
    is_group: 1,
    balance: 14820000,
    children: [
      {
        account_number: "1100",
        account_name: "Current Assets",
        root_type: "Asset",
        is_group: 1,
        balance: 11220000,
        children: [
          { account_number: "1110", account_name: "Cash and Bank Balances (Emirates NBD)", root_type: "Asset", is_group: 0, balance: 4850000 },
          { account_number: "1120", account_name: "Accounts Receivable (Debtors)", root_type: "Asset", is_group: 0, balance: 597400 },
          { account_number: "1130", account_name: "Stock in Hand (Inventory Asset)", root_type: "Asset", is_group: 0, balance: 3422600 },
          { account_number: "1140", account_name: "Project Work In Progress (WIP Fit-out)", root_type: "Asset", is_group: 0, balance: 2350000 }
        ]
      },
      {
        account_number: "1200",
        account_name: "Fixed Assets",
        root_type: "Asset",
        is_group: 1,
        balance: 3600000,
        children: [
          { account_number: "1210", account_name: "Atelier Studio & 3D Render Workstations", root_type: "Asset", is_group: 0, balance: 850000 },
          { account_number: "1220", account_name: "Material Sample Archives & Library Fixtures", root_type: "Asset", is_group: 0, balance: 2750000 }
        ]
      }
    ]
  },
  {
    account_number: "2000",
    account_name: "Source of Funds (Liabilities)",
    root_type: "Liability",
    is_group: 1,
    balance: 3180000,
    children: [
      {
        account_number: "2100",
        account_name: "Current Liabilities",
        root_type: "Liability",
        is_group: 1,
        balance: 3180000,
        children: [
          { account_number: "2110", account_name: "Accounts Payable (Creditors / Artisans)", root_type: "Liability", is_group: 0, balance: 1420000 },
          { account_number: "2120", account_name: "Client Project Escrow Advances", root_type: "Liability", is_group: 0, balance: 1650000 },
          { account_number: "2130", account_name: "VAT Payable (5% UAE)", root_type: "Liability", is_group: 0, balance: 110000 }
        ]
      }
    ]
  },
  {
    account_number: "3000",
    account_name: "Equity",
    root_type: "Equity",
    is_group: 1,
    balance: 7500000,
    children: [
      { account_number: "3110", account_name: "Capital Stock - Partners Equity", root_type: "Equity", is_group: 0, balance: 5000000 },
      { account_number: "3120", account_name: "Retained Earnings", root_type: "Equity", is_group: 0, balance: 2500000 }
    ]
  },
  {
    account_number: "4000",
    account_name: "Income",
    root_type: "Income",
    is_group: 1,
    balance: 5460000,
    children: [
      { account_number: "4110", account_name: "Architectural & BIM Design Fees", root_type: "Income", is_group: 0, balance: 3372000 },
      { account_number: "4120", account_name: "FF&E Procurement Commission & Markup", root_type: "Income", is_group: 0, balance: 1688000 },
      { account_number: "4130", account_name: "Site Supervision & Fit-Out Consultancy", root_type: "Income", is_group: 0, balance: 400000 }
    ]
  },
  {
    account_number: "5000",
    account_name: "Expenses",
    root_type: "Expense",
    is_group: 1,
    balance: 1320000,
    children: [
      { account_number: "5110", account_name: "Cost of Goods Sold - Materials & Procurement", root_type: "Expense", is_group: 0, balance: 840000 },
      { account_number: "5120", account_name: "Direct Subcontractor & Engineering Fees", root_type: "Expense", is_group: 0, balance: 310000 },
      { account_number: "5130", account_name: "Atelier Operating & 3D Cloud Compute Costs", root_type: "Expense", is_group: 0, balance: 170000 }
    ]
  }
];

// ERPNext General Ledger (GL) Entries
export const INITIAL_GL_ENTRIES = [
  {
    id: "GLE-2026-001",
    posting_date: "2026-10-01",
    voucher_type: "Sales Invoice",
    voucher_no: "SINV-2026-089",
    account: "1120 - Accounts Receivable (Debtors)",
    party_type: "Customer",
    party: "Tariq & Reem Al-Ghurair",
    project: "PRJ-2026-001",
    debit: 141120,
    credit: 0,
    remarks: "Milestone #1 Site Fit-out billing"
  },
  {
    id: "GLE-2026-002",
    posting_date: "2026-10-01",
    voucher_type: "Sales Invoice",
    voucher_no: "SINV-2026-089",
    account: "4110 - Architectural & BIM Design Fees",
    party_type: "Customer",
    party: "Tariq & Reem Al-Ghurair",
    project: "PRJ-2026-001",
    debit: 0,
    credit: 134400,
    remarks: "Revenue recognition Milestone #1"
  },
  {
    id: "GLE-2026-003",
    posting_date: "2026-10-01",
    voucher_type: "Sales Invoice",
    voucher_no: "SINV-2026-089",
    account: "2130 - VAT Payable (5% UAE)",
    party_type: "",
    party: "",
    project: "PRJ-2026-001",
    debit: 0,
    credit: 6720,
    remarks: "5% VAT on Milestone #1"
  },
  {
    id: "GLE-2026-004",
    posting_date: "2026-10-14",
    voucher_type: "Payment Entry",
    voucher_no: "PAY-2026-034",
    account: "1110 - Cash and Bank Balances (Emirates NBD)",
    party_type: "Customer",
    party: "Tariq & Reem Al-Ghurair",
    project: "PRJ-2026-001",
    debit: 141120,
    credit: 0,
    remarks: "Payment received against SINV-2026-089"
  },
  {
    id: "GLE-2026-005",
    posting_date: "2026-10-14",
    voucher_type: "Payment Entry",
    voucher_no: "PAY-2026-034",
    account: "1120 - Accounts Receivable (Debtors)",
    party_type: "Customer",
    party: "Tariq & Reem Al-Ghurair",
    project: "PRJ-2026-001",
    debit: 0,
    credit: 141120,
    remarks: "Settlement of SINV-2026-089"
  },
  {
    id: "GLE-2026-006",
    posting_date: "2026-10-16",
    voucher_type: "Purchase Order",
    voucher_no: "PO-2026-012",
    account: "1130 - Stock in Hand (Inventory Asset)",
    party_type: "Supplier",
    party: "Antolini Quarries, Verona",
    project: "PRJ-2026-001",
    debit: 48000,
    credit: 0,
    remarks: "Goods received on site: Honed Travertine Slabs"
  },
  {
    id: "GLE-2026-007",
    posting_date: "2026-10-16",
    voucher_type: "Purchase Order",
    voucher_no: "PO-2026-012",
    account: "2110 - Accounts Payable (Creditors / Artisans)",
    party_type: "Supplier",
    party: "Antolini Quarries, Verona",
    project: "PRJ-2026-001",
    debit: 0,
    credit: 48000,
    remarks: "Supplier liability for Travertine Slabs"
  }
];

// ERPNext Journal Entries (Double Entry Vouchers)
export const INITIAL_JOURNAL_ENTRIES = [
  {
    id: "JV-2026-001",
    voucher_type: "Journal Entry",
    posting_date: "2026-10-15",
    user_remark: "Transfer of fit-out work in progress from Central Depot to Villa Al-Manara project WIP account",
    cheque_no: "REF-INT-094",
    cheque_date: "2026-10-15",
    status: "Submitted",
    total_debit: 38500,
    total_credit: 38500,
    difference: 0,
    accounts: [
      { account: "1140 - Project Work In Progress (WIP Fit-out)", debit: 38500, credit: 0, party_type: "Customer", party: "Tariq & Reem Al-Ghurair" },
      { account: "1130 - Stock in Hand (Inventory Asset)", debit: 0, credit: 38500, party_type: "", party: "" }
    ]
  },
  {
    id: "JV-2026-002",
    voucher_type: "Bank Entry",
    posting_date: "2026-10-18",
    user_remark: "Escrow advance release from Al-Rawda Hospitality Group into operating account",
    cheque_no: "ESC-LC-9901",
    cheque_date: "2026-10-18",
    status: "Submitted",
    total_debit: 150000,
    total_credit: 150000,
    difference: 0,
    accounts: [
      { account: "1110 - Cash and Bank Balances (Emirates NBD)", debit: 150000, credit: 0, party_type: "", party: "" },
      { account: "2120 - Client Project Escrow Advances", debit: 0, credit: 150000, party_type: "Customer", party: "Al-Rawda Hospitality Group" }
    ]
  }
];

// ERPNext Suppliers / Vendors Master
export const INITIAL_SUPPLIERS = [
  {
    id: "SUP-001",
    supplier_name: "Antolini Quarries, Verona",
    supplier_group: "Natural Stone & Marble",
    country: "Italy",
    tax_id: "IT-08472910238",
    payment_terms: "30% Advance, 70% Against Bill of Lading",
    rating: 4.9,
    average_lead_time_days: 42,
    total_purchased: 240000,
    primary_contact: "Matteo Antolini (Export Sales)",
    email: "commerciale@antolini.it",
    phone: "+39 045 683 6611",
    status: "Active"
  },
  {
    id: "SUP-002",
    supplier_name: "Henge Atelier, Florence",
    supplier_group: "Bespoke Lighting & Bronze",
    country: "Italy",
    tax_id: "IT-03829104712",
    payment_terms: "50% On Order, 50% Prior to Dispatch",
    rating: 4.8,
    average_lead_time_days: 84,
    total_purchased: 185000,
    primary_contact: "Paolo Tormena (Artistic Director)",
    email: "custom@henge07.com",
    phone: "+39 055 892 4110",
    status: "Active"
  },
  {
    id: "SUP-003",
    supplier_name: "B&B Italia / Maxalto",
    supplier_group: "Luxury Upholstery & Furniture",
    country: "Italy",
    tax_id: "IT-01938472019",
    payment_terms: "Net 30 Days",
    rating: 4.7,
    average_lead_time_days: 70,
    total_purchased: 310000,
    primary_contact: "Claudia Bianchi (Contract Division)",
    email: "contract@bebitalia.com",
    phone: "+39 031 795 111",
    status: "Active"
  },
  {
    id: "SUP-004",
    supplier_name: "Poliform Contract Solutions",
    supplier_group: "Architectural Joinery & Millwork",
    country: "Germany / Italy",
    tax_id: "DE-819283741",
    payment_terms: "40% Order, 40% Factory Gate, 20% Handover",
    rating: 4.9,
    average_lead_time_days: 56,
    total_purchased: 420000,
    primary_contact: "Klaus Weber (BIM Project Eng)",
    email: "projects@poliform.de",
    phone: "+49 89 244 100",
    status: "Active"
  },
  {
    id: "SUP-005",
    supplier_name: "Salvatori Stone Atelier",
    supplier_group: "Architectural Limestone & Baths",
    country: "Italy",
    tax_id: "IT-09923841102",
    payment_terms: "50% Order, 50% Before Freight",
    rating: 4.8,
    average_lead_time_days: 98,
    total_purchased: 160000,
    primary_contact: "Gabriele Salvatori",
    email: "bespoke@salvatori.it",
    phone: "+39 0584 769 200",
    status: "Active"
  }
];

// ERPNext Purchase Orders (Buying Module)
export const INITIAL_PURCHASE_ORDERS = [
  {
    id: "PO-2026-012",
    naming_series: "PO-2026-",
    supplier: "SUP-001",
    supplier_name: "Antolini Quarries, Verona",
    project: "PRJ-2026-001",
    projectName: "Villa Al-Manara Sanctuary",
    transaction_date: "2026-09-02",
    schedule_date: "2026-10-16",
    set_warehouse: "WH-ON-SITE-01",
    status: "Completed",
    docstatus: 1, // Submitted
    currency: "USD",
    total_qty: 180,
    total: 48000,
    items: [
      {
        item_code: "MAT-TRV-01",
        item_name: "Honed Roman Travertine Slabs (Bookmatched)",
        qty: 180,
        uom: "m²",
        rate: 266.67,
        amount: 48000,
        warehouse: "WH-ON-SITE-01"
      }
    ]
  },
  {
    id: "PO-2026-015",
    naming_series: "PO-2026-",
    supplier: "SUP-002",
    supplier_name: "Henge Atelier, Florence",
    project: "PRJ-2026-001",
    projectName: "Villa Al-Manara Sanctuary",
    transaction_date: "2026-09-18",
    schedule_date: "2026-11-20",
    set_warehouse: "WH-DEPOT-01",
    status: "To Receive and Bill",
    docstatus: 1,
    currency: "USD",
    total_qty: 1,
    total: 22000,
    items: [
      {
        item_code: "LGT-CHM-02",
        item_name: "Sculptural Brass Ribbon Chandelier",
        qty: 1,
        uom: "Nos",
        rate: 22000,
        amount: 22000,
        warehouse: "WH-DEPOT-01"
      }
    ]
  },
  {
    id: "PO-2026-018",
    naming_series: "PO-2026-",
    supplier: "SUP-003",
    supplier_name: "B&B Italia / Maxalto",
    project: "PRJ-2026-001",
    projectName: "Villa Al-Manara Sanctuary",
    transaction_date: "2026-10-05",
    schedule_date: "2026-12-10",
    set_warehouse: "WH-DEPOT-01",
    status: "To Receive and Bill",
    docstatus: 1,
    currency: "USD",
    total_qty: 1,
    total: 14200,
    items: [
      {
        item_code: "FRN-BOU-01",
        item_name: "Curved Cloud Bouclé Sectional Sofa",
        qty: 1,
        uom: "Nos",
        rate: 14200,
        amount: 14200,
        warehouse: "WH-DEPOT-01"
      }
    ]
  },
  {
    id: "PO-2026-021",
    naming_series: "PO-2026-",
    supplier: "SUP-004",
    supplier_name: "Poliform Contract Solutions",
    project: "PRJ-2026-002",
    projectName: "The Obsidian Sky Penthouse",
    transaction_date: "2026-10-12",
    schedule_date: "2026-12-05",
    set_warehouse: "WH-ON-SITE-02",
    status: "Draft",
    docstatus: 0,
    currency: "USD",
    total_qty: 1,
    total: 31500,
    items: [
      {
        item_code: "MLW-OAK-04",
        item_name: "Fluted Smoked Oak Architectural Wall System",
        qty: 1,
        uom: "Set",
        rate: 31500,
        amount: 31500,
        warehouse: "WH-ON-SITE-02"
      }
    ]
  }
];

// ERPNext Warehouses (Stock Module)
export const INITIAL_WAREHOUSES = [
  {
    id: "WH-DEPOT-01",
    warehouse_name: "Central Atelier Logistics Depot - Dubai",
    warehouse_type: "Central Depot",
    city: "Al-Quoz Industrial, Dubai",
    total_valuation: 1845000,
    item_count: 24,
    manager: "Faisal Al-Tamimi"
  },
  {
    id: "WH-TRNS-MIL",
    warehouse_name: "Milan Air & Sea Consolidation Hub",
    warehouse_type: "International Transit",
    city: "Milan Malpensa Hub, Italy",
    total_valuation: 820000,
    item_count: 8,
    manager: "Enrico Rossi"
  },
  {
    id: "WH-ON-SITE-01",
    warehouse_name: "On-Site Staging - Villa Al-Manara (Emirates Hills)",
    warehouse_type: "On-Site Staging",
    city: "Emirates Hills Sector E, Dubai",
    total_valuation: 480000,
    item_count: 6,
    manager: "Sarah Al-Mansoor"
  },
  {
    id: "WH-ON-SITE-02",
    warehouse_name: "On-Site Staging - Obsidian Penthouse (Marina Heights)",
    warehouse_type: "On-Site Staging",
    city: "Marina Heights Tower 1, Dubai",
    total_valuation: 277600,
    item_count: 4,
    manager: "Julian Vance"
  }
];

// ERPNext Item Master (Stock Module)
export const INITIAL_STOCK_ITEMS = [
  {
    item_code: "MAT-TRV-01",
    item_name: "Honed Roman Travertine Slabs",
    item_group: "Natural Stone & Finishes",
    stock_uom: "m²",
    is_stock_item: 1,
    valuation_method: "FIFO",
    valuation_rate: 266.67,
    standard_rate: 333.33,
    qty_on_hand: 220,
    qty_reserved: 180,
    qty_in_transit: 50,
    reorder_level: 80,
    brand: "Antolini Quarries",
    default_warehouse: "WH-ON-SITE-01",
    lead_time_days: 42,
    status: "Adequate"
  },
  {
    item_code: "FRN-BOU-01",
    item_name: "Curved Cloud Bouclé Sectional Sofa",
    item_group: "Loose Furniture",
    stock_uom: "Nos",
    is_stock_item: 1,
    valuation_method: "Moving Average",
    valuation_rate: 14200,
    standard_rate: 19170,
    qty_on_hand: 2,
    qty_reserved: 1,
    qty_in_transit: 1,
    reorder_level: 1,
    brand: "B&B Italia",
    default_warehouse: "WH-DEPOT-01",
    lead_time_days: 70,
    status: "Adequate"
  },
  {
    item_code: "LGT-CHM-02",
    item_name: "Sculptural Brass Ribbon Chandelier",
    item_group: "Bespoke Lighting",
    stock_uom: "Nos",
    is_stock_item: 1,
    valuation_method: "Moving Average",
    valuation_rate: 22000,
    standard_rate: 28600,
    qty_on_hand: 1,
    qty_reserved: 1,
    qty_in_transit: 1,
    reorder_level: 1,
    brand: "Henge Atelier",
    default_warehouse: "WH-DEPOT-01",
    lead_time_days: 84,
    status: "Adequate"
  },
  {
    item_code: "MLW-OAK-04",
    item_name: "Fluted Smoked Oak Architectural Wall System",
    item_group: "Millwork & Joinery",
    stock_uom: "Set",
    is_stock_item: 1,
    valuation_method: "FIFO",
    valuation_rate: 31500,
    standard_rate: 42525,
    qty_on_hand: 1,
    qty_reserved: 1,
    qty_in_transit: 0,
    reorder_level: 1,
    brand: "Poliform",
    default_warehouse: "WH-ON-SITE-02",
    lead_time_days: 56,
    status: "Adequate"
  },
  {
    item_code: "SAN-STN-05",
    item_name: "Monolithic Silk Georgette Freestanding Tub",
    item_group: "Sanitaryware & Bath",
    stock_uom: "Nos",
    is_stock_item: 1,
    valuation_method: "FIFO",
    valuation_rate: 18500,
    standard_rate: 24050,
    qty_on_hand: 0,
    qty_reserved: 1,
    qty_in_transit: 1,
    reorder_level: 1,
    brand: "Salvatori",
    default_warehouse: "WH-TRNS-MIL",
    lead_time_days: 98,
    status: "Low Stock"
  },
  {
    item_code: "TBL-BRZ-06",
    item_name: "Organic Cast Bronze Cocktail Table #3/8",
    item_group: "Limited Edition Art Furniture",
    stock_uom: "Nos",
    is_stock_item: 1,
    valuation_method: "FIFO",
    valuation_rate: 26000,
    standard_rate: 33800,
    qty_on_hand: 2,
    qty_reserved: 2,
    qty_in_transit: 0,
    reorder_level: 1,
    brand: "Vincenzo De Cotiis",
    default_warehouse: "WH-DEPOT-01",
    lead_time_days: 112,
    status: "Adequate"
  }
];

// ERPNext Stock Entries / Movements
export const INITIAL_STOCK_ENTRIES = [
  {
    id: "STE-2026-081",
    stock_entry_type: "Material Transfer",
    purpose: "Material Transfer",
    posting_date: "2026-10-18",
    from_warehouse: "WH-DEPOT-01",
    to_warehouse: "WH-ON-SITE-01",
    project: "PRJ-2026-001",
    projectName: "Villa Al-Manara Sanctuary",
    total_outgoing_value: 38500,
    docstatus: 1,
    items: [
      {
        item_code: "MAT-TRV-01",
        item_name: "Honed Roman Travertine Slabs",
        qty: 60,
        uom: "m²",
        valuation_rate: 266.67,
        amount: 16000
      },
      {
        item_code: "LGT-CHM-02",
        item_name: "Sculptural Brass Ribbon Chandelier",
        qty: 1,
        uom: "Nos",
        valuation_rate: 22000,
        amount: 22000
      }
    ]
  },
  {
    id: "STE-2026-088",
    stock_entry_type: "Material Receipt",
    purpose: "Material Receipt",
    posting_date: "2026-10-16",
    from_warehouse: "",
    to_warehouse: "WH-ON-SITE-01",
    project: "PRJ-2026-001",
    projectName: "Villa Al-Manara Sanctuary",
    total_outgoing_value: 48000,
    docstatus: 1,
    items: [
      {
        item_code: "MAT-TRV-01",
        item_name: "Honed Roman Travertine Slabs",
        qty: 180,
        uom: "m²",
        valuation_rate: 266.67,
        amount: 48000
      }
    ]
  }
];

// ERPNext Stock Ledger Entries (Perpetual FIFO Valuation Trail)
export const INITIAL_STOCK_LEDGER_ENTRIES = [
  {
    id: "SLE-2026-001",
    posting_date: "2026-10-10",
    posting_time: "09:30:00",
    item_code: "MAT-TRV-01",
    item_name: "Honed Roman Travertine Slabs",
    warehouse: "WH-DEPOT-01",
    voucher_type: "Purchase Receipt",
    voucher_no: "PREC-2026-042",
    actual_qty: 240,
    qty_after_transaction: 240,
    incoming_rate: 266.67,
    valuation_rate: 266.67,
    stock_value: 64000,
    stock_value_difference: 64000,
    batch_no: "BAT-TRV-2026-A",
    project: "PRJ-2026-001"
  },
  {
    id: "SLE-2026-002",
    posting_date: "2026-10-14",
    posting_time: "14:15:00",
    item_code: "LGT-CHM-02",
    item_name: "Sculptural Brass Ribbon Chandelier",
    warehouse: "WH-TRNS-MIL",
    voucher_type: "Purchase Receipt",
    voucher_no: "PREC-2026-045",
    actual_qty: 2,
    qty_after_transaction: 2,
    incoming_rate: 22000,
    valuation_rate: 22000,
    stock_value: 44000,
    stock_value_difference: 44000,
    batch_no: "BAT-LGT-002",
    project: "PRJ-2026-001"
  },
  {
    id: "SLE-2026-003",
    posting_date: "2026-10-16",
    posting_time: "11:00:00",
    item_code: "MAT-TRV-01",
    item_name: "Honed Roman Travertine Slabs",
    warehouse: "WH-ON-SITE-01",
    voucher_type: "Material Receipt",
    voucher_no: "STE-2026-088",
    actual_qty: 180,
    qty_after_transaction: 180,
    incoming_rate: 266.67,
    valuation_rate: 266.67,
    stock_value: 48000,
    stock_value_difference: 48000,
    batch_no: "BAT-TRV-2026-A",
    project: "PRJ-2026-001"
  },
  {
    id: "SLE-2026-004",
    posting_date: "2026-10-18",
    posting_time: "16:45:00",
    item_code: "MAT-TRV-01",
    item_name: "Honed Roman Travertine Slabs",
    warehouse: "WH-DEPOT-01",
    voucher_type: "Material Transfer",
    voucher_no: "STE-2026-081",
    actual_qty: -60,
    qty_after_transaction: 180,
    incoming_rate: 0,
    valuation_rate: 266.67,
    stock_value: 48000,
    stock_value_difference: -16000,
    batch_no: "BAT-TRV-2026-A",
    project: "PRJ-2026-001"
  },
  {
    id: "SLE-2026-005",
    posting_date: "2026-10-18",
    posting_time: "16:45:00",
    item_code: "LGT-CHM-02",
    item_name: "Sculptural Brass Ribbon Chandelier",
    warehouse: "WH-DEPOT-01",
    voucher_type: "Material Transfer",
    voucher_no: "STE-2026-081",
    actual_qty: 1,
    qty_after_transaction: 1,
    incoming_rate: 22000,
    valuation_rate: 22000,
    stock_value: 22000,
    stock_value_difference: 22000,
    batch_no: "BAT-LGT-002",
    project: "PRJ-2026-001"
  },
  {
    id: "SLE-2026-006",
    posting_date: "2026-10-20",
    posting_time: "10:20:00",
    item_code: "MLW-OAK-04",
    item_name: "Fluted Smoked Oak Architectural Wall System",
    warehouse: "WH-ON-SITE-02",
    voucher_type: "Work Order Issue",
    voucher_no: "MFG-WO-2026-014",
    actual_qty: 1,
    qty_after_transaction: 1,
    incoming_rate: 31500,
    valuation_rate: 31500,
    stock_value: 31500,
    stock_value_difference: 31500,
    batch_no: "BAT-MLW-2026-01",
    project: "PRJ-2026-002"
  },
  {
    id: "SLE-2026-007",
    posting_date: "2026-10-22",
    posting_time: "15:00:00",
    item_code: "TBL-BRZ-06",
    item_name: "Organic Cast Bronze Cocktail Table #3/8",
    warehouse: "WH-DEPOT-01",
    voucher_type: "Purchase Receipt",
    voucher_no: "PREC-2026-051",
    actual_qty: 1,
    qty_after_transaction: 1,
    incoming_rate: 24000,
    valuation_rate: 24000,
    stock_value: 24000,
    stock_value_difference: 24000,
    batch_no: "BAT-BRZ-03",
    project: "PRJ-2026-001"
  }
];

// ERPNext Manufacturing: Bill of Materials (BOM)
export const INITIAL_BOMS = [
  {
    id: "BOM-MLW-OAK-001",
    item: "MLW-OAK-04",
    item_name: "Fluted Smoked Oak Architectural Wall System",
    quantity: 1,
    uom: "Set",
    is_active: true,
    is_default: true,
    currency: "USD",
    total_raw_material_cost: 21200,
    total_operating_cost: 10300,
    total_cost: 31500,
    raw_materials: [
      { item_code: "RAW-OAK-SLT", item_name: "FSC Smoked Rift Oak Slats (20x30mm)", qty: 240, uom: "Mtr", rate: 45, amount: 10800 },
      { item_code: "RAW-ACU-PNL", item_name: "Acoustic Recycled Polyester Felt Backer (12mm)", qty: 32, uom: "m²", rate: 85, amount: 2720 },
      { item_code: "RAW-LED-EXT", item_name: "Recessed Aluminum Profile with 2700K Warm LED", qty: 48, uom: "Mtr", rate: 65, amount: 3120 },
      { item_code: "RAW-BRZ-TRM", item_name: "Brushed Bronze Perimeter Reveal Trim", qty: 22, uom: "Mtr", rate: 207.27, amount: 4560 }
    ],
    operations: [
      { operation: "Precision CNC Slat Milling", workstation: "5-Axis Homag Mill", time_mins: 180, cost: 3200 },
      { operation: "Hand-applied Matte Polyurethane Stain & Polish", workstation: "Artisan Finishing Booth", time_mins: 240, cost: 4100 },
      { operation: "Modular Cassette Pre-assembly & LED Bench Testing", workstation: "Joinery Assembly Bench 2", time_mins: 150, cost: 3000 }
    ]
  },
  {
    id: "BOM-LGT-CHM-002",
    item: "LGT-CHM-02",
    item_name: "Sculptural Brass Ribbon Chandelier",
    quantity: 1,
    uom: "Nos",
    is_active: true,
    is_default: true,
    currency: "USD",
    total_raw_material_cost: 13500,
    total_operating_cost: 8500,
    total_cost: 22000,
    raw_materials: [
      { item_code: "RAW-BRS-SHT", item_name: "Custom Curved Marine Grade Solid Brass Bands", qty: 18, uom: "Kg", rate: 420, amount: 7560 },
      { item_code: "RAW-LED-CRI", item_name: "Ultra-High CRI 98 Flexible Micro-Prismatic Strip", qty: 24, uom: "Mtr", rate: 110, amount: 2640 },
      { item_code: "RAW-DAL-DRV", item_name: "Lutron EcoSystem / DALI Constant Current Driver", qty: 2, uom: "Nos", rate: 1650, amount: 3300 }
    ],
    operations: [
      { operation: "Manual Torching, Shaping & Cold Bending", workstation: "Metal Atelier Forge", time_mins: 320, cost: 5200 },
      { operation: "Florentine Hand-Brushing & Micro-Wax Sealing", workstation: "Surface Treatment Lab", time_mins: 180, cost: 3300 }
    ]
  }
];

// ERPNext Manufacturing: Work Orders
export const INITIAL_WORK_ORDERS = [
  {
    id: "MFG-WO-2026-004",
    production_item: "MLW-OAK-04",
    item_name: "Fluted Smoked Oak Architectural Wall System",
    bom_no: "BOM-MLW-OAK-001",
    qty: 1,
    project: "PRJ-2026-002",
    projectName: "The Obsidian Sky Penthouse",
    source_warehouse: "WH-DEPOT-01",
    wip_warehouse: "WH-FAB-MILL",
    fg_warehouse: "WH-ON-SITE-02",
    planned_start_date: "2026-10-10",
    expected_delivery_date: "2026-11-28",
    status: "In Process",
    docstatus: 1,
    progress: 65,
    leadCraftsman: "Master Joiner Tobias Henz"
  },
  {
    id: "MFG-WO-2026-005",
    production_item: "LGT-CHM-02",
    item_name: "Sculptural Brass Ribbon Chandelier",
    bom_no: "BOM-LGT-CHM-002",
    qty: 1,
    project: "PRJ-2026-001",
    projectName: "Villa Al-Manara Sanctuary",
    source_warehouse: "WH-TRNS-MIL",
    wip_warehouse: "WH-FAB-MILL",
    fg_warehouse: "WH-ON-SITE-01",
    planned_start_date: "2026-09-20",
    expected_delivery_date: "2026-11-15",
    status: "In Process",
    docstatus: 1,
    progress: 88,
    leadCraftsman: "Artisan Metal Master Paolo V."
  }
];

// ERPNext Assets: Fixed Assets Register
export const INITIAL_ASSETS = [
  {
    id: "ASS-2026-001",
    asset_name: "5-Axis High-Precision CNC Stone & Joinery Mill",
    asset_category: "Fabrication Machinery",
    item_code: "MAC-CNC-5AX",
    purchase_date: "2024-06-15",
    gross_purchase_amount: 385000,
    depreciation_method: "Straight Line",
    total_number_of_depreciations: 60, // 5 years
    value_after_depreciation: 231000,
    location: "Al-Quoz Fabrication Atelier",
    status: "Submitted"
  },
  {
    id: "ASS-2026-002",
    asset_name: "Dual NVIDIA H100 GPU Unreal Engine 5 3D Render Cluster",
    asset_category: "IT & 3D Compute",
    item_code: "SRV-H100-3D",
    purchase_date: "2025-02-10",
    gross_purchase_amount: 145000,
    depreciation_method: "Straight Line",
    total_number_of_depreciations: 36, // 3 years
    value_after_depreciation: 104720,
    location: "Ashara Design Studio Head Office",
    status: "Submitted"
  },
  {
    id: "ASS-2026-003",
    asset_name: "Atelier Material Archive & Tactile Sample Exhibition Wall",
    asset_category: "Studio Showroom Fixtures",
    item_code: "FIX-ARCH-01",
    purchase_date: "2023-11-01",
    gross_purchase_amount: 92000,
    depreciation_method: "Straight Line",
    total_number_of_depreciations: 84, // 7 years
    value_after_depreciation: 64500,
    location: "Ashara Atelier Client Gallery",
    status: "Submitted"
  },
  {
    id: "ASS-2026-004",
    asset_name: "Mercedes-Benz Sprinter Atelier Mobile Sample Van",
    asset_category: "Fleet Vehicles",
    item_code: "VEH-SPR-01",
    purchase_date: "2025-01-20",
    gross_purchase_amount: 78000,
    depreciation_method: "Straight Line",
    total_number_of_depreciations: 60,
    value_after_depreciation: 62400,
    location: "Dubai Transport Fleet",
    status: "Submitted"
  }
];

// ERPNext CRM: Leads & Opportunities Pipeline
export const INITIAL_OPPORTUNITIES = [
  {
    id: "CRM-OPP-2026-01",
    party_name: "Sheikh Mansoor Al-Thani Family Office",
    opportunity_type: "Luxury Residential",
    opportunity_amount: 18500000,
    stage: "Tender Submission",
    probability: 70,
    expected_closing: "2026-11-30",
    contact_email: "investments@mto-office.qa",
    contact_mobile: "+974 4492 1000",
    city: "Doha / Dubai",
    description: "Palatial 3,800 m² sea-front private residence requiring comprehensive architectural, interior fit-out, and Italian landscape masterplan."
  },
  {
    id: "CRM-OPP-2026-02",
    party_name: "Amanresorts International Group",
    opportunity_type: "Boutique Hospitality",
    opportunity_amount: 32000000,
    stage: "Concept Presentation",
    probability: 50,
    expected_closing: "2026-12-15",
    contact_email: "development@aman.com",
    contact_mobile: "+41 41 874 1200",
    city: "Ras Al Khaimah Jebel Jais",
    description: "Ultra-luxury cliffside retreat featuring 28 private mountain pavilions with natural earth ram-packed walls."
  },
  {
    id: "CRM-OPP-2026-03",
    party_name: "Baroness Veronika Von Habsburg",
    opportunity_type: "Luxury Residential",
    opportunity_amount: 6800000,
    stage: "Contract Negotiation",
    probability: 90,
    expected_closing: "2026-11-10",
    contact_email: "vvh@vhh-holdings.at",
    contact_mobile: "+43 1 710 8820",
    city: "Downtown Dubai Opera District",
    description: "Triplex penthouse renovation featuring custom Roman Travertine staircase and bespoke acoustic screening."
  },
  {
    id: "CRM-OPP-2026-04",
    party_name: "Caviar Kaspia Private Members Club",
    opportunity_type: "Private Commercial",
    opportunity_amount: 4500000,
    stage: "Prospecting",
    probability: 30,
    expected_closing: "2027-01-20",
    contact_email: "expansion@caviarkaspia.com",
    contact_mobile: "+33 1 42 65 33 32",
    city: "DIFC Gate Village",
    description: "Speakeasy lounge and VIP dining club requiring deep moody velvet, smoked oak paneling, and antique brass bar."
  }
];

// ERPNext Support: Issues & Warranty Claims
export const INITIAL_SUPPORT_ISSUES = [
  {
    id: "ISS-2026-001",
    subject: "Post-Handover Marble Vein Resealing - Master Spa",
    customer: "Tariq & Reem Al-Ghurair",
    project: "PRJ-2026-001",
    projectName: "Villa Al-Manara Sanctuary",
    priority: "Medium",
    issue_type: "Maintenance Service",
    status: "Replied",
    opening_date: "2026-10-18",
    resolution_details: "Stone care specialist Antolini scheduled for biannual dry-crystallization treatment."
  },
  {
    id: "ISS-2026-002",
    subject: "Sub-Zero Wine Vault Temperature Sensor Calibration",
    customer: "Elena Rostova",
    project: "PRJ-2026-002",
    projectName: "The Obsidian Sky Penthouse",
    priority: "High",
    issue_type: "Defect Warranty",
    status: "Open",
    opening_date: "2026-10-21",
    resolution_details: "HVAC automation technician disptached to test Modbus controller board."
  },
  {
    id: "ISS-2026-003",
    subject: "Annual Acoustic Wall Fabric Nanocoating Inspection",
    customer: "Al-Rawda Hospitality Group",
    project: "PRJ-2026-003",
    projectName: "Al-Rawda Sanctuary Hotel",
    priority: "Low",
    issue_type: "Material Wear",
    status: "Resolved",
    opening_date: "2026-10-05",
    resolution_details: "Certified stain-resistant treatment reapplied across executive boardroom."
  }
];

// ERPNext Subcontracting Orders
export const INITIAL_SUBCONTRACT_ORDERS = [
  {
    id: "SCO-2026-001",
    supplier: "MarbleCraft Italia Subcontractors",
    project: "PRJ-2026-001",
    projectName: "Villa Al-Manara Sanctuary",
    service_item: "High-Pressure Waterjet Inlay Cutting",
    rate: 28000,
    status: "In Process"
  },
  {
    id: "SCO-2026-002",
    supplier: "Lutron HomeWorks Integration Partner",
    project: "PRJ-2026-002",
    projectName: "The Obsidian Sky Penthouse",
    service_item: "Architectural Lighting Control Programming & Commissioning",
    rate: 19500,
    status: "Completed"
  }
];

// Live Frappe / ERPNext REST API Integration Settings
export const INITIAL_API_CONFIG = {
  server_url: "http://localhost:8000",
  api_key: "f7a9302b184e90c",
  api_secret: "****************",
  connected: false,
  last_sync: "2026-10-23T09:40:00Z",
  auto_sync: true,
  sync_interval_mins: 15
};
