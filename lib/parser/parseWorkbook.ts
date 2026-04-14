import type { WorkBook } from 'xlsx';
import type { ParsedWorkbook, CountryData } from '@/types/spreadsheet';
import { parsePnTypes } from './parsePnTypes';
import { parsePorting } from './parsePorting';
import { parseShortCode } from './parseShortCode';
import { parseSenderId } from './parseSenderId';

/**
 * Find a sheet by checking if the sheet name STARTS WITH the pattern (case-insensitive).
 * This avoids "PN types" accidentally matching "Porting PN Types" or "Short Code PN Types".
 */
function findSheet(wb: WorkBook, pattern: string): string | null {
  const lowerPattern = pattern.toLowerCase();
  for (const name of wb.SheetNames) {
    if (name.toLowerCase().startsWith(lowerPattern)) {
      return name;
    }
  }
  return null;
}

function ensureCountry(
  map: Record<string, CountryData>,
  isoCode: string,
  countryName: string,
): CountryData {
  if (!map[isoCode]) {
    map[isoCode] = {
      countryName,
      isoCode,
      pnTypes: [],
      porting: [],
      shortCodes: [],
      senderIds: [],
      regulatoryUrl: null,
    };
  }
  return map[isoCode];
}

/**
 * Parses an entire Weather Report workbook into a structured ParsedWorkbook.
 */
export function parseWorkbook(wb: WorkBook): ParsedWorkbook {
  const byCountry: Record<string, CountryData> = {};
  const allWarnings: string[] = [];

  // 1. PN types — starts with "PN types"
  const pnSheetName = findSheet(wb, 'pn types');
  if (pnSheetName) {
    const { rows, warnings } = parsePnTypes(wb.Sheets[pnSheetName]);
    allWarnings.push(...warnings);
    for (const row of rows) {
      const cd = ensureCountry(byCountry, row.isoCode, row.country);
      cd.pnTypes.push(row);
      if (!cd.regulatoryUrl && row.regulatoryUrl) {
        cd.regulatoryUrl = row.regulatoryUrl;
      }
    }
  } else {
    allWarnings.push('Sheet not found: PN types');
  }

  // 2. Porting
  const portingName = findSheet(wb, 'porting');
  if (portingName) {
    const { rows, warnings } = parsePorting(wb.Sheets[portingName]);
    allWarnings.push(...warnings);
    for (const row of rows) {
      const cd = ensureCountry(byCountry, row.isoCode, row.country);
      cd.porting.push(row);
    }
  } else {
    allWarnings.push('Sheet not found: Porting PN Types');
  }

  // 3. Short Code
  const scName = findSheet(wb, 'short code');
  if (scName) {
    const { rows, warnings } = parseShortCode(wb.Sheets[scName]);
    allWarnings.push(...warnings);
    for (const row of rows) {
      const cd = ensureCountry(byCountry, row.isoCode, row.country);
      cd.shortCodes.push(row);
    }
  } else {
    allWarnings.push('Sheet not found: Short Code PN Types');
  }

  // 4. SenderID
  const siName = findSheet(wb, 'senderid');
  if (siName) {
    const { rows, warnings } = parseSenderId(wb.Sheets[siName]);
    allWarnings.push(...warnings);
    for (const row of rows) {
      const cd = ensureCountry(byCountry, row.isoCode, row.country);
      cd.senderIds.push(row);
    }
  } else {
    allWarnings.push('Sheet not found: SenderID PN Types');
  }

  return {
    byCountry,
    countryCount: Object.keys(byCountry).length,
    warnings: allWarnings,
  };
}
