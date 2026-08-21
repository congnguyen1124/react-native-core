import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "@/constants/theme";
import { PlanetVisual } from "@/features/solar-system/components/PlanetVisual";
import type { Planet } from "@/features/solar-system/types";
import { formatYear } from "@/features/solar-system/utils/format-planet-metric";

type PlanetCardProps = {
  isFavorite: boolean;
  onPress: () => void;
  planet: Planet;
};

export function PlanetCard({ isFavorite, onPress, planet }: PlanetCardProps) {
  return (
    <Pressable
      accessibilityHint="Mở thông tin chi tiết"
      accessibilityLabel={`${planet.name}, một năm dài ${formatYear(planet.yearDays)}`}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.pressable,
        { height: planet.cardHeight },
        pressed && styles.pressed,
      ]}
    >
      <LinearGradient
        colors={planet.theme.cardGradient}
        end={{ x: 0.92, y: 0.95 }}
        start={{ x: 0.08, y: 0.04 }}
        style={styles.card}
      >
        <View style={styles.topRow}>
          <Text style={styles.order}>0{planet.order}</Text>
          <View style={styles.iconShell}>
            <Ionicons
              color={isFavorite ? planet.theme.accent : colors.ink}
              name={isFavorite ? "heart" : "arrow-up-outline"}
              size={17}
            />
          </View>
        </View>

        <View style={styles.copy}>
          <Text numberOfLines={1} style={styles.category}>
            {planet.categoryLabel}
          </Text>
          <Text numberOfLines={2} style={styles.name}>
            {planet.name}
          </Text>
          <View style={styles.metricRow}>
            <Text style={styles.metricLabel}>Một năm</Text>
            <Text style={styles.metricValue}>{formatYear(planet.yearDays)}</Text>
          </View>
        </View>

        <View style={styles.planetVisual}>
          <PlanetVisual planet={planet} size={planet.cardHeight > 250 ? 108 : 88} />
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: "100%",
    borderRadius: radius.md,
    boxShadow: "0 18px 32px rgba(0, 0, 0, 0.28)",
  },
  pressed: {
    opacity: 0.84,
    transform: [{ scale: 0.985 }],
  },
  card: {
    flex: 1,
    overflow: "hidden",
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255, 255, 255, 0.18)",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  order: {
    ...typography.eyebrow,
    color: "rgba(255, 255, 255, 0.62)",
  },
  iconShell: {
    width: 32,
    height: 32,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(8, 9, 13, 0.28)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255, 255, 255, 0.16)",
  },
  copy: {
    zIndex: 2,
    marginTop: spacing.lg,
    maxWidth: "84%",
  },
  category: {
    ...typography.eyebrow,
    color: "rgba(255, 255, 255, 0.7)",
  },
  name: {
    marginTop: spacing.xxs,
    color: colors.white,
    fontSize: 22,
    lineHeight: 26,
    fontWeight: "800",
    letterSpacing: 0,
  },
  metricRow: {
    marginTop: spacing.sm,
  },
  metricLabel: {
    ...typography.caption,
    color: "rgba(255, 255, 255, 0.58)",
  },
  metricValue: {
    ...typography.caption,
    marginTop: 1,
    color: colors.white,
    fontWeight: "700",
  },
  planetVisual: {
    position: "absolute",
    right: -28,
    bottom: -20,
  },
});
