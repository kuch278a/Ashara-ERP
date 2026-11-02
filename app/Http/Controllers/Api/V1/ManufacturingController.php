<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;

class ManufacturingController extends Controller
{
    public function boms()
    {
        $boms = [
            ['id' => 'BOM-MLW-OAK-001', 'item' => 'MLW-OAK-04', 'item_name' => 'Fluted Smoked Oak Wall System', 'total_cost' => 31500, 'raw_materials_count' => 4, 'operations_count' => 3],
            ['id' => 'BOM-LGT-CHM-002', 'item' => 'LGT-CHM-02', 'item_name' => 'Sculptural Brass Ribbon Chandelier', 'total_cost' => 22000, 'raw_materials_count' => 3, 'operations_count' => 4],
        ];

        return response()->json(['message' => 'success', 'data' => $boms]);
    }

    public function workOrders()
    {
        $workOrders = [
            ['id' => 'MFG-WO-2026-014', 'production_item' => 'MLW-OAK-04', 'projectName' => 'Penthouse One Palm Jumeirah', 'status' => 'In Process', 'qty' => 1, 'planned_start_date' => '2026-10-14', 'planned_end_date' => '2026-11-04', 'lead_artisan' => 'Matteo Rossi'],
            ['id' => 'MFG-WO-2026-019', 'production_item' => 'LGT-CHM-02', 'projectName' => 'Villa Al-Manara Sanctuary', 'status' => 'Completed', 'qty' => 1, 'planned_start_date' => '2026-09-20', 'planned_end_date' => '2026-10-12', 'lead_artisan' => 'Lorenzo Castelli'],
        ];

        return response()->json(['message' => 'success', 'data' => $workOrders]);
    }
}
