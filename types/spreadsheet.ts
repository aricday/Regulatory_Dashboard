/**
 * Types for the parsed Twilio Weather Report spreadsheet.
 * Column positions are based on the actual spreadsheet inspected 2026-04-10.
 */

/** Row from the "PN types" tab */
export interface PnTypeRow {
  country: string;
  isoCode: string;
  type: string; // e.g. "Toll-Free", "Local", "Mobile", "National"
  capability: string; // e.g. "Voice", "Voice + SMS", "SMS", "MMS"
  price: number | null;
  status: string; // "GA", "Beta", "Paused", "Private Offering"
  previousStatus: string | null;
  dateOfStatusChange: string | null;
  customerExplanation: string | null;
  resellerLimitations: string | null;
  regulatoryUrl: string | null; // Column index 9 — "Twilio Regulatory Requirements"
  regulatoryUpdates: string | null;
  expectedDelivery: string | null;
  businessAddressReq: string | null;
  individualAddressReq: string | null;
}

/** Row from the "Porting PN Types" tab */
export interface PortingRow {
  country: string;
  isoCode: string;
  type: string;
  capability: string;
  status: string; // "Standard Porting", "Unavailable", "Custom Service", etc.
  previousStatus: string | null;
  dateOfStatusChange: string | null;
  expectedDelivery: string | null;
  regulatoryUrl: string | null; // index 7
  portingUpdates: string | null;
  notes: string | null;
}

/** Row from the "Short Code PN Types" tab */
export interface ShortCodeRow {
  country: string;
  isoCode: string;
  type: string; // always "Short Code"
  capability: string; // "SMS"
  currentStatus: string; // "GA", "Not Available", etc.
  previousStatus: string | null;
  dateOfStatusChange: string | null;
}

/** Row from the "SenderID PN Types" tab */
export interface SenderIdRow {
  country: string;
  isoCode: string;
  type: string; // "Sender ID pre-registered"
  capability: string; // "SMS"
  currentStatus: string; // "Pre-registration required, available via SenderID form"
  previousStatus: string | null;
  dateOfStatusChange: string | null;
}

/** Aggregated data for a single country across all tabs */
export interface CountryData {
  countryName: string;
  isoCode: string;
  pnTypes: PnTypeRow[];
  porting: PortingRow[];
  shortCodes: ShortCodeRow[];
  senderIds: SenderIdRow[];
  /** First non-null regulatory URL found in PN Types for this country */
  regulatoryUrl: string | null;
}

/** Top-level output from parseWorkbook() */
export interface ParsedWorkbook {
  /** Keyed by ISO 3166-1 alpha-2 code (lowercase) */
  byCountry: Record<string, CountryData>;
  /** Total number of countries parsed */
  countryCount: number;
  /** Any warnings generated during parsing (e.g. unresolved country names) */
  warnings: string[];
}

export type Channel = 'sms' | 'voice' | 'porting';
