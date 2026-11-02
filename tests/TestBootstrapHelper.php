<?php

/**
 * One-time test bootstrap used by Tests\TestCase. The ERP plugin schema and
 * seeds are provisioned by the migration/seed commands; this hook exists so the
 * suite can perform any required first-run setup. It is intentionally a no-op
 * when the database is already provisioned.
 */
class TestBootstrapHelper
{
    public static function ensureERPInstalled(): void
    {
        // Plugins are provisioned via `php artisan migrate`; nothing to do here.
    }
}
