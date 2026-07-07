# AdsenseManager — Production Go-Live Guide

## Definition of Done

The Traffic ROI module is **feature-frozen**. Deploy with confidence; evolve only from real production feedback.

---

## 1. Centralized 60-Day Retention Policy

**Service:** `src/services/retention/retentionCleanupService.js`  
**Cron:** Daily **4:00 AM IST** (`retentionCron.js`)

### Collections cleaned (reporting data only)

| Collection | Date field | Notes |
|------------|------------|-------|
| `adsenserows` | `date` | AdSense reports |
| `admanagerrows` | `reportDate` | Ad Manager reports |
| `taboola_country_reports` | `date` | Taboola spend |
| `revenue_snapshots` | `reportDate` | KPI snapshots |
| `taboola_sync_meta` | trimmed | Keeps last 10 docs; trims old `date_results` |

**Traffic ROI** has no persistent collection — computed at query time from the collections above.

### Never deleted

Users, websites, accounts, currency settings, goals, credentials, configuration.

### Logs (Winston)

```
Retention cleanup started
Retention cleanup collection complete { collection, deleted, cutoffDate }
Retention cleanup completed successfully
```

### Manual run (ops only)

```bash
node -e "require('./config/db')().then(() => require('./src/services/retention/retentionCleanupService').runRetentionCleanup().then(console.log).finally(() => process.exit()))"
```

---

## 2. Cron Schedule (IST)

| Time | Job |
|------|-----|
| Every hour | AdSense + Ad Manager sync + per-account incremental 60-day delete |
| Every 30 min | Taboola today + yesterday sync |
| 2:00 AM | Taboola historical (7 days) |
| **4:00 AM** | **Centralized retention cleanup (all collections)** |

---

## 3. Environment Validation

On startup, `config/validateEnv.js` runs **before** the server binds.

**Production requires:**

- `MONGO_URI`
- `JWT_SECRET` (not default)
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
- `GOOGLE_CALLBACK_URL`
- `FRONTEND_REDIRECT_URL`
- `TABOOLA_CLIENT_ID` / `TABOOLA_CLIENT_SECRET`

Missing values → **process exits with clear error**.

---

## 4. Security

| Control | Implementation |
|---------|----------------|
| Helmet | Secure HTTP headers |
| Compression | Response compression |
| Rate limiting | Global 600/15min; auth 60/15min (production) |
| CORS | `config/corsConfig.js` |
| Dev routes | `/api/dev/*` → **404 in production** |
| Staging dev routes | `DEV_ADMIN_API_KEY` + `X-Admin-Api-Key` header |
| Secrets | `.env` in `.gitignore` — never commit |

---

## 5. Health Endpoint

```
GET /api/health
```

```json
{
  "status": "ok",
  "database": "connected",
  "taboola": "healthy",
  "lastSuccessfulSync": "2026-07-08T...",
  "syncMode": "network",
  "reportingDelay": "2 Hours",
  "taboolaDataAvailableTill": "2026-07-07",
  "version": "1.0.0",
  "timestamp": "..."
}
```

No secrets exposed.

---

## 6. Backup Strategy

**Before relying on retention cleanup in production:**

1. Enable **MongoDB Atlas automated backups** (continuous cloud backup recommended).
2. Set backup retention ≥ 60 days if you need recovery beyond the application window.
3. Application retention deletes **only** reporting rows — backups are your recovery path.

### Restore procedure

1. Identify target date from Atlas backup snapshot.
2. Restore to a temporary cluster or collection namespace.
3. Export required date range and re-import if needed.
4. Re-run Taboola sync for missing days: `npm run taboola:resync` (local ops only).

---

## 7. Deployment Steps

### Backend

```bash
cd adsensemanager-backend
cp .env.example .env   # fill all values
export NODE_ENV=production
npm install --production
npm start
```

Verify: `curl https://your-api.example.com/api/health`

### Frontend

```bash
cd adsensemanager-frontend
# Set VITE_API_URL and VITE_NODE_ENV=production in build environment
npm install
npm run build
# Deploy dist/ to static host (e.g. finance.rudzen.com)
```

---

## 8. Provider Architecture

```
Traffic Providers (Taboola → MongoDB)
        ↓
trafficRoiDataLoader (merge by date|countryCode)
        ↓
Revenue Providers (AdSense + Ad Manager → MongoDB)
        ↓
trafficRoiService + trafficIntelligenceService
        ↓
Dashboard API (/api/adsense/offline/allresports)
```

**Future sources:** Register new provider in `src/providers/traffic/` or `revenue/` — no dashboard redesign.

---

## 9. Troubleshooting

| Issue | Check |
|-------|-------|
| Traffic ROI empty | `GET /api/health` → taboola status; eligible user email |
| Stale Taboola data | `lastSuccessfulSync`, `reportingDelay` in health |
| Retention too aggressive | Cutoff is IST `today - 60 days`; verify Atlas backup |
| Dev routes in prod | `NODE_ENV` must be `production` |
| OAuth failures | OAuth client ID matches environment (prod vs dev prefix) |
| Export mismatch | Export uses same `trafficIntelligence.countries` as dashboard filters |

---

## 10. Final QA Checklist

- [ ] `NODE_ENV=production` on server
- [ ] Strong `JWT_SECRET`
- [ ] `GET /api/health` returns `status: ok`
- [ ] `/api/dev/*` returns 404
- [ ] MongoDB Atlas backups enabled
- [ ] Retention cron logged after 4:00 AM IST
- [ ] Dashboard matches MongoDB for yesterday India spend
- [ ] CSV/Excel/PDF export matches filtered countries
- [ ] Mobile + desktop + dark mode
- [ ] `npm run build` succeeds (frontend)
- [ ] No secrets in logs or frontend bundle

---

## 11. Feature Freeze

No new functionality unless driven by **real production usage**. Monitor via:

- `/api/health`
- Winston logs (`logs/combined-*.log`)
- Daily Alerts panel in dashboard

Evolve based on business feedback, not speculative features.
