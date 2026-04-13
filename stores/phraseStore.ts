import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

import { SEED_PHRASES } from "@/services/phraseService";
import type { PhraseItem } from "@/types/phrase";

const STORAGE_KEY = "livelang_phrases";

type PhraseStore = {
  phrases: PhraseItem[];
  hydrated: boolean;
  hydrate: () => Promise<void>;
  addPhrase: (phrase: PhraseItem) => Promise<void>;
  getPhrases: (targetLanguage: string, userLanguage: string) => PhraseItem[];
};

export const usePhraseStore = create<PhraseStore>((set, get) => ({
  phrases: [],
  hydrated: false,

  hydrate: async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        set({ phrases: JSON.parse(stored) as PhraseItem[], hydrated: true });
      } else {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_PHRASES));
        set({ phrases: SEED_PHRASES, hydrated: true });
      }
    } catch {
      set({ phrases: SEED_PHRASES, hydrated: true });
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

  getPhrases: (targetLanguage, userLanguage) =>
    get().phrases.filter(
      (p) => p.targetLanguage === targetLanguage && p.userLanguage === userLanguage,
    ),
}));
