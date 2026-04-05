import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
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
import { authService, complaintService } from "../services/api";
import { ComplaintResponse } from "../types/srs";

export default function DashboardScreen() {
  const navigation = useNavigation<any>();
  const [complaints, setComplaints] = useState<ComplaintResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadData();
    // POLLING: Refresh user reports every 10 seconds to show "Live updates" without complex networking
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);

      const data = await complaintService.getUserComplaints();
      setComplaints(data);
    } catch (error) {
      console.warn("My Reports Load Failed", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const stats = {
    total: complaints.length,
    resolved: complaints.filter(c => c.status === 'resolved').length,
    active: complaints.filter(c => c.status !== 'resolved').length,
  };

  return (
    <View style={styles.container}>
      {/* PERSONAL IMPACT HEADER */}
      <View style={styles.impactHeader}>
        <LinearGradient
            colors={[Colors.primary, Colors.darkBlue]}
            style={styles.headerGradient}
        >
            <View style={styles.userRow}>
                <View>
                    <Text style={styles.welcomeText}>Welcome back,</Text>
                    <Text style={styles.userName}>{user?.name || "Citizen"}</Text>
                </View>
                <View style={styles.voiceBadge}>
                    <MaterialCommunityIcons name="microphone-variant" size={20} color="white" />
                    <Text style={styles.voiceText}>ACTIVE VOICE</Text>
                </View>
            </View>

            <View style={styles.cardRow}>
                <ImpactCard 
                    icon="trending-up" 
                    value={stats.resolved} 
                    label="Issues Solved" 
                    color="#4ADE80" 
                />
                <ImpactCard 
                    icon="clock-check-outline" 
                    value={stats.active} 
                    label="Pending Action" 
                    color="#FBBF24" 
                />
            </View>
        </LinearGradient>
      </View>

      {/* QUICK ACTIONS */}
      <View style={styles.quickActions}>
          <TouchableOpacity 
              style={styles.mainAction} 
              onPress={() => navigation.navigate("CreateComplaintScreen")}
          >
              <LinearGradient
                  colors={['#EC4899', '#D946EF']}
                  style={styles.actionGradient}
              >
                  <MaterialCommunityIcons name="plus-circle" size={32} color="white" />
                  <Text style={styles.actionText}>Raise New Concern</Text>
              </LinearGradient>
          </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>My Grievance Pipeline</Text>

      {loading && !refreshing ? (
          <View style={styles.center}>
              <ActivityIndicator size="large" color={Colors.primary} />
          </View>
      ) : (
        <FlatList
          data={complaints}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
          renderItem={({ item }) => (
            <ReportCard 
                item={item} 
                onPress={() => navigation.navigate("ComplaintDetailsScreen", { complaint: item })} 
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="text-box-plus-outline" size={64} color="#E2E8F0" />
              <Text style={styles.emptyText}>You haven't voiced any concerns yet.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

function ImpactCard({ icon, value, label, color }: any) {
    return (
        <View style={styles.impactCard}>
            <View style={[styles.iconBox, { backgroundColor: color + '20' }]}>
                <MaterialCommunityIcons name={icon} size={20} color={color} />
            </View>
            <View>
                <Text style={styles.impactValue}>{value}</Text>
                <Text style={styles.impactLabel}>{label}</Text>
            </View>
        </View>
    );
}

function ReportCard({ item, onPress }: { item: ComplaintResponse, onPress: () => void }) {
    const isResolved = item.status === 'resolved';
    const isInProgress = item.status === 'in_progress';

    return (
        <TouchableOpacity style={styles.reportCard} onPress={onPress}>
            <View style={styles.reportTop}>
                <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                </View>
                <View style={[
                    styles.statusBadge, 
                    isResolved && styles.statusResolved, 
                    isInProgress && styles.statusActive
                ]}>
                    <Text style={[
                        styles.statusText, 
                        isResolved && { color: '#059669' },
                        isInProgress && { color: '#2563EB' }
                    ]}>
                        {item.status.replace('_', ' ').toUpperCase()}
                    </Text>
                </View>
            </View>

            <Text style={styles.reportDesc} numberOfLines={2}>{item.description}</Text>
            
            <View style={styles.reportBottom}>
                <View style={styles.timeInfo}>
                    <MaterialCommunityIcons name="clock-outline" size={14} color={Colors.textTertiary} />
                    <Text style={styles.timeText}>Updated recently</Text>
                </View>
                <TouchableOpacity style={styles.viewBtn} onPress={onPress}>
                    <Text style={styles.viewBtnText}>TRACK PROGRESS</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  impactHeader: {
    paddingBottom: 20,
  },
  headerGradient: {
      paddingTop: 60,
      paddingHorizontal: 20,
      paddingBottom: 32,
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
      fontSize: 14,
      color: 'rgba(255,255,255,0.7)',
      fontWeight: '600',
  },
  userName: {
      fontSize: 24,
      fontWeight: '900',
      color: 'white',
      letterSpacing: -0.5,
  },
  voiceBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.15)',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      gap: 6,
  },
  voiceText: {
      fontSize: 10,
      fontWeight: '800',
      color: 'white',
      letterSpacing: 0.5,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
  },
  impactCard: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 16,
      borderRadius: 24,
      gap: 12,
      elevation: 4,
  },
  impactValue: {
      fontSize: 18,
      fontWeight: '900',
      color: '#1E293B',
  },
  impactLabel: {
      fontSize: 10,
      fontWeight: '700',
      color: '#64748B',
  },
  iconBox: {
      width: 36,
      height: 36,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
  },
  quickActions: {
      paddingHorizontal: 20,
      marginTop: -20,
      marginBottom: 20,
  },
  mainAction: {
      borderRadius: 24,
      elevation: 8,
      overflow: 'hidden',
  },
  actionGradient: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 18,
      gap: 12,
  },
  actionText: {
      fontSize: 16,
      fontWeight: '900',
      color: 'white',
  },
  sectionTitle: {
      fontSize: 16,
      fontWeight: '800',
      color: '#1E293B',
      marginHorizontal: 20,
      marginBottom: 16,
  },
  listContent: {
      paddingHorizontal: 20,
      paddingBottom: 40,
  },
  reportCard: {
      backgroundColor: 'white',
      borderRadius: 24,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: '#F1F5F9',
  },
  reportTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
  },
  categoryBadge: {
      backgroundColor: '#F1F5F9',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8,
  },
  categoryText: {
      fontSize: 10,
      fontWeight: '800',
      color: '#64748B',
      textTransform: 'uppercase',
  },
  statusBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8,
      backgroundColor: '#FEF3C7',
  },
  statusResolved: {
      backgroundColor: '#D1FAE5',
  },
  statusActive: {
      backgroundColor: '#DBEAFE',
  },
  statusText: {
      fontSize: 10,
      fontWeight: '800',
      color: '#D97706',
  },
  reportDesc: {
      fontSize: 15,
      fontWeight: '600',
      color: '#334155',
      lineHeight: 22,
      marginBottom: 16,
  },
  reportBottom: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: '#F8FAFC',
      paddingTop: 12,
  },
  timeInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
  },
  timeText: {
      fontSize: 11,
      color: '#94A3B8',
      fontWeight: '600',
  },
  viewBtn: {
      backgroundColor: Colors.primary + '10',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
  },
  viewBtnText: {
      fontSize: 10,
      fontWeight: '800',
      color: Colors.primary,
  },
  center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  emptyState: {
      alignItems: 'center',
      marginTop: 60,
  },
  emptyText: {
      marginTop: 16,
      fontSize: 14,
      color: '#94A3B8',
      fontWeight: '600',
      textAlign: 'center',
  }
});
