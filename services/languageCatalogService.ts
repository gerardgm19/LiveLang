import type { LanguageItem } from "@/types/language";

const LANGUAGES: LanguageItem[] = [
  { id: "lang-en", code: "EN", name: "English", flagUri: "https://flagcdn.com/w160/gb.png", hasContent: true },
  { id: "lang-es", code: "ES", name: "Spanish", flagUri: "https://flagcdn.com/w160/es.png", hasContent: true },
  { id: "lang-fr", code: "FR", name: "French", flagUri: "https://flagcdn.com/w160/fr.png", hasContent: true },
  { id: "lang-de", code: "DE", name: "German", flagUri: "https://flagcdn.com/w160/de.png", hasContent: true },
  { id: "lang-it", code: "IT", name: "Italian", flagUri: "https://flagcdn.com/w160/it.png", hasContent: false },
  { id: "lang-pt", code: "PT", name: "Portuguese", flagUri: "https://flagcdn.com/w160/pt.png", hasContent: false },
  { id: "lang-ja", code: "JA", name: "Japanese", flagUri: "https://flagcdn.com/w160/jp.png", hasContent: false },
  { id: "lang-ko", code: "KO", name: "Korean", flagUri: "https://flagcdn.com/w160/kr.png", hasContent: false },
  { id: "lang-zh", code: "ZH", name: "Chinese", flagUri: "https://flagcdn.com/w160/cn.png", hasContent: false },
  { id: "lang-ar", code: "AR", name: "Arabic", flagUri: "https://flagcdn.com/w160/sa.png", hasContent: false },
];

export function getLanguageCatalog(): LanguageItem[] {
  return LANGUAGES;
}

export function getLanguageSections(): {
  yourLanguages: LanguageItem[];
  availableLanguages: LanguageItem[];
} {
  return {
    yourLanguages: LANGUAGES.filter((language) => language.hasContent),
    availableLanguages: LANGUAGES.filter((language) => !language.hasContent),
  };
}

export function getLanguageByCode(code: string): LanguageItem | undefined {
  return LANGUAGES.find((language) => language.code.toLowerCase() === code.toLowerCase());
}
