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

interface Complaint extends ComplaintResponse {
  id: string;
  title: string;
  status: "resolved" | "pending" | "in_progress";
  priority: "High Priority" | "Medium" | "Urgent";
  issueId: string;
}

type FilterType = "all" | "pending" | "resolved" | "in_progress";

import { complaintService } from "../services/api";

export default function MyComplaintsScreen() {
  const navigation = useNavigation<any>();
  const [filter, setFilter] = useState<FilterType>("all");
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setIsLoading(true);
      const data = await complaintService.getUserComplaints();
      // Ensure each item has the correct structure for the UI
      const formatted = data.map((item: any) => ({
        ...item,
        id: item.id || item._id,
        issueId: item.issueId || `#${String(item.id || item._id).slice(-4).toUpperCase()}`,
        priority: item.priority || "Medium",
        status: item.status || "pending"
      }));
      setComplaints(formatted);
    } catch (error) {
      console.error("Fetch Complaints Error:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const filteredComplaints = complaints.filter(
    (c) => filter === "all" || c.status === filter,
  );

  const handleComplaintPress = (complaint: Complaint) => {
    navigation.navigate("ComplaintDetailsScreen", { complaint });
  };


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
        <TouchableOpacity style={styles.profileAvatar}>
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAAixO86XZXDPNShIxwVu8JAyc6GhtLioGtzAJdPFamZs56f3kf79kQsaDpCDgrOnx_fhnSIVK4gKSTJ7DVtjPsJGAzYNStz7rNi2_vKNRvNjoxb8HbGrkxm14wOjC7WARd1TjFdABHqvNL_g6wQM7OH6U_nJXzDu6hP_eUiKgO7s_bO24W5NzIQVA2mJalXK_4dTg-jgwg2ma_puE6v-LGBqXF1DyTKrwrn25GCjWK6dlWdFxxBMAqInqm1UletZvf55cZ34qyA8",
            }}
            style={styles.avatarImage}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Header */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>My Complaints</Text>
          <Text style={styles.pageSubtitle}>
            Track and manage your civic requests for local improvement.
          </Text>
        </View>

        {/* Impact Card */}
        <View style={styles.impactCard}>
          <View>
            <Text style={styles.impactLabel}>Community Impact</Text>
            <Text style={styles.impactValue}>84%</Text>
            <Text style={styles.impactSubtext}>
              Resolution efficiency score
            </Text>
          </View>
          <View style={styles.impactIcon}>
            <MaterialCommunityIcons
              name="trending-up"
              size={28}
              color={Colors.primary}
            />
          </View>
        </View>

        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          {(["all", "pending", "resolved", "in_progress"] as FilterType[]).map(
            (f) => (
              <TouchableOpacity
                key={f}
                style={[
                  styles.filterChip,
                  filter === f && styles.filterChipActive,
                ]}
                onPress={() => setFilter(f)}
              >
                <Text
                  style={[
                    styles.filterText,
                    filter === f && styles.filterTextActive,
                  ]}
                >
                  {f.replace("_", " ")}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </ScrollView>

        {/* Complaints List */}
        <FlatList
          scrollEnabled={false}
          data={filteredComplaints}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ComplaintCard
              complaint={item}
              onPress={() => handleComplaintPress(item)}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: Spacing.md }} />}
        />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("CreateComplaintScreen")}
      >
        <MaterialCommunityIcons name="plus" size={28} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
}

function ComplaintCard({
  complaint,
  onPress,
}: {
  complaint: Complaint;
  onPress: () => void;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return Colors.success;
      case "pending":
        return Colors.warning;
      case "in_progress":
        return Colors.info;
      default:
        return Colors.textSecondary;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High Priority":
        return Colors.warning;
      case "Urgent":
        return Colors.error;
      default:
        return Colors.textSecondary;
    }
  };

  return (
    <TouchableOpacity style={styles.complaintCard} onPress={onPress}>
      <View style={styles.badgesRow}>
        <View
          style={[
            styles.badge,
            { backgroundColor: getStatusColor(complaint.status) + "20" },
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              { color: getStatusColor(complaint.status) },
            ]}
          >
            {complaint.status.replace("_", " ")}
          </Text>
        </View>
        <View
          style={[
            styles.badge,
            { backgroundColor: getPriorityColor(complaint.priority) + "20" },
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              { color: getPriorityColor(complaint.priority) },
            ]}
          >
            {complaint.priority}
          </Text>
        </View>
        <Text style={styles.issueId}>{complaint.issueId}</Text>
      </View>
      <Text style={styles.complaintTitle}>{complaint.title}</Text>
      <View style={styles.complaintFooter}>
        <View style={styles.complaintMeta}>
          <MaterialCommunityIcons
            name="folder-outline"
            size={16}
            color={Colors.textSecondary}
          />
          <Text style={styles.metaText}>{complaint.category}</Text>
        </View>
        <View style={styles.complaintMeta}>
          <MaterialCommunityIcons
            name="office-building"
            size={16}
            color={Colors.textSecondary}
          />
          <Text style={styles.metaText}>{complaint.department}</Text>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color={Colors.textTertiary}
        />
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

  pageHeader: {
    paddingVertical: Spacing.lg,
  },
  pageTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: "800",
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  pageSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    fontWeight: "500",
  },

  impactCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  impactLabel: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "700",
    color: Colors.textSecondary,
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
    textTransform: "uppercase",
  },
  impactValue: {
    fontSize: Typography.fontSize["3xl"],
    fontWeight: "900",
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  impactSubtext: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "500",
    color: Colors.success,
  },
  impactIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.primary + "20",
    justifyContent: "center",
    alignItems: "center",
  },

  filterContainer: {
    marginBottom: Spacing.lg,
  },
  filterChip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: Spacing.md,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: "600",
    color: Colors.primary,
  },
  filterTextActive: {
    color: Colors.white,
  },

  complaintCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
  },
  badgesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  badge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
  },
  badgeText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  issueId: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "700",
    color: Colors.textSecondary,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  complaintTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: Spacing.md,
  },
  complaintFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  complaintMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  metaText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "500",
    color: Colors.textSecondary,
  },

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
    elevation: 8,
  },
});
