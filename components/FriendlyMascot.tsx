import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

import { palette } from "@/constants/theme";

type FriendlyMascotProps = {
  size?: number;
};

export function FriendlyMascot({ size = 96 }: FriendlyMascotProps) {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    );

    loop.start();

    return () => loop.stop();
  }, [floatAnim]);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          transform: [{ translateY: floatAnim }],
        },
      ]}
    >
      <View style={styles.eyesRow}>
        <View style={styles.eye} />
        <View style={styles.eye} />
      </View>
      <Ionicons name="happy" size={size * 0.42} color={palette.white} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: palette.green,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: palette.white,
  },
  eyesRow: {
    position: "absolute",
    top: 22,
    flexDirection: "row",
    gap: 18,
  },
  eye: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: palette.white,
  },
});
