import Ionicons from "@expo/vector-icons/Ionicons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FriendlyMascot } from "@/components/FriendlyMascot";
import { palette } from "@/constants/theme";

const goals = [
  { id: "g1", label: "Starter words", done: true },
  { id: "g2", label: "Daily phrase", done: true },
  { id: "g3", label: "Pronunciation", done: false },
];

export default function LiveLangsScreen() {
  const insets = useSafeAreaInsets();
  const topPadding = Math.max(insets.top, 12);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingTop: topPadding }]}
    >
      <View style={styles.heroCard}>
        <FriendlyMascot size={84} />
        <Text style={styles.title}>LiveLangs Mission</Text>
        <Text style={styles.subtitle}>Learn with short, fun sessions and keep your streak alive.</Text>
      </View>

      <View style={styles.goalCard}>
        <Text style={styles.sectionTitle}>Today checklist</Text>
        {goals.map((goal) => (
          <View key={goal.id} style={styles.goalRow}>
            <Ionicons
              name={goal.done ? "checkmark-circle" : "ellipse-outline"}
              size={28}
              color={goal.done ? palette.green : palette.textSoft}
            />
            <Text style={styles.goalText}>{goal.label}</Text>
          </View>
        ))}
      </View>
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
    gap: 14,
  },
  heroCard: {
    backgroundColor: palette.yellow,
    borderRadius: 24,
    padding: 18,
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: palette.text,
  },
  subtitle: {
    fontSize: 15,
    color: palette.text,
    textAlign: "center",
  },
  goalCard: {
    backgroundColor: palette.white,
    borderRadius: 22,
    padding: 16,
    gap: 10,
    borderWidth: 2,
    borderColor: palette.border,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: palette.text,
  },
  goalRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 4,
  },
  goalText: {
    fontSize: 16,
    fontWeight: "600",
    color: palette.text,
  },
});
