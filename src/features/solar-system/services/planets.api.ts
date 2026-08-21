import { z } from "zod";

import { CURATED_PLANET_CATALOG } from "@/features/solar-system/data/planets";
import type {
  Planet,
  PlanetCatalog,
  PlanetId,
} from "@/features/solar-system/types";
import { isPlanetId } from "@/features/solar-system/types";
import { getJson } from "@/lib/http/http-client";

const remoteMoonSchema = z.object({
  moon: z.string(),
  rel: z.string().optional(),
});

const remoteBodySchema = z.object({
  id: z.string(),
  englishName: z.string(),
  isPlanet: z.boolean().optional(),
  moons: z.array(remoteMoonSchema).nullable().optional(),
  semimajorAxis: z.number().nullable().optional(),
  gravity: z.number().nullable().optional(),
  meanRadius: z.number().nullable().optional(),
  sideralOrbit: z.number().nullable().optional(),
  sideralRotation: z.number().nullable().optional(),
  avgTemp: z.number().nullable().optional(),
});

const remoteCatalogSchema = z.object({
  bodies: z.array(remoteBodySchema),
});

type RemoteBody = z.infer<typeof remoteBodySchema>;

const bodyIdByEnglishName: Record<string, PlanetId> = {
  mercury: "mercury",
  venus: "venus",
  earth: "earth",
  mars: "mars",
  jupiter: "jupiter",
  saturn: "saturn",
  uranus: "uranus",
  neptune: "neptune",
  pluto: "pluto",
};

function positiveOrFallback(value: number | null | undefined, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? value
    : fallback;
}

function temperatureOrFallback(
  kelvin: number | null | undefined,
  fallback: number,
) {
  return typeof kelvin === "number" && Number.isFinite(kelvin) && kelvin > 0
    ? Math.round(kelvin - 273.15)
    : fallback;
}

function mergeRemoteMetrics(planet: Planet, body?: RemoteBody): Planet {
  if (!body) {
    return planet;
  }

  return {
    ...planet,
    yearDays: positiveOrFallback(body.sideralOrbit, planet.yearDays),
    dayHours: positiveOrFallback(
      body.sideralRotation ? Math.abs(body.sideralRotation) : undefined,
      planet.dayHours,
    ),
    radiusKm: positiveOrFallback(body.meanRadius, planet.radiusKm),
    distanceFromSunMillionKm:
      positiveOrFallback(body.semimajorAxis, planet.distanceFromSunMillionKm * 1_000_000) /
      1_000_000,
    gravityMs2: positiveOrFallback(body.gravity, planet.gravityMs2),
    averageTemperatureC: temperatureOrFallback(
      body.avgTemp,
      planet.averageTemperatureC,
    ),
    knownMoons: body.moons?.length ?? planet.knownMoons,
  };
}

function getApiBaseUrl() {
  return process.env.EXPO_PUBLIC_SOLAR_API_URL?.trim().replace(/\/$/, "");
}

export async function fetchPlanetCatalog(
  signal?: AbortSignal,
): Promise<PlanetCatalog> {
  const apiBaseUrl = getApiBaseUrl();

  if (!apiBaseUrl) {
    return CURATED_PLANET_CATALOG;
  }

  const response = await getJson(
    `${apiBaseUrl}/bodies`,
    remoteCatalogSchema,
    { signal },
  );

  const bodiesById = response.bodies.reduce<Partial<Record<PlanetId, RemoteBody>>>(
    (result, body) => {
      const candidateId = bodyIdByEnglishName[body.englishName.toLowerCase()];

      if (candidateId && isPlanetId(candidateId)) {
        result[candidateId] = body;
      }

      return result;
    },
    {},
  );

  return {
    items: CURATED_PLANET_CATALOG.items.map((planet) =>
      mergeRemoteMetrics(planet, bodiesById[planet.id]),
    ),
    source: "remote",
    updatedAt: new Date().toISOString(),
  };
}
