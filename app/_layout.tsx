import { Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";

import { usePhraseStore } from "@/stores/phraseStore";
import { useUserLanguagesStore } from "@/stores/userLanguagesStore";

export default function RootLayout() {
  const hydratePhrases = usePhraseStore((s) => s.hydrate);
  const hydrateLanguages = useUserLanguagesStore((s) => s.hydrate);

  useEffect(() => {
    hydratePhrases();
    hydrateLanguages();
  }, [hydratePhrases, hydrateLanguages]);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="add-phrase" options={{ headerShown: false }} />
        <Stack.Screen name="add-language" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
