<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;

class StockController extends Controller
{
    public function items()
    {
        $items = [
            ['item_code' => 'MAT-TRV-01', 'item_name' => 'Honed Roman Travertine Slabs', 'item_group' => 'Natural Stone Slabs', 'valuation_method' => 'FIFO', 'valuation_rate' => 266.67, 'qty_on_hand' => 240, 'stock_uom' => 'm²', 'default_warehouse' => 'WH-DEPOT-01'],
            ['item_code' => 'LGT-CHM-02', 'item_name' => 'Sculptural Brass Ribbon Chandelier', 'item_group' => 'Bespoke Lighting', 'valuation_method' => 'Moving Average', 'valuation_rate' => 22000, 'qty_on_hand' => 1, 'stock_uom' => 'Nos', 'default_warehouse' => 'WH-DEPOT-01'],
            ['item_code' => 'MLW-OAK-04', 'item_name' => 'Fluted Smoked Oak Architectural Wall System', 'item_group' => 'Millwork & Joinery', 'valuation_method' => 'FIFO', 'valuation_rate' => 31500, 'qty_on_hand' => 1, 'stock_uom' => 'Set', 'default_warehouse' => 'WH-ON-SITE-02'],
        ];

        return response()->json(['message' => 'success', 'data' => $items]);
    }

    public function warehouses()
    {
        $warehouses = [
            ['id' => 'WH-DEPOT-01', 'warehouse_name' => 'Al Quoz Central Logistics Depot', 'warehouse_type' => 'Central Depot', 'location' => 'Dubai Al Quoz Industrial 3'],
            ['id' => 'WH-TRNS-MIL', 'warehouse_name' => 'Transit Hub Milan (Malpensa)', 'warehouse_type' => 'Air Freight Transit', 'location' => 'Milan Malpensa Cargo City, Italy'],
            ['id' => 'WH-ON-SITE-01', 'warehouse_name' => 'Villa Al-Manara On-Site Staging', 'warehouse_type' => 'Site Fit-Out Staging', 'location' => 'Jumeirah Bay Island, Dubai'],
            ['id' => 'WH-ON-SITE-02', 'warehouse_name' => 'One Palm Penthouse Staging', 'warehouse_type' => 'Site Fit-Out Staging', 'location' => 'Palm Jumeirah Crescent, Dubai'],
        ];

        return response()->json(['message' => 'success', 'data' => $warehouses]);
    }

    public function ledger()
    {
        $ledger = [
            ['id' => 'SLE-2026-001', 'posting_date' => '2026-10-10', 'posting_time' => '09:30:00', 'item_code' => 'MAT-TRV-01', 'warehouse' => 'WH-DEPOT-01', 'voucher_type' => 'Purchase Receipt', 'voucher_no' => 'PREC-2026-042', 'actual_qty' => 240, 'valuation_rate' => 266.67, 'stock_value' => 64000],
            ['id' => 'SLE-2026-002', 'posting_date' => '2026-10-14', 'posting_time' => '14:15:00', 'item_code' => 'LGT-CHM-02', 'warehouse' => 'WH-TRNS-MIL', 'voucher_type' => 'Purchase Receipt', 'voucher_no' => 'PREC-2026-045', 'actual_qty' => 2, 'valuation_rate' => 22000, 'stock_value' => 44000],
            ['id' => 'SLE-2026-004', 'posting_date' => '2026-10-18', 'posting_time' => '16:45:00', 'item_code' => 'MAT-TRV-01', 'warehouse' => 'WH-DEPOT-01', 'voucher_type' => 'Material Transfer', 'voucher_no' => 'STE-2026-081', 'actual_qty' => -60, 'valuation_rate' => 266.67, 'stock_value' => 48000],
        ];

        return response()->json(['message' => 'success', 'data' => $ledger]);
    }
}
