/**
 * Types for scraped Twilio guidelines page content.
 * Guidelines pages use <table class="pricing-table"> structure.
 */

import type { Channel } from './spreadsheet';

export interface ContentItem {
  label?: string;
  value: string;
  isRestriction?: boolean;
  isBestPractice?: boolean;
}

export interface ContentBlock {
  heading: string;
  items: ContentItem[];
}

export interface GuidelinesContent {
  isoCode: string;
  channel: Channel;
  sourceUrl: string;
  notFound: boolean;
  featureSupport: ContentBlock[];
  regulatoryRequirements: ContentBlock[];
  bestPractices: ContentBlock[];
}

export interface GuidelinesApiResponse {
  data: GuidelinesContent | null;
  error: string | null;
  cached: boolean;
}
