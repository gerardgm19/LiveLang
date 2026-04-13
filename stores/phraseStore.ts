import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

import { SEED_PHRASES } from "@/services/phraseService";
import type { PhraseItem } from "@/types/phrase";

const STORAGE_KEY = "livelang_phrases";
const LANGUAGE_KEY = "livelang_selected_language";
const DEFAULT_LANGUAGE = "en";

type PhraseStore = {
  phrases: PhraseItem[];
  hydrated: boolean;
  selectedLanguage: string;
  hydrate: () => Promise<void>;
  addPhrase: (phrase: PhraseItem) => Promise<void>;
  deletePhrase: (id: string) => Promise<void>;
  getPhrases: (targetLanguage: string, userLanguage: string) => PhraseItem[];
  setSelectedLanguage: (code: string) => Promise<void>;
};

export const usePhraseStore = create<PhraseStore>((set, get) => ({
  phrases: [],
  hydrated: false,
  selectedLanguage: DEFAULT_LANGUAGE,

  hydrate: async () => {
    try {
      const [storedPhrases, storedLang] = await AsyncStorage.multiGet([
        STORAGE_KEY,
        LANGUAGE_KEY,
      ]);

      const phrases =
        storedPhrases[1] !== null
          ? (JSON.parse(storedPhrases[1]) as PhraseItem[])
          : SEED_PHRASES;

      if (storedPhrases[1] === null) {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_PHRASES));
      }

      set({
        phrases,
        selectedLanguage: storedLang[1] ?? DEFAULT_LANGUAGE,
        hydrated: true,
      });
    } catch {
      set({ phrases: SEED_PHRASES, selectedLanguage: DEFAULT_LANGUAGE, hydrated: true });
    }
  },

  addPhrase: async (phrase) => {
    const next = [...get().phrases, phrase];
    set({ phrases: next });
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // non-fatal: phrase is already in memory
    }
  },

  deletePhrase: async (id) => {
    const next = get().phrases.filter((p) => p.id !== id);
    set({ phrases: next });
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // non-fatal: phrase is already removed from memory
    }
  },

  getPhrases: (targetLanguage, userLanguage) =>
    get().phrases.filter(
      (p) => p.targetLanguage === targetLanguage && p.userLanguage === userLanguage,
    ),

  setSelectedLanguage: async (code) => {
    set({ selectedLanguage: code });
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, code);
    } catch {
      // non-fatal: language is already updated in memory
    }
  },
}));
