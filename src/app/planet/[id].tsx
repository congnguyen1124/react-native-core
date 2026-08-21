import { useLocalSearchParams } from "expo-router";

import { PlanetDetailScreen } from "@/features/solar-system";
import { isPlanetId } from "@/features/solar-system/types";

export default function PlanetDetailRoute() {
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
  const planetId = rawId && isPlanetId(rawId) ? rawId : null;

  return <PlanetDetailScreen planetId={planetId} />;
}
