import {
  focusManager,
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import * as Network from "expo-network";
import { useEffect, type PropsWithChildren } from "react";
import {
  AppState,
  Platform,
  type AppStateStatus,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
      gcTime: 24 * 60 * 60 * 1000,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
});

function updateFocus(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export function AppProviders({ children }: PropsWithChildren) {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", updateFocus);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    onlineManager.setEventListener((setOnline) => {
      let initialized = false;
      const subscription = Network.addNetworkStateListener((state) => {
        initialized = true;
        setOnline(Boolean(state.isConnected));
      });

      Network.getNetworkStateAsync()
        .then((state) => {
          if (!initialized) {
            setOnline(Boolean(state.isConnected));
          }
        })
        .catch(() => {
          // Keep TanStack Query's previous state when the OS cannot report it.
        });

      return () => subscription.remove();
    });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
