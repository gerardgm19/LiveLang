import { Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { usePhraseStore } from "@/stores/phraseStore";

export default function RootLayout() {
  const hydrate = usePhraseStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="add-phrase" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
