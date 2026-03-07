import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { palette } from "@/constants/theme";
import { getLanguageSections } from "@/services/languageCatalogService";
import type { LanguageItem } from "@/types/language";

const { yourLanguages, availableLanguages } = getLanguageSections();

function LanguageCard({
  item,
  highlighted,
  onPress,
}: {
  item: LanguageItem;
  highlighted?: boolean;
  onPress: (language: LanguageItem) => void;
}) {
  return (
    <Pressable
      onPress={() => onPress(item)}
      style={({ pressed }) => [
        styles.card,
        highlighted ? styles.cardHighlighted : null,
        pressed ? styles.cardPressed : null,
      ]}
    >
      <View style={[styles.codeBadge, highlighted ? styles.codeBadgeHighlighted : null]}>
        <Text style={[styles.codeText, highlighted ? styles.codeTextHighlighted : null]}>{item.code}</Text>
      </View>
      <Text style={[styles.cardTitle, highlighted ? styles.cardTitleHighlighted : null]}>{item.name}</Text>
    </Pressable>
  );
}

function LanguageGrid({
  title,
  languages,
  highlighted,
  onSelect,
}: {
  title: string;
  languages: LanguageItem[];
  highlighted?: boolean;
  onSelect: (language: LanguageItem) => void;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.grid}>
        {languages.map((language) => (
          <View key={language.id} style={styles.gridItem}>
            <LanguageCard item={language} highlighted={highlighted} onPress={onSelect} />
          </View>
        ))}
      </View>
    </View>
  );
}

export default function LiveLangsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const topPadding = Math.max(insets.top, 12);

  const handleSelectLanguage = (language: LanguageItem) => {
    router.push({ pathname: "/", params: { lang: language.code.toLowerCase() } });
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingTop: topPadding }]}
    >
      <LanguageGrid
        title="Your Languages"
        languages={yourLanguages}
        highlighted
        onSelect={handleSelectLanguage}
      />
      <LanguageGrid
        title="Available languages"
        languages={availableLanguages}
        onSelect={handleSelectLanguage}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.backgroundBottom,
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
    fontSize: 22,
    fontWeight: "800",
    color: palette.text,
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
    minHeight: 98,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: palette.border,
    backgroundColor: palette.backgroundTop,
    padding: 12,
    justifyContent: "space-between",
  },
  cardHighlighted: {
    backgroundColor: palette.green,
    borderColor: palette.green,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
  },
  codeBadge: {
    alignSelf: "flex-start",
    backgroundColor: palette.blue,
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  codeBadgeHighlighted: {
    backgroundColor: palette.white,
  },
  codeText: {
    color: palette.white,
    fontWeight: "800",
    fontSize: 13,
  },
  codeTextHighlighted: {
    color: palette.green,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: palette.text,
  },
  cardTitleHighlighted: {
    color: palette.white,
  },
});
