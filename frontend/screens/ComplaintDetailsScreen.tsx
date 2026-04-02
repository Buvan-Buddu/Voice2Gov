import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { BorderRadius, Colors, Spacing, Typography } from "../constants/theme";
import { ComplaintResponse } from "../types/srs";

export default function ComplaintDetailsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const complaint: ComplaintResponse & {
    title?: string;
    issueId?: string;
    priority?: string;
  } = route.params?.complaint || {
    id: "1",
    title: "Damaged Pavement Main St.",
    description: "Large cracks and uneven pavement causing traffic hazards.",
    image: "",
    location: { lat: 28.6139, lng: 77.209 },
    category: "Infrastructure",
    department: "Public Works",
    status: "resolved",
    priority: "High Priority",
    issueId: "#8824",
  };

  const [liked, setLiked] = useState(false);

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={Colors.text}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Complaint Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Badge */}
        <View style={styles.statusSection}>
          <View style={styles.statusBadge}>
            <MaterialCommunityIcons
              name="check-circle"
              size={16}
              color={Colors.success}
            />
            <Text style={styles.statusText}>
              {complaint.status.replace("_", " ")}
            </Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>
          {complaint.title ?? complaint.category}
        </Text>

        {/* Metadata */}
        <View style={styles.metaGrid}>
          <MetaItem
            label="Issue ID"
            value={complaint.issueId ?? complaint.id}
            icon="identifier"
          />
          <MetaItem
            label="Priority"
            value={complaint.priority ?? "normal"}
            icon="alert-circle"
          />
          <MetaItem
            label="Category"
            value={complaint.category}
            icon="folder-outline"
          />
          <MetaItem
            label="Department"
            value={complaint.department}
            icon="office-building"
          />
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{complaint.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <Text style={styles.description}>
            {`lat: ${complaint.location.lat ?? "N/A"}, lng: ${complaint.location.lng ?? "N/A"}`}
          </Text>
        </View>

        {/* Timeline Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Timeline</Text>
          <TimelineItem
            icon="plus-circle"
            title="Complaint Submitted"
            date="Mar 15, 2024"
            description="Issue reported"
          />
          <TimelineItem
            icon="information-outline"
            title="Under Review"
            date="Mar 16, 2024"
            description="City officials acknowledged"
          />
          <TimelineItem
            icon="wrench"
            title="Work Started"
            date="Mar 18, 2024"
            description="Repairs initiated"
          />
          <TimelineItem
            icon="check-circle"
            title="Resolved"
            date="Mar 25, 2024"
            description="Work completed"
          />
        </View>

        {/* Actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={[styles.actionButton, liked && styles.actionButtonActive]}
            onPress={() => setLiked(!liked)}
          >
            <MaterialCommunityIcons
              name={liked ? "thumb-up" : "thumb-up-outline"}
              size={20}
              color={liked ? Colors.secondary : Colors.primary}
            />
            <Text
              style={[
                styles.actionButtonText,
                liked && { color: Colors.secondary },
              ]}
            >
              Helpful
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => Alert.alert("Share", "Complaint link copied")}
          >
            <MaterialCommunityIcons
              name="share-outline"
              size={20}
              color={Colors.primary}
            />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function MetaItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <View style={styles.metaItem}>
      <MaterialCommunityIcons
        name={icon}
        size={20}
        color={Colors.primary}
        style={styles.metaIcon}
      />
      <View>
        <Text style={styles.metaLabel}>{label}</Text>
        <Text style={styles.metaValue}>{value}</Text>
      </View>
    </View>
  );
}

function TimelineItem({
  icon,
  title,
  date,
  description,
}: {
  icon: string;
  title: string;
  date: string;
  description: string;
}) {
  return (
    <View style={styles.timelineItem}>
      <View style={styles.timelineIcon}>
        <MaterialCommunityIcons name={icon} size={20} color={Colors.primary} />
      </View>
      <View style={styles.timelineContent}>
        <Text style={styles.timelineTitle}>{title}</Text>
        <Text style={styles.timelineDate}>{date}</Text>
        <Text style={styles.timelineDescription}>{description}</Text>
      </View>
    </View>
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
  headerTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: "700",
    color: Colors.text,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },

  statusSection: {
    marginBottom: Spacing.lg,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.success + "20",
    borderRadius: BorderRadius.full,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: "600",
    color: Colors.success,
  },

  title: {
    fontSize: Typography.fontSize["2xl"],
    fontWeight: "900",
    color: Colors.text,
    marginBottom: Spacing.xl,
    lineHeight: 32,
  },

  metaGrid: {
    gap: Spacing.lg,
    marginBottom: Spacing["2xl"],
  },
  metaItem: {
    flexDirection: "row",
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  metaIcon: {
    marginTop: Spacing.xs,
  },
  metaLabel: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "600",
    color: Colors.textSecondary,
    textTransform: "uppercase",
    marginBottom: Spacing.xs,
  },
  metaValue: {
    fontSize: Typography.fontSize.base,
    fontWeight: "700",
    color: Colors.text,
  },

  section: {
    marginBottom: Spacing["2xl"],
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  description: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  timelineItem: {
    flexDirection: "row",
    marginBottom: Spacing.lg,
    gap: Spacing.md,
  },
  timelineIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary + "20",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  timelineContent: {
    flex: 1,
    paddingVertical: Spacing.sm,
  },
  timelineTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  timelineDate: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  timelineDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },

  actionsSection: {
    flexDirection: "row",
    gap: Spacing.md,
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionButtonActive: {
    backgroundColor: Colors.secondary + "15",
    borderColor: Colors.secondary,
  },
  actionButtonText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: "600",
    color: Colors.primary,
  },
});
