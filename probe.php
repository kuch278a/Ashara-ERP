<?php

use Illuminate\Contracts\Console\Kernel;

define('LARAVEL_START', microtime(true));

require __DIR__.'/vendor/autoload.php';
echo "autoload ok\n";

$app = require_once __DIR__.'/bootstrap/app.php';
echo "app created in " . round((microtime(true) - LARAVEL_START) * 1000) . "ms\n";

$kernel = $app->make(Kernel::class);
echo "kernel resolved\n";

$kernel->bootstrap();
echo "bootstrapped in " . round((microtime(true) - LARAVEL_START) * 1000) . "ms\n";
