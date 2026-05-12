import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, FlatList, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { LanguageTitleCard } from "@/components/LanguageTitleCard";
import { palette } from "@/constants/theme";
import { getLocaleByCode } from "@/services/localeCatalog";
import { playPhraseAudio, stopPhraseAudio } from "@/services/phraseService";
import { useShallow } from "zustand/react/shallow";

import { usePhraseStore } from "@/stores/phraseStore";
import { useUserLanguagesStore } from "@/stores/userLanguagesStore";
import type { PhraseItem } from "@/types/phrase";

function PhraseRow({
  item,
  isSpeaking,
  onPlay,
  onDelete,
}: {
  item: PhraseItem;
  isSpeaking: boolean;
  onPlay: () => void;
  onDelete: () => void;
}) {
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
          accessibilityLabel={
            isSpeaking ? `Stop pronunciation for ${item.text}` : `Play pronunciation for ${item.text}`
          }
          onPress={onPlay}
          style={[styles.playButton, isSpeaking ? styles.playButtonActive : null]}
        >
          <Ionicons
            name={isSpeaking ? "stop" : "volume-high"}
            size={20}
            color={palette.white}
          />
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
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{ lang?: string }>();
  const storedLanguage = usePhraseStore((s) => s.selectedLanguage);

  const selectedLanguageCode = (params.lang ?? storedLanguage).toLowerCase();
  const userLanguageCode = useUserLanguagesStore((s) => s.userLanguage);
  const selectedLocale = getLocaleByCode(selectedLanguageCode);
  const userLocale = getLocaleByCode(userLanguageCode);

  const [filterText, setFilterText] = useState("");
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const deletePhrase = usePhraseStore((s) => s.deletePhrase);

  function handlePlay(item: PhraseItem) {
    if (speakingId === item.id) {
      stopPhraseAudio();
      setSpeakingId(null);
      return;
    }
    setSpeakingId(item.id);
    playPhraseAudio(item, {
      onDone: () => setSpeakingId((id) => (id === item.id ? null : id)),
      onStopped: () => setSpeakingId((id) => (id === item.id ? null : id)),
      onError: () => setSpeakingId((id) => (id === item.id ? null : id)),
    });
  }

  const phrases = usePhraseStore(
    useShallow((s) =>
      s.phrases.filter(
        (p) => p.targetLanguage === selectedLanguageCode && p.userLanguage === userLanguageCode,
      ),
    ),
  );

  const query = filterText.trim().toLowerCase();
  const filteredPhrases = query
    ? phrases.filter(
      (p) =>
        p.text.toLowerCase().includes(query) ||
        p.translation.toLowerCase().includes(query),
    )
    : phrases;

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <LanguageTitleCard
        title="LiveLang"
        subtitle={`${selectedLocale?.language ?? "English"} to ${userLocale?.language ?? "Spanish"}`}
        leftFlagUri={selectedLocale?.flagUri ?? "https://flagcdn.com/w160/us.png"}
        rightFlagUri={userLocale?.flagUri ?? "https://flagcdn.com/w160/es.png"}
      />

      <Text style={styles.sectionTitle}>Your expressions</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Filter by phrase or translation..."
        placeholderTextColor={palette.textSoft}
        value={filterText}
        onChangeText={setFilterText}
        clearButtonMode="while-editing"
        autoCorrect={false}
      />

      <FlatList
        data={filteredPhrases}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PhraseRow
            item={item}
            isSpeaking={speakingId === item.id}
            onPlay={() => handlePlay(item)}
            onDelete={() => deletePhrase(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No phrases found for this language yet.</Text>}
        contentContainerStyle={styles.listContent}
      />

      <Pressable
        style={[styles.fab, { bottom: bottom + 20 }]}
        onPress={() => router.push({ pathname: "/add-phrase", params: { lang: selectedLanguageCode } })}
        accessibilityRole="button"
        accessibilityLabel="Add new phrase"
      >
        <Ionicons name="add" size={28} color={palette.white} />
      </Pressable>
    </SafeAreaView>
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
  searchInput: {
    borderWidth: 2,
    borderColor: palette.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    color: palette.text,
    backgroundColor: palette.white,
    marginBottom: 12,
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
  playButtonActive: {
    backgroundColor: palette.blue,
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
