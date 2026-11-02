<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;

class BuyingController extends Controller
{
    public function suppliers()
    {
        $suppliers = [
            ['id' => 'SUP-ANT-01', 'supplier_name' => 'Antolini Luigi & C. SpA', 'supplier_group' => 'Quarries & Natural Stone', 'country' => 'Italy', 'rating' => 4.9, 'lead_time_days' => 42, 'payment_terms' => '50% Advance, 50% on Bill of Lading', 'total_orders_value' => 840000],
            ['id' => 'SUP-HNG-02', 'supplier_name' => 'Henge Atelier s.r.l.', 'supplier_group' => 'Artisan Lighting & Metals', 'country' => 'Italy', 'rating' => 5.0, 'lead_time_days' => 84, 'payment_terms' => '30% Deposit, 70% Prior to Air Freight', 'total_orders_value' => 620000],
            ['id' => 'SUP-POL-03', 'supplier_name' => 'Poliform SpA', 'supplier_group' => 'Bespoke Joinery & Systems', 'country' => 'Italy', 'rating' => 4.8, 'lead_time_days' => 56, 'payment_terms' => 'Net 30 Days Letter of Credit', 'total_orders_value' => 1250000],
            ['id' => 'SUP-SLV-04', 'supplier_name' => 'Salvatori Stone Workshop', 'supplier_group' => 'Architectural Finishes', 'country' => 'Italy', 'rating' => 4.9, 'lead_time_days' => 35, 'payment_terms' => '40% Milestone Draw', 'total_orders_value' => 430000],
        ];

        return response()->json(['message' => 'success', 'data' => $suppliers]);
    }

    public function purchaseOrders()
    {
        $pos = [
            ['id' => 'PO-2026-042', 'supplier_name' => 'Antolini Luigi & C. SpA', 'projectName' => 'Villa Al-Manara Sanctuary', 'project' => 'PRJ-2026-001', 'transaction_date' => '2026-10-04', 'schedule_date' => '2026-11-15', 'status' => 'To Receive and Bill', 'grand_total' => 184500, 'items_count' => 3],
            ['id' => 'PO-2026-045', 'supplier_name' => 'Henge Atelier s.r.l.', 'projectName' => 'Villa Al-Manara Sanctuary', 'project' => 'PRJ-2026-001', 'transaction_date' => '2026-10-08', 'schedule_date' => '2026-12-01', 'status' => 'In Production', 'grand_total' => 96000, 'items_count' => 2],
            ['id' => 'PO-2026-048', 'supplier_name' => 'Poliform SpA', 'projectName' => 'Penthouse One Palm Jumeirah', 'project' => 'PRJ-2026-002', 'transaction_date' => '2026-10-11', 'schedule_date' => '2026-11-30', 'status' => 'Draft', 'grand_total' => 240000, 'items_count' => 5],
        ];

        return response()->json(['message' => 'success', 'data' => $pos]);
    }
}
