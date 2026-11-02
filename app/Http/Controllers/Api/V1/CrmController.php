<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;

class CrmController extends Controller
{
    public function opportunities()
    {
        $opps = [
            ['id' => 'CRM-OPP-2026-091', 'title' => 'Al-Barari Royal Biophilic Sanctuary', 'client' => 'H.E. Sheikh Majid Al-Qasimi', 'stage' => 'Proposal & Concept Review', 'opportunity_amount' => 850000, 'probability' => 70],
            ['id' => 'CRM-OPP-2026-094', 'title' => 'Bulgari Island Private Horizon Villa', 'client' => 'Valeria & Marco Benetti', 'stage' => 'Fee Quotation Sent', 'opportunity_amount' => 1250000, 'probability' => 50],
            ['id' => 'CRM-OPP-2026-098', 'title' => 'DIFC Private Family Office Suite', 'client' => 'Nawaf Investment Trust', 'stage' => 'Contract Finalization', 'opportunity_amount' => 480000, 'probability' => 90],
        ];

        return response()->json(['message' => 'success', 'data' => $opps]);
    }
}
