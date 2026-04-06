import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from "react-native";

import { BorderRadius, Colors, Spacing, Typography } from "../constants/theme";
import { authService, complaintService, API_BASE_URL } from "../services/api";
import { ComplaintResponse } from "../types/srs";

export default function DashboardScreen() {
  const navigation = useNavigation<any>();
  const [complaints, setComplaints] = useState<ComplaintResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);

      const data = await complaintService.getUserComplaints();
      setComplaints(data);
    } catch (error) {
      console.warn("Dashboard Load Failed", error);
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

  const recentComplaints = complaints.slice(0, 3);

  if (loading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView 
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
        showsVerticalScrollIndicator={false}
    >
      {/* 🚀 PREMIUM HEADER */}
      <View style={styles.header}>
        <LinearGradient colors={[Colors.primary, Colors.darkBlue]} style={styles.headerGradient}>
            <View style={styles.topRow}>
                <View>
                    <Text style={styles.welcomeText}>GOOD MORNING,</Text>
                    <Text style={styles.userName}>{user?.name?.split(' ')[0] || "Citizen"}</Text>
                </View>
                <TouchableOpacity style={styles.avatarBtn}>
                    <Image 
                        source={{ uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" }} 
                        style={styles.avatar} 
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.statsRow}>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{stats.total}</Text>
                    <Text style={styles.statLabel}>Filed</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{stats.resolved}</Text>
                    <Text style={styles.statLabel}>Solves</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <View style={styles.impactBadge}>
                        <Text style={styles.impactText}>+12%</Text>
                    </View>
                    <Text style={styles.statLabel}>Impact</Text>
                </View>
            </View>
        </LinearGradient>
      </View>

      {/* 🛠 QUICK ACTIONS RADAR */}
      <View style={styles.content}>
        <View style={styles.radarSection}>
            <Text style={styles.sectionTitle}>Radar Quick Actions</Text>
            <View style={styles.radarGrid}>
                <RadarBtn 
                    icon="plus-box" 
                    label="New Report" 
                    color="#F43F5E" 
                    onPress={() => navigation.navigate("CreateComplaintScreen")}
                />
                <RadarBtn 
                    icon="rss" 
                    label="Feed" 
                    color="#8B5CF6" 
                    onPress={() => navigation.navigate("FeedTab")}
                />
                <RadarBtn 
                    icon="map-marker-radius" 
                    label="Map" 
                    color="#10B981" 
                />
                <RadarBtn 
                    icon="bell-ring" 
                    label="Alerts" 
                    color="#F59E0B" 
                    onPress={() => navigation.navigate("NotificationsTab")}
                />
            </View>
        </View>

        {/* 📝 RECENT TRACKERS */}
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Your Recent Trackers</Text>
                <TouchableOpacity onPress={() => navigation.navigate("ComplaintsTab")}>
                    <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>
            </View>
            
            {recentComplaints.length > 0 ? (
                recentComplaints.map(item => (
                    <MiniCard 
                        key={item.id} 
                        item={item} 
                        onPress={() => navigation.navigate("ComplaintDetailsScreen", { complaint: item })} 
                    />
                ))
            ) : (
                <View style={styles.emptyRecent}>
                    <MaterialCommunityIcons name="clipboard-text-outline" size={32} color={Colors.textTertiary} />
                    <Text style={styles.emptyText}>No recent reports to show.</Text>
                </View>
            )}
        </View>

        {/* 🏆 COMMUNITY IMPACT */}
        <LinearGradient colors={['#FDF2F8', '#FCE7F3']} style={styles.banner}>
            <View style={styles.bannerInfo}>
                <Text style={styles.bannerTitle}>Resolution Goal</Text>
                <Text style={styles.bannerSub}>84% of neighborhood issues resolved this month. Keep up the voice!</Text>
            </View>
            <View style={styles.goalCircle}>
                <Text style={styles.goalText}>84%</Text>
            </View>
        </LinearGradient>

        <View style={{ height: 40 }} />
      </View>
    </ScrollView>
  );
}

function RadarBtn({ icon, label, color, onPress }: any) {
    return (
        <TouchableOpacity style={styles.radarBtn} onPress={onPress}>
            <View style={[styles.radarIconBox, { backgroundColor: color + '15' }]}>
                <MaterialCommunityIcons name={icon} size={24} color={color} />
            </View>
            <Text style={styles.radarLabel}>{label}</Text>
        </TouchableOpacity>
    );
}

function MiniCard({ item, onPress }: { item: ComplaintResponse, onPress: () => void }) {
    const statusColor = item.status === 'resolved' ? Colors.success : item.status === 'in_progress' ? Colors.info : Colors.warning;
    return (
        <TouchableOpacity style={styles.miniCard} onPress={onPress}>
            <View style={[styles.miniStatus, { backgroundColor: statusColor }]} />
            <View style={styles.miniContent}>
                <Text style={styles.miniDesc} numberOfLines={1}>{item.description}</Text>
                <View style={styles.miniFooter}>
                    <Text style={styles.miniId}>#ID-{item.id.slice(-4).toUpperCase()}</Text>
                    <Text style={styles.miniStatusText}>{item.status.replace('_', ' ').toUpperCase()}</Text>
                </View>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.textTertiary} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 2,
  },
  userName: {
    fontSize: 28,
    fontWeight: '900',
    color: 'white',
    letterSpacing: -0.5,
  },
  avatarBtn: {
    width: 54,
    height: 54,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    padding: 3,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 24,
    padding: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '900',
    color: 'white',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  impactBadge: {
    backgroundColor: '#4ADE80',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  impactText: {
    fontSize: 10,
    fontWeight: '900',
    color: 'black',
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  radarSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.darkBlue,
  },
  radarGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  radarBtn: {
    alignItems: 'center',
    gap: 8,
  },
  radarIconBox: {
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radarLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
  },

  section: {
    marginBottom: 32,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.error + '10',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.error,
  },
  liveLabel: {
    fontSize: 9,
    fontWeight: '900',
    color: Colors.error,
  },
  serviceCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  serviceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  serviceLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  statusIndicatorText: {
    fontSize: 10,
    fontWeight: '800',
  },

  seeAll: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },
  miniCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    gap: 12,
  },
  miniStatus: {
    width: 4,
    height: 30,
    borderRadius: 2,
  },
  miniContent: {
    flex: 1,
  },
  miniDesc: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  miniFooter: {
    flexDirection: 'row',
    gap: 12,
  },
  miniId: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textTertiary,
  },
  miniStatusText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.primary,
  },
  emptyRecent: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
  },
  emptyText: {
    fontSize: 12,
    color: Colors.textTertiary,
    marginTop: 8,
  },

  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderRadius: 30,
    justifyContent: 'space-between',
  },
  bannerInfo: {
    flex: 1,
    marginRight: 16,
  },
  bannerTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#9D174D',
    marginBottom: 4,
  },
  bannerSub: {
    fontSize: 11,
    color: '#BE185D',
    lineHeight: 16,
    fontWeight: '600',
  },
  goalCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#FBCFE8',
  },
  goalText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#9D174D',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  }
});
