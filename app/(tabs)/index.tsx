import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, FlatList, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { LanguageTitleCard } from "@/components/LanguageTitleCard";
import { palette } from "@/constants/theme";
import { getLanguageByCode } from "@/services/languageCatalogService";
import { playPhraseAudio } from "@/services/phraseService";
import { useShallow } from "zustand/react/shallow";

import { usePhraseStore } from "@/stores/phraseStore";
import type { PhraseItem } from "@/types/phrase";

function PhraseRow({ item, onDelete }: { item: PhraseItem; onDelete: () => void }) {
  function handleDelete() {
    if (Platform.OS === "web") {
      if (window.confirm(`Delete "${item.text}"?`)) {
        onDelete();
      }
      return;
    }
    Alert.alert(
      "Delete phrase",
      `Are you sure you want to delete "${item.text}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: onDelete },
      ],
    );
  }

  return (
    <View style={styles.row}>
      <View style={styles.rowContent}>
        <Text style={styles.word}>{item.text}</Text>
        <Text style={styles.translation}>{item.translation}</Text>
        <Text style={styles.phonetics}>/{item.phonetics}/</Text>
      </View>
      <View style={styles.rowActions}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Play pronunciation for ${item.text}`}
          onPress={() => playPhraseAudio(item)}
          style={styles.playButton}
        >
          <Ionicons name="volume-high" size={20} color={palette.white} />
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Delete phrase ${item.text}`}
          onPress={handleDelete}
          style={styles.deleteButton}
        >
          <Ionicons name="trash-outline" size={20} color={palette.white} />
        </Pressable>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{ lang?: string }>();
  const storedLanguage = usePhraseStore((s) => s.selectedLanguage);
  const topPadding = Math.max(insets.top, 14);

  const selectedLanguageCode = (params.lang ?? storedLanguage).toLowerCase();
  const selectedLanguage = getLanguageByCode(selectedLanguageCode) ?? getLanguageByCode("en");

  const deletePhrase = usePhraseStore((s) => s.deletePhrase);

  const phrases = usePhraseStore(
    useShallow((s) =>
      s.phrases.filter(
        (p) => p.targetLanguage === selectedLanguageCode && p.userLanguage === "es",
      ),
    ),
  );

  return (
    <View style={[styles.container, { paddingTop: topPadding }]}>
      <LanguageTitleCard
        title="LiveLang"
        subtitle={`${selectedLanguage?.name ?? "English"} to Spanish`}
        leftFlagUri={selectedLanguage?.flagUri ?? "https://flagcdn.com/w160/gb.png"}
        rightFlagUri="https://flagcdn.com/w160/es.png"
      />

      <Text style={styles.sectionTitle}>Your expressions</Text>

      <FlatList
        data={phrases}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PhraseRow item={item} onDelete={() => deletePhrase(item.id)} />}
        ListEmptyComponent={<Text style={styles.empty}>No phrases found for this language yet.</Text>}
        contentContainerStyle={styles.listContent}
      />

      <Pressable
        style={[styles.fab, { bottom: insets.bottom + 20 }]}
        onPress={() => router.push({ pathname: "/add-phrase", params: { lang: selectedLanguageCode } })}
        accessibilityRole="button"
        accessibilityLabel="Add new phrase"
      >
        <Ionicons name="add" size={28} color={palette.white} />
      </Pressable>
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
    fontSize: 18,
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
    fontSize: 13,
    fontWeight: "800",
    color: palette.text,
  },
  translation: {
    fontSize: 13,
    color: palette.green,
    fontWeight: "700",
  },
  phonetics: {
    fontSize: 11,
    color: palette.textSoft,
    fontWeight: "600",
  },
  rowActions: {
    flexDirection: "row",
    gap: 8,
  },
  playButton: {
    backgroundColor: palette.green,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  deleteButton: {
    backgroundColor: "#e53e3e",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  empty: {
    fontSize: 13,
    color: palette.textSoft,
    marginTop: 20,
  },
  fab: {
    position: "absolute",
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: palette.green,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
});
