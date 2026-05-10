export type LocaleItem = {
  code: string;
  language: string;
  country: string;
  flagUri: string;
};

const RAW: Array<[string, string, string]> = [
  ["af-ZA", "Afrikaans", "South Africa"],
  ["am-ET", "Amharic", "Ethiopia"],
  ["ar-SA", "Arabic", "Saudi Arabia"],
  ["az-AZ", "Azerbaijani", "Azerbaijan"],
  ["be-BY", "Belarusian", "Belarus"],
  ["bg-BG", "Bulgarian", "Bulgaria"],
  ["bn-IN", "Bengali", "India"],
  ["bs-BA", "Bosnian", "Bosnia and Herzegovina"],
  ["ca-ES", "Catalan", "Spain"],
  ["cs-CZ", "Czech", "Czech Republic"],
  ["cy-GB", "Welsh", "United Kingdom"],
  ["da-DK", "Danish", "Denmark"],
  ["de-AT", "German", "Austria"],
  ["de-CH", "German", "Switzerland"],
  ["de-DE", "German", "Germany"],
  ["el-GR", "Greek", "Greece"],
  ["en-AU", "English", "Australia"],
  ["en-CA", "English", "Canada"],
  ["en-GB", "English", "United Kingdom"],
  ["en-IE", "English", "Ireland"],
  ["en-IN", "English", "India"],
  ["en-NZ", "English", "New Zealand"],
  ["en-US", "English", "United States"],
  ["en-ZA", "English", "South Africa"],
  ["es-AR", "Spanish", "Argentina"],
  ["es-CL", "Spanish", "Chile"],
  ["es-CO", "Spanish", "Colombia"],
  ["es-ES", "Spanish", "Spain"],
  ["es-MX", "Spanish", "Mexico"],
  ["es-PE", "Spanish", "Peru"],
  ["et-EE", "Estonian", "Estonia"],
  ["fa-IR", "Persian", "Iran"],
  ["fi-FI", "Finnish", "Finland"],
  ["fil-PH", "Filipino", "Philippines"],
  ["fr-BE", "French", "Belgium"],
  ["fr-CA", "French", "Canada"],
  ["fr-CH", "French", "Switzerland"],
  ["fr-FR", "French", "France"],
  ["ga-IE", "Irish", "Ireland"],
  ["gl-ES", "Galician", "Spain"],
  ["gu-IN", "Gujarati", "India"],
  ["he-IL", "Hebrew", "Israel"],
  ["hi-IN", "Hindi", "India"],
  ["hr-HR", "Croatian", "Croatia"],
  ["hu-HU", "Hungarian", "Hungary"],
  ["id-ID", "Indonesian", "Indonesia"],
  ["is-IS", "Icelandic", "Iceland"],
  ["it-CH", "Italian", "Switzerland"],
  ["it-IT", "Italian", "Italy"],
  ["ja-JP", "Japanese", "Japan"],
  ["jv-ID", "Javanese", "Indonesia"],
  ["km-KH", "Khmer", "Cambodia"],
  ["kn-IN", "Kannada", "India"],
  ["ko-KR", "Korean", "South Korea"],
  ["lo-LA", "Lao", "Laos"],
  ["lt-LT", "Lithuanian", "Lithuania"],
  ["lv-LV", "Latvian", "Latvia"],
  ["ml-IN", "Malayalam", "India"],
  ["mr-IN", "Marathi", "India"],
  ["ms-MY", "Malay", "Malaysia"],
  ["nb-NO", "Norwegian Bokmål", "Norway"],
  ["ne-NP", "Nepali", "Nepal"],
  ["nl-BE", "Dutch", "Belgium"],
  ["nl-NL", "Dutch", "Netherlands"],
  ["no-NO", "Norwegian", "Norway"],
  ["pa-IN", "Punjabi", "India"],
  ["pl-PL", "Polish", "Poland"],
  ["pt-BR", "Portuguese", "Brazil"],
  ["pt-PT", "Portuguese", "Portugal"],
  ["ro-RO", "Romanian", "Romania"],
  ["ru-RU", "Russian", "Russia"],
  ["si-LK", "Sinhala", "Sri Lanka"],
  ["sk-SK", "Slovak", "Slovakia"],
  ["sl-SI", "Slovenian", "Slovenia"],
  ["sq-AL", "Albanian", "Albania"],
  ["sr-RS", "Serbian", "Serbia"],
  ["sv-FI", "Swedish", "Finland"],
  ["sv-SE", "Swedish", "Sweden"],
  ["sw-KE", "Swahili", "Kenya"],
  ["ta-IN", "Tamil", "India"],
  ["te-IN", "Telugu", "India"],
  ["th-TH", "Thai", "Thailand"],
  ["tr-TR", "Turkish", "Turkey"],
  ["uk-UA", "Ukrainian", "Ukraine"],
  ["ur-PK", "Urdu", "Pakistan"],
  ["vi-VN", "Vietnamese", "Vietnam"],
  ["zh-CN", "Chinese", "China"],
  ["zh-HK", "Chinese", "Hong Kong"],
  ["zh-SG", "Chinese", "Singapore"],
  ["zh-TW", "Chinese", "Taiwan"],
  ["zu-ZA", "Zulu", "South Africa"],
];

const LOCALES: LocaleItem[] = RAW.map(([tag, language, country]) => {
  const region = tag.split("-")[1].toLowerCase();
  return {
    code: tag.toLowerCase(),
    language,
    country,
    flagUri: `https://flagcdn.com/w160/${region}.png`,
  };
});

export function getAllLocales(): LocaleItem[] {
  return LOCALES;
}

export function getLocaleByCode(code: string): LocaleItem | undefined {
  const lc = code.toLowerCase();
  return LOCALES.find((l) => l.code === lc);
}

export function searchLocales(query: string): LocaleItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return LOCALES;
  return LOCALES.filter(
    (l) =>
      l.code.includes(q) ||
      l.language.toLowerCase().includes(q) ||
      l.country.toLowerCase().includes(q),
  );
}
