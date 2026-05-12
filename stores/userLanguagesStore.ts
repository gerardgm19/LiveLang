import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

import { migrateLanguageCode } from "@/services/languageMigration";

const STORAGE_KEY = "livelang_user_languages";
const USER_LANGUAGE_KEY = "livelang_user_language";
const DEFAULT_CODES: string[] = [];
const DEFAULT_USER_LANGUAGE = "es";

type UserLanguagesStore = {
  codes: string[];
  userLanguage: string;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  addLanguage: (code: string) => Promise<void>;
  removeLanguage: (code: string) => Promise<void>;
  setUserLanguage: (code: string) => Promise<void>;
};

export const useUserLanguagesStore = create<UserLanguagesStore>((set, get) => ({
  codes: [],
  userLanguage: DEFAULT_USER_LANGUAGE,
  hydrated: false,

  hydrate: async () => {
    try {
      const [storedCodes, storedUser] = await AsyncStorage.multiGet([
        STORAGE_KEY,
        USER_LANGUAGE_KEY,
      ]);

      const codes =
        storedCodes[1] !== null ? (JSON.parse(storedCodes[1]) as string[]) : DEFAULT_CODES;
      if (storedCodes[1] === null) {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CODES));
      }

      const rawUser = storedUser[1] ?? DEFAULT_USER_LANGUAGE;
      const userLanguage = migrateLanguageCode(rawUser);
      if (userLanguage !== rawUser || storedUser[1] === null) {
        await AsyncStorage.setItem(USER_LANGUAGE_KEY, userLanguage);
      }

      set({
        codes,
        userLanguage,
        hydrated: true,
      });
    } catch {
      set({ codes: DEFAULT_CODES, userLanguage: DEFAULT_USER_LANGUAGE, hydrated: true });
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

  setUserLanguage: async (code) => {
    const lc = code.toLowerCase();
    set({ userLanguage: lc });
    try {
      await AsyncStorage.setItem(USER_LANGUAGE_KEY, lc);
    } catch {
      // non-fatal
    }
  },
}));
