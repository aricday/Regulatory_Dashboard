/**
 * Cheerio helpers for extracting structured data from Twilio guidelines pages.
 *
 * Actual page structure (verified 2026-04-10 against /guidelines/gb/sms):
 *   - Standard HTML <table> elements (NOT <div class="pricing-table">)
 *   - 2-column tables: row 0 is header (e.g. "Locale Summary"), rows 1+ are key-value pairs
 *   - Multi-column tables: row 0 is header per sender type, rows 1+ are feature rows
 *   - H2/H3 headings separate sections ("Phone Numbers & Sender ID", "Alphanumeric", etc.)
 */

import type { CheerioAPI } from 'cheerio';
import type { ContentBlock, ContentItem } from '@/types/guidelines';

/**
 * Extract all table blocks from the page.
 */
export function extractAllTables($: CheerioAPI): ContentBlock[] {
  const blocks: ContentBlock[] = [];

  $('table').each((_, table) => {
    const $table = $(table);
    const rows = $table.find('tr');
    if (rows.length === 0) return;

    // First row, first cell is typically the table title
    const headerRow = $(rows[0]);
    const headerCells = headerRow.find('th, td');
    const heading = $(headerCells[0]).text().trim().split('\n')[0].trim();

    const colCount = headerCells.length;

    if (colCount <= 2) {
      // Two-column key-value table (e.g. "Locale Summary", "Guidelines")
      const items: ContentItem[] = [];
      rows.each((i, row) => {
        if (i === 0) return; // skip header row
        const cells = $(row).find('th, td');
        if (cells.length >= 2) {
          const label = cleanText($(cells[0]).text());
          const value = cleanText($(cells[1]).text());
          if (label || value) {
            items.push({ label: label || undefined, value, ...classifyItem(label, value) });
          }
        }
      });
      if (items.length > 0) {
        blocks.push({ heading: heading || 'Details', items });
      }
    } else {
      // Multi-column table (e.g. sender type comparison)
      // Row 0 has column headers: [empty/label, type1, type2, type3...]
      const colHeaders: string[] = [];
      headerCells.each((j, cell) => {
        colHeaders.push(cleanText($(cell).text()));
      });

      // Create a block per non-empty column header (each sender type)
      for (let col = 1; col < colCount; col++) {
        const colName = colHeaders[col];
        if (!colName) continue;

        const items: ContentItem[] = [];
        rows.each((i, row) => {
          if (i === 0) return;
          const cells = $(row).find('th, td');
          if (cells.length > col) {
            const label = cleanText($(cells[0]).text());
            const value = cleanText($(cells[col]).text());
            if (label && value) {
              items.push({ label, value, ...classifyItem(label, value) });
            }
          }
        });

        if (items.length > 0) {
          blocks.push({ heading: colName, items });
        }
      }
    }
  });

  return blocks;
}

/**
 * Extract non-table content: headings followed by paragraphs or lists.
 */
export function extractTextBlocks($: CheerioAPI): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  const seen = new Set<string>();

  // Look for content within the main content area
  $('h2, h3, h4').each((_, el) => {
    const heading = cleanText($(el).text());
    if (!heading || seen.has(heading)) return;
    seen.add(heading);

    const items: ContentItem[] = [];
    let sibling = $(el).next();

    while (sibling.length && !sibling.is('h1, h2, h3, h4, table')) {
      if (sibling.is('ul, ol')) {
        sibling.find('li').each((__, li) => {
          const text = cleanText($(li).text());
          if (text) items.push({ value: text, ...classifyItem('', text) });
        });
      } else if (sibling.is('p')) {
        const text = cleanText(sibling.text());
        if (text && text.length > 15) {
          items.push({ value: text, ...classifyItem('', text) });
        }
      }
      sibling = sibling.next();
    }

    if (items.length > 0) {
      blocks.push({ heading, items });
    }
  });

  return blocks;
}

function cleanText(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

function classifyItem(label: string, value: string): Pick<ContentItem, 'isRestriction' | 'isBestPractice'> {
  const combined = `${label} ${value}`.toLowerCase();

  const restrictionKeywords = [
    'must not', 'not allowed', 'prohibited', 'forbidden', 'restricted',
    'not supported', 'blocked', 'cannot', 'do not',
    'required', 'must be', 'mandatory',
  ];
  const bestPracticeKeywords = [
    'recommended', 'best practice', 'should', 'we recommend',
    'suggest', 'tip', 'consider', 'refrain',
  ];

  const isRestriction = restrictionKeywords.some((kw) => combined.includes(kw));
  const isBestPractice = !isRestriction && bestPracticeKeywords.some((kw) => combined.includes(kw));

  return {
    isRestriction: isRestriction || undefined,
    isBestPractice: isBestPractice || undefined,
  };
}
