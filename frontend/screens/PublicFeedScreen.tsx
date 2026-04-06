import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Modal,
    TextInput,
    Alert,
    Image,
} from "react-native";

import { BorderRadius, Colors, Spacing, Typography } from "../constants/theme";
import { ComplaintFeedResponse, Comment } from "../types/srs";
import { complaintService, API_BASE_URL } from "../services/api";

export default function PublicFeedScreen() {
  const navigation = useNavigation<any>();
  const [feedItems, setFeedItems] = useState<ComplaintFeedResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Comment Modal state
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [activeComplaintId, setActiveComplaintId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  const fetchFeed = async (isRefreshing = false) => {
    if (isRefreshing) setRefreshing(true);
    else setLoading(true);
    
    try {
      const data = await complaintService.getFeed();
      setFeedItems(data);
    } catch (error: any) {
      console.error("[Feed] Fetch error:", error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFeed();
    }, [])
  );

  const handleLike = async (id: string) => {
    try {
      await complaintService.voteComplaint(id);
      // Optimistic update or just re-fetch
      fetchFeed();
    } catch (error: any) {
      Alert.alert("Vote Failed", error.message);
    }
  };

  const openCommentModal = (id: string) => {
    setActiveComplaintId(id);
    setShowCommentModal(true);
  };

  const handleAddComment = async () => {
    if (!activeComplaintId || !commentText.trim()) return;
    
    setSubmittingComment(true);
    try {
      await complaintService.addComment(activeComplaintId, commentText);
      setCommentText("");
      setShowCommentModal(false);
      setActiveComplaintId(null);
      fetchFeed();
    } catch (error: any) {
      Alert.alert("Comment Failed", error.message);
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community Feed</Text>
      </View>

      <FlatList
        data={feedItems}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={() => fetchFeed(true)}
        ListHeaderComponent={
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
        }
        contentContainerStyle={styles.scrollContent}
        renderItem={({ item }) => (
          <FeedCard
            item={item}
            onLike={() => handleLike(item.id)}
            onComment={() => openCommentModal(item.id)}
            onReadMore={() =>
              navigation.navigate("ComplaintDetailsScreen", {
                complaint: item,
              })
            }
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.lg }} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="newspaper-variant-outline" size={60} color={Colors.textTertiary} />
            <Text style={styles.emptyText}>No complaints in the feed yet.</Text>
          </View>
        }
      />

      {/* Comment Modal */}
      <Modal
        visible={showCommentModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCommentModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Comment</Text>
              <TouchableOpacity onPress={() => setShowCommentModal(false)}>
                <MaterialCommunityIcons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            
            <TextInput
              style={styles.commentInput}
              placeholder="Write your comment..."
              placeholderTextColor={Colors.textTertiary}
              multiline
              value={commentText}
              onChangeText={setCommentText}
              maxLength={500}
            />
            
            <TouchableOpacity 
              style={[
                styles.submitButton, 
                (!commentText.trim() || submittingComment) && styles.submitButtonDisabled
              ]} 
              onPress={handleAddComment}
              disabled={!commentText.trim() || submittingComment}
            >
              {submittingComment ? (
                <ActivityIndicator color={Colors.surface} />
              ) : (
                <Text style={styles.submitButtonText}>Post Comment</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function FeedCard({
  item,
  onLike,
  onComment,
  onReadMore,
}: {
  item: ComplaintFeedResponse;
  onLike: () => void;
  onComment: () => void;
  onReadMore: () => void;
}) {
  const isVoted = false; // We don't have this in the response currently, would need backend to return if current user voted

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={{ flex: 1 }}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <Text style={styles.title} numberOfLines={2}>
            {item.description.substring(0, 50)}{item.description.length > 50 ? "..." : ""}
          </Text>
        </View>
        {item.status === "resolved" && (
          <View style={styles.verifiedBadge}>
            <MaterialCommunityIcons
              name="check-circle"
              size={20}
              color={Colors.success}
            />
          </View>
        )}
      </View>

      {/* Description */}
      <Text style={styles.description} numberOfLines={3}>{item.description}</Text>

      {/* Image Preview */}
      {(item.image || (item as any).imageUrl) && (
        <View style={styles.imagePreviewWrapper}>
          <Image 
            source={{ 
              uri: (item.image || (item as any).imageUrl).startsWith('http') 
                ? (item.image || (item as any).imageUrl)
                : (item.image || (item as any).imageUrl).startsWith('data:')
                  ? (item.image || (item as any).imageUrl)
                  : `${API_BASE_URL}${(item.image || (item as any).imageUrl)}`
            }} 
            style={styles.imagePreview} 
          />
        </View>
      )}

      {/* Stats Bar */}
      <View style={styles.impactBar}>
        <MaterialCommunityIcons name="trending-up" size={16} color={Colors.secondary} />
        <Text style={styles.impactText}>
          {item.votes} votes • {item.comments?.length || 0} comments
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.cardFooter}>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={onLike}>
            <MaterialCommunityIcons
              name={isVoted ? "thumb-up" : "thumb-up-outline"}
              size={18}
              color={isVoted ? Colors.secondary : Colors.textSecondary}
            />
            <Text style={[styles.actionText, isVoted && { color: Colors.secondary }]}>
              Vote
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={onComment}>
            <MaterialCommunityIcons
              name="comment-outline"
              size={18}
              color={Colors.textSecondary}
            />
            <Text style={styles.actionText}>Comment</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={onReadMore}>
            <MaterialCommunityIcons
              name="eye-outline"
              size={18}
              color={Colors.textSecondary}
            />
            <Text style={styles.actionText}>Details</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.timestamp}>
          {new Date(item.createdAt).toLocaleDateString()}
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
  },
  impactText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "600",
    color: Colors.secondary,
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  actions: {
    flexDirection: "row",
    gap: Spacing.md,
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
    fontSize: 11,
    color: Colors.textTertiary,
    fontWeight: "700",
  },
  imagePreviewWrapper: {
    height: 180,
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 12,
    backgroundColor: '#F1F5F9',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 100,
  },
  emptyText: {
    marginTop: Spacing.md,
    fontSize: Typography.fontSize.base,
    color: Colors.textTertiary,
    fontWeight: "600",
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    padding: Spacing.xl,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  modalTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: "700",
    color: Colors.text,
  },
  commentInput: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    fontSize: Typography.fontSize.base,
    color: Colors.text,
    height: 120,
    textAlignVertical: "top",
    marginBottom: Spacing.xl,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: "center",
  },
  submitButtonDisabled: {
    backgroundColor: Colors.textTertiary,
  },
  submitButtonText: {
    color: Colors.surface,
    fontSize: Typography.fontSize.base,
    fontWeight: "700",
  },
});
