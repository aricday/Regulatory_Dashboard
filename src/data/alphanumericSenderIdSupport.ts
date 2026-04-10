/**
 * AlphaNumeric Sender ID country support data.
 * Source: https://help.twilio.com/articles/223133767-International-support-for-Alphanumeric-Sender-ID
 * Last updated: 2026-04-10
 *
 * Status definitions (per Twilio article legend):
 *   supported             — "Yes": Dynamic registration not required; network supports it
 *   registration_required — "Yes - Registration Required": Additional documents required
 *   registration_optional — "Yes - Registration Optional": Works without registration; optional upgrade available
 *   not_supported         — "No": Not supported by local mobile operators
 *   conditional           — Country-specific conditional requirements (see notes field)
 */

export type AlphaSenderStatus =
  | 'supported'
  | 'registration_required'
  | 'registration_optional'
  | 'not_supported'
  | 'conditional';

export interface AlphaSenderEntry {
  /** Display name as shown in Twilio's article */
  country: string;
  /** ISO 3166-1 alpha-2 code (lowercase) */
  isoCode: string;
  status: AlphaSenderStatus;
  /** True when registration is required but currently paused (e.g. Russia) */
  registrationPaused?: boolean;
  /** Fee details when registration carries a cost */
  registrationFee?: string;
  /** Extended notes for conditional or complex requirements */
  notes?: string;
}

const entries: AlphaSenderEntry[] = [
  { country: 'Afghanistan', isoCode: 'af', status: 'registration_required' },
  { country: 'Albania', isoCode: 'al', status: 'supported' },
  { country: 'Algeria', isoCode: 'dz', status: 'registration_required' },
  { country: 'American Samoa', isoCode: 'as', status: 'supported' },
  { country: 'Andorra', isoCode: 'ad', status: 'supported' },
  { country: 'Angola', isoCode: 'ao', status: 'supported' },
  { country: 'Anguilla', isoCode: 'ai', status: 'supported' },
  { country: 'Antigua & Barbuda', isoCode: 'ag', status: 'supported' },
  { country: 'Argentina', isoCode: 'ar', status: 'supported' },
  { country: 'Armenia', isoCode: 'am', status: 'registration_required' },
  { country: 'Aruba', isoCode: 'aw', status: 'supported' },
  { country: 'Australia', isoCode: 'au', status: 'registration_required' },
  { country: 'Austria', isoCode: 'at', status: 'supported' },
  { country: 'Azerbaijan', isoCode: 'az', status: 'supported' },
  { country: 'Bahamas', isoCode: 'bs', status: 'not_supported' },
  { country: 'Bahrain', isoCode: 'bh', status: 'supported' },
  { country: 'Bangladesh', isoCode: 'bd', status: 'registration_required' },
  { country: 'Barbados', isoCode: 'bb', status: 'supported' },
  { country: 'Belarus', isoCode: 'by', status: 'registration_required' },
  { country: 'Belgium', isoCode: 'be', status: 'not_supported' },
  { country: 'Belize', isoCode: 'bz', status: 'supported' },
  { country: 'Benin', isoCode: 'bj', status: 'registration_required' },
  { country: 'Bermuda', isoCode: 'bm', status: 'supported' },
  { country: 'Bhutan', isoCode: 'bt', status: 'supported' },
  { country: 'Bolivia', isoCode: 'bo', status: 'supported' },
  { country: 'Bosnia and Herzegovina', isoCode: 'ba', status: 'supported' },
  { country: 'Botswana', isoCode: 'bw', status: 'supported' },
  { country: 'Brazil', isoCode: 'br', status: 'registration_required' },
  { country: 'Brunei', isoCode: 'bn', status: 'supported' },
  { country: 'Bulgaria', isoCode: 'bg', status: 'supported' },
  { country: 'Burkina Faso', isoCode: 'bf', status: 'supported' },
  { country: 'Burundi', isoCode: 'bi', status: 'supported' },
  { country: 'Cambodia', isoCode: 'kh', status: 'registration_required' },
  { country: 'Cameroon', isoCode: 'cm', status: 'registration_required' },
  { country: 'Canada', isoCode: 'ca', status: 'not_supported' },
  { country: 'Cape Verde', isoCode: 'cv', status: 'supported' },
  { country: 'Cayman Islands', isoCode: 'ky', status: 'not_supported' },
  { country: 'Central African Republic', isoCode: 'cf', status: 'supported' },
  { country: 'Chad', isoCode: 'td', status: 'supported' },
  { country: 'Chile', isoCode: 'cl', status: 'not_supported' },
  {
    country: 'China',
    isoCode: 'cn',
    status: 'not_supported',
    notes: 'Registration of message body template is recommended for messages to China.',
  },
  { country: 'Colombia', isoCode: 'co', status: 'not_supported' },
  { country: 'Comoros', isoCode: 'km', status: 'supported' },
  { country: 'Congo (Republic)', isoCode: 'cg', status: 'registration_required' },
  { country: 'Congo (Democratic Republic)', isoCode: 'cd', status: 'supported' },
  { country: 'Cook Islands', isoCode: 'ck', status: 'supported' },
  { country: 'Costa Rica', isoCode: 'cr', status: 'not_supported' },
  { country: 'Croatia', isoCode: 'hr', status: 'supported' },
  { country: 'Cuba', isoCode: 'cu', status: 'registration_required' },
  { country: 'Cyprus', isoCode: 'cy', status: 'supported' },
  {
    country: 'Czech Republic',
    isoCode: 'cz',
    status: 'registration_required',
    registrationFee: '$30.00 USD/month',
  },
  { country: 'Denmark', isoCode: 'dk', status: 'supported' },
  { country: 'Djibouti', isoCode: 'dj', status: 'supported' },
  { country: 'Dominica', isoCode: 'dm', status: 'supported' },
  { country: 'Dominican Republic', isoCode: 'do', status: 'not_supported' },
  { country: 'Ecuador', isoCode: 'ec', status: 'not_supported' },
  { country: 'Egypt', isoCode: 'eg', status: 'registration_required' },
  { country: 'El Salvador', isoCode: 'sv', status: 'registration_required' },
  { country: 'Equatorial Guinea', isoCode: 'gq', status: 'supported' },
  { country: 'Estonia', isoCode: 'ee', status: 'supported' },
  { country: 'Ethiopia', isoCode: 'et', status: 'registration_required' },
  { country: 'Falkland Islands', isoCode: 'fk', status: 'supported' },
  { country: 'Faroe Islands', isoCode: 'fo', status: 'supported' },
  { country: 'Fiji', isoCode: 'fj', status: 'supported' },
  {
    country: 'Finland',
    isoCode: 'fi',
    status: 'supported',
    notes:
      'Optional protected Sender ID registration available via Traficom. One-time fee: $375.00 USD + $70.00 USD/month.',
  },
  { country: 'France', isoCode: 'fr', status: 'supported' },
  { country: 'French Guiana', isoCode: 'gf', status: 'not_supported' },
  { country: 'French Polynesia', isoCode: 'pf', status: 'supported' },
  { country: 'Gabon', isoCode: 'ga', status: 'supported' },
  { country: 'Gambia', isoCode: 'gm', status: 'supported' },
  { country: 'Georgia', isoCode: 'ge', status: 'supported' },
  { country: 'Germany', isoCode: 'de', status: 'supported' },
  { country: 'Ghana', isoCode: 'gh', status: 'registration_required' },
  { country: 'Gibraltar', isoCode: 'gi', status: 'supported' },
  { country: 'Greece', isoCode: 'gr', status: 'supported' },
  { country: 'Greenland', isoCode: 'gl', status: 'supported' },
  { country: 'Grenada', isoCode: 'gd', status: 'supported' },
  { country: 'Guadeloupe', isoCode: 'gp', status: 'supported' },
  { country: 'Guam', isoCode: 'gu', status: 'not_supported' },
  { country: 'Guatemala', isoCode: 'gt', status: 'registration_required' },
  { country: 'Guernsey', isoCode: 'gg', status: 'supported' },
  { country: 'Guinea', isoCode: 'gn', status: 'registration_required' },
  { country: 'Guinea-Bissau', isoCode: 'gw', status: 'registration_required' },
  { country: 'Guyana', isoCode: 'gy', status: 'supported' },
  { country: 'Haiti', isoCode: 'ht', status: 'supported' },
  { country: 'Honduras', isoCode: 'hn', status: 'registration_required' },
  { country: 'Hong Kong', isoCode: 'hk', status: 'registration_required' },
  { country: 'Hungary', isoCode: 'hu', status: 'not_supported' },
  { country: 'Iceland', isoCode: 'is', status: 'supported' },
  { country: 'India', isoCode: 'in', status: 'registration_required' },
  {
    country: 'Indonesia',
    isoCode: 'id',
    status: 'registration_required',
    registrationFee: 'One-time $25.00 USD (domestic customers). No fee for international customers.',
  },
  { country: 'Iran', isoCode: 'ir', status: 'not_supported' },
  { country: 'Iraq', isoCode: 'iq', status: 'supported' },
  { country: 'Ireland', isoCode: 'ie', status: 'registration_required' },
  { country: 'Isle of Man', isoCode: 'im', status: 'supported' },
  {
    country: 'Israel',
    isoCode: 'il',
    status: 'conditional',
    notes:
      'Registration required only for companies based in Israel sending more than 30,000 SMS/month. No registration required for non-Israel-based companies or senders below 30,000 SMS/month.',
  },
  { country: 'Italy', isoCode: 'it', status: 'supported' },
  { country: "Ivory Coast (Côte d'Ivoire)", isoCode: 'ci', status: 'registration_required' },
  { country: 'Jamaica', isoCode: 'jm', status: 'supported' },
  { country: 'Japan', isoCode: 'jp', status: 'supported' },
  { country: 'Jersey', isoCode: 'je', status: 'supported' },
  { country: 'Jordan', isoCode: 'jo', status: 'registration_required' },
  {
    country: 'Kazakhstan',
    isoCode: 'kz',
    status: 'registration_required',
    registrationFee: '$250.00 USD/month',
  },
  { country: 'Kenya', isoCode: 'ke', status: 'registration_required' },
  { country: 'Kosovo', isoCode: 'xk', status: 'supported' },
  {
    country: 'Kuwait',
    isoCode: 'kw',
    status: 'registration_required',
    registrationFee: 'One-time $95.00 USD (domestic customers). No fee for international customers.',
  },
  { country: 'Kyrgyzstan', isoCode: 'kg', status: 'supported' },
  { country: 'Laos', isoCode: 'la', status: 'supported' },
  { country: 'Latvia', isoCode: 'lv', status: 'supported' },
  { country: 'Lebanon', isoCode: 'lb', status: 'supported' },
  { country: 'Lesotho', isoCode: 'ls', status: 'supported' },
  { country: 'Liberia', isoCode: 'lr', status: 'registration_required' },
  { country: 'Libya', isoCode: 'ly', status: 'supported' },
  { country: 'Liechtenstein', isoCode: 'li', status: 'supported' },
  { country: 'Lithuania', isoCode: 'lt', status: 'supported' },
  { country: 'Luxembourg', isoCode: 'lu', status: 'supported' },
  { country: 'Macau', isoCode: 'mo', status: 'supported' },
  { country: 'North Macedonia', isoCode: 'mk', status: 'supported' },
  { country: 'Madagascar', isoCode: 'mg', status: 'supported' },
  { country: 'Malawi', isoCode: 'mw', status: 'supported' },
  { country: 'Malaysia', isoCode: 'my', status: 'not_supported' },
  { country: 'Maldives', isoCode: 'mv', status: 'supported' },
  { country: 'Mali', isoCode: 'ml', status: 'supported' },
  { country: 'Malta', isoCode: 'mt', status: 'supported' },
  { country: 'Martinique', isoCode: 'mq', status: 'supported' },
  { country: 'Mauritania', isoCode: 'mr', status: 'supported' },
  { country: 'Mauritius', isoCode: 'mu', status: 'supported' },
  { country: 'Mayotte', isoCode: 'yt', status: 'supported' },
  {
    country: 'Mexico',
    isoCode: 'mx',
    status: 'registration_required',
    notes: 'Minimum 1,000 SMS per month required.',
  },
  { country: 'Moldova', isoCode: 'md', status: 'supported' },
  { country: 'Monaco', isoCode: 'mc', status: 'supported' },
  { country: 'Mongolia', isoCode: 'mn', status: 'supported' },
  { country: 'Montenegro', isoCode: 'me', status: 'supported' },
  { country: 'Montserrat', isoCode: 'ms', status: 'supported' },
  { country: 'Morocco', isoCode: 'ma', status: 'registration_required' },
  { country: 'Mozambique', isoCode: 'mz', status: 'registration_required' },
  { country: 'Myanmar', isoCode: 'mm', status: 'registration_required' },
  { country: 'Namibia', isoCode: 'na', status: 'supported' },
  { country: 'Nauru', isoCode: 'nr', status: 'not_supported' },
  { country: 'Nepal', isoCode: 'np', status: 'registration_required' },
  { country: 'Netherlands', isoCode: 'nl', status: 'supported' },
  { country: 'Netherlands Antilles', isoCode: 'an', status: 'supported' },
  { country: 'New Caledonia', isoCode: 'nc', status: 'supported' },
  { country: 'New Zealand', isoCode: 'nz', status: 'not_supported' },
  { country: 'Nicaragua', isoCode: 'ni', status: 'registration_required' },
  { country: 'Niger', isoCode: 'ne', status: 'supported' },
  { country: 'Nigeria', isoCode: 'ng', status: 'registration_required' },
  { country: 'Norway', isoCode: 'no', status: 'supported' },
  { country: 'Oman', isoCode: 'om', status: 'registration_required' },
  { country: 'Pakistan', isoCode: 'pk', status: 'supported' },
  { country: 'Palestine', isoCode: 'ps', status: 'supported' },
  { country: 'Panama', isoCode: 'pa', status: 'not_supported' },
  { country: 'Papua New Guinea', isoCode: 'pg', status: 'supported' },
  { country: 'Paraguay', isoCode: 'py', status: 'not_supported' },
  { country: 'Peru', isoCode: 'pe', status: 'supported' },
  { country: 'Philippines', isoCode: 'ph', status: 'registration_required' },
  { country: 'Poland', isoCode: 'pl', status: 'supported' },
  { country: 'Portugal', isoCode: 'pt', status: 'supported' },
  { country: 'Puerto Rico', isoCode: 'pr', status: 'not_supported' },
  { country: 'Qatar', isoCode: 'qa', status: 'registration_required' },
  { country: 'Réunion', isoCode: 're', status: 'supported' },
  {
    country: 'Romania',
    isoCode: 'ro',
    status: 'registration_optional',
    registrationFee: 'One-time $760.00 USD (optional)',
  },
  {
    country: 'Russia',
    isoCode: 'ru',
    status: 'registration_required',
    registrationPaused: true,
    registrationFee: '$230.00 USD/month',
    notes:
      'Russia Sender ID registration is currently PAUSED. If related to humanitarian aid or Twilio.org work, contact senderid@twilio.com for individual review.',
  },
  { country: 'Rwanda', isoCode: 'rw', status: 'registration_required' },
  { country: 'Samoa', isoCode: 'ws', status: 'supported' },
  { country: 'San Marino', isoCode: 'sm', status: 'supported' },
  { country: 'Sao Tome and Principe', isoCode: 'st', status: 'supported' },
  {
    country: 'Saudi Arabia',
    isoCode: 'sa',
    status: 'conditional',
    notes:
      'Registration required for non-Saudi Arabia-based companies. Registration is NOT supported for KSA-based companies.',
  },
  { country: 'Senegal', isoCode: 'sn', status: 'supported' },
  {
    country: 'Serbia',
    isoCode: 'rs',
    status: 'registration_optional',
    registrationFee: '$30.00 USD/month (optional)',
  },
  { country: 'Seychelles', isoCode: 'sc', status: 'supported' },
  { country: 'Sierra Leone', isoCode: 'sl', status: 'supported' },
  { country: 'Singapore', isoCode: 'sg', status: 'registration_required' },
  { country: 'Slovakia', isoCode: 'sk', status: 'supported' },
  { country: 'Slovenia', isoCode: 'si', status: 'supported' },
  { country: 'Solomon Islands', isoCode: 'sb', status: 'supported' },
  { country: 'Somalia', isoCode: 'so', status: 'supported' },
  { country: 'South Africa', isoCode: 'za', status: 'not_supported' },
  { country: 'South Korea', isoCode: 'kr', status: 'not_supported' },
  { country: 'South Sudan', isoCode: 'ss', status: 'registration_required' },
  { country: 'Spain', isoCode: 'es', status: 'supported' },
  { country: 'Sri Lanka', isoCode: 'lk', status: 'registration_required' },
  { country: 'St. Kitts and Nevis', isoCode: 'kn', status: 'supported' },
  { country: 'St. Lucia', isoCode: 'lc', status: 'supported' },
  { country: 'Saint Vincent and the Grenadines', isoCode: 'vc', status: 'supported' },
  { country: 'Sudan', isoCode: 'sd', status: 'registration_required' },
  { country: 'Suriname', isoCode: 'sr', status: 'supported' },
  { country: 'Eswatini (Swaziland)', isoCode: 'sz', status: 'registration_required' },
  { country: 'Sweden', isoCode: 'se', status: 'supported' },
  { country: 'Switzerland', isoCode: 'ch', status: 'supported' },
  { country: 'Syria', isoCode: 'sy', status: 'not_supported' },
  { country: 'Taiwan', isoCode: 'tw', status: 'not_supported' },
  { country: 'Tajikistan', isoCode: 'tj', status: 'supported' },
  { country: 'Tanzania', isoCode: 'tz', status: 'registration_required' },
  { country: 'Thailand', isoCode: 'th', status: 'registration_required' },
  { country: 'Timor-Leste', isoCode: 'tl', status: 'registration_required' },
  { country: 'Togo', isoCode: 'tg', status: 'supported' },
  { country: 'Tonga', isoCode: 'to', status: 'supported' },
  { country: 'Trinidad and Tobago', isoCode: 'tt', status: 'supported' },
  {
    country: 'Tunisia',
    isoCode: 'tn',
    status: 'conditional',
    notes:
      'Registration required only for companies based in Tunisia sending more than 30,000 SMS/month. No registration required for non-Tunisia-based companies or senders below 30,000 SMS/month.',
  },
  { country: 'Turkey', isoCode: 'tr', status: 'registration_required' },
  { country: 'Turkmenistan', isoCode: 'tm', status: 'supported' },
  { country: 'Turks and Caicos Islands', isoCode: 'tc', status: 'supported' },
  { country: 'Uganda', isoCode: 'ug', status: 'registration_required' },
  { country: 'Ukraine', isoCode: 'ua', status: 'supported' },
  { country: 'United Arab Emirates', isoCode: 'ae', status: 'registration_required' },
  { country: 'United Kingdom', isoCode: 'gb', status: 'supported' },
  { country: 'United States', isoCode: 'us', status: 'not_supported' },
  { country: 'Uruguay', isoCode: 'uy', status: 'not_supported' },
  { country: 'Uzbekistan', isoCode: 'uz', status: 'supported' },
  { country: 'Vanuatu', isoCode: 'vu', status: 'supported' },
  { country: 'Venezuela', isoCode: 've', status: 'registration_required' },
  { country: 'Vietnam', isoCode: 'vn', status: 'registration_required' },
  { country: 'Virgin Islands (British)', isoCode: 'vg', status: 'supported' },
  { country: 'Yemen', isoCode: 'ye', status: 'supported' },
  { country: 'Zambia', isoCode: 'zm', status: 'registration_required' },
  {
    country: 'Zimbabwe',
    isoCode: 'zw',
    status: 'registration_required',
    notes: 'Registration status — verify current requirements with Twilio support.',
  },
];

/**
 * O(1) lookup map keyed by ISO 3166-1 alpha-2 code (lowercase).
 * Use getAlphaSenderSupport() for the public API.
 */
export const ALPHA_SENDER_BY_ISO: ReadonlyMap<string, AlphaSenderEntry> = new Map(
  entries.map((e) => [e.isoCode, e]),
);

/**
 * Look up AlphaNumeric Sender ID support for a country by ISO code.
 * @param isoCode - ISO 3166-1 alpha-2 code (case-insensitive), e.g. "gb", "US"
 */
export function getAlphaSenderSupport(isoCode: string): AlphaSenderEntry | undefined {
  return ALPHA_SENDER_BY_ISO.get(isoCode.toLowerCase());
}

/**
 * Human-readable label for a status value, suitable for display in the UI.
 */
export function alphaSenderStatusLabel(status: AlphaSenderStatus): string {
  switch (status) {
    case 'supported':
      return 'Supported — No Registration Required';
    case 'registration_required':
      return 'Supported — Registration Required';
    case 'registration_optional':
      return 'Supported — Registration Optional';
    case 'not_supported':
      return 'Not Supported';
    case 'conditional':
      return 'Supported — Conditional Requirements';
  }
}

/**
 * CSS color class hint for each status (Tailwind convention).
 * Components can use this to colour-code the status badge.
 */
export function alphaSenderStatusColor(
  status: AlphaSenderStatus,
  paused?: boolean,
): 'green' | 'yellow' | 'orange' | 'red' | 'gray' {
  if (paused) return 'gray';
  switch (status) {
    case 'supported':
      return 'green';
    case 'registration_optional':
      return 'yellow';
    case 'registration_required':
      return 'orange';
    case 'conditional':
      return 'yellow';
    case 'not_supported':
      return 'red';
  }
}
