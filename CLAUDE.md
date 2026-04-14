# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A Next.js single-page app for Twilio customers to research phone number availability and regulatory requirements by country. Users upload a Twilio "Weather Report" Excel spreadsheet, select a country + channel (SMS/Voice/Porting), and get a 3-column results view: Feature Support | Regulatory Requirements | Best Practices. See [PRD.md](PRD.md) for full product requirements.

## Commands

```bash
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build
npm run start     # Run production build
npm run typecheck # tsc --noEmit (type-check without compiling)
```

No test suite is configured in v1. Manual verification via `curl` for API routes:
```bash
curl "http://localhost:3000/api/guidelines?country=gb&channel=sms" | jq .
```

## Architecture

### The Two-Layer Split (Critical)

**Client-side only:** Excel parsing (`lib/parser/`). SheetJS runs in the browser — the `.xlsx` file bytes never leave the user's machine. No upload endpoint exists or should be added.

**Server-side only:** Twilio guidelines scraping (`lib/scraper/` + `app/api/guidelines/route.ts`). Cheerio runs in Next.js API routes to avoid CORS. The API route also holds a server-side TTL cache (1 hour) so repeated selections don't re-fetch.

### Data Flow

```
FileUploader (client) → SheetJS → ParsedWorkbook in Dashboard state
                                        ↓
CountryChannelSelector → selectedCountry (ISO code) + selectedChannel
                                        ↓
RegulatoryLinkBanner (instant, from Column J of spreadsheet — no network)
                                        ↓
  ┌── if type = AlphaNumeric/SenderID ──────────────────────────────────┐
  │   getAlphaSenderSupport(isoCode)                                     │
  │   → data/alphanumericSenderIdSupport.ts (static, no network)        │
  │   → merged with parseSenderId() rows from spreadsheet               │
  └─────────────────────────────────────────────────────────────────────┘
                                        ↓
/api/guidelines?country={iso}&channel={channel}
  → fetch https://www.twilio.com/en-us/guidelines/{iso}/{channel}
  → Cheerio parse → GuidelinesContent { featureSupport, regulatoryRequirements, bestPractices }
                                        ↓
GuidelinesTable (3 columns)
```

Dashboard also maintains a client-side `useRef<Map>` cache so repeat selections within a session don't hit `/api/guidelines` again.

### Country Name → ISO Code

The spreadsheet uses full names ("United Kingdom", "Korea, South"). Twilio's URLs use ISO 2-letter codes ("gb", "kr"). Resolution lives in `lib/parser/normalizeCountry.ts` with a four-tier strategy: exact match → case-insensitive → strip parenthetical suffixes → partial match. All 218 countries from the Weather Report are mapped.

### AlphaNumeric Sender ID — Two Data Sources (Critical)

The spreadsheet's SenderID tab **only lists countries that require pre-registration** — it is NOT a complete supported-country list. The full support matrix lives in `data/alphanumericSenderIdSupport.ts`, which was built from the Twilio Help Center article (JS-rendered, not scrapeable at runtime).

When a user selects an AlphaNumeric/SenderID type:

1. Look up `getAlphaSenderSupport(isoCode)` from the static file — this gives `status` (supported / registration_required / registration_optional / not_supported / conditional), fees, and notes.
2. Merge with the spreadsheet's SenderID tab row for the same country — the spreadsheet adds pre-registration-specific context.
3. The static file is the source of truth for whether the country is supported at all. The spreadsheet is supplementary.

The static data file must be updated manually when the Help Center article changes. The file header contains the last-updated date.

### Spreadsheet Tab Parsing

Each tab has its own parser (`parsePnTypes`, `parsePorting`, `parseShortCode`, `parseSenderId`). All use `XLSX.utils.sheet_to_json(sheet, { header: 1 })` to get raw 2D arrays — do not switch to header-based parsing, as tab column names are inconsistent. Tab matching is case-insensitive substring (e.g., sheet name containing "porting" → `parsePorting`).

**Column J** (index 9) on the PN Types tab holds the direct regulatory URL. This is surfaced separately as a `RegulatoryLinkBanner` and is distinct from the channel-specific guidelines URLs.

### Graceful Not-Found Handling

Many country+channel combos don't have a Twilio guidelines page. A 404 returns `{ notFound: true }` — not an error. The UI shows an informational callout pointing to the Column J URL instead of rendering an empty table. Do not treat `notFound: true` as an error state.

### Guidelines URL Pattern

```
https://www.twilio.com/en-us/guidelines/{iso_code}/{channel}
```

Global fallback pages (no country prefix) also exist at `/en-us/guidelines/sms`, `/voice`, `/porting`, `/regulatory` — these are reference links, not fetched dynamically.

## Key Types

- `ParsedWorkbook` — top-level output of spreadsheet parsing; `byCountry: Record<string, CountryData>` keyed by ISO code
- `CountryData` — aggregates all four tab rows for one country plus `regulatoryLinkUrl`
- `GuidelinesContent` — output of scraping; has `featureSupport`, `regulatoryRequirements`, `bestPractices` arrays of `ContentBlock`
- `ContentBlock` — `{ heading: string, items: ContentItem[] }` where items have optional `isRestriction` / `isBestPractice` flags for visual classification
