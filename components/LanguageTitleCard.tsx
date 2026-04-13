import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import { palette } from "@/constants/theme";

type LanguageTitleCardProps = {
  title: string;
  subtitle: string;
  leftFlagUri: string;
  rightFlagUri: string;
};

export function LanguageTitleCard({
  title,
  subtitle,
  leftFlagUri,
  rightFlagUri,
}: LanguageTitleCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.flagCircleWrap}>
        <View style={styles.flagCircle}>
          <View style={styles.flagHalf}>
            <Image source={{ uri: leftFlagUri }} style={styles.flagImage} contentFit="cover" />
          </View>
          <View style={[styles.flagHalf, styles.flagHalfRight]}>
            <Image source={{ uri: rightFlagUri }} style={styles.flagImage} contentFit="cover" />
          </View>
        </View>
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.blue,
    borderRadius: 24,
    minHeight: 120,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  flagCircleWrap: {
    width: 96,
    height: 76,
    borderRadius: 43,
    borderWidth: 3,
    borderColor: palette.white,
    overflow: "hidden",
    backgroundColor: palette.white,
  },
  flagCircle: {
    flex: 1,
    flexDirection: "row",
  },
  flagHalf: {
    flex: 1,
    backgroundColor: palette.white,
  },
  flagHalfRight: {
    borderLeftWidth: 1,
    borderLeftColor: palette.white,
  },
  flagImage: {
    width: "100%",
    height: "100%",
  },
  textWrap: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontSize: 32,
    lineHeight: 42,
    fontWeight: "800",
    color: palette.white,
  },
  subtitle: {
    fontSize: 22,
    lineHeight: 30,
    color: palette.white,
    fontWeight: "700",
  },
});
