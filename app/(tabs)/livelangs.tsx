import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { palette } from "@/constants/theme";
import { getLocaleByCode, type LocaleItem } from "@/services/localeCatalog";
import { usePhraseStore } from "@/stores/phraseStore";
import { useUserLanguagesStore } from "@/stores/userLanguagesStore";

function LanguageCard({
  locale,
  onPress,
}: {
  locale: LocaleItem;
  onPress: (locale: LocaleItem) => void;
}) {
  return (
    <Pressable
      onPress={() => onPress(locale)}
      style={({ pressed }) => [styles.card, pressed ? styles.cardPressed : null]}
    >
      <View style={styles.codeBadge}>
        <Text style={styles.codeText}>{locale.code.toUpperCase()}</Text>
      </View>
      <Text style={styles.cardTitle}>{locale.language}</Text>
      <Text style={styles.cardSubtitle}>{locale.country}</Text>
    </Pressable>
  );
}

function AddLanguageCard({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        styles.addCard,
        pressed ? styles.cardPressed : null,
      ]}
      accessibilityRole="button"
      accessibilityLabel="Add language"
    >
      <Ionicons name="add-circle" size={28} color={palette.green} />
      <Text style={styles.addCardTitle}>Add language</Text>
    </Pressable>
  );
}

export default function LiveLangsScreen() {
  const router = useRouter();
  const setSelectedLanguage = usePhraseStore((s) => s.setSelectedLanguage);
  const codes = useUserLanguagesStore((s) => s.codes);

  const locales = useMemo(
    () =>
      codes
        .map((code) => getLocaleByCode(code))
        .filter((l): l is LocaleItem => Boolean(l)),
    [codes],
  );

  const handleSelectLanguage = (locale: LocaleItem) => {
    const code = locale.code.toLowerCase();
    setSelectedLanguage(code);
    router.navigate({ pathname: "/(tabs)", params: { lang: code } });
  };

  const handleAdd = () => {
    router.push("/add-language");
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.screen}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Languages</Text>
          {locales.length === 0 ? (
            <Text style={styles.emptyHint}>
              No languages yet — tap Add language to get started.
            </Text>
          ) : null}
          <View style={styles.grid}>
            {locales.map((locale) => (
              <View key={locale.code} style={styles.gridItem}>
                <LanguageCard locale={locale} onPress={handleSelectLanguage} />
              </View>
            ))}
            <View style={styles.gridItem}>
              <AddLanguageCard onPress={handleAdd} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 16,
    flex: 1,
    backgroundColor: palette.backgroundBottom,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 16,
  },
  section: {
    backgroundColor: palette.white,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: palette.border,
    padding: 14,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: palette.text,
  },
  emptyHint: {
    fontSize: 12,
    color: palette.textSoft,
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -5,
    rowGap: 10,
  },
  gridItem: {
    width: "50%",
    paddingHorizontal: 5,
  },
  card: {
    minHeight: 110,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: palette.green,
    backgroundColor: palette.green,
    padding: 12,
    justifyContent: "space-between",
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
  },
  codeBadge: {
    alignSelf: "flex-start",
    backgroundColor: palette.white,
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  codeText: {
    color: palette.green,
    fontWeight: "800",
    fontSize: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: palette.white,
  },
  cardSubtitle: {
    fontSize: 11,
    fontWeight: "600",
    color: palette.white,
    opacity: 0.85,
  },
  addCard: {
    backgroundColor: palette.white,
    borderColor: palette.border,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  addCardTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: palette.green,
  },
});
