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
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

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
                    <Text style={styles.statusLabel}>OFFICIAL TASKBOARD</Text>
                    <Text style={styles.deptTitle}>{user?.department || "Operations"}</Text>
                </View>
                <View style={styles.onlineBadge}>
                    <View style={styles.pulseDot} />
                    <Text style={styles.onlineText}>NETWORK ACTIVE</Text>
                </View>
            </View>

            <View style={styles.metricsRow}>
                <MetricBox label="NEW" value={stats.pending} color="#F87171" />
                <MetricBox label="IN-WORK" value={stats.active} color="#60A5FA" />
                <MetricBox label="HISTORY" value={stats.cleared} color="#BBF7D0" />
            </View>
        </LinearGradient>
      </View>

      {/* MISSION CONTROL TABS */}
      <View style={styles.tabContainer}>
        <TabItem 
            active={filter === 'pending'} 
            onPress={() => setFilter('pending')} 
            label="UNREAD" 
            count={stats.pending}
            color="#F87171"
        />
        <TabItem 
            active={filter === 'active'} 
            onPress={() => setFilter('active')} 
            label="TRACKING" 
            count={stats.active}
            color="#60A5FA"
        />
        <TabItem 
            active={filter === 'cleared'} 
            onPress={() => setFilter('cleared')} 
            label="ARCHIVED" 
            count={stats.cleared}
            color="#22C55E"
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
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
          renderItem={({ item }) => (
            <MissionCard item={item} onPress={() => handleUpdateStatus(item)} />
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="clipboard-check-outline" size={48} color="#94A3B8" />
              <Text style={styles.emptyText}>No active missions listed for this queue.</Text>
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
            <Text style={[styles.tabLabel, active && { color: '#0F172A', fontWeight: '900' }]}>{label}</Text>
            {count > 0 && <View style={[styles.tabBadge, { backgroundColor: color }]}>
                <Text style={styles.tabBadgeText}>{count}</Text>
            </View>}
        </TouchableOpacity>
    );
}

function MissionCard({ item, onPress }: { item: ComplaintResponse, onPress: () => void }) {
    const isResolved = item.status === 'resolved';
    const location = item.location as any;
    const hasLocation = location && location.lat && location.lng;

    return (
        <TouchableOpacity 
            style={[styles.missionCard, isResolved && styles.missionCardResolved]} 
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={styles.cardHeader}>
                <View style={styles.catRow}>
                    <View style={styles.catIconBox}>
                        <MaterialCommunityIcons name="shield-alert-outline" size={14} color="#334155" />
                    </View>
                    <Text style={styles.missionCat}>{item.category}</Text>
                </View>
                <Text style={styles.missionId}>TX-{item.id.slice(-6).toUpperCase()}</Text>
            </View>
            
            <Text style={styles.missionDesc} numberOfLines={2}>{item.description}</Text>

            {/* SOCIAL INDICATORS (Likes/Votes & Comments) */}
            <View style={styles.engagementArea}>
                <View style={styles.engagementPill}>
                    <MaterialCommunityIcons name="thumb-up" size={12} color="#475569" />
                    <Text style={styles.engagementText}>{item.votes || 0}</Text>
                </View>
                <View style={[styles.engagementPill, { marginLeft: 10 }]}>
                    <MaterialCommunityIcons name="comment-multiple" size={12} color="#475569" />
                    <Text style={styles.engagementText}>{item.comments?.length || 0}</Text>
                </View>
                {item.priority === 'urgent' && (
                    <View style={styles.urgentTag}>
                        <Text style={styles.urgentText}>HOT TOPIC</Text>
                    </View>
                )}
            </View>

            {/* LOCATION MAP PREVIEW */}
            {hasLocation && (
                <View style={styles.miniMapWrapper}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.miniMap}
                        initialRegion={{
                            latitude: location.lat,
                            longitude: location.lng,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.015,
                        }}
                        scrollEnabled={false}
                        zoomEnabled={false}
                    >
                        <Marker coordinate={{ latitude: location.lat, longitude: location.lng }}>
                            <View style={styles.markerCircle}>
                                <View style={styles.markerDot} />
                            </View>
                        </Marker>
                    </MapView>
                    <View style={styles.mapOverlay}>
                        <MaterialCommunityIcons name="navigation-variant" size={12} color="white" />
                        <Text style={styles.locationText}>Location Sourced</Text>
                    </View>
                </View>
            )}
            
            <View style={styles.cardFooter}>
                <View style={styles.priorityBox}>
                    <View style={[styles.prioDot, { backgroundColor: item.priority === 'urgent' ? '#EF4444' : '#F59E0B' }]} />
                    <Text style={styles.prioText}>{item.priority?.toUpperCase() || 'NORMAL'}</Text>
                </View>
                
                <TouchableOpacity style={styles.actionBtn} onPress={onPress}>
                    <Text style={styles.actionBtnText}>{isResolved ? 'ARCHIVED' : 'ENGAGE'}</Text>
                    <MaterialCommunityIcons name="chevron-right" size={16} color="white" />
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
  commandHeader: {
      backgroundColor: '#0F172A',
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
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
      color: '#94A3B8',
      letterSpacing: 2,
  },
  deptTitle: {
      fontSize: 24,
      fontWeight: '900',
      color: 'white',
      letterSpacing: -0.5,
  },
  onlineBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.1)',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 14,
      gap: 6,
  },
  pulseDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#22C55E',
  },
  onlineText: {
      fontSize: 10,
      fontWeight: '900',
      color: '#22C55E',
  },
  metricsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'rgba(255,255,255,0.08)',
      borderRadius: 24,
      paddingVertical: 16,
      paddingHorizontal: 24,
  },
  metricItem: {
      alignItems: 'center',
  },
  metricValue: {
      fontSize: 24,
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
      paddingHorizontal: 24,
      marginTop: 24,
      gap: 12,
  },
  tab: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 14,
      borderBottomWidth: 3,
      borderBottomColor: 'transparent',
      gap: 6,
  },
  tabLabel: {
      fontSize: 11,
      fontWeight: '800',
      color: '#94A3B8',
  },
  tabBadge: {
      paddingHorizontal: 6,
      height: 18,
      minWidth: 18,
      borderRadius: 9,
      justifyContent: 'center',
      alignItems: 'center',
  },
  tabBadgeText: {
      fontSize: 10,
      fontWeight: '900',
      color: 'white',
  },
  listContent: {
      padding: 24,
      paddingBottom: 60,
  },
  missionCard: {
      backgroundColor: 'white',
      borderRadius: 28,
      padding: 20,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: '#F1F5F9',
      elevation: 4,
  },
  missionCardResolved: {
      backgroundColor: '#F8FAFC',
      borderColor: '#E2E8F0',
  },
  cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
  },
  catRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
  },
  catIconBox: {
      width: 28,
      height: 28,
      borderRadius: 10,
      backgroundColor: '#F1F5F9',
      justifyContent: 'center',
      alignItems: 'center',
  },
  missionCat: {
      fontSize: 12,
      fontWeight: '900',
      color: '#334155',
      letterSpacing: 0.5,
      textTransform: 'uppercase',
  },
  missionId: {
      fontSize: 11,
      color: '#94A3B8',
      fontWeight: '800',
  },
  missionDesc: {
      fontSize: 15,
      fontWeight: '600',
      color: '#1E293B',
      marginBottom: 16,
      lineHeight: 22,
  },
  engagementArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  engagementPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 6,
  },
  engagementText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#475569',
  },
  urgentTag: {
      marginLeft: 'auto',
      backgroundColor: '#FEF2F2',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: '#FCA5A5',
  },
  urgentText: {
      fontSize: 9,
      fontWeight: '900',
      color: '#B91C1C',
  },
  miniMapWrapper: {
      height: 120,
      width: '100%',
      borderRadius: 20,
      overflow: 'hidden',
      marginBottom: 16,
      backgroundColor: '#F1F5F9',
  },
  miniMap: {
      width: '100%',
      height: '100%',
  },
  markerCircle: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#0F172A',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'white',
  },
  markerDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: '#F87171',
  },
  mapOverlay: {
      position: 'absolute',
      bottom: 8,
      left: 8,
      backgroundColor: 'rgba(15, 23, 42, 0.7)',
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
  },
  locationText: {
      fontSize: 9,
      fontWeight: '800',
      color: 'white',
  },
  cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: '#F8FAFC',
      paddingTop: 16,
  },
  priorityBox: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: '#F8FAFC',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 10,
  },
  prioDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
  },
  prioText: {
      fontSize: 11,
      fontWeight: '900',
      color: '#475569',
  },
  actionBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#0F172A',
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 14,
      gap: 6,
  },
  actionBtnText: {
      fontSize: 11,
      fontWeight: '900',
      color: 'white',
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
  }
});
