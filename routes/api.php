<?php

use App\Http\Controllers\Api\V1\AccountsController;
use App\Http\Controllers\Api\V1\AssetsController;
use App\Http\Controllers\Api\V1\BuyingController;
use App\Http\Controllers\Api\V1\CrmController;
use App\Http\Controllers\Api\V1\DeskController;
use App\Http\Controllers\Api\V1\HealthController;
use App\Http\Controllers\Api\V1\ManufacturingController;
use App\Http\Controllers\Api\V1\StockController;
use App\Http\Controllers\Api\V1\SupportController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Ashara Atelier ERP - RESTful API Kernel (ERPNext v16 / AureusERP)
|--------------------------------------------------------------------------
| Thin routes; logic lives in Api\V1 controllers. Everything except the
| health heartbeat is protected by Sanctum (bearer tokens).
*/

Route::prefix('v1')->group(function () {
    // 0. Health & Heartbeat (public)
    Route::get('/health', [HealthController::class, 'index']);

    Route::middleware('auth:sanctum')->group(function () {
        // 1. Accounts & Financial Kernel
        Route::prefix('accounts')->group(function () {
            Route::get('/chart-of-accounts', [AccountsController::class, 'chartOfAccounts']);
            Route::get('/general-ledger', [AccountsController::class, 'generalLedger']);
            Route::post('/journal-entries', [AccountsController::class, 'postJournalEntry']);
            Route::get('/reports/balance-sheet', [AccountsController::class, 'balanceSheet']);
            Route::get('/reports/profit-and-loss', [AccountsController::class, 'profitAndLoss']);
            Route::get('/reports/trial-balance', [AccountsController::class, 'trialBalance']);
        });

        // 2. Buying & Procurement
        Route::prefix('buying')->group(function () {
            Route::get('/suppliers', [BuyingController::class, 'suppliers']);
            Route::get('/purchase-orders', [BuyingController::class, 'purchaseOrders']);
        });

        // 3. Stock & Warehousing
        Route::prefix('stock')->group(function () {
            Route::get('/items', [StockController::class, 'items']);
            Route::get('/warehouses', [StockController::class, 'warehouses']);
            Route::get('/ledger', [StockController::class, 'ledger']);
        });

        // 4. Manufacturing & Work Orders
        Route::prefix('manufacturing')->group(function () {
            Route::get('/boms', [ManufacturingController::class, 'boms']);
            Route::get('/work-orders', [ManufacturingController::class, 'workOrders']);
        });

        // 5. Fixed Assets Register
        Route::get('/assets', [AssetsController::class, 'index']);

        // 6. CRM & Tenders
        Route::prefix('crm')->group(function () {
            Route::get('/opportunities', [CrmController::class, 'opportunities']);
        });

        // 7. Support & Maintenance
        Route::prefix('support')->group(function () {
            Route::get('/issues', [SupportController::class, 'issues']);
        });

        // 8. DocType Metadata Registry (ERPNext v16 Specification)
        Route::prefix('desk')->group(function () {
            Route::get('/doctypes', [DeskController::class, 'doctypes']);
        });
    });
});
