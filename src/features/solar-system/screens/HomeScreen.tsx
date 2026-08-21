import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppBackground } from "@/components/layout/AppBackground";
import { colors, radius, spacing, typography } from "@/constants/theme";
import { PlanetCard } from "@/features/solar-system/components/PlanetCard";
import {
  PlanetFilterTabs,
  type PlanetFilter,
} from "@/features/solar-system/components/PlanetFilterTabs";
import { usePlanetsQuery } from "@/features/solar-system/hooks/use-planets-query";
import { useSolarSystemStore } from "@/features/solar-system/store/use-solar-system-store";
import type { Planet } from "@/features/solar-system/types";

function splitColumns(planets: Planet[]) {
  return planets.reduce<[Planet[], Planet[]]>(
    (columns, planet, index) => {
      columns[index % 2].push(planet);
      return columns;
    },
    [[], []],
  );
}

export function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [filter, setFilter] = useState<PlanetFilter>("all");
  const favoriteIds = useSolarSystemStore((state) => state.favoriteIds);
  const catalogQuery = usePlanetsQuery();
  const contentWidth = Math.min(Math.max(width - spacing.lg * 2, 280), 720);
  const visiblePlanets =
    filter === "favorites"
      ? catalogQuery.data.items.filter((planet) => favoriteIds.includes(planet.id))
      : catalogQuery.data.items;
  const columns = splitColumns(visiblePlanets);

  return (
    <AppBackground>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + spacing.lg,
            paddingBottom: insets.bottom + spacing.xxl,
          },
        ]}
        refreshControl={
          <RefreshControl
            onRefresh={() => catalogQuery.refetch()}
            refreshing={catalogQuery.isRefetching}
            tintColor={colors.accent}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.content, { width: contentWidth }]}>
          <View style={styles.header}>
            <View style={styles.eyebrowRow}>
              <View style={styles.sunMark} />
              <Text style={styles.eyebrow}>Bản đồ thiên thể</Text>
            </View>
            <Text style={styles.title}>SOLAR{`\n`}SYSTEM</Text>
            <Text style={styles.intro}>
              Chín thế giới, từ Sao Thủy rực nóng đến Sao Diêm Vương băng giá.
              Chạm vào từng thiên thể để đi sâu hơn.
            </Text>
          </View>

          <View style={styles.toolbar}>
            <PlanetFilterTabs
              favoriteCount={favoriteIds.length}
              onChange={setFilter}
              value={filter}
            />
            <View style={styles.syncStatus}>
              <View
                style={[
                  styles.syncDot,
                  catalogQuery.isFetching && styles.syncDotActive,
                ]}
              />
              <Text style={styles.syncLabel}>
                {catalogQuery.data.source === "remote" ? "API" : "Catalog"}
              </Text>
            </View>
          </View>

          {catalogQuery.error ? (
            <View accessibilityRole="alert" style={styles.notice}>
              <Ionicons color={colors.danger} name="cloud-offline-outline" size={18} />
              <Text style={styles.noticeText}>
                Không đồng bộ được API. App đang dùng dữ liệu đã kiểm chứng trên máy.
              </Text>
            </View>
          ) : null}

          {visiblePlanets.length > 0 ? (
            <View style={styles.grid}>
              {columns.map((column, columnIndex) => (
                <View
                  key={`column-${columnIndex}`}
                  style={[
                    styles.column,
                    columnIndex === 1 && styles.offsetColumn,
                  ]}
                >
                  {column.map((planet) => (
                    <PlanetCard
                      isFavorite={favoriteIds.includes(planet.id)}
                      key={planet.id}
                      onPress={() =>
                        router.push({
                          pathname: "/planet/[id]",
                          params: { id: planet.id },
                        })
                      }
                      planet={planet}
                    />
                  ))}
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons color={colors.inkMuted} name="heart-outline" size={28} />
              <Text style={styles.emptyTitle}>Chưa có thế giới đã lưu</Text>
              <Text style={styles.emptyBody}>
                Mở chi tiết một thiên thể và dùng nút trái tim để thêm vào đây.
              </Text>
            </View>
          )}

          <View style={styles.sourceSection}>
            <Text style={styles.sourceTitle}>Về danh mục</Text>
            <Text style={styles.sourceBody}>
              Hệ Mặt Trời có 8 hành tinh. Sao Diêm Vương được trình bày như thế
              giới thứ chín nhưng được ghi đúng phân loại hành tinh lùn của IAU.
              Số liệu nền tham chiếu NASA, cập nhật tháng 04/2025.
            </Text>
          </View>
        </View>
      </ScrollView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    alignItems: "center",
  },
  content: {
    alignSelf: "center",
  },
  header: {
    paddingRight: spacing.md,
  },
  eyebrowRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  sunMark: {
    width: 9,
    height: 9,
    borderRadius: 999,
    backgroundColor: colors.accent,
    boxShadow: "0 0 12px rgba(244, 201, 93, 0.72)",
  },
  eyebrow: {
    ...typography.eyebrow,
    color: colors.accent,
  },
  title: {
    ...typography.title,
    marginTop: spacing.sm,
    color: colors.ink,
  },
  intro: {
    ...typography.body,
    maxWidth: 500,
    marginTop: spacing.md,
    color: colors.inkMuted,
  },
  toolbar: {
    marginTop: spacing.xl,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  syncStatus: {
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: "rgba(24, 25, 31, 0.72)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  syncDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: colors.success,
  },
  syncDotActive: {
    backgroundColor: colors.accent,
  },
  syncLabel: {
    ...typography.caption,
    color: colors.inkMuted,
  },
  notice: {
    marginTop: spacing.md,
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: "rgba(104, 42, 42, 0.28)",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255, 122, 118, 0.45)",
  },
  noticeText: {
    ...typography.caption,
    flex: 1,
    color: colors.ink,
  },
  grid: {
    marginTop: spacing.xl,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  column: {
    flex: 1,
    gap: spacing.sm,
  },
  offsetColumn: {
    marginTop: spacing.xxl,
  },
  emptyState: {
    minHeight: 260,
    marginTop: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: "rgba(24, 25, 31, 0.62)",
  },
  emptyTitle: {
    ...typography.heading,
    marginTop: spacing.md,
    color: colors.ink,
    textAlign: "center",
    fontSize: 20,
  },
  emptyBody: {
    ...typography.body,
    maxWidth: 340,
    marginTop: spacing.xs,
    color: colors.inkMuted,
    textAlign: "center",
  },
  sourceSection: {
    marginTop: spacing.xxl,
    paddingTop: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  sourceTitle: {
    ...typography.eyebrow,
    color: colors.accent,
  },
  sourceBody: {
    ...typography.caption,
    maxWidth: 620,
    marginTop: spacing.xs,
    color: colors.inkSubtle,
  },
});
