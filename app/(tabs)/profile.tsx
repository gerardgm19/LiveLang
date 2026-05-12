import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FriendlyMascot } from "@/components/FriendlyMascot";
import { palette } from "@/constants/theme";
import { getAllLocales } from "@/services/localeCatalog";
import { usePhraseStore } from "@/stores/phraseStore";
import { useUserLanguagesStore } from "@/stores/userLanguagesStore";

const USER_LANGUAGE_OPTIONS = [{ code: "es", label: "Spanish" }];

export default function ProfileScreen() {
  const phrases = usePhraseStore((s) => s.phrases);
  const codes = useUserLanguagesStore((s) => s.codes);
  const userLanguage = useUserLanguagesStore((s) => s.userLanguage);
  const setUserLanguage = useUserLanguagesStore((s) => s.setUserLanguage);

  const [pickerOpen, setPickerOpen] = useState(false);

  const totalAvailable = getAllLocales().length;
  const currentOption =
    USER_LANGUAGE_OPTIONS.find((o) => o.code === userLanguage) ?? USER_LANGUAGE_OPTIONS[0];

  const handlePick = async (code: string) => {
    await setUserLanguage(code);
    setPickerOpen(false);
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.screen}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.headerCard}>
          <FriendlyMascot size={78} />
          <View>
            <Text style={styles.name}>Learner Hero</Text>
            <Text style={styles.level}>Profile</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: palette.green }]}>
            <Ionicons name="chatbubbles" size={26} color={palette.white} />
            <Text style={styles.statValue}>{phrases.length}</Text>
            <Text style={styles.statLabel}>Translations</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: palette.blue }]}>
            <Ionicons name="bookmark" size={26} color={palette.white} />
            <Text style={styles.statValue}>{codes.length}</Text>
            <Text style={styles.statLabel}>My languages</Text>
          </View>
        </View>

        <View style={[styles.fullStatCard, { backgroundColor: palette.yellow }]}>
          <Ionicons name="globe" size={26} color={palette.text} />
          <View style={styles.fullStatTextWrapper}>
            <Text style={styles.fullStatValue}>{totalAvailable}</Text>
            <Text style={styles.fullStatLabel}>Available languages</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your language</Text>
          <Pressable
            onPress={() => setPickerOpen(true)}
            style={({ pressed }) => [styles.selector, pressed ? styles.selectorPressed : null]}
            accessibilityRole="button"
            accessibilityLabel="Change your language"
          >
            <View style={styles.codeBadge}>
              <Text style={styles.codeText}>{currentOption.code.toUpperCase()}</Text>
            </View>
            <Text style={styles.selectorLabel}>{currentOption.label}</Text>
            <Ionicons name="chevron-down" size={18} color={palette.textSoft} />
          </Pressable>
        </View>
      </ScrollView>

      <Modal
        visible={pickerOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setPickerOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setPickerOpen(false)}>
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.sheetTitle}>Select your language</Text>
            {USER_LANGUAGE_OPTIONS.map((option) => {
              const selected = option.code === userLanguage;
              return (
                <Pressable
                  key={option.code}
                  onPress={() => handlePick(option.code)}
                  style={({ pressed }) => [
                    styles.option,
                    selected ? styles.optionSelected : null,
                    pressed ? styles.optionPressed : null,
                  ]}
                >
                  <View style={styles.codeBadge}>
                    <Text style={styles.codeText}>{option.code.toUpperCase()}</Text>
                  </View>
                  <Text style={styles.optionLabel}>{option.label}</Text>
                  {selected ? (
                    <Ionicons name="checkmark-circle" size={20} color={palette.green} />
                  ) : null}
                </Pressable>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
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
    gap: 14,
  },
  headerCard: {
    backgroundColor: palette.white,
    borderRadius: 24,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 2,
    borderColor: palette.border,
  },
  name: {
    fontSize: 19,
    fontWeight: "800",
    color: palette.text,
  },
  level: {
    fontSize: 12,
    fontWeight: "700",
    color: palette.textSoft,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    padding: 14,
    alignItems: "center",
    gap: 4,
  },
  statValue: {
    fontSize: 21,
    fontWeight: "900",
    color: palette.white,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: palette.white,
  },
  fullStatCard: {
    borderRadius: 20,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  fullStatTextWrapper: {
    flex: 1,
  },
  fullStatValue: {
    fontSize: 21,
    fontWeight: "900",
    color: palette.text,
  },
  fullStatLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: palette.text,
  },
  section: {
    backgroundColor: palette.white,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: palette.border,
    padding: 14,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: palette.text,
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: palette.backgroundTop,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: palette.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  selectorPressed: {
    transform: [{ scale: 0.99 }],
  },
  selectorLabel: {
    flex: 1,
    fontSize: 13,
    fontWeight: "800",
    color: palette.text,
  },
  codeBadge: {
    backgroundColor: palette.blue,
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  codeText: {
    color: palette.white,
    fontWeight: "800",
    fontSize: 10,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  sheet: {
    backgroundColor: palette.white,
    borderRadius: 20,
    padding: 16,
    gap: 10,
  },
  sheetTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: palette.text,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: palette.backgroundTop,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: palette.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  optionSelected: {
    borderColor: palette.green,
  },
  optionPressed: {
    transform: [{ scale: 0.99 }],
  },
  optionLabel: {
    flex: 1,
    fontSize: 13,
    fontWeight: "800",
    color: palette.text,
  },
});
