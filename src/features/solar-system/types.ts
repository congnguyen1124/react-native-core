import type { ColorValue } from "react-native";

export const PLANET_IDS = [
  "mercury",
  "venus",
  "earth",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune",
  "pluto",
] as const;

export type PlanetId = (typeof PLANET_IDS)[number];

export type PlanetCategory = "rocky" | "gas-giant" | "ice-giant" | "dwarf";

export type PlanetTheme = {
  cardGradient: readonly [ColorValue, ColorValue, ...ColorValue[]];
  detailGradient: readonly [ColorValue, ColorValue, ...ColorValue[]];
  sphereGradient: readonly [ColorValue, ColorValue, ...ColorValue[]];
  accent: string;
};

export type Planet = {
  id: PlanetId;
  name: string;
  englishName: string;
  order: number;
  category: PlanetCategory;
  categoryLabel: string;
  summary: string;
  signatureFact: string;
  yearDays: number;
  dayHours: number;
  radiusKm: number;
  distanceFromSunMillionKm: number;
  gravityMs2: number;
  averageTemperatureC: number;
  knownMoons: number;
  hasRings: boolean;
  cardHeight: number;
  theme: PlanetTheme;
};

export type PlanetCatalog = {
  items: Planet[];
  source: "curated" | "remote";
  updatedAt: string;
};

export function isPlanetId(value: string): value is PlanetId {
  return PLANET_IDS.includes(value as PlanetId);
}
