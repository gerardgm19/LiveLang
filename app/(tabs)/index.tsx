import Ionicons from "@expo/vector-icons/Ionicons";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { LanguageTitleCard } from "@/components/LanguageTitleCard";
import { palette } from "@/constants/theme";
import { getPhrases, playPhraseAudio } from "@/services/phraseService";
import type { PhraseItem } from "@/types/phrase";

const phrases = getPhrases({ targetLanguage: "en", userLanguage: "es" });

function PhraseRow({ item }: { item: PhraseItem }) {
  return (
    <View style={styles.row}>
      <View style={styles.rowContent}>
        <Text style={styles.word}>{item.text}</Text>
        <Text style={styles.translation}>{item.translation}</Text>
        <Text style={styles.phonetics}>/{item.phonetics}/</Text>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Play pronunciation for ${item.text}`}
        onPress={() => playPhraseAudio(item)}
        style={styles.playButton}
      >
        <Ionicons name="volume-high" size={20} color={palette.white} />
      </Pressable>
    </View>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const topPadding = Math.max(insets.top, 12);

  return (
    <View style={[styles.container, { paddingTop: topPadding }]}>
      <LanguageTitleCard
        title="Learn fast"
        subtitle="Tiny lessons, big progress."
        leftFlagUri="https://flagcdn.com/w160/gb.png"
        rightFlagUri="https://flagcdn.com/w160/es.png"
      />

      <Text style={styles.sectionTitle}>English to Spanish</Text>

      <FlatList
        data={phrases}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PhraseRow item={item} />}
        ListEmptyComponent={<Text style={styles.empty}>No phrases found.</Text>}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: palette.backgroundTop,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: palette.text,
    marginBottom: 10,
  },
  listContent: {
    gap: 12,
    paddingBottom: 20,
  },
  row: {
    borderWidth: 2,
    borderColor: palette.border,
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    backgroundColor: palette.white,
  },
  rowContent: {
    flex: 1,
    gap: 4,
  },
  word: {
    fontSize: 20,
    fontWeight: "800",
    color: palette.text,
  },
  translation: {
    fontSize: 16,
    color: palette.green,
    fontWeight: "700",
  },
  phonetics: {
    fontSize: 14,
    color: palette.textSoft,
    fontWeight: "600",
  },
  playButton: {
    backgroundColor: palette.green,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  empty: {
    fontSize: 16,
    color: palette.textSoft,
    marginTop: 20,
  },
});
