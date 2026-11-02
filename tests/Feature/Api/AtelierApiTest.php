<?php

use App\Models\User;
use Laravel\Sanctum\Sanctum;

it('reports API health without auth', function () {
    $this->getJson('/api/v1/health')
        ->assertOk()
        ->assertJsonPath('status', 'online')
        ->assertJsonStructure(['modules_active']);
});

it('rejects unauthenticated atelier requests', function () {
    $this->getJson('/api/v1/accounts/chart-of-accounts')->assertUnauthorized();
});

it('returns the chart of accounts when authenticated', function () {
    Sanctum::actingAs(User::factory()->create());

    $this->getJson('/api/v1/accounts/chart-of-accounts')
        ->assertOk()
        ->assertJsonPath('message', 'success')
        ->assertJsonStructure(['data']);
});

it('returns suppliers and purchase orders when authenticated', function () {
    Sanctum::actingAs(User::factory()->create());

    $this->getJson('/api/v1/buying/suppliers')->assertOk()->assertJsonStructure(['data']);
    $this->getJson('/api/v1/buying/purchase-orders')->assertOk()->assertJsonStructure(['data']);
});

it('rejects an unbalanced journal entry', function () {
    Sanctum::actingAs(User::factory()->create());

    $this->postJson('/api/v1/accounts/journal-entries', [
        'voucher_type' => 'Journal Entry',
        'posting_date' => '2026-10-01',
        'accounts' => [
            ['account' => '1110 - Cash', 'debit' => 100, 'credit' => 0],
            ['account' => '4110 - Income', 'debit' => 0, 'credit' => 90],
        ],
        'user_remark' => 'test',
    ])->assertStatus(422)->assertJsonPath('error', 'UnbalancedJournalEntry');
});

it('posts a balanced journal entry', function () {
    Sanctum::actingAs(User::factory()->create());

    $this->postJson('/api/v1/accounts/journal-entries', [
        'voucher_type' => 'Journal Entry',
        'posting_date' => '2026-10-01',
        'accounts' => [
            ['account' => '1110 - Cash', 'debit' => 100, 'credit' => 0],
            ['account' => '4110 - Income', 'debit' => 0, 'credit' => 100],
        ],
        'user_remark' => 'balanced',
    ])->assertStatus(201)->assertJsonPath('data.docstatus', 1);
});
