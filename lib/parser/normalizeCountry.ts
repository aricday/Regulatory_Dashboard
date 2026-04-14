/**
 * Maps country names (as found in the Weather Report spreadsheet)
 * to ISO 3166-1 alpha-2 codes (lowercase).
 *
 * Four-tier resolution:
 *   1. Exact match in the alias map
 *   2. Case-insensitive match
 *   3. Known alias / variant name
 *   4. Partial match (first word or substring)
 */

const COUNTRY_TO_ISO: Record<string, string> = {
  // A
  'afghanistan': 'af',
  'aland islands': 'ax',
  'albania': 'al',
  'algeria': 'dz',
  'american samoa': 'as',
  'andorra': 'ad',
  'angola': 'ao',
  'anguilla': 'ai',
  'antigua & barbuda': 'ag',
  'antigua and barbuda': 'ag',
  'argentina': 'ar',
  'armenia': 'am',
  'aruba': 'aw',
  'australia': 'au',
  'austria': 'at',
  'azerbaijan': 'az',
  // B
  'bouvet island': 'bv',
  'bahamas': 'bs',
  'bahrain': 'bh',
  'bangladesh': 'bd',
  'barbados': 'bb',
  'belarus': 'by',
  'belgium': 'be',
  'belize': 'bz',
  'benin': 'bj',
  'bermuda': 'bm',
  'bhutan': 'bt',
  'bolivia': 'bo',
  'bosnia and herzegovina': 'ba',
  'bosnia & herzegovina': 'ba',
  'botswana': 'bw',
  'brazil': 'br',
  'brunei': 'bn',
  'bulgaria': 'bg',
  'burkina faso': 'bf',
  'burundi': 'bi',
  // C
  'cambodia': 'kh',
  'christmas island': 'cx',
  'cocos (keeling) islands': 'cc',
  'cameroon': 'cm',
  'canada': 'ca',
  'cape verde': 'cv',
  'cayman islands': 'ky',
  'cayman islands (uk)': 'ky',
  'central african republic': 'cf',
  'chad': 'td',
  'chile': 'cl',
  'china': 'cn',
  'colombia': 'co',
  'comoros': 'km',
  'congo (republic)': 'cg',
  'congo (republic of the congo)': 'cg',
  'congo (democratic republic)': 'cd',
  'congo (democratic republic of the congo)': 'cd',
  'cook islands': 'ck',
  'costa rica': 'cr',
  'croatia': 'hr',
  'cuba': 'cu',
  'cyprus': 'cy',
  'czech republic': 'cz',
  'czechia': 'cz',
  // D
  'denmark': 'dk',
  'djibouti': 'dj',
  'dominica': 'dm',
  'dominican republic': 'do',
  // E
  'ecuador': 'ec',
  'egypt': 'eg',
  'el salvador': 'sv',
  'equatorial guinea': 'gq',
  'eritrea': 'er',
  'estonia': 'ee',
  'eswatini': 'sz',
  'eswatini (swaziland)': 'sz',
  'swaziland': 'sz',
  'ethiopia': 'et',
  // F
  'falkland islands': 'fk',
  'faroe islands': 'fo',
  'fiji': 'fj',
  'finland': 'fi',
  'france': 'fr',
  'french guiana': 'gf',
  'french polynesia': 'pf',
  // G
  'gabon': 'ga',
  'gambia': 'gm',
  'georgia': 'ge',
  'germany': 'de',
  'ghana': 'gh',
  'gibraltar': 'gi',
  'greece': 'gr',
  'greenland': 'gl',
  'grenada': 'gd',
  'guadeloupe': 'gp',
  'guadeloupe & martinique': 'gp',
  'guam': 'gu',
  'guatemala': 'gt',
  'guernsey': 'gg',
  'guinea': 'gn',
  'guinea-bissau': 'gw',
  'guyana': 'gy',
  'holy see': 'va',
  // H
  'haiti': 'ht',
  'honduras': 'hn',
  'hong kong': 'hk',
  'hungary': 'hu',
  // I
  'iceland': 'is',
  'india': 'in',
  'indonesia': 'id',
  'iran': 'ir',
  'iraq': 'iq',
  'ireland': 'ie',
  'isle of man': 'im',
  'israel': 'il',
  'italy': 'it',
  'ivory coast': 'ci',
  "ivory coast (côte d'ivoire)": 'ci',
  "côte d'ivoire": 'ci',
  "cote d'ivoire": 'ci',
  // J
  'jamaica': 'jm',
  'japan': 'jp',
  'jersey': 'je',
  'jordan': 'jo',
  // K
  'kazakhstan': 'kz',
  'kenya': 'ke',
  'kiribati': 'ki',
  'kosovo': 'xk',
  'kuwait': 'kw',
  'kyrgyzstan': 'kg',
  // L
  'laos': 'la',
  'laos (lao people\'s democratic republic)': 'la',
  'latvia': 'lv',
  'lebanon': 'lb',
  'lesotho': 'ls',
  'liberia': 'lr',
  'libya': 'ly',
  'liechtenstein': 'li',
  'lithuania': 'lt',
  'luxembourg': 'lu',
  // M
  'macao': 'mo',
  'macau': 'mo',
  'macau (prc)': 'mo',
  'marshall islands': 'mh',
  'micronesia': 'fm',
  'north macedonia': 'mk',
  'macedonia': 'mk',
  'madagascar': 'mg',
  'malawi': 'mw',
  'malaysia': 'my',
  'maldives': 'mv',
  'mali': 'ml',
  'malta': 'mt',
  'martinique': 'mq',
  'mauritania': 'mr',
  'mauritius': 'mu',
  'mayotte': 'yt',
  'mexico': 'mx',
  'moldova': 'md',
  'monaco': 'mc',
  'mongolia': 'mn',
  'montenegro': 'me',
  'montserrat': 'ms',
  'morocco': 'ma',
  'mozambique': 'mz',
  'myanmar': 'mm',
  // N
  'namibia': 'na',
  'niue': 'nu',
  'norfolk island': 'nf',
  'north korea': 'kp',
  'northern mariana islands': 'mp',
  'nauru': 'nr',
  'nepal': 'np',
  'netherlands': 'nl',
  'netherlands antilles': 'an',
  'new caledonia': 'nc',
  'new zealand': 'nz',
  'nicaragua': 'ni',
  'niger': 'ne',
  'nigeria': 'ng',
  'norway': 'no',
  // O
  'oman': 'om',
  // P
  'pakistan': 'pk',
  'palau': 'pw',
  'pitcairn': 'pn',
  'palestine': 'ps',
  'panama': 'pa',
  'papua new guinea': 'pg',
  'paraguay': 'py',
  'peru': 'pe',
  'philippines': 'ph',
  'poland': 'pl',
  'portugal': 'pt',
  'puerto rico': 'pr',
  // Q
  'qatar': 'qa',
  // R
  'réunion': 're',
  'reunion': 're',
  'romania': 'ro',
  'russia': 'ru',
  'russian federation': 'ru',
  'rwanda': 'rw',
  'saint barthelemy': 'bl',
  'saint martin': 'mf',
  // S
  'samoa': 'ws',
  'san marino': 'sm',
  'sao tome and principe': 'st',
  'saudi arabia': 'sa',
  'senegal': 'sn',
  'serbia': 'rs',
  'seychelles': 'sc',
  'sierra leone': 'sl',
  'singapore': 'sg',
  'slovakia': 'sk',
  'slovenia': 'si',
  'solomon islands': 'sb',
  'somalia': 'so',
  'south africa': 'za',
  'south korea': 'kr',
  'korea, south': 'kr',
  'south sudan': 'ss',
  'spain': 'es',
  'sri lanka': 'lk',
  'st. kitts and nevis': 'kn',
  'saint kitts and nevis': 'kn',
  'st. lucia': 'lc',
  'saint lucia': 'lc',
  'saint vincent and the grenadines': 'vc',
  'sudan': 'sd',
  'suriname': 'sr',
  'sweden': 'se',
  'switzerland': 'ch',
  'syria': 'sy',
  // T
  'taiwan': 'tw',
  'tokelau': 'tk',
  'tuvalu': 'tv',
  'tajikistan': 'tj',
  'tanzania': 'tz',
  'thailand': 'th',
  'timor-leste': 'tl',
  'timor-leste (east timor)': 'tl',
  'togo': 'tg',
  'tonga': 'to',
  'trinidad and tobago': 'tt',
  'tunisia': 'tn',
  'turkey': 'tr',
  'turkmenistan': 'tm',
  'turks and caicos islands': 'tc',
  // U
  'uganda': 'ug',
  'ukraine': 'ua',
  'united arab emirates': 'ae',
  'united kingdom': 'gb',
  'united states': 'us',
  'uruguay': 'uy',
  'uzbekistan': 'uz',
  // V
  'vanuatu': 'vu',
  'venezuela': 've',
  'vietnam': 'vn',
  'u.s. virgin islands': 'vi',
  'virgin islands (british)': 'vg',
  'virgin islands (british virgin islands)': 'vg',
  // Y
  'yemen': 'ye',
  'wallis and futuna': 'wf',
  'western sahara': 'eh',
  // Z
  'zambia': 'zm',
  'zimbabwe': 'zw',
};

// Reverse map: ISO code → canonical display name
const ISO_TO_NAME: Record<string, string> = {};
// Build reverse map using the first entry for each ISO code
for (const [name, code] of Object.entries(COUNTRY_TO_ISO)) {
  if (!ISO_TO_NAME[code]) {
    // Capitalize each word for display
    ISO_TO_NAME[code] = name.replace(/\b\w/g, (c) => c.toUpperCase());
  }
}

/**
 * Resolves a country name to its ISO 3166-1 alpha-2 code (lowercase).
 * Returns null if no match is found.
 */
export function normalizeCountry(name: string): string | null {
  if (!name || !name.trim()) return null;

  const trimmed = name.trim();
  const lower = trimmed.toLowerCase();

  // Tier 1: Exact case-insensitive match
  if (COUNTRY_TO_ISO[lower]) {
    return COUNTRY_TO_ISO[lower];
  }

  // Tier 2: Strip parenthetical suffixes — e.g., "Cayman Islands (UK)" → "cayman islands"
  const withoutParens = lower.replace(/\s*\(.*\)\s*$/, '').trim();
  if (withoutParens !== lower && COUNTRY_TO_ISO[withoutParens]) {
    return COUNTRY_TO_ISO[withoutParens];
  }

  // Tier 3: Partial match — check if any known name starts with this string
  for (const [knownName, code] of Object.entries(COUNTRY_TO_ISO)) {
    if (knownName.startsWith(lower) || lower.startsWith(knownName)) {
      return code;
    }
  }

  return null;
}

/**
 * Returns the display name for a given ISO code.
 */
export function countryDisplayName(isoCode: string): string {
  return ISO_TO_NAME[isoCode.toLowerCase()] ?? isoCode.toUpperCase();
}
