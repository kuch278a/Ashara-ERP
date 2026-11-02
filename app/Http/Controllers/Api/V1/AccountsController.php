<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AccountsController extends Controller
{
    public function chartOfAccounts()
    {
        $coa = [
            [
                'account_number' => '1000',
                'account_name' => 'Application of Funds (Assets)',
                'root_type' => 'Asset',
                'is_group' => 1,
                'balance' => 14820000,
                'children' => [
                    [
                        'account_number' => '1100',
                        'account_name' => 'Current Assets',
                        'root_type' => 'Asset',
                        'is_group' => 1,
                        'balance' => 11220000,
                        'children' => [
                            ['account_number' => '1110', 'account_name' => 'Cash and Bank Balances (Emirates NBD)', 'root_type' => 'Asset', 'is_group' => 0, 'balance' => 4850000],
                            ['account_number' => '1120', 'account_name' => 'Accounts Receivable (Debtors)', 'root_type' => 'Asset', 'is_group' => 0, 'balance' => 597400],
                            ['account_number' => '1130', 'account_name' => 'Stock in Hand (Inventory Asset)', 'root_type' => 'Asset', 'is_group' => 0, 'balance' => 3422600],
                            ['account_number' => '1140', 'account_name' => 'Project Work In Progress (WIP Fit-out)', 'root_type' => 'Asset', 'is_group' => 0, 'balance' => 2350000],
                        ],
                    ],
                    [
                        'account_number' => '1200',
                        'account_name' => 'Fixed Assets',
                        'root_type' => 'Asset',
                        'is_group' => 1,
                        'balance' => 3600000,
                        'children' => [
                            ['account_number' => '1210', 'account_name' => 'Atelier Studio & 3D Render Workstations', 'root_type' => 'Asset', 'is_group' => 0, 'balance' => 850000],
                            ['account_number' => '1220', 'account_name' => 'Material Sample Archives & Library Fixtures', 'root_type' => 'Asset', 'is_group' => 0, 'balance' => 2750000],
                        ],
                    ],
                ],
            ],
            [
                'account_number' => '2000',
                'account_name' => 'Source of Funds (Liabilities)',
                'root_type' => 'Liability',
                'is_group' => 1,
                'balance' => 3180000,
                'children' => [
                    [
                        'account_number' => '2100',
                        'account_name' => 'Current Liabilities',
                        'root_type' => 'Liability',
                        'is_group' => 1,
                        'balance' => 3180000,
                        'children' => [
                            ['account_number' => '2110', 'account_name' => 'Accounts Payable (Creditors / Artisans)', 'root_type' => 'Liability', 'is_group' => 0, 'balance' => 1420000],
                            ['account_number' => '2120', 'account_name' => 'Client Project Escrow Advances', 'root_type' => 'Liability', 'is_group' => 0, 'balance' => 1650000],
                            ['account_number' => '2130', 'account_name' => 'VAT Payable (5% UAE)', 'root_type' => 'Liability', 'is_group' => 0, 'balance' => 110000],
                        ],
                    ],
                ],
            ],
            [
                'account_number' => '3000',
                'account_name' => 'Equity',
                'root_type' => 'Equity',
                'is_group' => 1,
                'balance' => 7500000,
                'children' => [
                    ['account_number' => '3110', 'account_name' => 'Capital Stock - Partners Equity', 'root_type' => 'Equity', 'is_group' => 0, 'balance' => 5000000],
                    ['account_number' => '3120', 'account_name' => 'Retained Earnings', 'root_type' => 'Equity', 'is_group' => 0, 'balance' => 2500000],
                ],
            ],
            [
                'account_number' => '4000',
                'account_name' => 'Income',
                'root_type' => 'Income',
                'is_group' => 1,
                'balance' => 5460000,
                'children' => [
                    ['account_number' => '4110', 'account_name' => 'Architectural & BIM Design Fees', 'root_type' => 'Income', 'is_group' => 0, 'balance' => 3372000],
                    ['account_number' => '4120', 'account_name' => 'FF&E Procurement Commission & Markup', 'root_type' => 'Income', 'is_group' => 0, 'balance' => 1688000],
                    ['account_number' => '4130', 'account_name' => 'Site Supervision & Fit-Out Consultancy', 'root_type' => 'Income', 'is_group' => 0, 'balance' => 400000],
                ],
            ],
            [
                'account_number' => '5000',
                'account_name' => 'Expenses',
                'root_type' => 'Expense',
                'is_group' => 1,
                'balance' => 1320000,
                'children' => [
                    ['account_number' => '5110', 'account_name' => 'Cost of Goods Sold - Materials & Procurement', 'root_type' => 'Expense', 'is_group' => 0, 'balance' => 840000],
                    ['account_number' => '5120', 'account_name' => 'Direct Subcontractor & Engineering Fees', 'root_type' => 'Expense', 'is_group' => 0, 'balance' => 310000],
                    ['account_number' => '5130', 'account_name' => 'Atelier Operating & 3D Cloud Compute Costs', 'root_type' => 'Expense', 'is_group' => 0, 'balance' => 170000],
                ],
            ],
        ];

        return response()->json(['message' => 'success', 'data' => $coa]);
    }

    public function generalLedger(Request $request)
    {
        $account = $request->query('account');
        $voucher = $request->query('voucher_no');

        $entries = [
            ['id' => 'GLE-2026-001', 'posting_date' => '2026-10-01', 'voucher_type' => 'Sales Invoice', 'voucher_no' => 'SINV-2026-089', 'account' => '1120 - Accounts Receivable (Debtors)', 'party' => 'Tariq & Reem Al-Ghurair', 'project' => 'PRJ-2026-001', 'debit' => 141120, 'credit' => 0, 'remarks' => 'Milestone #1 Site Fit-out billing'],
            ['id' => 'GLE-2026-002', 'posting_date' => '2026-10-01', 'voucher_type' => 'Sales Invoice', 'voucher_no' => 'SINV-2026-089', 'account' => '4110 - Architectural & BIM Design Fees', 'party' => 'Tariq & Reem Al-Ghurair', 'project' => 'PRJ-2026-001', 'debit' => 0, 'credit' => 134400, 'remarks' => 'Design fee portion'],
            ['id' => 'GLE-2026-003', 'posting_date' => '2026-10-01', 'voucher_type' => 'Sales Invoice', 'voucher_no' => 'SINV-2026-089', 'account' => '2130 - VAT Payable (5% UAE)', 'party' => 'Federal Tax Authority', 'project' => 'PRJ-2026-001', 'debit' => 0, 'credit' => 6720, 'remarks' => '5% UAE VAT output'],
            ['id' => 'GLE-2026-004', 'posting_date' => '2026-10-05', 'voucher_type' => 'Purchase Invoice', 'voucher_no' => 'PINV-2026-034', 'account' => '1130 - Stock in Hand (Inventory Asset)', 'party' => 'Antolini Luigi & C. SpA', 'project' => 'PRJ-2026-001', 'debit' => 48000, 'credit' => 0, 'remarks' => 'Honed Roman Travertine Intake'],
            ['id' => 'GLE-2026-005', 'posting_date' => '2026-10-05', 'voucher_type' => 'Purchase Invoice', 'voucher_no' => 'PINV-2026-034', 'account' => '2110 - Accounts Payable (Creditors / Artisans)', 'party' => 'Antolini Luigi & C. SpA', 'project' => 'PRJ-2026-001', 'debit' => 0, 'credit' => 48000, 'remarks' => 'Antolini quarry invoice'],
            ['id' => 'GLE-2026-006', 'posting_date' => '2026-10-12', 'voucher_type' => 'Journal Entry', 'voucher_no' => 'JV-2026-012', 'account' => '1140 - Project Work In Progress (WIP Fit-out)', 'party' => 'Emirates Engineering & Acoustic', 'project' => 'PRJ-2026-002', 'debit' => 35000, 'credit' => 0, 'remarks' => 'Acoustic baffle fit-out engineering'],
            ['id' => 'GLE-2026-007', 'posting_date' => '2026-10-12', 'voucher_type' => 'Journal Entry', 'voucher_no' => 'JV-2026-012', 'account' => '2110 - Accounts Payable (Creditors / Artisans)', 'party' => 'Emirates Engineering & Acoustic', 'project' => 'PRJ-2026-002', 'debit' => 0, 'credit' => 35000, 'remarks' => 'Subcontractor provision accrual'],
        ];

        if ($account) {
            $entries = array_values(array_filter($entries, fn ($e) => str_contains($e['account'], $account)));
        }
        if ($voucher) {
            $entries = array_values(array_filter($entries, fn ($e) => str_contains($e['voucher_no'], $voucher)));
        }

        return response()->json([
            'message' => 'success',
            'total_count' => count($entries),
            'data' => $entries,
        ]);
    }

    public function postJournalEntry(Request $request)
    {
        $data = $request->validate([
            'voucher_type' => 'required|string',
            'posting_date' => 'required|date',
            'accounts' => 'required|array|min:2',
            'accounts.*.account' => 'required|string',
            'accounts.*.debit' => 'numeric|min:0',
            'accounts.*.credit' => 'numeric|min:0',
            'user_remark' => 'nullable|string',
        ]);

        $totalDebit = array_sum(array_column($data['accounts'], 'debit'));
        $totalCredit = array_sum(array_column($data['accounts'], 'credit'));

        if (abs($totalDebit - $totalCredit) > 0.01) {
            return response()->json([
                'error' => 'UnbalancedJournalEntry',
                'message' => 'Total Debit ($' . number_format($totalDebit, 2) . ') must equal Total Credit ($' . number_format($totalCredit, 2) . '). Difference: $' . number_format(abs($totalDebit - $totalCredit), 2),
            ], 422);
        }

        $jvId = 'JV-2026-' . rand(100, 999);

        return response()->json([
            'message' => 'Journal Entry posted and ledger updated successfully',
            'data' => array_merge($data, [
                'id' => $jvId,
                'total_debit' => $totalDebit,
                'total_credit' => $totalCredit,
                'docstatus' => 1,
                'status' => 'Submitted',
            ]),
        ], 201);
    }

    public function balanceSheet()
    {
        return response()->json([
            'statement' => 'Statement of Financial Position',
            'as_of' => now()->toDateString(),
            'total_assets' => 14820000,
            'total_liabilities' => 3180000,
            'total_equity' => 7500000,
            'current_period_surplus' => 4140000,
            'total_liabilities_and_equity' => 14820000,
            'balanced' => true,
            'variance' => 0.00,
        ]);
    }

    public function profitAndLoss()
    {
        return response()->json([
            'statement' => 'Statement of Profit and Loss',
            'period' => 'FY 2026 - Present',
            'total_income' => 5460000,
            'total_expenses' => 1320000,
            'net_operating_profit' => 4140000,
            'operating_margin_percentage' => 75.8,
        ]);
    }

    public function trialBalance()
    {
        return response()->json([
            'statement' => 'Trial Balance',
            'total_debits' => 16140000,
            'total_credits' => 16140000,
            'difference' => 0.00,
            'balanced' => true,
        ]);
    }
}
