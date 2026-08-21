import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "@/constants/theme";

export type PlanetFilter = "all" | "favorites";

type PlanetFilterTabsProps = {
  favoriteCount: number;
  onChange: (filter: PlanetFilter) => void;
  value: PlanetFilter;
};

const filters: { label: string; value: PlanetFilter }[] = [
  { label: "Tất cả", value: "all" },
  { label: "Đã lưu", value: "favorites" },
];

export function PlanetFilterTabs({
  favoriteCount,
  onChange,
  value,
}: PlanetFilterTabsProps) {
  return (
    <View accessibilityRole="tablist" style={styles.container}>
      {filters.map((filter) => {
        const selected = filter.value === value;
        const label =
          filter.value === "favorites" && favoriteCount > 0
            ? `${filter.label} ${favoriteCount}`
            : filter.label;

        return (
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            key={filter.value}
            onPress={() => onChange(filter.value)}
            style={({ pressed }) => [
              styles.tab,
              selected && styles.tabSelected,
              pressed && styles.tabPressed,
            ]}
          >
            {filter.value === "favorites" ? (
              <Ionicons
                color={selected ? colors.canvas : colors.inkMuted}
                name={selected ? "heart" : "heart-outline"}
                size={15}
              />
            ) : null}
            <Text style={[styles.label, selected && styles.labelSelected]}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: spacing.xxs,
    padding: spacing.xxs,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  tab: {
    minWidth: 92,
    height: 38,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  tabSelected: {
    backgroundColor: colors.accent,
  },
  tabPressed: {
    opacity: 0.72,
  },
  label: {
    ...typography.caption,
    color: colors.inkMuted,
    fontWeight: "700",
  },
  labelSelected: {
    color: colors.canvas,
  },
});
