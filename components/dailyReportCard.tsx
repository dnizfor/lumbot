import { Colors } from "@/constants/colors";
import { DayStatus } from "@/types/types";
import useThemeStore from "@/zustand/useThemeStore";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Chip from "./chip";
import StatBox from "./statBox";

type Props = {
  dayStatus?: DayStatus;
  selectedDate: string | null;
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  CHEST: { bg: "#E0F2FE", text: "#0284C7" },
  LEGS: { bg: "#ECFDF5", text: "#059669" },
  CARDIO: { bg: "#EEF2FF", text: "#4F46E5" },
  BACK: { bg: "#FFF7ED", text: "#F97316" },
};

export default function DailyReportCard({
  dayStatus,
  selectedDate,
}: Props) {
  const theme = useThemeStore((state) => state.theme);
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const db = useSQLiteContext();

  const [categories, setCategories] = useState<string[]>([]);

  const laps = dayStatus?.lap_count ?? 0;
  const lapGoal = dayStatus?.lap_goal ?? 0;
  const water = dayStatus?.water_count ?? 0;
  const workouts = dayStatus?.exercise_count ?? 0;

  // Tarih format
  const formattedDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
    })
    : "";

  useEffect(() => {
    if (!selectedDate) return;

    const fetchCategories = async () => {
      try {
        const rows: { category_name: string }[] = await db.getAllAsync(
          `SELECT DISTINCT category_name FROM exercises WHERE day = ? AND passed = 0`,
          [selectedDate]
        );

        const uniqueCategories = rows.map((r) => r.category_name.toUpperCase());
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Failed to fetch exercises:", err);
        setCategories([]);
      }
    };

    fetchCategories();
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.subtitle}>DAILY PERFORMANCE</Text>
          <Text style={styles.title}>{formattedDate}</Text>
        </View>
        <View style={styles.badge}>
          <View style={styles.dot} />
          <Text style={styles.badgeText}>ON SAVED</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <StatBox
          value={laps}
          total={lapGoal}
          label="LAPS"
          color={Colors.light.successful}
          iconColor={Colors[theme].themeCross}
          labelColor={Colors[theme].themeCross}
        />
        <StatBox
          value={water}
          label="H2O"
          color={Colors.light.primary}
          iconColor={Colors[theme].themeCross}
          labelColor={Colors[theme].themeCross}
        />
        <StatBox
          value={workouts}
          total={lapGoal * 2}
          label="WORKOUTS"
          color={Colors.light.successful}
          iconColor={Colors[theme].themeCross}
          labelColor={Colors[theme].themeCross}
        />
      </View>

      {/* Exercise Breakdown */}

      {
        categories.length > 0 && <Text style={styles.sectionTitle}>EXERCISE BREAKDOWN</Text>
      }

      <View style={styles.chipsRow}>
        {categories.length > 0 && (
          categories.map((cat) => {
            const colors = CATEGORY_COLORS[cat] || { bg: "#E5E7EB", text: "#374151" };
            return <Chip key={cat} label={cat} bg={colors.bg} text={colors.text} />;
          })
        )}
      </View>
    </View>
  );
}

// Styles
export function makeStyles(theme: 'light' | 'dark') {
  return StyleSheet.create({
    container: {
      backgroundColor: Colors[theme].secondary,
      borderRadius: 20,
      padding: 20,
      width: "100%",
      alignSelf: "center",
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 20,
      elevation: 5,
    },

    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    subtitle: {
      fontSize: 12,
      color: Colors[theme].textSecondary,
      letterSpacing: 1,
      fontWeight: "600",
    },

    title: {
      fontSize: 20,
      fontWeight: "700",
      color: Colors[theme].themeCross,
      marginTop: 4,
    },

    badge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: Colors[theme].secondary,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 20,
    },

    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: Colors[theme].successful,
      marginRight: 6,
    },

    badgeText: {
      color: Colors[theme].successful,
      fontSize: 12,
      fontWeight: "600",
    },

    statsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 24,
    },

    sectionTitle: {
      marginTop: 24,
      fontSize: 12,
      color: Colors[theme].textSecondary,
      fontWeight: "700",
      letterSpacing: 1,
    },

    chipsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 12,
      gap: 10,
    },
  });
}
