# Traffic ROI — Production Architecture & Operations Guide

## Overview

The Traffic ROI module merges **traffic acquisition cost** (Taboola, future providers) with **revenue** (AdSense + Ad Manager, future providers) by `date|countryCode`, presenting profitability metrics in INR.

**Design principle:** All dashboard analytics are computed from MongoDB. No live third-party API calls during dashboard requests.

---

## Folder Structure

### Backend (`adsensemanager-backend`)

```
src/
├── providers/
│   ├── traffic/          # TaboolaTrafficProvider (+ future Meta, Google Ads, etc.)
│   └── revenue/          # AdSenseRevenueProvider, AdManagerRevenueProvider
├── services/
│   ├── retention/
│   │   ├── retentionPolicy.js           # 60-day policy registry
│   │   └── retentionCleanupService.js   # Centralized cleanup (all reporting collections)
│   ├── trafficRoi/
│   │   ├── trafficRoiDataLoader.js      # Shared MongoDB merge loader
│   │   ├── trafficRoiService.js         # Paginated report + table filters
│   │   ├── trafficIntelligenceService.js  # Alerts, widgets, movers, scores
│   │   └── trafficIntelligenceUtils.js  # Scoring, filters, aggregation
│   └── taboola/
│       └── TaboolaService.js            # Sync + freshness metadata
├── helper/taboola/
│   ├── taboolaAccountDiscovery.js       # Network-aware account sync
│   ├── taboolaEligibility.js            # User gating
│   └── deleteOldTaboolaReports.js       # 60-day retention cleanup
├── cron/
│   ├── reportCron.js                    # AdSense/Ad Manager hourly sync
│   ├── taboolaCron.js                   # Taboola sync
│   └── retentionCron.js                 # Daily 4AM centralized 60-day cleanup
├── models/
│   ├── TaboolaCountryReport.js          # taboola_country_reports
│   └── TaboolaSyncMeta.js               # taboola_sync_meta
└── routes/
    └── devRoutes.js                     # Dev-only (blocked in production)
```

### Frontend (`adsensemanager-frontend`)

```
src/components/trafficRoi/
├── TrafficRoiSection.tsx          # Tab orchestrator
├── TrafficRoiDecisionsPanel.tsx   # Today's decisions
├── TrafficRoiStickySummary.tsx    # Sticky KPIs
├── TrafficRoiTable.tsx            # Desktop table
├── TrafficRoiMobileCountryCards.tsx
├── CountryTrendModal.tsx          # 30-day popup (lazy charts)
└── ...
```

---

## Data Flow

### Traffic Provider Flow

1. **Taboola cron** (`taboolaCron.js`) runs every 30 min + nightly historical sync.
2. `TaboolaService` discovers network/advertiser accounts via API.
3. Country spend is upserted into `taboola_country_reports` keyed by `{date, country_code}`.
4. `TaboolaTrafficProvider.getTrafficByDateCountry()` reads MongoDB for ROI merge.

### Revenue Provider Flow

1. **Report cron** (`reportCron.js`) syncs AdSense + Ad Manager rows hourly.
2. `AdSenseRevenueProvider` / `AdManagerRevenueProvider` aggregate by date+country from MongoDB.
3. `trafficRoiDataLoader.loadTrafficRoiRowsForDates()` merges traffic + revenue maps.
4. Metrics computed: Profit, Return (X), ROI %.

### Dashboard API

`GET /api/adsense/offline/allresports` returns:

- `trafficRoiReport` — paginated daily rows
- `trafficIntelligence` — aggregated country analytics

`GET /api/adsense/offline/traffic-intelligence/country/:code` — 30-day trend series.

---

## Cron Jobs (IST)

| Schedule | Job | Action |
|----------|-----|--------|
| `0 * * * *` | Report hourly | AdSense + Ad Manager sync, 60-day delete per account |
| `*/30 * * * *` | Taboola frequent | Today + yesterday sync |
| `0 2 * * *` | Taboola historical | Last 7 days refresh |
| `0 4 * * *` | Retention cleanup | All reporting collections — 60 days |

---

## MongoDB Collections

| Collection | Purpose | Retention |
|------------|---------|-----------|
| `taboola_country_reports` | Taboola spend by date/country | **60 days** (auto) |
| `taboola_sync_meta` | Sync freshness metadata | Grows slowly |
| `adsenserows` | AdSense revenue | 60 days per user/account |
| `admanagerrows` | Ad Manager revenue | 60 days per user/network |
| `revenue_snapshots` | KPI snapshots | **60 days** (auto) |

### Key Indexes

- `taboola_country_reports`: `{date, country_code}` unique, `{last_sync_time}`, `{date, spent}`
- `adsenserows`: `{userId, accountId, date}`, unique compound
- `admanagerrows`: `{userId, networkId, reportDate}`, unique compound

---

## Environment Variables

### Required (Production)

| Variable | Purpose |
|----------|---------|
| `NODE_ENV` | **Must be `production`** |
| `MONGO_URI` | MongoDB connection |
| `JWT_SECRET` | Strong secret (not default) |
| `GOOGLE_CLIENT_ID` / `SECRET` | OAuth |
| `TABOOLA_CLIENT_ID` / `SECRET` | Taboola API |
| `TABOOLA_ENABLED_EMAIL` | User eligible for Traffic ROI |

### Optional

| Variable | Purpose |
|----------|---------|
| `DEV_ADMIN_API_KEY` | Protects `/api/dev/*` in staging (header: `X-Admin-Api-Key`) |
| `PORT` | Server port (default 5000) |

### Frontend

| Variable | Purpose |
|----------|---------|
| `VITE_API_URL` | Backend URL for API + socket |
| `VITE_NODE_ENV` | Set `production` for prod builds |

---

## Security

- `/api/dev/*` returns **404 in production** (`NODE_ENV=production`).
- In staging: requires `DEV_ADMIN_API_KEY` header when set.
- Removed `/api/dev/taboola/users` (email leak endpoint).

---

## Future Extension Guide

### Add a new traffic source (e.g. Meta Ads)

1. Create `src/providers/traffic/MetaTrafficProvider.js` implementing `getTrafficByDateCountry(dates)`.
2. Register in `src/providers/traffic/index.js`.
3. Store data in a new collection with `{date, country_code}` keys.
4. Add sync cron — no dashboard changes required.

### Add a new revenue source (e.g. Ezoic)

1. Create `src/providers/revenue/EzoicRevenueProvider.js`.
2. Register in `src/providers/revenue/index.js`.
3. Loader automatically merges into `totalRevenueInr`.

---

## Production Deployment Checklist

- [ ] `NODE_ENV=production`
- [ ] Strong `JWT_SECRET`
- [ ] `VITE_NODE_ENV=production` for frontend build
- [ ] Verify Taboola retention cron runs (check logs after 3:30 AM IST)
- [ ] Confirm `/api/dev/*` returns 404
- [ ] Run `npm run build` (frontend) without errors
- [ ] Dashboard loads with Traffic ROI section for eligible user
- [ ] Export CSV matches dashboard country totals
- [ ] Mobile + dark mode smoke test

---

## Local Ops Scripts (do not run on production servers)

```
npm run taboola:sync
npm run taboola:inspect
npm run taboola:resync
```

See also: [PRODUCTION_GO_LIVE.md](./PRODUCTION_GO_LIVE.md) for full deployment, backup, health check, and QA checklist.
