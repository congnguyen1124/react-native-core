import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "@/constants/theme";

type StatTileProps = {
  label: string;
  value: string;
};

export function StatTile({ label, value }: StatTileProps) {
  return (
    <View style={styles.tile}>
      <Text style={styles.label}>{label}</Text>
      <Text numberOfLines={2} style={styles.value}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: "48.5%",
    minHeight: 98,
    justifyContent: "space-between",
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  label: {
    ...typography.caption,
    color: colors.inkMuted,
  },
  value: {
    marginTop: spacing.sm,
    color: colors.ink,
    fontSize: 18,
    lineHeight: 23,
    fontWeight: "700",
    letterSpacing: 0,
  },
});
