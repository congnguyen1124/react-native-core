import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";
import { Pressable, StyleSheet, type ViewStyle } from "react-native";

import { colors, radius } from "@/constants/theme";

type IconName = ComponentProps<typeof Ionicons>["name"];

type IconButtonProps = {
  accessibilityLabel: string;
  icon: IconName;
  onPress: () => void;
  selected?: boolean;
  style?: ViewStyle;
};

export function IconButton({
  accessibilityLabel,
  icon,
  onPress,
  selected = false,
  style,
}: IconButtonProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        selected && styles.buttonSelected,
        pressed && styles.buttonPressed,
        style,
      ]}
    >
      <Ionicons
        color={selected ? colors.canvas : colors.ink}
        name={icon}
        size={20}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderStrong,
    backgroundColor: "rgba(12, 13, 18, 0.58)",
  },
  buttonSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  buttonPressed: {
    opacity: 0.72,
    transform: [{ scale: 0.96 }],
  },
});
