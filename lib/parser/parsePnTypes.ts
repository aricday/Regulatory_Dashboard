import type { PnTypeRow } from '@/types/spreadsheet';
import { normalizeCountry } from './normalizeCountry';
import type { WorkSheet } from 'xlsx';
import { utils } from 'xlsx';

/**
 * PN types tab columns (verified from Weather Report 2026-04-10):
 *   0: Country
 *   1: Type
 *   2: Capability
 *   3: Price
 *   4: Status
 *   5: Previous Status
 *   6: Date Of Status Change
 *   7: Customer-ready explanation
 *   8: Reseller Limitations
 *   9: Twilio Regulatory Requirements (URL)
 *  10: Twilio Regulatory Requirements Updates
 *  11: Expected Delivery
 *  12: Businesses Address Requirement
 *  13: Individual's Address Requirements
 */
export function parsePnTypes(sheet: WorkSheet): { rows: PnTypeRow[]; warnings: string[] } {
  const raw = utils.sheet_to_json<unknown[]>(sheet, { header: 1 });
  const rows: PnTypeRow[] = [];
  const warnings: string[] = [];

  for (let i = 1; i < raw.length; i++) {
    const r = raw[i];
    if (!r || !r[0]) continue;

    const countryName = String(r[0]).trim();
    const isoCode = normalizeCountry(countryName);
    if (!isoCode) {
      warnings.push(`PN types row ${i + 1}: Could not resolve country "${countryName}"`);
      continue;
    }

    rows.push({
      country: countryName,
      isoCode,
      type: str(r[1]),
      capability: str(r[2]),
      price: typeof r[3] === 'number' ? r[3] : null,
      status: str(r[4]),
      previousStatus: strOrNull(r[5]),
      dateOfStatusChange: strOrNull(r[6]),
      customerExplanation: strOrNull(r[7]),
      resellerLimitations: strOrNull(r[8]),
      regulatoryUrl: strOrNull(r[9]),
      regulatoryUpdates: strOrNull(r[10]),
      expectedDelivery: strOrNull(r[11]),
      businessAddressReq: strOrNull(r[12]),
      individualAddressReq: strOrNull(r[13]),
    });
  }

  return { rows, warnings };
}

function str(val: unknown): string {
  return val != null ? String(val).trim() : '';
}

function strOrNull(val: unknown): string | null {
  if (val == null) return null;
  const s = String(val).trim();
  return s.length > 0 ? s : null;
}
