# Rohrreinigung Kraft - Project Todos

## ✅ Completed
- [x] Import project from GitHub
- [x] Set up development environment
- [x] Create Google Ads admin dashboard (`/admin/google-ads`)
- [x] Create Google Ads API client library (`/src/lib/google-ads.ts`)
- [x] Create API routes for:
  - [x] Main Google Ads connection (`/api/google-ads`)
  - [x] Conversions management (`/api/google-ads/conversions`)
  - [x] Reports generation (`/api/google-ads/reports`)
  - [x] Campaign management (`/api/google-ads/campaigns`)
- [x] **DEEP ANALYSIS COMPLETED** - See `/docs/google-ads/DEEP_ANALYSIS_MAY_2026.md`
  - [x] Analyzed current campaign structure
  - [x] Identified critical issues (Ad Strength: Poor, QS: 4, Low CPC)
  - [x] Created keyword gap analysis
  - [x] Designed new ad copy (4 complete RSAs)
  - [x] Proposed campaign restructure (3 campaigns)
  - [x] Created implementation checklist

## 🔴 CRITICAL (Fix Today)
- [ ] Max CPC is set to 0.01€ - MUST change to Auto or 4.50€
- [ ] Remove duplicate keywords (24h rohrreinigung nürnberg has Phrase + Exact)
- [ ] Ad Strength is POOR - Replace redundant headlines

## 🟡 HIGH PRIORITY (This Week)
- [ ] Create new ad copy as designed in analysis
- [ ] Split campaign into 3 (Emergency, Standard, B2B)
- [ ] Add missing high-intent keywords
- [ ] Clean up redundant Sitelinks and Callouts
- [ ] Set up proper Conversion Tracking

## 🟢 MEDIUM PRIORITY (Week 2-3)
- [ ] Create dedicated landing pages for ad groups
- [ ] Expand negative keywords list
- [ ] Add Fürth and Erlangen specific ad groups
- [ ] Implement offline conversion upload workflow
- [ ] Create performance dashboard

## 📋 Pending (After Campaign Optimization)
- [ ] Fix "Call from Ads" conversion tracking
- [ ] Set up call conversion action in Google Ads
- [ ] Test offline conversion upload
- [ ] Generate first complete report
- [ ] Create automated campaign for new cities

## 📊 Key Analysis Findings

### Current Issues:
| Issue | Impact | Status |
|-------|--------|--------|
| Ad Strength: Poor | -30% impressions | ⚠️ Critical |
| Quality Score: 4 | High CPCs | ⚠️ Critical |
| Max CPC: 0.01€ | No auctions | 🔴 Blocking |
| One campaign for all | No budget control | ⚠️ High |

### Recommended Structure:
```
├── [Emergency] 30€/day - Notdienst keywords
├── [Standard] 15€/day - Local keywords
└── [B2B] 5€/day - Hausverwaltung
```

### Expected Improvements (30 days):
- CTR: 2% → 10%
- CPC: 3€ → 2€
- Conversions: 0.5/day → 2.5/day
- ROI: 100% → 575%

## 📁 Key Documents

- **Deep Analysis**: `/docs/google-ads/DEEP_ANALYSIS_MAY_2026.md`
- **Previous Analysis**: `/docs/google-ads/ANALYSIS_MITTELFRANKEN_2026.md`
- **Complete Rebuild Guide**: `/.same/VOLLSTAENDIGE_ANALYSE_UND_REBUILD.md`
- **API Design**: `/docs/GOOGLE_ADS_API_DESIGN.md`
- **Campaign Files**: `/google_ads_editor/FINAL/`

## 📝 Notes

### Next Steps (Awaiting User Decision):
1. **CSV Files**: Create ready-to-import files for Google Ads Editor?
2. **Budget**: Can we increase to 80€/day?
3. **Landing Pages**: Should I create dedicated ones?
4. **Priority Cities**: After Nürnberg, which cities to focus?

### Google Ads API Credentials Status:
- [x] Developer Token - Configured
- [x] OAuth Client ID - Configured
- [x] OAuth Client Secret - Configured
- [x] Refresh Token - Configured
- [x] Customer ID: 789-424-2096 - Configured
