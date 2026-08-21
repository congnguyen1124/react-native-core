import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { PlanetId } from "@/features/solar-system/types";

type SolarSystemState = {
  favoriteIds: PlanetId[];
  hasHydrated: boolean;
  toggleFavorite: (planetId: PlanetId) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
};

export const useSolarSystemStore = create<SolarSystemState>()(
  persist(
    (set) => ({
      favoriteIds: [],
      hasHydrated: false,
      toggleFavorite: (planetId) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(planetId)
            ? state.favoriteIds.filter((id) => id !== planetId)
            : [...state.favoriteIds, planetId],
        })),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: "solar-system-preferences-v1",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ favoriteIds }) => ({ favoriteIds }),
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    },
  ),
);
