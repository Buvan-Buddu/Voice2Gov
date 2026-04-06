import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
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
import { complaintService } from "../services/api";

export default function CreateComplaintScreen() {
  const navigation = useNavigation<any>();
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { status: camStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: locStatus } = await Location.requestForegroundPermissionsAsync();

    if (camStatus !== "granted" || locStatus !== "granted") {
      Alert.alert("Permission Required", "We need Camera and Location access to file reports.");
    }
  };

  const handleTakePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.5,
        base64: true,
      });

      if (!result.canceled && result.assets[0].base64) {
        setPhoto(`data:image/jpeg;base64,${result.assets[0].base64}`);
        fetchLocation(); // Auto-fetch location
      }
    } catch (error) {
      Alert.alert("Camera Error", "Could not capture image.");
    }
  };

  const fetchLocation = async () => {
    try {
      setLocating(true);
      const currentLoc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation({
        lat: currentLoc.coords.latitude,
        lng: currentLoc.coords.longitude,
      });
    } catch (error) {
      console.warn("Location fetch failed", error);
    } finally {
      setLocating(false);
    }
  };

  const handleSubmit = async () => {
    if (description.length < 10) {
      Alert.alert("Description Too Short", "Please provide at least 10 characters to help our AI route your request correctly.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        description,
        image: photo || undefined,
        location: (location && typeof location.lat === 'number' && typeof location.lng === 'number') 
          ? { lat: location.lat, lng: location.lng } 
          : undefined,
      };

      await complaintService.createComplaint(payload);
      
      Alert.alert(
        "Report Filed", 
        "Your voice has been heard! Our AI is routing this to the correct department.",
        [{ text: "Great", onPress: () => navigation.navigate("DashboardScreen", { screen: "ComplaintsTab" }) }]
      );
    } catch (error: any) {
      Alert.alert("Submission Failed", error.message || "Something went wrong.");
    } finally {
      setLoading(false);
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
          <MaterialCommunityIcons name="chevron-left" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>File a Report</Text>
        <View style={{ width: 28 }} />
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.sectionLabel}>Visual Evidence</Text>
            {photo ? (
              <View style={styles.photoPreviewWrapper}>
                <Image source={{ uri: photo }} style={styles.photoPreview} />
                <TouchableOpacity style={styles.removePhoto} onPress={() => setPhoto(null)}>
                  <MaterialCommunityIcons name="close-circle" size={24} color={Colors.error} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.captureBtn} onPress={handleTakePhoto}>
                <View style={styles.captureIconOuter}>
                  <MaterialCommunityIcons name="camera-plus" size={32} color={Colors.primary} />
                </View>
                <Text style={styles.captureText}>Take a Photo</Text>
                <Text style={styles.captureSub}>Capture the issue for AI analysis</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionLabel}>What is the issue?</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Broken streetlight, overflowing drain, or road pothole..."
              placeholderTextColor={Colors.textTertiary}
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
              textAlignVertical="top"
              editable={!loading}
            />
          </View>

          <View style={[styles.card, styles.locationCard]}>
            <View style={styles.locationHeader}>
              <View style={styles.locationTitleRow}>
                <MaterialCommunityIcons name="map-marker-radius" size={20} color={Colors.primary} />
                <Text style={styles.sectionLabel}>Incident Location</Text>
              </View>
              {locating ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <TouchableOpacity onPress={fetchLocation}>
                  <Text style={styles.refreshLoc}>Update Location</Text>
                </TouchableOpacity>
              )}
            </View>
            
            <View style={styles.locationStatus}>
              {location ? (
                <View style={styles.locationSuccess}>
                  <MaterialCommunityIcons name="check-decagram" size={16} color={Colors.success} />
                  <Text style={styles.locationText}>Verified: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</Text>
                </View>
              ) : (
                <Text style={styles.locationPending}>No location selected</Text>
              )}
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.submitBtn, (!description || loading) && styles.submitBtnDisabled]}
            onPress={handleSubmit}
            disabled={loading || !description}
          >
            <LinearGradient
              colors={[Colors.primary, Colors.darkBlue]}
              style={styles.submitGradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <Text style={styles.submitBtnText}>Submit Report</Text>
                  <MaterialCommunityIcons name="send" size={20} color="white" />
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
          
          <Text style={styles.privacyNote}>
            Your report will be processed by AI and routed to the corresponding department. 
            Estimated resolution time: 48-72 hours.
          </Text>
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
    paddingHorizontal: Spacing.xl,
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
    fontSize: Typography.fontSize.lg,
    fontWeight: '800',
    color: 'white',
  },
  scroll: {
    padding: Spacing.xl,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 20,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  captureBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderWidth: 2,
    borderColor: Colors.primary + '20',
    borderStyle: 'dashed',
    borderRadius: 20,
  },
  captureIconOuter: {
    width: 64,
    height: 64,
    borderRadius: 22,
    backgroundColor: Colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  captureText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
  },
  captureSub: {
    fontSize: 12,
    color: Colors.textTertiary,
    marginTop: 4,
  },
  photoPreviewWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    height: 240,
    width: '100%',
  },
  photoPreview: {
    width: '100%',
    height: '100%',
  },
  removePhoto: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  input: {
    backgroundColor: '#F7F9FC',
    borderRadius: 16,
    padding: 16,
    fontSize: Typography.fontSize.sm,
    color: Colors.text,
    minHeight: 120,
  },
  locationCard: {
    paddingBottom: 16,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  refreshLoc: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  locationStatus: {
    paddingVertical: 4,
  },
  locationSuccess: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
  },
  locationPending: {
    fontSize: 13,
    color: Colors.textTertiary,
    fontStyle: 'italic',
  },
  submitBtn: {
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: Spacing.md,
    elevation: 8,
  },
  submitBtnDisabled: {
    opacity: 0.6,
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 12,
  },
  submitBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: 'white',
  },
  privacyNote: {
    textAlign: 'center',
    fontSize: 11,
    color: Colors.textTertiary,
    lineHeight: 16,
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
