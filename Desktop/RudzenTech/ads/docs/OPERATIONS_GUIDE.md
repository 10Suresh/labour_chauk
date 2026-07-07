# AdsenseManager — Operations Guide

Enterprise operations reference for production deployment and maintenance.

---

## 1. Deployment

### Backend

```bash
cd adsensemanager-backend
cp .env.example .env   # configure all production values
npm ci
npm run start          # or PM2: pm2 start src/index.js --name adsense-api
```

### Frontend

```bash
cd adsensemanager-frontend
cp .env.example .env   # VITE_API_BASE_URL, feature flags
npm ci
npm run build
# Serve dist/ via nginx, Vercel, or static host
```

### Pre-deploy checklist

- `NODE_ENV=production`
- Strong `JWT_SECRET` (not default)
- `MONGODB_BACKUP_ENABLED=true` after Atlas backups confirmed
- `ADMIN_EMAILS` set for diagnostics access
- Health: `GET /api/health` returns `status: ok`

---

## 2. Rollback

1. **Frontend:** redeploy previous `dist` artifact or git tag.
2. **Backend:** `pm2 stop adsense-api` → checkout previous tag → `npm ci` → `pm2 start`.
3. **Database:** do not roll back MongoDB unless restoring from backup (see §3).
4. Verify `/api/health` and dashboard load after rollback.

---

## 3. Backup & Restore

### Enable automated backups (MongoDB Atlas)

1. Atlas → Cluster → **Backup** → enable **Cloud Backup** (M10+).
2. Set retention policy (recommended: 7+ daily snapshots).
3. On the server, set:

```env
MONGODB_BACKUP_ENABLED=true
MONGODB_BACKUP_PROVIDER=atlas
```

### Verification

Before daily retention cleanup (4:00 AM IST), the app calls `verifyBackupStatus()`:

- If `MONGODB_BACKUP_ENABLED=true` → logs **passed**
- Otherwise → logs **warning** and continues (does not stop the app)

### Restore procedure (Atlas)

1. Atlas → **Backup** → select snapshot → **Restore**.
2. Restore to a **new** cluster or download snapshot for point-in-time recovery.
3. Update `MONGO_URI` to restored cluster (or fail over DNS).
4. Restart API; verify sync crons and `/api/health`.
5. Compare row counts for latest dates before re-enabling traffic.

### Manual retention (ops)

```bash
npm run retention:cleanup
```

---

## 4. Environment Variables

### Backend (required in production)

| Variable | Purpose |
|----------|---------|
| `MONGO_URI` | MongoDB connection |
| `JWT_SECRET` | Auth signing |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | OAuth |
| `GOOGLE_CALLBACK_URL` | OAuth callback |
| `FRONTEND_REDIRECT_URL` | Post-login redirect |
| `TABOOLA_CLIENT_ID` / `TABOOLA_CLIENT_SECRET` | Taboola API |

### Backend (operations)

| Variable | Default | Purpose |
|----------|---------|---------|
| `MONGODB_BACKUP_ENABLED` | false | Confirm backups before retention |
| `ADMIN_EMAILS` | TABOOLA_ENABLED_EMAIL | Diagnostics access |
| `ADMIN_API_KEY` | — | Optional API key for admin routes |
| `RETENTION_DAYS` | 60 | Data retention window |
| `FEATURE_TRAFFIC_ROI` | true | Module toggle |
| `FEATURE_ADMIN_DIAGNOSTICS` | true | Admin diagnostics API |

See `config/appConfig.js` for full list (cron schedules, rate limits, health thresholds).

### Frontend

| Variable | Purpose |
|----------|---------|
| `VITE_API_BASE_URL` | API base URL |
| `VITE_FEATURE_*` | Mirror backend feature flags |

---

## 5. Cron Schedule (IST)

| Schedule | Job |
|----------|-----|
| `0 * * * *` | AdSense + Ad Manager hourly sync |
| `*/30 * * * *` | Taboola today + yesterday |
| `0 2 * * *` | Taboola historical (7 days) |
| `0 4 * * *` | Centralized retention cleanup |

Override via `REPORT_HOURLY_CRON`, `TABOOLA_FREQUENT_CRON`, `TABOOLA_HISTORICAL_CRON`, `RETENTION_CRON_SCHEDULE`.

---

## 6. Monitoring

### Health endpoint

```bash
curl https://your-api.example.com/api/health
```

Returns: database status, last sync times, retention cleanup, sync mode, reporting delay, version, uptime, memory, feature flags. **No secrets exposed.**

### Admin diagnostics (authenticated)

- **API:** `GET /api/admin/diagnostics` (admin email or `X-Admin-Api-Key`)
- **UI:** `/admin/diagnostics` (same auth via JWT)

### Logs

Winston daily rotate files in `logs/`:

- `combined-YYYY-MM-DD.log`
- `info-YYYY-MM-DD.log`
- `error-YYYY-MM-DD.log`

Structured fields: `requestId`, `durationMs`, `collection`, `recordsProcessed`, `status`, `jobId`.

### PM2

```bash
pm2 logs adsense-api
pm2 monit
pm2 restart adsense-api   # graceful SIGTERM → jobs finish → DB close
```

---

## 7. Troubleshooting

| Symptom | Check |
|---------|-------|
| Health `degraded` | MongoDB connection, `MONGO_URI` |
| Stale Taboola data | `/api/health` → `sync.taboola`, Taboola cron logs |
| Retention not running | 4 AM IST cron, `logs/info-*.log` for `[Retention]` |
| 403 on diagnostics | User email in `ADMIN_EMAILS` |
| High memory | `memory` in health; restart PM2 if sustained growth |

---

## 8. Common Recovery Commands

```bash
# Health check
curl -s http://localhost:5000/api/health | jq .

# Manual Taboola sync
npm run taboola:sync

# Manual retention
npm run retention:cleanup

# Verify Taboola setup
npm run taboola:verify

# Graceful PM2 restart
pm2 reload adsense-api
```

---

## 9. Feature Freeze — Traffic ROI

The Traffic ROI module is **feature-frozen** after this release. Future changes only from production feedback and business requirements. Disable modules via feature flags without code changes.

---

## 10. Final Acceptance Checklist

- [ ] `npm run build` (frontend) succeeds
- [ ] `tsc --noEmit` / no TypeScript errors
- [ ] No console errors in browser (production build)
- [ ] `/api/health` returns expected fields
- [ ] Retention cleanup runs (manual or 4 AM cron)
- [ ] All syncs complete (AdSense, Ad Manager, Taboola)
- [ ] Exports match dashboard totals
- [ ] Dashboard calculations match MongoDB spot-check
- [ ] Mobile, desktop, dark mode verified
- [ ] Admin diagnostics accessible to admin only
- [ ] `npm audit` — no unresolved high-severity issues
