import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { BorderRadius, Colors, Spacing, Typography } from "../constants/theme";
import { complaintService, API_BASE_URL } from "../services/api";
import { ComplaintResponse, Comment } from "../types/srs";

export default function ResolveComplaintScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  
  const [complaint, setComplaint] = useState<ComplaintResponse>(route.params?.complaint);
  const [notes, setNotes] = useState("");
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    fetchLatestDetails();
  }, []);

  const fetchLatestDetails = async () => {
    if (!complaint?.id) return;
    try {
      const data = await complaintService.getComplaint(complaint.id);
      setComplaint(data);
    } catch (error) {
      console.warn("Failed to fetch fresh complaint details", error);
    } finally {
      setFetching(false);
    }
  };

  if (!complaint) {
      return (
          <View style={styles.errorContainer}>
              <Text>No complaint data found.</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={{ color: Colors.primary, marginTop: 10 }}>Go Back</Text>
              </TouchableOpacity>
          </View>
      );
  }

  const handleUpdate = async (newStatus: "in_progress" | "resolved") => {
    if (!notes.trim() && newStatus === "resolved") {
      Alert.alert("Feedback Required", "Please provide resolution details for the citizen.");
      return;
    }

    setLoading(true);
    try {
      await complaintService.updateStatus(complaint.id, {
        status: newStatus,
        admin_notes: notes || `Status updated to ${newStatus.replace('_', ' ')}`,
      });
      
      Alert.alert(
        "Status Updated",
        `Complaint has been moved to ${newStatus.replace('_', ' ')}.`,
        [{ text: "OK", onPress: () => navigation.popToTop() }]
      );
    } catch (error: any) {
      Alert.alert("Update Failed", error.message || "Could not sync to database.");
    } finally {
      setLoading(false);
    }
  };

  const handlePostComment = async () => {
    if (!commentText.trim()) return;
    setSubmittingComment(true);
    try {
        await complaintService.addComment(complaint.id, commentText);
        setCommentText("");
        await fetchLatestDetails();
    } catch (error: any) {
        Alert.alert("Comment Failed", error.message || "Could not post response.");
    } finally {
        setSubmittingComment(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.darkBlue, Colors.primary]}
        style={styles.topBar}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialCommunityIcons name="close" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Resolution Protocol</Text>
        <View style={{ width: 24 }} />
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {fetching ? (
              <ActivityIndicator color={Colors.primary} style={{ margin: 40 }} />
          ) : (
            <>
              {/* Complaint Summary */}
              <View style={styles.summaryCard}>
                <View style={styles.summaryHeader}>
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{complaint.category}</Text>
                    </View>
                    <Text style={styles.idText}>ID: #{complaint.id.slice(-6).toUpperCase()}</Text>
                </View>
                <Text style={styles.description}>{complaint.description}</Text>
                {(complaint.image || (complaint as any).imageUrl) && (
                    <Image 
                        source={{ 
                            uri: (complaint.image || (complaint as any).imageUrl).startsWith('http') 
                                ? (complaint.image || (complaint as any).imageUrl)
                                : (complaint.image || (complaint as any).imageUrl).startsWith('data:')
                                    ? (complaint.image || (complaint as any).imageUrl)
                                    : `${API_BASE_URL}${(complaint.image || (complaint as any).imageUrl)}`
                        }} 
                        style={styles.evidenceImage} 
                    />
                )}
              </View>

              {/* Discussion Thread */}
              <View style={styles.section}>
                  <View style={styles.sectionHeaderRow}>
                      <Text style={styles.sectionLabel}>Citizen Discussion</Text>
                      <TouchableOpacity onPress={fetchLatestDetails}>
                        <MaterialCommunityIcons name="refresh" size={16} color={Colors.primary} />
                      </TouchableOpacity>
                  </View>
                  <Text style={styles.sectionSub}>Communication with residents regarding this issue.</Text>
                  
                  <View style={styles.commentsList}>
                      {complaint.comments && complaint.comments.length > 0 ? (
                          complaint.comments.map((c, index) => (
                              <View key={index} style={styles.commentItem}>
                                  <View style={styles.commentHeader}>
                                      <Text style={styles.commentUser}>{c.userName}</Text>
                                      <Text style={styles.commentDate}>{new Date(c.createdAt).toLocaleDateString()}</Text>
                                  </View>
                                  <Text style={styles.commentText}>{c.text}</Text>
                              </View>
                          ))
                      ) : (
                          <Text style={styles.noComments}>No citizen messages yet.</Text>
                      )}
                  </View>

                  <View style={styles.replyBox}>
                      <TextInput 
                          style={styles.replyInput}
                          placeholder="Reply to residents..."
                          placeholderTextColor={Colors.textTertiary}
                          value={commentText}
                          onChangeText={setCommentText}
                          multiline
                      />
                      <TouchableOpacity 
                          style={[styles.replyBtn, !commentText.trim() && { opacity: 0.5 }]} 
                          onPress={handlePostComment}
                          disabled={submittingComment || !commentText.trim()}
                      >
                          {submittingComment ? (
                              <ActivityIndicator color="white" size="small" />
                          ) : (
                              <MaterialCommunityIcons name="send" size={20} color="white" />
                          )}
                      </TouchableOpacity>
                  </View>
              </View>

              {/* Action Section */}
              <View style={styles.actionCard}>
                <Text style={styles.sectionLabel}>Official Resolution Feedback</Text>
                <Text style={styles.sectionSub}>This will formalize the status and notify the citizen.</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Provide final resolution report..."
                  placeholderTextColor={Colors.textTertiary}
                  multiline
                  numberOfLines={6}
                  value={notes}
                  onChangeText={setNotes}
                  textAlignVertical="top"
                  editable={!loading}
                />
              </View>

              <View style={styles.btnRow}>
                {complaint.status === 'pending' && (
                    <TouchableOpacity 
                        style={[styles.actionBtn, styles.progressBtn]} 
                        onPress={() => handleUpdate('in_progress')}
                        disabled={loading}
                    >
                        <MaterialCommunityIcons name="clock-fast" size={20} color="white" />
                        <Text style={styles.btnText}>Start Work</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity 
                    style={[styles.actionBtn, styles.resolveBtn, (!notes && complaint.status !== 'resolved') && styles.disabledBtn]} 
                    onPress={() => handleUpdate('resolved')}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <>
                            <MaterialCommunityIcons name="check-decagram" size={20} color="white" />
                            <Text style={styles.btnText}>{complaint.status === 'resolved' ? 'Archived' : 'Resolve'}</Text>
                        </>
                    )}
                </TouchableOpacity>
              </View>

              <Text style={styles.footerNote}>
                Status changes are logged and audited. Ensure all provided information is accurate.
              </Text>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  topBar: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  summaryHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
  },
  categoryBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      backgroundColor: Colors.primary + '10',
      borderRadius: 8,
  },
  categoryText: {
      fontSize: 10,
      fontWeight: '800',
      color: Colors.primary,
      textTransform: 'uppercase',
  },
  idText: {
      fontSize: 11,
      color: Colors.textTertiary,
      fontWeight: '600',
  },
  description: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  evidenceImage: {
      width: '100%',
      height: 200,
      borderRadius: 16,
      backgroundColor: '#F1F5F9',
  },
  section: {
      marginBottom: 24,
      paddingHorizontal: 4,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentsList: {
      backgroundColor: '#F1F5F9',
      borderRadius: 20,
      padding: 16,
      marginBottom: 12,
  },
  commentItem: {
      marginBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#E2E8F0',
      paddingBottom: 8,
  },
  commentHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 4,
  },
  commentUser: {
      fontSize: 12,
      fontWeight: '800',
      color: Colors.darkBlue,
  },
  commentDate: {
      fontSize: 10,
      color: Colors.gray500,
  },
  commentText: {
      fontSize: 13,
      color: Colors.text,
      lineHeight: 18,
  },
  noComments: {
      fontSize: 12,
      color: Colors.textTertiary,
      textAlign: 'center',
      fontStyle: 'italic',
  },
  replyBox: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
  },
  replyInput: {
      flex: 1,
      backgroundColor: 'white',
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 10,
      fontSize: 14,
      borderWidth: 1,
      borderColor: '#E2E8F0',
      maxHeight: 100,
  },
  replyBtn: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: Colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
  },
  actionCard: {
      backgroundColor: 'white',
      borderRadius: 24,
      padding: 20,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: '#E2E8F0',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  sectionSub: {
      fontSize: 11,
      color: Colors.textTertiary,
      marginBottom: 16,
  },
  input: {
    backgroundColor: '#F7F9FC',
    borderRadius: 16,
    padding: 16,
    fontSize: 14,
    color: Colors.text,
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  btnRow: {
      flexDirection: 'row',
      gap: 12,
  },
  actionBtn: {
      flex: 1,
      flexDirection: 'row',
      height: 56,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      elevation: 4,
  },
  progressBtn: {
      backgroundColor: Colors.info,
  },
  resolveBtn: {
      backgroundColor: Colors.success,
  },
  btnText: {
      fontSize: 14,
      fontWeight: '800',
      color: 'white',
  },
  disabledBtn: {
      opacity: 0.5,
  },
  footerNote: {
      textAlign: 'center',
      fontSize: 11,
      color: Colors.textTertiary,
      marginTop: 24,
      lineHeight: 16,
      paddingHorizontal: 20,
  }
});
