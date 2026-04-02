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
import { ComplaintFeedResponse } from "../types/srs";

interface FeedItem extends ComplaintFeedResponse {
  verified: boolean;
}

const FEED_ITEMS: FeedItem[] = [
  {
    id: "1",
    title: "Downtown Bridge Refurbishment Success",
    description:
      "After 200+ votes, the downtown bridge has been successfully refurbished improving safety and community access.",
    image: "",
    location: { lat: 28.6139, lng: 77.209 },
    category: "infrastructure",
    department: "public_works",
    status: "resolved",
    createdAt: "2 days ago",
    impact: "1,200+ affected residents",
    votes: 342,
    comments: 28,
    verified: true,
  },
  {
    id: "2",
    title: "New Community Garden Established",
    description:
      "Thanks to persistent community feedback, a new community garden has been established in the park.",
    image: "",
    location: { lat: 28.6183, lng: 77.2111 },
    category: "community",
    department: "citizen_services",
    status: "resolved",
    createdAt: "4 days ago",
    impact: "450+ households benefit",
    votes: 256,
    comments: 15,
    verified: true,
  },
  {
    id: "3",
    title: "Street Lighting Initiative Launched",
    description:
      "City council approved our proposal for improved street lighting in residential areas for enhanced safety.",
    image: "",
    location: { lat: 28.6149, lng: 77.213 },
    category: "safety",
    department: "electricity_board",
    status: "in_progress",
    createdAt: "1 week ago",
    impact: "3,500+ residents safer",
    votes: 189,
    comments: 8,
    verified: true,
  },
];

export default function PublicFeedScreen() {
  const navigation = useNavigation<any>();
  const [feedItems] = useState(FEED_ITEMS);
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});

  const handleLike = (id: string) => {
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community Feed</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Info Card */}
        <View style={styles.infoCard}>
          <MaterialCommunityIcons
            name="information-outline"
            size={20}
            color={Colors.secondary}
          />
          <Text style={styles.infoText}>
            Discover community-driven improvements that are making a real
            difference
          </Text>
        </View>

        {/* Feed Items */}
        <FlatList
          scrollEnabled={false}
          data={feedItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FeedCard
              item={item}
              isLiked={likedItems[item.id] || false}
              onLike={() => handleLike(item.id)}
              onReadMore={() =>
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
                })
              }
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: Spacing.lg }} />}
        />
      </ScrollView>
    </View>
  );
}

function FeedCard({
  item,
  isLiked,
  onLike,
  onReadMore,
}: {
  item: FeedItem;
  isLiked: boolean;
  onLike: () => void;
  onReadMore: () => void;
}) {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
        {item.verified && (
          <View style={styles.verifiedBadge}>
            <MaterialCommunityIcons
              name="check-circle"
              size={16}
              color={Colors.success}
            />
          </View>
        )}
      </View>

      {/* Description */}
      <Text style={styles.description}>{item.description}</Text>

      {/* Impact */}
      <View style={styles.impactBar}>
        <MaterialCommunityIcons name="heart" size={16} color={Colors.error} />
        <Text style={styles.impactText}>{item.impact}</Text>
      </View>

      {/* Footer */}
      <View style={styles.cardFooter}>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={onLike}>
            <MaterialCommunityIcons
              name={isLiked ? "thumb-up" : "thumb-up-outline"}
              size={18}
              color={isLiked ? Colors.secondary : Colors.textSecondary}
            />
            <Text
              style={[
                styles.actionText,
                isLiked && { color: Colors.secondary },
              ]}
            >
              Vote
            </Text>
            <Text
              style={[
                styles.actionText,
                isLiked && { color: Colors.secondary },
              ]}
            >
              {item.votes}
            </Text>
          </TouchableOpacity>
          <View style={styles.actionButton}>
            <MaterialCommunityIcons
              name="comment-outline"
              size={18}
              color={Colors.textSecondary}
            />
            <Text style={styles.actionText}>{item.comments}</Text>
          </View>
          <TouchableOpacity style={styles.actionButton} onPress={onReadMore}>
            <MaterialCommunityIcons
              name="arrow-right-circle-outline"
              size={18}
              color={Colors.textSecondary}
            />
            <Text style={styles.actionText}>Read More</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.timestamp}>
          {item.status.replace("_", " ")} • {item.createdAt}
        </Text>
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

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },

  infoCard: {
    flexDirection: "row",
    gap: Spacing.md,
    backgroundColor: Colors.secondary + "15",
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    alignItems: "center",
  },
  infoText: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    color: Colors.secondary,
    fontWeight: "500",
    lineHeight: 18,
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.md,
  },
  categoryBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.primary + "20",
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    alignSelf: "flex-start",
  },
  categoryText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "700",
    color: Colors.primary,
    textTransform: "uppercase",
  },
  title: {
    fontSize: Typography.fontSize.base,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: Spacing.sm,
    flex: 1,
  },
  verifiedBadge: {
    marginLeft: Spacing.md,
  },

  description: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: Spacing.md,
  },

  impactBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
  },
  impactText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: "600",
    color: Colors.error,
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTopWidth: 1,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  actions: {
    flexDirection: "row",
    gap: Spacing.lg,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  actionText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  timestamp: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textTertiary,
  },
});
