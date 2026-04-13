import Ionicons from "@expo/vector-icons/Ionicons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FriendlyMascot } from "@/components/FriendlyMascot";
import { palette } from "@/constants/theme";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const topPadding = Math.max(insets.top, 12);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingTop: topPadding }]}
    >
      <View style={styles.headerCard}>
        <FriendlyMascot size={78} />
        <View>
          <Text style={styles.name}>Learner Hero</Text>
          <Text style={styles.level}>Level 1 - Beginner</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: palette.green }]}>
          <Ionicons name="flame" size={30} color={palette.white} />
          <Text style={styles.statValue}>7</Text>
          <Text style={styles.statLabel}>Day streak</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: palette.blue }]}>
          <Ionicons name="trophy" size={30} color={palette.white} />
          <Text style={styles.statValue}>120</Text>
          <Text style={styles.statLabel}>XP</Text>
        </View>
      </View>

      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>Daily tip</Text>
        <Text style={styles.tipText}>Repeat each phrase out loud 3 times to improve confidence.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.backgroundTop,
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
  tipCard: {
    backgroundColor: palette.yellow,
    borderRadius: 22,
    padding: 16,
    gap: 6,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: palette.text,
  },
  tipText: {
    fontSize: 12,
    fontWeight: "600",
    color: palette.text,
  },
});
