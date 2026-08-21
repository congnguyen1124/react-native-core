import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { IconButton } from "@/components/ui/IconButton";
import { colors, radius, spacing, typography } from "@/constants/theme";
import { PlanetVisual } from "@/features/solar-system/components/PlanetVisual";
import { StatTile } from "@/features/solar-system/components/StatTile";
import { usePlanetsQuery } from "@/features/solar-system/hooks/use-planets-query";
import { useSolarSystemStore } from "@/features/solar-system/store/use-solar-system-store";
import type { PlanetId } from "@/features/solar-system/types";
import {
  formatDay,
  formatDistance,
  formatGravity,
  formatKilometers,
  formatMoons,
  formatTemperature,
  formatYear,
} from "@/features/solar-system/utils/format-planet-metric";

type PlanetDetailScreenProps = {
  planetId: PlanetId | null;
};

export function PlanetDetailScreen({ planetId }: PlanetDetailScreenProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const catalogQuery = usePlanetsQuery();
  const favoriteIds = useSolarSystemStore((state) => state.favoriteIds);
  const toggleFavorite = useSolarSystemStore((state) => state.toggleFavorite);
  const planet = catalogQuery.data.items.find((item) => item.id === planetId);
  const contentWidth = Math.min(Math.max(width - spacing.lg * 2, 280), 720);

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/");
  };

  if (!planet) {
    return (
      <View style={[styles.notFound, { paddingTop: insets.top + spacing.lg }]}>
        <StatusBar style="light" />
        <IconButton
          accessibilityLabel="Quay lại"
          icon="arrow-back"
          onPress={goBack}
        />
        <Text style={styles.notFoundTitle}>Không tìm thấy thiên thể</Text>
        <Text style={styles.notFoundBody}>
          Đường dẫn không khớp với danh mục Solar System hiện tại.
        </Text>
      </View>
    );
  }

  const isFavorite = favoriteIds.includes(planet.id);
  const stats = [
    { label: "Một năm", value: formatYear(planet.yearDays) },
    { label: "Một ngày", value: formatDay(planet.dayHours) },
    { label: "Bán kính", value: formatKilometers(planet.radiusKm) },
    {
      label: "Cách Mặt Trời",
      value: formatDistance(planet.distanceFromSunMillionKm),
    },
    { label: "Trọng lực", value: formatGravity(planet.gravityMs2) },
    { label: "Nhiệt độ TB", value: formatTemperature(planet.averageTemperatureC) },
  ];

  return (
    <LinearGradient colors={planet.theme.detailGradient} style={styles.root}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + spacing.xxl }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.hero, { paddingTop: insets.top + spacing.md }]}>
          <View style={[styles.heroContent, { width: contentWidth }]}>
            <View style={styles.navigationRow}>
              <IconButton
                accessibilityLabel="Quay lại"
                icon="arrow-back"
                onPress={goBack}
              />
              <IconButton
                accessibilityLabel={
                  isFavorite ? "Bỏ khỏi danh sách đã lưu" : "Lưu thiên thể"
                }
                icon={isFavorite ? "heart" : "heart-outline"}
                onPress={() => toggleFavorite(planet.id)}
                selected={isFavorite}
              />
            </View>

            <View style={styles.heroCopy}>
              <Text style={[styles.order, { color: planet.theme.accent }]}>
                0{planet.order} · {planet.categoryLabel}
              </Text>
              <Text style={styles.planetName}>{planet.name}</Text>
              <Text style={styles.englishName}>{planet.englishName}</Text>
            </View>

            <View style={styles.heroPlanet}>
              <PlanetVisual
                planet={planet}
                size={Math.min(Math.max(width * 0.34, 138), 220)}
              />
            </View>
          </View>
        </View>

        <View style={[styles.content, { width: contentWidth }]}>
          <Text style={styles.summary}>{planet.summary}</Text>

          <View style={styles.factRow}>
            <View style={[styles.factMark, { backgroundColor: planet.theme.accent }]} />
            <Text style={styles.fact}>{planet.signatureFact}</Text>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>NHỮNG CON SỐ</Text>
            <Text style={styles.sectionMeta}>Đơn vị Trái Đất</Text>
          </View>
          <View style={styles.statsGrid}>
            {stats.map((stat) => (
              <StatTile key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </View>

          <View style={styles.orbitSection}>
            <View>
              <Text style={styles.orbitLabel}>VỆ TINH ĐÃ BIẾT</Text>
              <Text style={styles.orbitValue}>{formatMoons(planet.knownMoons)}</Text>
            </View>
            <View style={styles.orbitDivider} />
            <View>
              <Text style={styles.orbitLabel}>VÀNH ĐAI</Text>
              <Text style={styles.orbitValue}>{planet.hasRings ? "Có" : "Không"}</Text>
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={() => toggleFavorite(planet.id)}
            style={({ pressed }) => [
              styles.favoriteButton,
              { backgroundColor: planet.theme.accent },
              pressed && styles.favoriteButtonPressed,
            ]}
          >
            <Ionicons
              color={colors.canvas}
              name={isFavorite ? "heart" : "heart-outline"}
              size={20}
            />
            <Text style={styles.favoriteButtonText}>
              {isFavorite ? "Đã lưu vào hành trình" : "Lưu vào hành trình"}
            </Text>
          </Pressable>

          <Text style={styles.dataCaption}>
            Số liệu từ catalog NASA đã tuyển chọn
            {catalogQuery.data.source === "remote" ? ", đã đồng bộ API" : ""}. Số
            lượng vệ tinh có thể thay đổi khi có công bố khoa học mới.
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  hero: {
    minHeight: 470,
    overflow: "hidden",
  },
  heroContent: {
    flex: 1,
    alignSelf: "center",
  },
  navigationRow: {
    zIndex: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heroCopy: {
    zIndex: 2,
    marginTop: spacing.xl,
    maxWidth: "74%",
  },
  order: {
    ...typography.eyebrow,
  },
  planetName: {
    marginTop: spacing.xs,
    color: colors.ink,
    fontSize: 44,
    lineHeight: 50,
    fontWeight: "800",
    letterSpacing: 0,
  },
  englishName: {
    ...typography.body,
    marginTop: spacing.xxs,
    color: colors.inkMuted,
  },
  heroPlanet: {
    position: "absolute",
    right: -46,
    bottom: 20,
  },
  content: {
    alignSelf: "center",
  },
  summary: {
    color: colors.ink,
    fontSize: 22,
    lineHeight: 31,
    fontWeight: "600",
    letterSpacing: 0,
  },
  factRow: {
    marginTop: spacing.lg,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  factMark: {
    width: 3,
    height: 46,
    borderRadius: radius.sm,
  },
  fact: {
    ...typography.body,
    flex: 1,
    color: colors.inkMuted,
  },
  sectionHeader: {
    marginTop: spacing.xxl,
    marginBottom: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    ...typography.eyebrow,
    color: colors.ink,
  },
  sectionMeta: {
    ...typography.caption,
    color: colors.inkSubtle,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: spacing.sm,
  },
  orbitSection: {
    marginTop: spacing.lg,
    minHeight: 116,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: "rgba(24, 25, 31, 0.72)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  orbitDivider: {
    width: StyleSheet.hairlineWidth,
    height: 54,
    backgroundColor: colors.borderStrong,
  },
  orbitLabel: {
    ...typography.eyebrow,
    color: colors.inkMuted,
    textAlign: "center",
  },
  orbitValue: {
    marginTop: spacing.xs,
    color: colors.ink,
    fontSize: 26,
    lineHeight: 30,
    fontWeight: "800",
    letterSpacing: 0,
    textAlign: "center",
  },
  favoriteButton: {
    minHeight: 52,
    marginTop: spacing.lg,
    borderRadius: radius.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  favoriteButtonPressed: {
    opacity: 0.78,
    transform: [{ scale: 0.99 }],
  },
  favoriteButtonText: {
    color: colors.canvas,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
    letterSpacing: 0,
  },
  dataCaption: {
    ...typography.caption,
    marginTop: spacing.md,
    color: colors.inkSubtle,
    textAlign: "center",
  },
  notFound: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.canvas,
  },
  notFoundTitle: {
    ...typography.heading,
    marginTop: spacing.xxl,
    color: colors.ink,
  },
  notFoundBody: {
    ...typography.body,
    marginTop: spacing.sm,
    color: colors.inkMuted,
  },
});
