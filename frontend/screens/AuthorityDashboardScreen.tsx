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

export default function AuthorityDashboardScreen() {
  const navigation = useNavigation<any>();
  const [complaints, setComplaints] = useState<ComplaintResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [filter, setFilter] = useState<'pending' | 'active' | 'cleared'>('pending');

  useEffect(() => {
    loadData();
    // POLLING: Automatically refresh every 10 seconds (Solid networking fallback)
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);

      const dept = currentUser?.department || "General Administration";
      const data = await complaintService.getAuthorityComplaints(dept);
      setComplaints(data);
    } catch (error) {
      console.warn("Operation Dashboard Load Failed", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleUpdateStatus = (complaint: ComplaintResponse) => {
    if (complaint.status === 'resolved') return;
    navigation.navigate("ResolveComplaintScreen", { complaint });
  };

  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'pending').length,
    active: complaints.filter(c => c.status === 'in_progress').length,
    cleared: complaints.filter(c => c.status === 'resolved').length
  };

  const filteredComplaints = complaints.filter(c => {
    if (filter === 'pending') return c.status === 'pending';
    if (filter === 'active') return c.status === 'in_progress';
    return c.status === 'resolved';
  });

  return (
    <View style={styles.container}>
      {/* COMMAND CENTER HEADER */}
      <View style={styles.commandHeader}>
        <LinearGradient
            colors={['#0F172A', '#1E293B']}
            style={styles.headerGradient}
        >
            <View style={styles.topRow}>
                <View>
                    <Text style={styles.statusLabel}>OPERATIONS HUB</Text>
                    <Text style={styles.deptTitle}>{user?.department || "General Admin"}</Text>
                </View>
                <View style={styles.onlineBadge}>
                    <View style={styles.pulseDot} />
                    <Text style={styles.onlineText}>LIVE RADAR</Text>
                </View>
            </View>

            <View style={styles.metricsRow}>
                <MetricBox label="NEW" value={stats.pending} color="#F59E0B" />
                <MetricBox label="ACTIVE" value={stats.active} color="#3B82F6" />
                <MetricBox label="TOTAL" value={stats.total} color="#94A3B8" />
            </View>
        </LinearGradient>
      </View>

      {/* MISSION CONTROL TABS */}
      <View style={styles.tabContainer}>
        <TabItem 
            active={filter === 'pending'} 
            onPress={() => setFilter('pending')} 
            label="UNASSIGNED" 
            count={stats.pending}
            color="#F59E0B"
        />
        <TabItem 
            active={filter === 'active'} 
            onPress={() => setFilter('active')} 
            label="IN-FIELD" 
            count={stats.active}
            color="#3B82F6"
        />
        <TabItem 
            active={filter === 'cleared'} 
            onPress={() => setFilter('cleared')} 
            label="COMPLETED" 
            count={stats.cleared}
            color="#10B981"
        />
      </View>

      {loading && !refreshing ? (
          <View style={styles.center}>
              <ActivityIndicator size="large" color={Colors.primary} />
          </View>
      ) : (
        <FlatList
          data={filteredComplaints}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="white" />}
          renderItem={({ item }) => (
            <MissionCard item={item} onPress={() => handleUpdateStatus(item)} />
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="shield-check" size={48} color="#CBD5E1" />
              <Text style={styles.emptyText}>Zero pending missions in region.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

function MetricBox({ label, value, color }: any) {
    return (
        <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color }]}>{value}</Text>
            <Text style={styles.metricLabel}>{label}</Text>
        </View>
    );
}

function TabItem({ active, onPress, label, count, color }: any) {
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={[styles.tab, active && { borderBottomColor: color }]}
        >
            <Text style={[styles.tabLabel, active && { color: '#1E293B' }]}>{label}</Text>
            {count > 0 && <View style={[styles.tabBadge, { backgroundColor: color }]}>
                <Text style={styles.tabBadgeText}>{count}</Text>
            </View>}
        </TouchableOpacity>
    );
}

function MissionCard({ item, onPress }: { item: ComplaintResponse, onPress: () => void }) {
    const isResolved = item.status === 'resolved';
    return (
        <TouchableOpacity 
            style={[styles.missionCard, isResolved && styles.missionCardResolved]} 
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={styles.cardHeader}>
                <View style={styles.catRow}>
                    <View style={styles.catIconBox}>
                        <MaterialCommunityIcons name="alert-outline" size={14} color="#64748B" />
                    </View>
                    <Text style={styles.missionCat}>{item.category}</Text>
                </View>
                <Text style={styles.missionId}>#ID-{item.id.slice(-4).toUpperCase()}</Text>
            </View>
            
            <Text style={styles.missionDesc} numberOfLines={2}>{item.description}</Text>
            
            <View style={styles.cardFooter}>
                <View style={styles.priorityBox}>
                    <View style={[styles.prioDot, { backgroundColor: item.priority === 'urgent' ? '#EF4444' : '#F59E0B' }]} />
                    <Text style={styles.prioText}>{item.priority || 'LOW'}</Text>
                </View>
                
                <TouchableOpacity style={styles.actionBtn} onPress={onPress}>
                    <Text style={styles.actionBtnText}>{isResolved ? 'REVIEWED' : 'ENGAGE'}</Text>
                    <MaterialCommunityIcons name="chevron-right" size={16} color="white" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  commandHeader: {
      backgroundColor: '#0F172A',
      borderBottomLeftRadius: 32,
      borderBottomRightRadius: 32,
      overflow: 'hidden',
  },
  headerGradient: {
      paddingTop: 60,
      paddingHorizontal: 20,
      paddingBottom: 24,
  },
  topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 30,
  },
  statusLabel: {
      fontSize: 10,
      fontWeight: '800',
      color: '#64748B',
      letterSpacing: 2,
  },
  deptTitle: {
      fontSize: 20,
      fontWeight: '900',
      color: 'white',
  },
  onlineBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#1E293B',
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 12,
      gap: 6,
  },
  pulseDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: '#10B981',
  },
  onlineText: {
      fontSize: 10,
      fontWeight: '800',
      color: '#10B981',
  },
  metricsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: 'rgba(255,255,255,0.05)',
      borderRadius: 20,
      padding: 16,
  },
  metricItem: {
      alignItems: 'center',
  },
  metricValue: {
      fontSize: 22,
      fontWeight: '900',
  },
  metricLabel: {
      fontSize: 10,
      fontWeight: '800',
      color: '#64748B',
      marginTop: 2,
  },
  tabContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginTop: 20,
      gap: 8,
  },
  tab: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      borderBottomWidth: 3,
      borderBottomColor: 'transparent',
      gap: 6,
  },
  tabLabel: {
      fontSize: 11,
      fontWeight: '800',
      color: '#64748B',
  },
  tabBadge: {
      paddingHorizontal: 5,
      height: 16,
      minWidth: 16,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
  },
  tabBadgeText: {
      fontSize: 9,
      fontWeight: '900',
      color: 'white',
  },
  listContent: {
      padding: 20,
      paddingBottom: 40,
  },
  missionCard: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: '#E2E8F0',
      elevation: 2,
  },
  missionCardResolved: {
      opacity: 0.8,
      backgroundColor: '#F8FAFC',
  },
  cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
  },
  catRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
  },
  catIconBox: {
      width: 24,
      height: 24,
      borderRadius: 6,
      backgroundColor: '#F1F5F9',
      justifyContent: 'center',
      alignItems: 'center',
  },
  missionCat: {
      fontSize: 11,
      fontWeight: '800',
      color: '#64748B',
      textTransform: 'uppercase',
  },
  missionId: {
      fontSize: 10,
      color: '#94A3B8',
      fontWeight: '700',
  },
  missionDesc: {
      fontSize: 14,
      fontWeight: '600',
      color: '#334155',
      marginBottom: 16,
      lineHeight: 20,
  },
  cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  priorityBox: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      backgroundColor: '#F8FAFC',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
  },
  prioDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
  },
  prioText: {
      fontSize: 10,
      fontWeight: '800',
      color: '#64748B',
      textTransform: 'uppercase',
  },
  actionBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#1E293B',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 10,
      gap: 4,
  },
  actionBtnText: {
      fontSize: 11,
      fontWeight: '800',
      color: 'white',
  },
  center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  emptyState: {
      alignItems: 'center',
      marginTop: 40,
  },
  emptyText: {
      marginTop: 12,
      fontSize: 14,
      color: '#94A3B8',
      fontWeight: '600',
  }
});
