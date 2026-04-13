// Language code → English section header used in en.wiktionary.org rendered HTML
const LANG_SECTION: Record<string, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese",
  ar: "Arabic",
};

/**
 * Fetches IPA phonetics for a word from the English Wiktionary.
 * Uses action=parse to get rendered HTML, then extracts <span class="IPA">
 * which is emitted by every language-specific pronunciation template
 * ({{IPA}}, {{it-pr}}, {{es-pr}}, {{de-IPA}}, etc.).
 *
 * Returns the first IPA string found for the given language section,
 * or null if nothing is found / the request fails.
 */
export async function fetchWiktionaryPhonetics(
  word: string,
  langCode: string,
): Promise<string | null> {
  if (!word.trim()) return null;

  // Wiktionary entries are typically lowercase; try original casing first,
  // then fall back to lowercase if the page is not found.
  const candidates = [word.trim(), word.trim().toLowerCase()].filter(
    (w, i, arr) => arr.indexOf(w) === i, // deduplicate when already lowercase
  );

  for (const candidate of candidates) {
    const html = await fetchParsedHTML(candidate);
    if (html === null) continue;

    const ipa = extractIPAFromHTML(html, langCode);
    if (ipa) return ipa;
  }

  return null;
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

/**
 * Calls action=parse and returns the rendered HTML string, or null on any
 * error (including page-not-found, which the API surfaces as an "error" key).
 */
async function fetchParsedHTML(word: string): Promise<string | null> {
  const encoded = encodeURIComponent(word);
  const url =
    `https://en.wiktionary.org/w/api.php?action=parse&page=${encoded}` +
    `&prop=text&format=json&origin=*`;

  try {
    const response = await fetch(url);
    if (!response.ok) return null;

    const data = (await response.json()) as ParseApiResponse;
    if ("error" in data) return null;

    return data.parse?.text?.["*"] ?? null;
  } catch {
    return null;
  }
}

/**
 * Extracts the first IPA value from rendered Wiktionary HTML.
 * Narrows to the target language section first so a word with entries in
 * multiple languages returns the correct pronunciation.
 *
 * Wiktionary always wraps IPA in <span class="IPA">…</span> regardless of
 * which template ({{IPA}}, {{it-pr}}, {{es-pr}}, {{de-IPA}}, …) produced it.
 */
function extractIPAFromHTML(html: string, langCode: string): string | null {
  const section = narrowToLangSection(html, langCode);

  // Some IPA spans are nested inside an anchor or another span; grabbing the
  // innerText of the outermost class="IPA" span is sufficient.
  const match = section.match(/<span class="IPA[^"]*"[^>]*>([^<]+)<\/span>/);
  if (!match) return null;

  return match[1].trim();
}

/**
 * Slices the HTML down to the block that belongs to the target language.
 * Wiktionary renders language headings as:
 *   <h2><span … id="Italian">Italian</span></h2>
 * The next <h2> marks the start of the following language section.
 */
function narrowToLangSection(html: string, langCode: string): string {
  const langName = LANG_SECTION[langCode.toLowerCase()];
  if (!langName) return html;

  const start = html.search(new RegExp(`id="${langName}"`, "i"));
  if (start === -1) return html;

  const afterStart = html.slice(start);
  const nextH2 = afterStart.slice(1).search(/<h2[\s>]/);

  return nextH2 === -1 ? afterStart : afterStart.slice(0, nextH2 + 1);
}

// ─── API response shapes (partial) ───────────────────────────────────────────

type ParseApiResponse = {
  parse?: { text?: { "*"?: string } };
  error?: unknown;
};
