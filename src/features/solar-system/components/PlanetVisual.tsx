import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

import type { Planet } from "@/features/solar-system/types";

type PlanetVisualProps = {
  planet: Planet;
  size: number;
};

export function PlanetVisual({ planet, size }: PlanetVisualProps) {
  const ringWidth = size * 1.55;
  const ringHeight = size * 0.38;

  return (
    <View
      accessibilityLabel={`Minh họa ${planet.name}`}
      accessibilityRole="image"
      style={[styles.frame, { width: ringWidth, height: size }]}
    >
      {planet.hasRings ? (
        <View
          style={[
            styles.ring,
            {
              width: ringWidth,
              height: ringHeight,
              borderColor: `${planet.theme.accent}A8`,
              borderWidth: Math.max(3, size * 0.035),
            },
          ]}
        />
      ) : null}

      <LinearGradient
        colors={planet.theme.sphereGradient}
        end={{ x: 0.82, y: 0.86 }}
        start={{ x: 0.12, y: 0.08 }}
        style={[
          styles.sphere,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      >
        <View
          style={[
            styles.highlight,
            {
              width: size * 0.3,
              height: size * 0.13,
              borderRadius: size,
              top: size * 0.2,
              left: size * 0.16,
            },
          ]}
        />
        <View
          style={[
            styles.shadowBand,
            {
              height: size * 0.12,
              top: size * 0.58,
            },
          ]}
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    alignItems: "center",
    justifyContent: "center",
  },
  sphere: {
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255, 255, 255, 0.3)",
    boxShadow: "0 18px 30px rgba(0, 0, 0, 0.38)",
  },
  ring: {
    position: "absolute",
    borderRadius: 999,
    transform: [{ rotate: "-12deg" }],
    opacity: 0.82,
  },
  highlight: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.16)",
    transform: [{ rotate: "-14deg" }],
  },
  shadowBand: {
    position: "absolute",
    left: -10,
    right: -10,
    backgroundColor: "rgba(23, 16, 19, 0.14)",
    transform: [{ rotate: "5deg" }],
  },
});
