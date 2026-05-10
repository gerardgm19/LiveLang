import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { palette } from "@/constants/theme";
import { searchLocales, type LocaleItem } from "@/services/localeCatalog";
import { useUserLanguagesStore } from "@/stores/userLanguagesStore";

export default function AddLanguageScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const codes = useUserLanguagesStore((s) => s.codes);
  const addLanguage = useUserLanguagesStore((s) => s.addLanguage);

  const [query, setQuery] = useState("");

  const data = useMemo(() => searchLocales(query), [query]);
  const added = useMemo(() => new Set(codes), [codes]);

  async function handleSelect(item: LocaleItem) {
    if (added.has(item.code)) return;
    await addLanguage(item.code);
    router.back();
  }

  return (
    <View style={styles.flex}>
      <View style={[styles.topBar, { paddingTop: insets.top }]}>
        <Pressable
          onPress={() => router.back()}
          style={styles.topBarAction}
          accessibilityRole="button"
          accessibilityLabel="Cancel"
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
        <Text style={styles.topBarTitle}>Add Language</Text>
        <View style={styles.topBarAction} />
      </View>

      <View style={styles.searchWrapper}>
        <Ionicons name="search" size={16} color={palette.textSoft} />
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholder="Search language or country"
          placeholderTextColor={palette.textSoft}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.code}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => {
          const isAdded = added.has(item.code);
          return (
            <Pressable
              onPress={() => handleSelect(item)}
              disabled={isAdded}
              style={({ pressed }) => [
                styles.row,
                pressed && !isAdded ? styles.rowPressed : null,
                isAdded ? styles.rowDisabled : null,
              ]}
              accessibilityRole="button"
              accessibilityLabel={`Add ${item.language} ${item.country}`}
            >
              <Image source={{ uri: item.flagUri }} style={styles.flag} />
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>{item.language}</Text>
                <Text style={styles.rowSubtitle}>{item.country}</Text>
              </View>
              <View style={styles.codeBadge}>
                <Text style={styles.codeText}>{item.code.toUpperCase()}</Text>
              </View>
              {isAdded ? (
                <Ionicons
                  name="checkmark-circle"
                  size={22}
                  color={palette.green}
                  style={styles.checkIcon}
                />
              ) : null}
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: palette.backgroundTop,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: palette.white,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  topBarTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: palette.text,
  },
  topBarAction: {
    minWidth: 64,
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  cancelText: {
    fontSize: 13,
    color: palette.textSoft,
    fontWeight: "600",
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: palette.white,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: palette.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: palette.text,
    padding: 0,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  separator: {
    height: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: palette.white,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: palette.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  rowPressed: {
    transform: [{ scale: 0.99 }],
  },
  rowDisabled: {
    opacity: 0.5,
  },
  flag: {
    width: 32,
    height: 24,
    borderRadius: 4,
    backgroundColor: palette.border,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: palette.text,
  },
  rowSubtitle: {
    fontSize: 11,
    color: palette.textSoft,
    fontWeight: "600",
  },
  codeBadge: {
    backgroundColor: palette.blue,
    borderRadius: 99,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  codeText: {
    color: palette.white,
    fontWeight: "800",
    fontSize: 10,
  },
  checkIcon: {
    marginLeft: 4,
  },
});
