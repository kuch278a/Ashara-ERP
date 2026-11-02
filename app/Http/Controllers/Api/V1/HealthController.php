<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;

class HealthController extends Controller
{
    public function index()
    {
        return response()->json([
            'status' => 'online',
            'erp_system' => 'Ashara Atelier ERP',
            'engine' => 'AureusERP / Laravel 13 Core',
            'erpnext_version' => 'v16.51.1-compatible',
            'timestamp' => now()->toIso8601String(),
            'accounting_standard' => 'IFRS / Double-Entry Perpetual',
            'valuation_method' => 'FIFO / Moving Average',
            'currency' => 'USD',
            'modules_active' => [
                'accounts', 'buying', 'stock', 'manufacturing',
                'assets', 'crm', 'support', 'projects', 'desk',
            ],
        ]);
    }
}
