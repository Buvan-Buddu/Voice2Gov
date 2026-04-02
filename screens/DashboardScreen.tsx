import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { BorderRadius, Colors, Spacing, Typography } from "../constants/theme";
import { ComplaintResponse } from "../types/srs";

interface Activity {
  id: string;
  description: string;
  image: string;
  location: { lat: number | null; lng: number | null };
  category: string;
  department: string;
  status: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  reportedTime: string;
  priority: "High" | "Normal" | "Low";
  priorityColor: string;
  statusColor: string;
}

const RECENT_ACTIVITY: Activity[] = [
  {
    id: "1",
    description: "Broken Water Main - Sector 4",
    image: "",
    location: { lat: 28.6139, lng: 77.209 },
    category: "Water",
    department: "Public Works",
    status: "under_investigation",
    icon: "water",
    iconBg: Colors.error + "20",
    iconColor: Colors.error,
    reportedTime: "Reported 2 hours ago",
    priority: "High",
    priorityColor: Colors.error,
    statusColor: Colors.warning,
  },
  {
    id: "2",
    description: "Street Light Outage",
    image: "",
    location: { lat: 28.6211, lng: 77.2182 },
    category: "Electricity",
    department: "Electricity Board",
    status: "resolved",
    icon: "lightbulb-outline",
    iconBg: Colors.textSecondary + "20",
    iconColor: Colors.textSecondary,
    reportedTime: "Reported Yesterday",
    priority: "Normal",
    priorityColor: Colors.textSecondary,
    statusColor: Colors.success,
  },
  {
    id: "3",
    description: "Garbage Collection Delay",
    image: "",
    location: { lat: 28.6278, lng: 77.2214 },
    category: "Sanitation",
    department: "Municipal Sanitation",
    status: "in_progress",
    icon: "trash-can",
    iconBg: Colors.primary + "20",
    iconColor: Colors.primary,
    reportedTime: "Reported 3 days ago",
    priority: "Low",
    priorityColor: Colors.primary,
    statusColor: Colors.secondary,
  },
];

const COMPLAINT_RESPONSE_MOCK: ComplaintResponse[] = RECENT_ACTIVITY.map(
  (item) => ({
    id: item.id,
    description: item.description,
    image: item.image,
    location: item.location,
    category: item.category,
    department: item.department,
    status: item.status,
  }),
);

export default function DashboardScreen() {
  const navigation = useNavigation<any>();
  const [civicScore] = useState(842);
  const [complaints] = useState<ComplaintResponse[]>(COMPLAINT_RESPONSE_MOCK);

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons
            name="gavel"
            size={28}
            color={Colors.primary}
          />
          <Text style={styles.appTitle}>Voice2Gov</Text>
        </View>
        <TouchableOpacity
          style={styles.profileAvatar}
          onPress={() => navigation.navigate("NotificationsTab")}
        >
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4E-e4xumwaDTxi-Q-qogilKoTVGzxQCHXNb_EMziBGoYfvESf9BlYgd6Gp1Y2Y2Nwu9u3CFTKCnMXlcpOAgbYmIAOStGvMCGdpNveYdO0EWsZaB5r3fVxB_K3jzvd9m9R0vMprY4Z2e0BHvYl52pUa6i-fvFN-ft59MHycWkYwOtU13sxWPsa7YU7eGTamngCYW2p3jSELhb3-emvQeom12NsTTcfL54RJLMvVgfLrgtnPBCxmaq04l5ElIWIiwF05abl8X5Solg",
            }}
            style={styles.avatarImage}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>Hello, User</Text>
          <Text style={styles.greetingSubtext}>
            Here's your civic engagement overview
          </Text>
        </View>

        {/* Civic Impact Card */}
        <View style={styles.civicCard}>
          <View style={styles.civicTop}>
            <View style={styles.civicLeft}>
              <Text style={styles.civicLabel}>Civic Impact Score</Text>
              <View style={styles.scoreRow}>
                <Text style={styles.scoreValue}>{civicScore}</Text>
                <View style={styles.trendBadge}>
                  <MaterialCommunityIcons
                    name="trending-up"
                    size={12}
                    color={Colors.success}
                  />
                  <Text style={styles.trendText}>12%</Text>
                </View>
              </View>
            </View>
            <View style={styles.civicIcon}>
              <MaterialCommunityIcons
                name="chart-line"
                size={24}
                color={Colors.primary}
              />
            </View>
          </View>
          <View style={styles.civicStats}>
            <View style={styles.civicStat}>
              <Text style={styles.civicStatLabel}>Community Rank</Text>
              <Text style={styles.civicStatValue}>Top 5%</Text>
            </View>
            <View style={styles.civicStat}>
              <Text style={styles.civicStatLabel}>Impact Points</Text>
              <Text style={styles.civicStatValue}>2,450 XP</Text>
            </View>
          </View>
        </View>

        {/* Summary Stats */}
        <View style={styles.statsGrid}>
          <StatCard label="Total" value="38" bgColor={Colors.primary + "20"} />
          <StatCard label="Pending" value="12" bgColor={Colors.white} />
          <StatCard label="Resolved" value="26" bgColor={Colors.white} />
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <View style={styles.activityHeader}>
            <Text style={styles.activityTitle}>Recent Activity</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ComplaintDetailsScreen", {
                  complaint: complaints[0],
                })
              }
            >
              <Text style={styles.viewAllLink}>View All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            scrollEnabled={false}
            data={RECENT_ACTIVITY}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const complaintData = complaints.find((c) => c.id === item.id);
              return (
                <ActivityCard
                  activity={item}
                  complaint={complaintData}
                  onPress={() =>
                    navigation.navigate("ComplaintDetailsScreen", {
                      complaint: complaintData,
                    })
                  }
                />
              );
            }}
            ItemSeparatorComponent={() => (
              <View style={{ height: Spacing.md }} />
            )}
          />
        </View>
      </ScrollView>

      {/* FAB for Create Complaint */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("CreateComplaintScreen")}
      >
        <MaterialCommunityIcons name="plus" size={28} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
}

function StatCard({
  label,
  value,
  bgColor,
}: {
  label: string;
  value: string;
  bgColor: string;
}) {
  return (
    <View style={[styles.statCard, { backgroundColor: bgColor }]}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

function ActivityCard({
  activity,
  complaint,
  onPress,
}: {
  activity: Activity;
  complaint?: ComplaintResponse;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.activityCard} onPress={onPress}>
      <View style={[styles.activityIcon, { backgroundColor: activity.iconBg }]}>
        <MaterialCommunityIcons
          name={activity.icon}
          size={20}
          color={activity.iconColor}
        />
      </View>
      <View style={styles.activityContent}>
        <View style={styles.activityTitleRow}>
          <Text style={styles.activityTitle} numberOfLines={1}>
            {activity.description}
          </Text>
          <View
            style={[
              styles.priorityBadge,
              { borderColor: activity.priorityColor },
            ]}
          >
            <Text
              style={[styles.priorityText, { color: activity.priorityColor }]}
            >
              {activity.priority}
            </Text>
          </View>
        </View>
        <Text style={styles.activityMeta}>
          {activity.reportedTime} • {complaint?.category ?? activity.category}
        </Text>
        <View style={styles.statusRow}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: activity.statusColor },
            ]}
          />
          <Text style={[styles.statusText, { color: activity.statusColor }]}>
            {complaint?.status ?? activity.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  appTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: "700",
    letterSpacing: -0.5,
    color: Colors.primary,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
    paddingHorizontal: Spacing.md,
  },

  // Greeting
  greetingSection: {
    paddingVertical: Spacing.lg,
  },
  greeting: {
    fontSize: Typography.fontSize.xl,
    fontWeight: "800",
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  greetingSubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    fontWeight: "500",
  },

  // Civic Card
  civicCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderLeftColor: Colors.primary,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  civicTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.lg,
  },
  civicLeft: {
    flex: 1,
  },
  civicLabel: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "700",
    color: Colors.textSecondary,
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
    textTransform: "uppercase",
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  scoreValue: {
    fontSize: Typography.fontSize["4xl"],
    fontWeight: "900",
    color: Colors.primary,
  },
  trendBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.success + "20",
    borderRadius: BorderRadius.full,
  },
  trendText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "700",
    color: Colors.success,
  },
  civicIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.primary + "20",
    justifyContent: "center",
    alignItems: "center",
  },
  civicStats: {
    flexDirection: "row",
    gap: Spacing.md,
    paddingTopWidth: 1,
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  civicStat: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  civicStatLabel: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "700",
    color: Colors.textSecondary,
    letterSpacing: 0.5,
    marginBottom: Spacing.xs,
    textTransform: "uppercase",
  },
  civicStatValue: {
    fontSize: Typography.fontSize.base,
    fontWeight: "800",
    color: Colors.text,
  },

  // Stats Grid
  statsGrid: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  statCard: {
    flex: 1,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "700",
    color: Colors.textSecondary,
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
    textTransform: "uppercase",
  },
  statValue: {
    fontSize: Typography.fontSize.xl,
    fontWeight: "900",
    color: Colors.primary,
  },

  // Activity Section
  activitySection: {
    marginBottom: Spacing.xl,
  },
  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  activityTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: "700",
    color: Colors.primary,
  },
  viewAllLink: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "700",
    color: Colors.secondary,
  },

  activityCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    flexDirection: "row",
    gap: Spacing.md,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  activityContent: {
    flex: 1,
  },
  activityTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  priorityBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    flexShrink: 0,
  },
  priorityText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  activityMeta: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: BorderRadius.full,
  },
  statusText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "700",
    textTransform: "uppercase",
  },

  // FAB
  fab: {
    position: "absolute",
    bottom: 80,
    right: Spacing.lg,
    width: 56,
    height: 56,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    elevation: 8,
  },
});
