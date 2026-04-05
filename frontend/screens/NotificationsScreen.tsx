import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { BorderRadius, Colors, Spacing, Typography } from "../constants/theme";
import { notificationService, complaintService } from "../services/api";

export default function NotificationsScreen() {
  const navigation = useNavigation<any>();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const data = await notificationService.getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error("Notifications Load Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadNotifications();
    setRefreshing(false);
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await notificationService.markRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
      );
    } catch (error) {
      console.warn("Failed to mark as read", error);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "STATUS_CHANGE":
        return Colors.success;
      case "NEW_COMPLAINT":
        return Colors.primary;
      case "TRENDING_COMPLAINT":
        return Colors.error;
      default:
        return Colors.secondary;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
        case "STATUS_CHANGE":
          return "check-circle";
        case "NEW_COMPLAINT":
          return "clipboard-plus";
        case "TRENDING_COMPLAINT":
          return "alert-decagram";
        default:
          return "bell-outline";
      }
  };

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
            <Text style={styles.headerTitle}>Inbox</Text>
            {unreadCount > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{unreadCount}</Text>
                </View>
            )}
        </View>
        <TouchableOpacity onPress={onRefresh}>
            <MaterialCommunityIcons name="refresh" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {loading && !refreshing ? (
          <View style={styles.loader}>
              <ActivityIndicator size="large" color={Colors.primary} />
          </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.scrollContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => (
            <NotificationCard
              notification={item}
              color={getNotificationColor(item.type)}
              iconName={getNotificationIcon(item.type)}
              onPress={async () => {
                handleMarkAsRead(item.id);
                try {
                    const complaintId = item.data?.complaint_id;
                    if (complaintId) {
                        const complaint = await complaintService.getComplaint(complaintId);
                        navigation.navigate("ComplaintDetailsScreen", { complaint });
                    }
                } catch (err) {
                    console.warn("Could not load complaint details", err);
                }
              }}
            />
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons
                name="bell-off-outline"
                size={80}
                color={Colors.gray200}
              />
              <Text style={styles.emptyTitle}>All caught up!</Text>
              <Text style={styles.emptySubtext}>
                No new alerts or status updates at this moment.
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

function NotificationCard({
  notification,
  color,
  iconName,
  onPress,
}: {
  notification: any;
  color: string;
  iconName: any;
  onPress: () => void;
}) {
  const isRead = notification.read;
  return (
    <TouchableOpacity
      style={[
        styles.card,
        !isRead && { backgroundColor: color + "08", borderColor: color + "20" },
      ]}
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: color + "15" }]}>
        <MaterialCommunityIcons
          name={iconName}
          size={24}
          color={color}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {(notification.type || 'NOTIFICATION').replace('_', ' ')}
          </Text>
          {!isRead && (
            <View style={[styles.unreadDot, { backgroundColor: color }]} />
          )}
        </View>
        <Text style={styles.message} numberOfLines={2}>
          {notification.message}
        </Text>
        <Text style={styles.timestamp}>
          {new Date(notification.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: Colors.darkBlue,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: Colors.error,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "900",
    color: Colors.white,
  },
  loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 12,
    elevation: 2,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    fontWeight: "800",
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  message: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 6,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textTertiary,
  },
  emptyState: {
    alignItems: "center",
    marginTop: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.darkBlue,
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
});
