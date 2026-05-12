const LEGACY_CODE_MAP: Record<string, string> = {
  en: "en-us",
  es: "es-es",
  fr: "fr-fr",
  de: "de-de",
  it: "it-it",
  pt: "pt-br",
  ja: "ja-jp",
  ko: "ko-kr",
  zh: "zh-cn",
  ar: "ar-sa",
};

export function migrateLanguageCode(code: string): string {
  const lc = code.toLowerCase();
  return LEGACY_CODE_MAP[lc] ?? lc;
}
