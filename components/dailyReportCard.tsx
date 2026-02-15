
import { Colors } from "@/constants/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Chip from "./chip";
import StatBox from "./statBox";
export default function DailyReportCard() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.subtitle}>DAILY PERFORMANCE</Text>
          <Text style={styles.title}>Monday, Oct 23</Text>
        </View>
        <View style={styles.badge}>
          <View style={styles.dot} />
          <Text style={styles.badgeText}>ON SAVED</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <StatBox value={5} total={10} label="LAPS" color={Colors.light.successful} />
        <StatBox value={8} total={10} label="H2O" color={Colors.light.primary} />
        <StatBox value={3} total={5} label="WORKOUTS" color={Colors.light.successful} />
      </View>

      {/* Exercise Breakdown */}
      <Text style={styles.sectionTitle}>EXERCISE BREAKDOWN</Text>

      <View style={styles.chipsRow}>
        <Chip label="CHEST" bg="#E0F2FE" text="#0284C7" />
        <Chip label="LEGS" bg="#ECFDF5" text="#059669" />
        <Chip label="CARDIO" bg="#EEF2FF" text="#4F46E5" />
        <Chip label="BACK" bg="#FFF7ED" text="#F97316" />
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
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
    color: "#94A3B8",
    letterSpacing: 1,
    fontWeight: "600",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 4,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
    marginRight: 6,
  },

  badgeText: {
    color: "#059669",
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
    color: "#94A3B8",
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
