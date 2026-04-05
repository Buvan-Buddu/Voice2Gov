import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import {
    Alert,
    Image,
    Platform,
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
  const complaint: ComplaintResponse = route.params?.complaint;

  const [liked, setLiked] = useState(false);

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

  const getStatusTheme = (status: string) => {
    switch(status) {
      case 'resolved': return { color: Colors.success, label: 'COMPLETED', icon: 'check-decagram' };
      case 'in_progress': return { color: Colors.info, label: 'IN PROGRESS', icon: 'clock-check' };
      default: return { color: Colors.warning, label: 'PENDING', icon: 'timer-sand' };
    }
  };

  const theme = getStatusTheme(complaint.status);

  return (
    <View style={styles.wrapper}>
      {/* Visual Header */}
      <View style={styles.imageHeader}>
        {complaint.image ? (
            <Image source={{ uri: complaint.image }} style={styles.mainImage} />
        ) : (
            <LinearGradient colors={[Colors.primary, Colors.darkBlue]} style={styles.imagePlaceholder}>
                <MaterialCommunityIcons name="image-off-outline" size={48} color="white" />
                <Text style={styles.placeholderText}>No Photo Provided</Text>
            </LinearGradient>
        )}
        <TouchableOpacity style={styles.backFab} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="chevron-left" size={28} color={Colors.text} />
        </TouchableOpacity>
        
        <View style={styles.statusFab}>
            <LinearGradient 
                colors={[theme.color, theme.color + 'CC']} 
                style={styles.statusGradient}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
            >
                <MaterialCommunityIcons name={theme.icon as any} size={14} color="white" />
                <Text style={styles.statusFabText}>{theme.label}</Text>
            </LinearGradient>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleSection}>
            <View style={styles.headerRow}>
                <Text style={styles.categoryLabel}>{complaint.category.toUpperCase()}</Text>
                <Text style={styles.idLabel}>ID: #{String(complaint.id).slice(-6).toUpperCase()}</Text>
            </View>
            <Text style={styles.description}>{complaint.description}</Text>
        </View>

        {/* Agency Info */}
        <View style={styles.agencyCard}>
            <View style={styles.agencyIconWrapper}>
                <MaterialCommunityIcons name="office-building-marker" size={24} color={Colors.primary} />
            </View>
            <View>
                <Text style={styles.agencyLabel}>Assigned Department</Text>
                <Text style={styles.agencyName}>{complaint.department}</Text>
            </View>
        </View>

        {/* Location Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location Details</Text>
          {complaint.location?.lat && complaint.location?.lng ? (
            <View style={styles.mapCard}>
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                        latitude: complaint.location.lat,
                        longitude: complaint.location.lng,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                        }}
                        scrollEnabled={false}
                        zoomEnabled={false}
                    >
                        <Marker
                        coordinate={{
                            latitude: complaint.location.lat,
                            longitude: complaint.location.lng,
                        }}
                        >
                            <View style={styles.markerContainer}>
                                <LinearGradient colors={[Colors.primary, Colors.darkBlue]} style={styles.markerCircle}>
                                    <MaterialCommunityIcons name="map-marker-star" size={20} color="white" />
                                </LinearGradient>
                                <View style={styles.markerArrow} />
                            </View>
                        </Marker>
                    </MapView>
                </View>
                <View style={styles.mapFooter}>
                    <MaterialCommunityIcons name="navigation-variant" size={16} color={Colors.primary} />
                    <Text style={styles.coordsText}>
                        GP: {complaint.location.lat.toFixed(6)}, {complaint.location.lng.toFixed(6)}
                    </Text>
                </View>
            </View>
          ) : (
            <View style={styles.emptyMap}>
                <MaterialCommunityIcons name="map-marker-off" size={32} color={Colors.gray400} />
                <Text style={styles.noLocationText}>No location data available</Text>
            </View>
          )}
        </View>

        {/* Dynamic Timeline */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status Timeline</Text>
          <View style={styles.timelineList}>
            <TimelineStep
                isFirst
                active
                title="Report Created"
                desc="Your report was successfully filed and routed by AI."
                date="Recorded"
            />
            <TimelineStep
                active={complaint.status !== 'pending'}
                title="Department Sourced"
                desc={`Report accepted by ${complaint.department}.`}
                date={complaint.status === 'pending' ? "Waiting" : "Active"}
            />
            {complaint.adminNotes && (
                <View style={styles.resolutionCard}>
                    <View style={styles.resolutionHeader}>
                        <MaterialCommunityIcons name="comment-text-outline" size={16} color={Colors.primary} />
                        <Text style={styles.resolutionTitle}>Official Update</Text>
                    </View>
                    <Text style={styles.resolutionText}>{complaint.adminNotes}</Text>
                </View>
            )}
            <TimelineStep
                isLast
                active={complaint.status === 'resolved'}
                title="Resolution Complete"
                desc={complaint.status === 'resolved' ? "Service quality verified and issue archived." : "Final resolution pending department action."}
                date={complaint.status === 'resolved' ? "Resolved" : "Pending"}
            />
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Action Bar */}
      <View style={styles.actionBar}>
        <TouchableOpacity 
            style={[styles.helpfulBtn, liked && styles.helpfulBtnActive]}
            onPress={() => setLiked(!liked)}
        >
            <MaterialCommunityIcons name={liked ? "thumb-up" : "thumb-up-outline"} size={22} color={liked ? "white" : Colors.primary} />
            <Text style={[styles.helpfulBtnText, liked && { color: 'white' }]}>
                {liked ? 'Voted Helpful' : 'Mark as Helpful'}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareBtn} onPress={() => Alert.alert("Share", "Link copied to clipboard!")}>
            <MaterialCommunityIcons name="share-variant-outline" size={22} color={Colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function TimelineStep({ isFirst, isLast, active, title, desc, date }: any) {
    return (
        <View style={styles.timelineRow}>
            <View style={styles.timelineLeft}>
                <View style={[styles.timelineNode, active && styles.timelineNodeActive]}>
                    <View style={[styles.nodeInner, active && styles.nodeInnerActive]} />
                </View>
                {!isLast && <View style={[styles.timelineLine, active && styles.timelineLineActive]} />}
            </View>
            <View style={styles.timelineRight}>
                <Text style={[styles.timelineTitle, active && styles.timelineTitleActive]}>{title}</Text>
                <Text style={styles.timelineDesc}>{desc}</Text>
                <Text style={styles.timelineDate}>{date}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  imageHeader: {
    height: 300,
    width: '100%',
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: 'white',
    marginTop: 10,
    fontSize: 12,
    fontWeight: '700',
    opacity: 0.8,
  },
  backFab: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  statusFab: {
    position: 'absolute',
    bottom: -15,
    right: 20,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 10,
  },
  statusGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  statusFabText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  titleSection: {
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 1.5,
  },
  idLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textTertiary,
  },
  description: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.text,
    lineHeight: 26,
  },

  agencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 32,
    gap: 16,
  },
  agencyIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  agencyLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textTertiary,
    textTransform: 'uppercase',
  },
  agencyName: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.darkBlue,
  },

  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.darkBlue,
    marginBottom: 16,
  },
  mapCard: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    backgroundColor: 'white',
    elevation: 4,
  },
  mapContainer: {
    height: 180,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F8FAFC',
    gap: 10,
  },
  coordsText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  markerContainer: {
    alignItems: 'center',
  },
  markerCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  markerArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 10,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: Colors.darkBlue,
    marginTop: -2,
  },

  timelineList: {
    paddingLeft: 12,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 20,
    minHeight: 80,
  },
  timelineLeft: {
    width: 20,
    alignItems: 'center',
  },
  timelineNode: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  timelineNodeActive: {
    backgroundColor: Colors.primary + '30',
  },
  nodeInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#94A3B8',
  },
  nodeInnerActive: {
    backgroundColor: Colors.primary,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: '#F1F5F9',
    marginVertical: 4,
  },
  timelineLineActive: {
    backgroundColor: Colors.primary + '20',
  },
  timelineRight: {
    flex: 1,
    paddingBottom: 24,
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  timelineTitleActive: {
    color: Colors.darkBlue,
  },
  timelineDesc: {
    fontSize: 12,
    color: Colors.textTertiary,
    marginTop: 4,
  },
  timelineDate: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary,
    marginTop: 8,
    textTransform: 'uppercase',
  },

  actionBar: {
    flexDirection: 'row',
    padding: 24,
    paddingBottom: 40,
    backgroundColor: 'white',
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  helpfulBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#F1F5F9',
    borderRadius: 18,
    paddingVertical: 16,
  },
  helpfulBtnActive: {
    backgroundColor: Colors.primary,
  },
  helpfulBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.primary,
  },
  shareBtn: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMap: {
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F8FAFC',
      borderRadius: 12
  },
  noLocationText: {
      fontSize: 12,
      color: Colors.textSecondary,
      marginTop: 8
  },
  resolutionCard: {
      marginVertical: 12,
      marginLeft: 40,
      backgroundColor: Colors.primary + '05',
      borderRadius: 16,
      padding: 16,
      borderLeftWidth: 3,
      borderLeftColor: Colors.primary,
  },
  resolutionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 6,
  },
  resolutionTitle: {
      fontSize: 12,
      fontWeight: '800',
      color: Colors.primary,
      textTransform: 'uppercase',
  },
  resolutionText: {
      fontSize: 13,
      color: Colors.text,
      lineHeight: 20,
      fontWeight: '600',
  }
});
