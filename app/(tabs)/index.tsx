import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { getPhrases, playPhraseAudio } from "@/services/phraseService";
import type { PhraseItem } from "@/types/phrase";

const phrases = getPhrases({ targetLanguage: "en", userLanguage: "es" });

function PhraseRow({ item }: { item: PhraseItem }) {
  return (
    <View style={styles.row}>
      <View style={styles.rowContent}>
        <Text style={styles.word}>{item.text}</Text>
        <Text style={styles.translation}>{item.translation}</Text>
        <Text style={styles.phonetics}>{item.phonetics}</Text>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Play pronunciation for ${item.text}`}
        onPress={() => playPhraseAudio(item)}
        style={styles.playButton}
      >
        <Text style={styles.playButtonText}>Play</Text>
      </Pressable>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>English to Spanish</Text>
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
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  listContent: {
    gap: 12,
  },
  row: {
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  rowContent: {
    flex: 1,
    gap: 4,
  },
  word: {
    fontSize: 18,
    fontWeight: "600",
  },
  translation: {
    fontSize: 16,
    color: "#1f1f1f",
  },
  phonetics: {
    fontSize: 14,
    color: "#666",
  },
  playButton: {
    backgroundColor: "#111",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  playButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  empty: {
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
});
