import { load } from 'cheerio';
import type { Channel } from '@/types/spreadsheet';
import type { GuidelinesContent, ContentBlock } from '@/types/guidelines';
import { extractAllTables, extractTextBlocks } from './extractSections';

const SCRAPE_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (compatible; RegulatoryDashboard/1.0)',
  Accept: 'text/html,application/xhtml+xml',
  'Accept-Language': 'en-US,en;q=0.9',
};

/**
 * Fetch and scrape a Twilio guidelines page.
 * Returns structured GuidelinesContent with 3 column arrays.
 */
export async function fetchAndScrapeGuidelines(
  isoCode: string,
  channel: Channel,
): Promise<GuidelinesContent> {
  const url = `https://www.twilio.com/en-us/guidelines/${isoCode}/${channel}`;

  let html: string;
  try {
    const res = await fetch(url, { headers: SCRAPE_HEADERS });
    if (res.status === 404 || res.status === 301) {
      return makeNotFound(isoCode, channel, url);
    }
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    html = await res.text();
  } catch (err) {
    return makeNotFound(isoCode, channel, url);
  }

  return scrapeHtml(html, isoCode, channel, url);
}

function scrapeHtml(
  html: string,
  isoCode: string,
  channel: Channel,
  sourceUrl: string,
): GuidelinesContent {
  const $ = load(html);

  // Detect not-found pages
  const title = $('title').text().toLowerCase();
  const h1 = $('h1').first().text().trim();
  if (title.includes('not found') || title.includes('404') || !h1) {
    return makeNotFound(isoCode, channel, sourceUrl);
  }

  const tables = extractAllTables($);
  const textBlocks = extractTextBlocks($);

  // Classify content into 3 columns based on heading keywords
  const featureSupport: ContentBlock[] = [];
  const regulatoryRequirements: ContentBlock[] = [];
  const bestPractices: ContentBlock[] = [];

  const allBlocks = [...tables, ...textBlocks];

  for (const block of allBlocks) {
    const heading = block.heading.toLowerCase();
    if (classifyAsRegulatory(heading)) {
      regulatoryRequirements.push(block);
    } else if (classifyAsBestPractice(heading)) {
      bestPractices.push(block);
    } else {
      featureSupport.push(block);
    }
  }

  // If we have no clear regulatory blocks but have restriction items,
  // move those items to regulatory
  if (regulatoryRequirements.length === 0) {
    for (const block of featureSupport) {
      const restrictionItems = block.items.filter((i) => i.isRestriction);
      if (restrictionItems.length > 0) {
        regulatoryRequirements.push({
          heading: block.heading + ' — Requirements',
          items: restrictionItems,
        });
      }
    }
  }

  return {
    isoCode,
    channel,
    sourceUrl,
    notFound: false,
    featureSupport,
    regulatoryRequirements,
    bestPractices,
  };
}

function classifyAsRegulatory(heading: string): boolean {
  const keywords = [
    'regulatory', 'regulation', 'compliance', 'requirement',
    'registration', 'register', 'document', 'address',
    'identity', 'verification', 'legal',
  ];
  return keywords.some((kw) => heading.includes(kw));
}

function classifyAsBestPractice(heading: string): boolean {
  const keywords = [
    'best practice', 'recommendation', 'tip', 'guideline',
    'consider', 'suggestion', 'opt-in', 'opt in',
  ];
  return keywords.some((kw) => heading.includes(kw));
}

function makeNotFound(isoCode: string, channel: Channel, sourceUrl: string): GuidelinesContent {
  return {
    isoCode,
    channel,
    sourceUrl,
    notFound: true,
    featureSupport: [],
    regulatoryRequirements: [],
    bestPractices: [],
  };
}
