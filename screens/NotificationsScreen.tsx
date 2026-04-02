import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { BorderRadius, Colors, Spacing, Typography } from "../constants/theme";
import { NotificationResponse } from "../types/srs";

interface Notification extends NotificationResponse {
  type: "update" | "alert" | "success" | "info";
  icon: string;
}

const NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    description: "Your pavement report has been successfully resolved.",
    image: "",
    location: { lat: 28.6139, lng: 77.209 },
    category: "infrastructure",
    department: "public_works",
    status: "resolved",
    createdAt: "2 hours ago",
    type: "success",
    icon: "check-circle",
    read: false,
  },
  {
    id: "2",
    description:
      "Work on Street Light #8821 has begun. Estimated completion: 3 days.",
    image: "",
    location: { lat: 28.6149, lng: 77.213 },
    category: "electricity",
    department: "electricity_board",
    status: "in_progress",
    createdAt: "5 hours ago",
    type: "update",
    icon: "information",
    read: false,
  },
  {
    id: "3",
    description:
      "Provide additional details for your waste collection complaint #8819.",
    image: "",
    location: { lat: 28.6183, lng: 77.2111 },
    category: "sanitation",
    department: "municipal_sanitation",
    status: "pending",
    createdAt: "1 day ago",
    type: "alert",
    icon: "alert-circle",
    read: true,
  },
  {
    id: "4",
    description:
      "You have earned a Civic Champion badge for 10 resolved issues.",
    image: "",
    location: { lat: 28.6152, lng: 77.2144 },
    category: "community",
    department: "citizen_services",
    status: "resolved",
    createdAt: "2 days ago",
    type: "info",
    icon: "star",
    read: true,
  },
];

export default function NotificationsScreen() {
  const navigation = useNavigation<any>();
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return Colors.success;
      case "alert":
        return Colors.error;
      case "update":
        return Colors.secondary;
      case "info":
        return Colors.primary;
      default:
        return Colors.textSecondary;
    }
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        {unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unreadCount}</Text>
          </View>
        )}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="bell-outline"
              size={64}
              color={Colors.textTertiary}
            />
            <Text style={styles.emptyTitle}>No notifications yet</Text>
            <Text style={styles.emptySubtext}>
              Your notifications will appear here
            </Text>
          </View>
        ) : (
          <FlatList
            scrollEnabled={false}
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <NotificationCard
                notification={item}
                color={getNotificationColor(item.type)}
                onPress={() => {
                  handleMarkAsRead(item.id);
                  navigation.navigate("ComplaintDetailsScreen", {
                    complaint: {
                      id: item.id,
                      description: item.description,
                      image: item.image,
                      location: item.location,
                      category: item.category,
                      department: item.department,
                      status: item.status,
                    },
                  });
                }}
              />
            )}
            ItemSeparatorComponent={() => (
              <View style={{ height: Spacing.xs }} />
            )}
          />
        )}
      </ScrollView>
    </View>
  );
}

function NotificationCard({
  notification,
  color,
  onPress,
}: {
  notification: Notification;
  color: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: notification.read ? Colors.surface : color + "10" },
      ]}
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: color + "20" }]}>
        <MaterialCommunityIcons
          name={notification.icon}
          size={24}
          color={color}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {notification.category} • {notification.department}
          </Text>
          {!notification.read && (
            <View style={[styles.unreadDot, { backgroundColor: color }]} />
          )}
        </View>
        <Text style={styles.message} numberOfLines={2}>
          {notification.description}
        </Text>
        <Text style={styles.timestamp}>
          {notification.status.replace("_", " ")} • {notification.createdAt}
        </Text>
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
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: "800",
    color: Colors.text,
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.error,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: "700",
    color: Colors.white,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },

  card: {
    flexDirection: "row",
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.xs,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
    flexShrink: 0,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: Typography.fontSize.base,
    fontWeight: "700",
    color: Colors.text,
    flex: 1,
    marginRight: Spacing.sm,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: BorderRadius.full,
    flexShrink: 0,
  },
  message: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    lineHeight: 18,
  },
  timestamp: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textTertiary,
  },

  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Spacing["3xl"],
  },
  emptyTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: "600",
    color: Colors.text,
    marginTop: Spacing.lg,
  },
  emptySubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
});
