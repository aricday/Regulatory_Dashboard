# Twilio Regulatory Dashboard

A single-page web application that unifies Twilio number availability data, regulatory requirements, and messaging best practices into one searchable interface — replacing the manual cross-referencing of spreadsheets, documentation pages, and tribal knowledge.

---

## Why This Exists

Twilio customers today face a fragmented information landscape when expanding into new markets. Determining what phone number types are available in a given country, what regulatory requirements apply, and what communication best practices to follow requires consulting at least three separate sources:

1. **The Weather Report** — a manually maintained Excel spreadsheet distributed by Twilio account teams listing number types, capabilities, pricing, and regulatory links across 200+ countries
2. **Twilio Guidelines Pages** — country-specific web pages covering feature support, compliance requirements, and sending recommendations, scattered across dozens of URLs
3. **Informal Knowledge** — support tickets, account reviews, and undocumented gotchas shared verbally between teams

There is no unified interface to answer the fundamental question: *"I want to send SMS to customers in [Country] using [Number Type] — what do I need to know?"*

This leads to slow onboarding for new markets, compliance gaps from missed requirements, and duplicated research effort across engineering, sales, and legal teams. The Regulatory Dashboard consolidates all three sources into a single workflow that delivers a complete answer in under 60 seconds.

---

## Who This Is For

### Developer / Technical Evaluator

An engineer integrating Twilio into a product for the first time in a new market. They need to quickly determine which number type to purchase, what compliance steps are required, and whether their use case (e.g., transactional SMS, marketing voice calls) is supported. Today this requires manually cross-referencing the spreadsheet with multiple documentation pages. The dashboard gives them a complete readout from a single search.

### Account Executive / Solutions Engineer

Twilio sales or solutions staff advising a customer on market expansion. They need to provide accurate, up-to-date availability and compliance information during a customer meeting — not after it. The Weather Report spreadsheet is updated infrequently and the guidelines pages are slow to navigate under time pressure. The dashboard lets them upload the latest spreadsheet, pull live guidelines, and share results on the spot.

### Compliance / Legal Reviewer

An internal compliance or legal team member validating a communications deployment before go-live. They need to confirm that all regulatory requirements — registration, documentation, content restrictions — are satisfied for a specific country and channel. Today these requirements are buried in individual country pages with no aggregated view. The dashboard surfaces all requirements for the selected country and channel in a single column, with links to primary sources.

---

## Business Value

| Outcome | Detail |
|---|---|
| **Faster time-to-answer** | From app open to complete results in under 60 seconds, replacing a 15-30 minute manual research process |
| **Reduced compliance risk** | Regulatory requirements are surfaced prominently with direct source links, reducing the chance of missed obligations |
| **Consistent customer experience** | Sales and solutions teams present the same accurate data in every customer conversation |
| **Self-service enablement** | Developers and partners can research market requirements independently without filing support tickets |
| **Institutional knowledge capture** | AlphaNumeric Sender ID support status, registration fees, and special conditions for 200+ countries are codified rather than passed informally |
| **Eliminated duplicate effort** | Teams across engineering, sales, legal, and support stop independently researching the same country requirements |

---

## Features

- **Client-side spreadsheet parsing** — upload a Weather Report `.xlsx` file; it is parsed entirely in the browser and never sent to a server
- **Searchable country selector** — type-ahead search across all countries in the uploaded spreadsheet
- **Channel selection** — SMS, Voice, and Porting with automatic availability detection per country
- **Number type badges** — visual display of all available number/sender types with status indicators (GA, Beta, Paused, Private Offering)
- **Live guidelines retrieval** — fetches and parses Twilio's country-specific guidelines pages in real time via server-side scraping
- **3-column results table** — Feature Support, Regulatory Requirements, and Best Practices displayed side-by-side (collapses to tabs on mobile)
- **Regulatory link banner** — direct link to the Twilio regulatory page from the spreadsheet, available instantly without a network call
- **AlphaNumeric Sender ID lookup** — static dataset covering 200+ countries with support status, registration fees, and special conditions
- **Server-side caching** — guidelines are cached for 1 hour to minimize redundant fetches
- **Client-side caching** — repeat selections within a session return instantly
- **URL deep-linking** — shareable URLs via query parameters (e.g., `?country=gb&channel=sms`)
- **Graceful degradation** — countries without a dedicated guidelines page show an informational notice with a fallback regulatory link

---

## Tech Stack

| Concern | Technology | Role |
|---|---|---|
| Framework | Next.js (App Router, TypeScript) | Full-stack framework; API routes handle server-side scraping to avoid CORS |
| Styling | Tailwind CSS + shadcn/ui | Utility-first styling with accessible, pre-built components |
| Excel parsing | SheetJS (`xlsx`) | Client-side `.xlsx` parsing — no server upload |
| HTML scraping | Cheerio | Server-side extraction of structured data from Twilio guidelines pages |
| Icons | Lucide React | Consistent, lightweight icon set |
| State management | React `useState` + `useRef` | Sufficient at this application's scale; no external state library needed |

---

## Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- A Twilio **Weather Report** spreadsheet (`.xlsx` format) with the following tabs:
  - PN types (number types, capabilities, regulatory URLs)
  - Porting PN Types
  - Short Code PN Types
  - SenderID PN Types

---

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Regulatory_Dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   This installs all production and development dependencies including Next.js, SheetJS, Cheerio, shadcn/ui, and Tailwind CSS.

3. **Verify the build**

   ```bash
   npm run build
   ```

   A successful build confirms all TypeScript types check out and the application compiles without errors.

---

## Running the Application

### Development

```bash
npm run dev
```

Opens the application at [http://localhost:3000](http://localhost:3000) with hot module replacement enabled.

### Production

```bash
npm run build
npm run start
```

Builds an optimized production bundle and starts the server at [http://localhost:3000](http://localhost:3000).

---

## Usage

1. **Upload your Weather Report** — drag and drop (or click to browse) your `.xlsx` file. The file is parsed entirely in the browser. A confirmation banner shows the number of countries loaded.

2. **Select a country** — use the searchable dropdown to find your target country. Type-ahead search matches country names.

3. **Select a channel** — choose SMS, Voice, or Porting. Channels without data for the selected country are disabled automatically.

4. **Review number types** — all available number and sender types for the selected country + channel appear as selectable badges. Status is color-coded: green (GA), yellow (Beta), red (Paused), purple (Private Offering).

5. **Read the guidelines table** — the 3-column table displays Feature Support, Regulatory Requirements, and Best Practices scraped from the Twilio guidelines page. Restrictions are marked with a red indicator; best practices with a green one.

6. **Check AlphaNumeric Sender ID support** — selecting an AlphaNumeric/SenderID type shows a color-coded badge with the country's support status, any registration fees, and special conditions.

7. **Share results** — the URL updates automatically with your selections (e.g., `?country=gb&channel=sms`). Copy and share it directly.

---

## Project Structure

```
app/
├── api/guidelines/route.ts    # Server-side API: fetches + scrapes Twilio guidelines
├── layout.tsx                 # Root layout with fonts and metadata
├── page.tsx                   # Entry point — renders <Dashboard />
└── globals.css

components/
├── Dashboard.tsx              # Main state orchestrator
├── FileUploader.tsx           # Drag-and-drop .xlsx upload
├── CountryChannelSelector.tsx # Searchable country dropdown + channel buttons
├── NumberTypeSelector.tsx     # Number type badge selector
├── RegulatoryLinkBanner.tsx   # Column J regulatory URL banner
├── GuidelinesTable.tsx        # 3-column results (desktop) / tabbed (mobile)
├── GuidelinesTableCell.tsx    # Renders content blocks with restriction/best-practice icons
├── AlphaSenderBadge.tsx       # AlphaNumeric Sender ID status display
└── ui/                        # shadcn/ui base components

data/
└── alphanumericSenderIdSupport.ts  # Static dataset: 200+ countries with support status

lib/
├── parser/
│   ├── normalizeCountry.ts    # Country name → ISO 2-letter code (230+ mappings)
│   ├── parsePnTypes.ts        # PN types tab parser
│   ├── parsePorting.ts        # Porting tab parser
│   ├── parseShortCode.ts      # Short code tab parser
│   ├── parseSenderId.ts       # Sender ID tab parser
│   └── parseWorkbook.ts       # Orchestrates all tab parsers
├── scraper/
│   ├── scrapeGuidelines.ts    # Fetches + classifies guidelines into 3 columns
│   └── extractSections.ts     # Cheerio helpers for table + text extraction
├── cache.ts                   # Server-side TTL cache (1 hour)
└── utils.ts                   # Tailwind class merge utility

types/
├── spreadsheet.ts             # ParsedWorkbook, CountryData, PnTypeRow, etc.
└── guidelines.ts              # GuidelinesContent, ContentBlock, ContentItem
```

---

## Architecture Overview

The application has a strict two-layer split:

**Client-side** — all spreadsheet parsing runs in the browser via SheetJS. The uploaded `.xlsx` file never leaves the user's machine. No upload endpoint exists. Country names from the spreadsheet are normalized to ISO 2-letter codes using a four-tier resolution strategy (exact match, case-insensitive, curated alias map, partial match) covering all 218 Weather Report countries.

**Server-side** — Twilio guidelines page scraping runs in a Next.js API route (`/api/guidelines`) to avoid CORS restrictions. Cheerio parses the static HTML returned by Twilio's guidelines pages, extracting tables and text blocks that are then classified into three categories (Feature Support, Regulatory Requirements, Best Practices) by heading keyword analysis. Results are cached server-side for 1 hour.

The Dashboard component manages all application state and maintains a client-side `useRef<Map>` cache so that revisiting a previously selected country + channel combination within the same session returns instantly without a network request.

---

## API Reference

### `GET /api/guidelines`

Fetches and parses a Twilio guidelines page for the specified country and channel.

**Query parameters:**

| Parameter | Required | Description |
|---|---|---|
| `country` | Yes | ISO 2-letter country code (e.g., `gb`, `us`, `de`) |
| `channel` | Yes | Communication channel: `sms`, `voice`, or `porting` |

**Example:**

```bash
curl "http://localhost:3000/api/guidelines?country=gb&channel=sms" | jq .
```

**Response:**

```json
{
  "data": {
    "isoCode": "gb",
    "channel": "sms",
    "sourceUrl": "https://www.twilio.com/en-us/guidelines/gb/sms",
    "notFound": false,
    "featureSupport": [
      { "heading": "Local", "items": [...] }
    ],
    "regulatoryRequirements": [
      { "heading": "Guidelines", "items": [...] }
    ],
    "bestPractices": [
      { "heading": "Best Practices", "items": [...] }
    ]
  },
  "cached": false
}
```

When no guidelines page exists for the given country + channel, the response returns `"notFound": true` with empty content arrays. This is not an error state.

---

## Privacy

The uploaded Weather Report spreadsheet is parsed entirely in the browser using SheetJS. **No file data is transmitted to the server.** The only network requests the application makes are to the Next.js API route, which in turn fetches publicly available Twilio guidelines pages.

---

## License

Private. Not licensed for redistribution.
