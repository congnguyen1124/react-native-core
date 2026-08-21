import { queryOptions, useQuery } from "@tanstack/react-query";

import { CURATED_PLANET_CATALOG } from "@/features/solar-system/data/planets";
import { fetchPlanetCatalog } from "@/features/solar-system/services/planets.api";

export const planetKeys = {
  all: ["solar-system"] as const,
  catalog: () => [...planetKeys.all, "catalog"] as const,
};

export const planetCatalogQueryOptions = queryOptions({
  queryKey: planetKeys.catalog(),
  queryFn: ({ signal }) => fetchPlanetCatalog(signal),
  initialData: CURATED_PLANET_CATALOG,
  initialDataUpdatedAt: 0,
  staleTime: 30 * 60 * 1000,
});

export function usePlanetsQuery() {
  return useQuery(planetCatalogQueryOptions);
}
