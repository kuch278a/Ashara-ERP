# Backend repair — ASHARA ERP (Laravel + AureusERP)

This repository arrived incomplete. The following was reconstructed on 2026-11-02.

## What was missing and is now restored

| Item | Status | Notes |
|---|---|---|
| `composer.json` | **Restored** | Rebuilt from `vendor/composer/installed.json` (173 require + 47 require-dev) by `scripts/rebuild-composer.cjs`. |
| Plugin autoload | **Restored** | `Webkul\*` PSR-4 maps are inlined from `plugins/*/composer.json` (merge-plugin only merges on install/update). `composer dump-autoload -o` → 15,763 classes. |
| `artisan` | **Restored** | Recreated the Laravel 13 console entrypoint. |
| `.env` | **Created** | DB = PostgreSQL (SQLite is **unsupported** by AureusERP's dialect layer: only `mysql`/`mariadb`/`pgsql`). |
| `.gitignore` | **Added** | Standard Laravel ignores. |
| `.env.example`, `docker-compose.yml` (Postgres 16) | Added earlier | Database configuration. |
| `package.json` | **Restored** | Rebuilt from `node_modules` (86 devDependencies) by `scripts/rebuild-package.cjs`. |

## Boot blocker — resolved

`php artisan` hung during bootstrap because plugin boot calls `Package::isPluginInstalled()`, which queries
the database. With an unreachable Postgres the connection attempt blocked. Root cause found by bisecting
`bootstrap/providers.php` (the offender surfaced through `Webkul\Account\AccountServiceProvider`).

**Fix:** provide a reachable database. A private Postgres 16 cluster was initialised and started:

```bash
# data dir: C:\Users\X\.local\share\kilo\pgdata  (trust auth, port 5432)
"C:\Program Files\PostgreSQL\16\bin\initdb.exe" -D "C:\Users\X\.local\share\kilo\pgdata" -U postgres -A trust -E UTF8
"C:\Program Files\PostgreSQL\16\bin\postgres.exe" -D "C:\Users\X\.local\share\kilo\pgdata" -p 5432
"C:\Program Files\PostgreSQL\16\bin\createdb.exe" -U postgres -h 127.0.0.1 -p 5432 ashara_erp
php artisan migrate --force
```

Result: `Laravel Framework 13.31.0`; ~80 migrations applied cleanly; API responds:
`GET /api/v1/health` → 200, `GET /api/v1/accounts/chart-of-accounts` → 200.

> The pre-existing Windows service `postgresql-x64-16` could not be started (needs admin); a
> **user-owned cluster** is used instead. `pdo_sqlite`/`sqlite3` were enabled in `php.ini` but are not
> usable for this app.

## Real API already present

The AureusERP plugins expose a full REST API under `admin/api/v1/*` (partners, support, currencies,
states, UoM, …) with controllers, form-requests, resources and policies. The app's own `routes/api.php`
provides the atelier-specific `api/v1/*` endpoints (currently mock closures — see remaining work).

## Remaining work (feature, not repair)

- **L3:** promote the atelier endpoints in `routes/api.php` from mock closures to controllers/resources
  backed by the plugin models; add auth (Sanctum) + validation + idempotency.
- **L4:** SPA data layer (React Query) against those endpoints.
- Root `package.json` is restored, but `vite.config.js` / `tailwind.config.js` / `postcss.config.js`
  and `resources/css/app.css` / `resources/js/app.js` are still missing (prebuilt `public/build`
  assets are present, so the app runs without rebuilding).
- Git: `.git` had no HEAD; `git init` recreated it, but the pre-existing index is inconsistent
  (large staged-deletion set). Reset before committing: `git rm -r --cached . ; git add . ; git status`.
- Some plugin test-helper classes do not comply with PSR-4 (harmless; skipped by the autoloader).

## Reproduce

```bash
node scripts/rebuild-composer.cjs
composer dump-autoload -o
cp .env.example .env          # then set DB_* to a reachable Postgres
php artisan key:generate
php artisan migrate --force
```
