import type { TextStyle, ViewStyle } from "react-native";

export const colors = {
  ink: "#F7F7F2",
  inkMuted: "#A9ABB5",
  inkSubtle: "#747782",
  canvas: "#08090D",
  canvasRaised: "#111218",
  surface: "#18191F",
  surfaceStrong: "#22232A",
  border: "rgba(255, 255, 255, 0.12)",
  borderStrong: "rgba(255, 255, 255, 0.2)",
  accent: "#F4C95D",
  danger: "#FF7A76",
  success: "#70D6A5",
  white: "#FFFFFF",
  black: "#000000",
} as const;

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 4,
  md: 8,
  pill: 999,
} as const;

export const typography = {
  eyebrow: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0,
    textTransform: "uppercase",
  } satisfies TextStyle,
  title: {
    fontSize: 40,
    lineHeight: 44,
    fontWeight: "800",
    letterSpacing: 0,
  } satisfies TextStyle,
  heading: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "700",
    letterSpacing: 0,
  } satisfies TextStyle,
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "400",
    letterSpacing: 0,
  } satisfies TextStyle,
  caption: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "500",
    letterSpacing: 0,
  } satisfies TextStyle,
} as const;

export const shadows = {
  card: {
    boxShadow: "0 18px 32px rgba(0, 0, 0, 0.28)",
  } satisfies ViewStyle,
} as const;
