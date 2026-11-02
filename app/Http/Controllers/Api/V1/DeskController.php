<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;

class DeskController extends Controller
{
    public function doctypes()
    {
        $list = [
            'Account', 'GL Entry', 'Journal Entry', 'Sales Invoice',
            'Item', 'Warehouse', 'Stock Entry', 'Stock Ledger Entry',
            'Supplier', 'Purchase Order', 'Purchase Invoice',
            'BOM', 'Work Order', 'Asset', 'Opportunity', 'Issue',
        ];

        return response()->json(['message' => 'success', 'data' => $list]);
    }
}
