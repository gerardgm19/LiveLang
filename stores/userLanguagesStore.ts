import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const STORAGE_KEY = "livelang_user_languages";
const DEFAULT_CODES = ["en-us", "es-es", "fr-fr", "de-de"];

type UserLanguagesStore = {
  codes: string[];
  hydrated: boolean;
  hydrate: () => Promise<void>;
  addLanguage: (code: string) => Promise<void>;
  removeLanguage: (code: string) => Promise<void>;
};

export const useUserLanguagesStore = create<UserLanguagesStore>((set, get) => ({
  codes: [],
  hydrated: false,

  hydrate: async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        set({ codes: JSON.parse(stored) as string[], hydrated: true });
      } else {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CODES));
        set({ codes: DEFAULT_CODES, hydrated: true });
      }
    } catch {
      set({ codes: DEFAULT_CODES, hydrated: true });
    }
  },

  addLanguage: async (code) => {
    const lc = code.toLowerCase();
    const current = get().codes;
    if (current.includes(lc)) return;
    const next = [...current, lc];
    set({ codes: next });
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // non-fatal
    }
  },

  removeLanguage: async (code) => {
    const lc = code.toLowerCase();
    const next = get().codes.filter((c) => c !== lc);
    set({ codes: next });
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // non-fatal
    }
  },
}));
