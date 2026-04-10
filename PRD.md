# Product Requirements Document
# Twilio Regulatory Dashboard

**Version:** 1.0  
**Date:** 2026-04-10  
**Status:** Draft

---

## 1. Problem Statement

Twilio customers — ranging from developers to account managers and compliance teams — need to determine what phone number types are available in a given country, what regulatory requirements apply, and what communication best practices to follow. Today this information is scattered across:

- A manually maintained Excel spreadsheet ("Weather Report") distributed by Twilio account teams
- Multiple Twilio guidelines web pages organized by country and channel
- Informal knowledge shared via support tickets or account reviews

There is no unified interface to answer the core question: **"I want to send SMS to customers in [Country] using [Number Type] — what do I need to know?"**

The result is slow onboarding, compliance gaps, and repeated research work across teams.

---

## 2. Product Overview

The Twilio Regulatory Dashboard is a single-page web application that allows any Twilio customer to:

1. Upload the Twilio Weather Report spreadsheet
2. Select a country and communication channel (SMS, Voice, Porting)
3. View all available number/sender types for that country
4. Retrieve and display a unified view of feature support, regulatory requirements, and Twilio best practices for their selected combination

---

## 3. Target Users & Personas

### Persona 1 — The Developer / Technical Evaluator
- **Role:** Engineer integrating Twilio into a product for the first time in a new market
- **Goal:** Quickly determine which number type to purchase, what compliance steps are required, and whether their use case is supported
- **Pain today:** Has to cross-reference spreadsheet + multiple docs pages manually
- **Value from this product:** Single search gives a complete readout in under 60 seconds

### Persona 2 — The Account Executive / Solutions Engineer
- **Role:** Twilio sales/solutions staff advising a customer on market expansion
- **Goal:** Provide accurate, up-to-date availability and compliance information in a customer meeting
- **Pain today:** Weather Report spreadsheet is updated infrequently; guidelines pages are hard to navigate quickly
- **Value from this product:** Upload latest spreadsheet, pull live guidelines, share results instantly

### Persona 3 — The Compliance / Legal Reviewer
- **Role:** Internal compliance or legal team member validating a communications deployment
- **Goal:** Confirm all regulatory requirements are met before go-live in a new country
- **Pain today:** Regulatory requirements are buried in country-specific pages with no aggregated view
- **Value from this product:** Regulatory requirements column surfaces all requirements for the selected country/channel in one place, with links to primary sources

---

## 4. Goals & Success Metrics

| Goal | Metric | Target |
|---|---|---|
| Reduce time-to-answer for number availability questions | Time from app open to complete results view | < 60 seconds |
| Ensure regulatory accuracy | % of results that include at least one direct regulatory source link | > 90% |
| Broad country coverage | Countries resolvable from uploaded spreadsheet | 100% of Weather Report countries |
| Reliable guidelines retrieval | % of country/channel combos that return structured guideline content | > 70% (remainder show graceful not-found state) |
| Adoption | Weekly active uses after launch | TBD by stakeholder |

---

## 5. Functional Requirements

### 5.1 Spreadsheet Upload
- Accept `.xlsx` files via drag-and-drop or file picker
- Parse the following tabs:
  - **PN types** — Country, Type, Capabilities, Regulatory Link (Column J)
  - **Porting PN Types** — Country, Type, Capability, Status
  - **Short Code PN Types** — Country, Type, Capability, Current Status
  - **SenderID PN Types** — Countries supporting AlphaNumeric senders with pre-registration flag
- Show confirmation with parsed country count on success
- Show clear error message on malformed file

### 5.2 Country & Channel Selector
- Searchable country dropdown populated from parsed spreadsheet data
- Channel selector with options: **SMS**, **Voice**, **Porting**
- Selections are interdependent — changing country resets channel and downstream selections

### 5.3 Number Type Display
- Show all number/sender types available for the selected country + channel combination
- Sources: PN Types, Short Code, SenderID, Porting tabs (as relevant to channel)
- Display as selectable badge/chip UI showing type and capabilities
- Immediately show the Column J regulatory reference link (if present) when a country is selected — this requires no network call

### 5.3a AlphaNumeric Sender ID — Extended Data Source

The spreadsheet's SenderID tab only lists countries requiring pre-registration; it is not a complete support list. When a user selects an AlphaNumeric/SenderID type, the results must also reflect data from a static dataset built from the Twilio Help Center article ([International support for Alphanumeric Sender ID](https://help.twilio.com/articles/223133767-International-support-for-Alphanumeric-Sender-ID)).

The static dataset (`src/data/alphanumericSenderIdSupport.ts`) captures per-country:

- **Support status:** Supported (no registration) / Registration Required / Registration Optional / Not Supported / Conditional
- **Registration fees** where applicable (e.g., Czech Republic $30/month, Kazakhstan $250/month)
- **Special conditions** for Israel, Tunisia (volume thresholds), Saudi Arabia (domestic vs. international), Russia (registration currently paused)

Display rules:

- `supported` → green badge: "Supported — No Registration Required"
- `registration_required` → orange badge: "Supported — Registration Required"
- `registration_optional` → yellow badge: "Supported — Registration Optional"
- `not_supported` → red badge: "Not Supported"
- `conditional` → yellow badge: "Supported — Conditional Requirements" + expand notes
- `registrationPaused: true` → gray badge + prominent warning (e.g., Russia)

This lookup is instantaneous (static data, no network call). The Help Center page is JavaScript-rendered and cannot be scraped at runtime.

### 5.4 Guidelines Retrieval & Display
- On country + channel selection, fetch Twilio guidelines page:
  - `https://www.twilio.com/en-us/guidelines/{country_code}/{channel}`
- Parse and display results in a **3-column table**:

| Column | Content |
|---|---|
| Feature Support | What number/sender types are supported, their capabilities and current availability status |
| Regulatory Requirements | All regulatory, registration, and compliance requirements for this country/channel |
| Best Practices | Twilio-documented recommendations for sending in this market |

- Show loading state during fetch
- If no country-specific page exists (404), show a clear not-found notice with a link to the Column J regulatory URL as fallback

### 5.5 Regulatory Source Linking
- Column J URLs from the spreadsheet must be surfaced prominently as "Direct Regulatory Reference" — shown as a banner above the results table
- All scraped content sections must include a link back to the source Twilio guidelines URL

### 5.6 Number Type Filtering
- Once the 3-column table is displayed, the user can select a specific number type (e.g., "Local", "Toll-Free") to filter table content to that type

---

## 6. Non-Functional Requirements

| Requirement | Detail |
|---|---|
| Performance | Guidelines fetch + render < 3 seconds on a standard broadband connection |
| Caching | Scraped guidelines cached server-side for 1 hour to reduce redundant fetches |
| Client cache | Same country+channel selection within a session must not trigger a second network request |
| Responsive layout | 3-column table collapses to tabs (Feature / Regulatory / Best Practices) on mobile |
| Privacy | Uploaded spreadsheet is parsed entirely client-side; file bytes never sent to a server |
| Error handling | All failure states (parse errors, scrape failures, not-found pages) must show a user-friendly message, never a raw error or blank screen |

---

## 7. Out of Scope (v1.0)

- **User authentication / accounts** — no login, no saved sessions
- **PDF export or sharing** — no report generation in v1
- **Automated spreadsheet updates** — user must manually upload a new spreadsheet; no Twilio API integration for live number availability data
- **SMS/Voice messaging testing** — this is an information tool, not a messaging sandbox
- **A2P 10DLC registration workflows** — linked for reference only, not built in
- **Non-Twilio carriers or platforms** — scoped to Twilio guidelines exclusively
- **Editing or annotating results** — read-only display
- **Multi-language support** — English only in v1

---

## 8. Technical Architecture

### Stack
| Concern | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router, TypeScript) | API routes solve CORS for scraping; single repo |
| Styling | Tailwind CSS + shadcn/ui | Accessible components, rapid development |
| Excel parsing | SheetJS (`xlsx`) | Client-side, no server upload needed |
| HTML scraping | Cheerio | Server-side in Next.js API routes |
| State | React `useState` + `useRef` cache | No external dep needed at this scale |

### File Structure
```
src/
├── app/
│   ├── page.tsx                         # Renders <Dashboard />
│   ├── layout.tsx
│   └── api/guidelines/route.ts          # GET /api/guidelines?country=gb&channel=sms
├── components/
│   ├── Dashboard.tsx                    # State machine + layout orchestrator
│   ├── FileUploader.tsx
│   ├── CountryChannelSelector.tsx
│   ├── NumberTypeSelector.tsx
│   ├── RegulatoryLinkBanner.tsx         # Column J URL banner
│   ├── GuidelinesTable.tsx              # 3-column results
│   ├── GuidelinesTableCell.tsx
│   ├── LoadingState.tsx
│   └── ErrorState.tsx
├── lib/
│   ├── parser/                          # SheetJS Excel parsing (client-side)
│   │   ├── parseWorkbook.ts
│   │   ├── parsePnTypes.ts
│   │   ├── parsePorting.ts
│   │   ├── parseShortCode.ts
│   │   ├── parseSenderId.ts
│   │   └── normalizeCountry.ts          # Country name → ISO 2-letter code
│   ├── scraper/                         # Cheerio HTML scraping (server-side)
│   │   ├── scrapeGuidelines.ts
│   │   └── extractSections.ts
│   └── cache.ts                         # Server-side TTL cache
└── types/
    ├── spreadsheet.ts
    └── guidelines.ts
```

### Guidelines URL Pattern
```
https://www.twilio.com/en-us/guidelines/{iso_code}/{channel}
```
Examples:
- `https://www.twilio.com/en-us/guidelines/gb/sms`
- `https://www.twilio.com/en-us/guidelines/us/voice`

### Country Normalization Strategy
Spreadsheet uses full country names ("United Kingdom", "Korea, South"). URLs require ISO 2-letter codes ("gb", "kr"). Resolution order:
1. Exact ISO 3166-1 name match
2. Case-insensitive match
3. Curated alias map (United States → us, United Kingdom → gb, etc.)
4. Partial / fuzzy match as last resort

---

## 9. User Flow

```
[Upload .xlsx]
      ↓
  Parse all tabs → byCountry map
      ↓
[Select Country] → [Select Channel]
      ↓
  Show RegulatoryLinkBanner (Column J, instant — no network call)
  Show NumberTypeSelector (filtered by channel)
      ↓
  Fetch /api/guidelines → scrape Twilio guidelines page
      ↓
[3-Column Results Table]
  Feature Support | Regulatory Requirements | Best Practices
      ↓
[Select Number Type] → filter table rows to that type
```

---

## 10. Implementation Order

1. Bootstrap: `npx create-next-app@latest` with TypeScript + Tailwind
2. Install: `xlsx`, `cheerio`, `lucide-react`, shadcn/ui
3. Write TypeScript types (`spreadsheet.ts`, `guidelines.ts`)
4. Write `normalizeCountry.ts` with ISO alias map
5. Write spreadsheet parsers (parsePnTypes, parsePorting, parseShortCode, parseSenderId, parseWorkbook)
6. Build `FileUploader.tsx` — validate with a real Weather Report file
7. Build `CountryChannelSelector.tsx` and `NumberTypeSelector.tsx`
8. Write server-side `cache.ts`
9. Write `extractSections.ts` and `scrapeGuidelines.ts` (Cheerio)
10. Write `src/app/api/guidelines/route.ts` — test with curl
11. Build `GuidelinesTableCell.tsx`, `GuidelinesTable.tsx`, `RegulatoryLinkBanner.tsx`
12. Wire together in `Dashboard.tsx`
13. `app/page.tsx` renders `<Dashboard />`
14. Add mobile responsive layout (3 cols → tabs)
15. Add URL deep-linking (`?country=gb&channel=sms`)

---

## 11. Verification Checklist

- [ ] Upload Weather Report → country count matches expected
- [ ] Select "United Kingdom" → ISO code resolves to "gb"
- [ ] Select SMS → number types from spreadsheet appear
- [ ] `curl "http://localhost:3000/api/guidelines?country=gb&channel=sms"` returns structured JSON
- [ ] Select country with no guidelines page → graceful not-found state shown
- [ ] Column J URL appears in banner for countries that have it
- [ ] 3-column table populates with scraped content
- [ ] Selecting same country+channel twice → no second network request (client cache)
- [ ] Mobile layout: 3-column table collapses to tabbed view
