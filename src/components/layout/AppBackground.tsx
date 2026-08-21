import { LinearGradient } from "expo-linear-gradient";
import type { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "@/constants/theme";

const stars = [
  { left: "8%", top: "9%", size: 2, opacity: 0.6 },
  { left: "28%", top: "15%", size: 1, opacity: 0.4 },
  { left: "78%", top: "8%", size: 2, opacity: 0.5 },
  { left: "91%", top: "21%", size: 1, opacity: 0.7 },
  { left: "16%", top: "38%", size: 1, opacity: 0.4 },
  { left: "62%", top: "32%", size: 2, opacity: 0.5 },
  { left: "84%", top: "47%", size: 1, opacity: 0.5 },
  { left: "5%", top: "61%", size: 2, opacity: 0.4 },
  { left: "37%", top: "69%", size: 1, opacity: 0.6 },
  { left: "72%", top: "77%", size: 2, opacity: 0.4 },
  { left: "93%", top: "88%", size: 1, opacity: 0.5 },
  { left: "22%", top: "92%", size: 1, opacity: 0.7 },
] as const;

export function AppBackground({ children }: PropsWithChildren) {
  return (
    <LinearGradient
      colors={["#171015", colors.canvas, "#0A1112"]}
      locations={[0, 0.46, 1]}
      style={styles.root}
    >
      <View style={[StyleSheet.absoluteFill, styles.nonInteractive]}>
        {stars.map((star, index) => (
          <View
            key={`${star.left}-${star.top}`}
            style={[
              styles.star,
              {
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
                opacity: star.opacity,
              },
            ]}
          />
        ))}
      </View>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  nonInteractive: {
    pointerEvents: "none",
  },
  star: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: colors.white,
  },
});
