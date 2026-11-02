<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;

class AssetsController extends Controller
{
    public function index()
    {
        $assets = [
            ['id' => 'AST-WRK-001', 'asset_name' => 'Dual RTX 6000 Ada BIM Workstations (Cluster)', 'gross_purchase_amount' => 48000, 'opening_accumulated_depreciation' => 12000, 'current_value' => 36000, 'status' => 'In Use'],
            ['id' => 'AST-LIB-002', 'asset_name' => 'Architectural Rare Material Archive & Sliding Vitrines', 'gross_purchase_amount' => 165000, 'opening_accumulated_depreciation' => 25000, 'current_value' => 140000, 'status' => 'In Use'],
        ];

        return response()->json(['message' => 'success', 'data' => $assets]);
    }
}
