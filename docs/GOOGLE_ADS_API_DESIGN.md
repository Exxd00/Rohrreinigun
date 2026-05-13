# Google Ads API Tool Design Document

## Company Information
- **Company Name:** Rohrreinigung Kraft
- **Website:** https://rohrreinigung-kraft.de
- **Industry:** Plumbing & Drain Cleaning Services
- **Location:** Nürnberg, Mittelfranken, Germany

## 1. Overview

### 1.1 Purpose
Internal Google Ads management tool for Rohrreinigung Kraft to manage campaigns, track conversions, and generate reports.

### 1.2 Scope
- Manager Account (MCC): 476-210-5656
- Client Account: 789-424-2096
- Internal use only

## 2. Technology Stack
- Frontend: Next.js 15 (React)
- Backend: Next.js API Routes
- Hosting: Vercel
- Authentication: Password-protected admin panel

## 3. Features

### 3.1 Performance Reports
- Campaign performance reports
- Date range filtering
- CSV export
- Metrics: clicks, impressions, conversions, cost

### 3.2 Conversion Tracking
- Import offline call conversions
- Track conversion actions

### 3.3 Campaign Monitoring
- View active campaigns
- Monitor budget

## 4. API Methods Used
- POST /customers/{id}/googleAds:search - Query data
- POST /conversionUploads:uploadCallConversions - Import conversions

## 5. Security
- OAuth 2.0 authentication
- Environment variables for credentials
- Password-protected access
- No data stored locally

## 6. Compliance
- Internal tool only
- No data sharing
- Google Ads API ToS compliant

## 7. Contact
- Email: rohrreinigungkraft.de@gmail.com
- Website: https://rohrreinigung-kraft.de
- Phone: +49 911 892 186 82

Version 1.0 - May 2026
