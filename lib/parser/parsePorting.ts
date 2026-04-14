import type { PortingRow } from '@/types/spreadsheet';
import { normalizeCountry } from './normalizeCountry';
import type { WorkSheet } from 'xlsx';
import { utils } from 'xlsx';

/**
 * Porting PN Types tab columns (verified from Weather Report 2026-04-10):
 *   0: Country
 *   1: Type
 *   2: Capability
 *   3: Status
 *   4: Previous Status
 *   5: Date Of Status Change
 *   6: Expected Delivery
 *   7: Twilio Regulatory Requirements (URL)
 *   8: Twilio Porting Requirements Updates
 *   9: Notes
 */
export function parsePorting(sheet: WorkSheet): { rows: PortingRow[]; warnings: string[] } {
  const raw = utils.sheet_to_json<unknown[]>(sheet, { header: 1 });
  const rows: PortingRow[] = [];
  const warnings: string[] = [];

  for (let i = 1; i < raw.length; i++) {
    const r = raw[i];
    if (!r || !r[0]) continue;

    const countryName = String(r[0]).trim();
    const isoCode = normalizeCountry(countryName);
    if (!isoCode) {
      warnings.push(`Porting row ${i + 1}: Could not resolve country "${countryName}"`);
      continue;
    }

    rows.push({
      country: countryName,
      isoCode,
      type: str(r[1]),
      capability: str(r[2]),
      status: str(r[3]),
      previousStatus: strOrNull(r[4]),
      dateOfStatusChange: strOrNull(r[5]),
      expectedDelivery: strOrNull(r[6]),
      regulatoryUrl: strOrNull(r[7]),
      portingUpdates: strOrNull(r[8]),
      notes: strOrNull(r[9]),
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
