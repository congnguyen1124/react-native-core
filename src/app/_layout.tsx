import { Stack } from "expo-router";

import { colors } from "@/constants/theme";
import { AppProviders } from "@/providers/AppProviders";

export default function RootLayout() {
  return (
    <AppProviders>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: colors.canvas },
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="planet/[id]" />
      </Stack>
    </AppProviders>
  );
}
