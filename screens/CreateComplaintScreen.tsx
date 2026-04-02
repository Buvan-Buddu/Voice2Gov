import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { BorderRadius, Colors, Spacing, Typography } from "../constants/theme";
import { ComplaintRequest, ComplaintResponse } from "../types/srs";

type PriorityLevel = "low" | "normal" | "high";

export default function CreateComplaintScreen() {
  const navigation = useNavigation<any>();

  const [title, setTitle] = useState("");
  const [complaintData, setComplaintData] = useState<ComplaintRequest>({
    description: "",
    image: "",
    location: { lat: null, lng: null },
    category: "infrastructure",
    department: "public_works",
    status: "pending",
  });
  const [priority, setPriority] = useState<PriorityLevel>("normal");
  const [attachments, setAttachments] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showPriorityPicker, setShowPriorityPicker] = useState(false);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceNoteLabel, setVoiceNoteLabel] = useState("No voice note added");

  const categories = [
    "infrastructure",
    "sanitation",
    "safety",
    "traffic",
    "other",
  ];
  const departments = [
    "public_works",
    "municipal_sanitation",
    "electricity_board",
    "traffic_department",
    "citizen_services",
  ];
  const priorities: PriorityLevel[] = ["low", "normal", "high"];

  const isFormValid =
    title.trim().length > 0 && complaintData.description.trim().length > 0;

  const handleSubmit = () => {
    if (!isFormValid) {
      Alert.alert("Validation Error", "Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const mockResponse: ComplaintResponse = {
        id: `CMP-${Date.now()}`,
        ...complaintData,
      };
      setIsLoading(false);
      Alert.alert(
        "Success",
        `Complaint submitted with status: ${mockResponse.status}`,
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ],
      );
    }, 1500);
  };

  const handleAddAttachment = () => {
    // Simulate adding an attachment
    const newAttachment = `File_${attachments.length + 1}.jpg`;
    setAttachments([...attachments, newAttachment]);
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleVoiceToggle = () => {
    if (isRecordingVoice) {
      setIsRecordingVoice(false);
      setVoiceNoteLabel("Voice note: 00:14 captured");
      return;
    }
    setIsRecordingVoice(true);
    setVoiceNoteLabel("Recording in progress...");
  };

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={Colors.text}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Complaint</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Field */}
        <FormSection label="Title *">
          <TextInput
            style={styles.textInput}
            placeholder="Brief title of the issue"
            placeholderTextColor={Colors.textSecondary}
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />
          <Text style={styles.charCount}>{title.length}/100</Text>
        </FormSection>

        {/* Description Field */}
        <FormSection label="Description *">
          <TextInput
            style={[styles.textInput, styles.textareaInput]}
            placeholder="Provide details about the issue"
            placeholderTextColor={Colors.textSecondary}
            value={complaintData.description}
            onChangeText={(value) =>
              setComplaintData((prev) => ({ ...prev, description: value }))
            }
            multiline
            numberOfLines={4}
            maxLength={500}
          />
          <Text style={styles.charCount}>
            {complaintData.description.length}/500
          </Text>
        </FormSection>

        {/* Category Field */}
        <FormSection label="Category">
          <Pressable
            style={styles.selectButton}
            onPress={() => setShowCategoryPicker(!showCategoryPicker)}
          >
            <Text style={styles.selectButtonText}>
              {complaintData.category}
            </Text>
            <MaterialCommunityIcons
              name={showCategoryPicker ? "chevron-up" : "chevron-down"}
              size={20}
              color={Colors.primary}
            />
          </Pressable>

          {showCategoryPicker && (
            <View style={styles.pickerOptions}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.pickerOption,
                    complaintData.category === cat && styles.pickerOptionActive,
                  ]}
                  onPress={() => {
                    setComplaintData((prev) => ({ ...prev, category: cat }));
                    setShowCategoryPicker(false);
                  }}
                >
                  <Text
                    style={[
                      styles.pickerOptionText,
                      complaintData.category === cat &&
                        styles.pickerOptionTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                  {complaintData.category === cat && (
                    <MaterialCommunityIcons
                      name="check"
                      size={20}
                      color={Colors.primary}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </FormSection>

        {/* Location Field */}
        <FormSection label="Location">
          <View style={styles.locationInputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Lat,Lng (e.g. 28.6139,77.2090)"
              placeholderTextColor={Colors.textSecondary}
              value={`${complaintData.location.lat ?? ""}${complaintData.location.lat !== null ? "," : ""}${complaintData.location.lng ?? ""}`}
              onChangeText={(value) => {
                const [latText, lngText] = value.split(",");
                const lat = Number(latText);
                const lng = Number(lngText);
                setComplaintData((prev) => ({
                  ...prev,
                  location: {
                    lat: Number.isFinite(lat) ? lat : null,
                    lng: Number.isFinite(lng) ? lng : null,
                  },
                }));
              }}
            />
            <TouchableOpacity style={styles.locationButton}>
              <MaterialCommunityIcons
                name="map-marker-outline"
                size={20}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
        </FormSection>

        {/* Priority Field */}
        <FormSection label="Priority">
          <Pressable
            style={styles.selectButton}
            onPress={() => setShowPriorityPicker(!showPriorityPicker)}
          >
            <View style={styles.priorityDisplay}>
              <View
                style={[
                  styles.priorityDot,
                  { backgroundColor: getPriorityColor(priority) },
                ]}
              />
              <Text style={styles.selectButtonText}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </Text>
            </View>
            <MaterialCommunityIcons
              name={showPriorityPicker ? "chevron-up" : "chevron-down"}
              size={20}
              color={Colors.primary}
            />
          </Pressable>

          {showPriorityPicker && (
            <View style={styles.pickerOptions}>
              {priorities.map((prio) => (
                <TouchableOpacity
                  key={prio}
                  style={[
                    styles.pickerOption,
                    priority === prio && styles.pickerOptionActive,
                  ]}
                  onPress={() => {
                    setPriority(prio);
                    setShowPriorityPicker(false);
                  }}
                >
                  <View style={styles.priorityOptionContent}>
                    <View
                      style={[
                        styles.priorityDot,
                        { backgroundColor: getPriorityColor(prio) },
                      ]}
                    />
                    <Text
                      style={[
                        styles.pickerOptionText,
                        priority === prio && styles.pickerOptionTextActive,
                      ]}
                    >
                      {prio.charAt(0).toUpperCase() + prio.slice(1)}
                    </Text>
                  </View>
                  {priority === prio && (
                    <MaterialCommunityIcons
                      name="check"
                      size={20}
                      color={Colors.primary}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </FormSection>

        {/* Attachments */}
        <FormSection label="Attachments">
          {attachments.length > 0 && (
            <View style={styles.attachmentsList}>
              {attachments.map((attachment, index) => (
                <AttachmentItem
                  key={index}
                  name={attachment}
                  onRemove={() => handleRemoveAttachment(index)}
                />
              ))}
            </View>
          )}

          <TouchableOpacity
            style={styles.addAttachmentButton}
            onPress={() => {
              handleAddAttachment();
              setComplaintData((prev) => ({
                ...prev,
                image: `mock://attachment-${attachments.length + 1}.jpg`,
              }));
            }}
          >
            <MaterialCommunityIcons
              name="plus"
              size={20}
              color={Colors.primary}
            />
            <Text style={styles.addAttachmentText}>Add Photo/Document</Text>
          </TouchableOpacity>

          <Text style={styles.helperText}>
            {attachments.length < 3
              ? `Add up to ${3 - attachments.length} more file(s)`
              : "Maximum files reached"}
          </Text>
        </FormSection>

        <FormSection label="Voice Note">
          <View style={styles.voiceCard}>
            <View style={styles.voiceInfo}>
              <MaterialCommunityIcons
                name={isRecordingVoice ? "microphone" : "microphone-outline"}
                size={20}
                color={isRecordingVoice ? Colors.error : Colors.primary}
              />
              <Text style={styles.voiceText}>{voiceNoteLabel}</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.voiceButton,
                isRecordingVoice && styles.voiceButtonRecording,
              ]}
              onPress={handleVoiceToggle}
            >
              <MaterialCommunityIcons
                name={isRecordingVoice ? "stop" : "record-rec"}
                size={16}
                color={isRecordingVoice ? Colors.error : Colors.primary}
              />
              <Text
                style={[
                  styles.voiceButtonText,
                  isRecordingVoice && styles.voiceButtonTextRecording,
                ]}
              >
                {isRecordingVoice ? "Stop" : "Record"}
              </Text>
            </TouchableOpacity>
          </View>
        </FormSection>

        <FormSection label="Department">
          <View style={styles.pickerOptions}>
            {departments.map((dept) => (
              <TouchableOpacity
                key={dept}
                style={[
                  styles.pickerOption,
                  complaintData.department === dept &&
                    styles.pickerOptionActive,
                ]}
                onPress={() =>
                  setComplaintData((prev) => ({ ...prev, department: dept }))
                }
              >
                <Text
                  style={[
                    styles.pickerOptionText,
                    complaintData.department === dept &&
                      styles.pickerOptionTextActive,
                  ]}
                >
                  {dept}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </FormSection>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            !isFormValid && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? (
            <Text style={styles.submitButtonText}>Submitting...</Text>
          ) : (
            <>
              <MaterialCommunityIcons
                name="send"
                size={20}
                color={Colors.background}
              />
              <Text style={styles.submitButtonText}>Submit Complaint</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Footer Link */}
        <TouchableOpacity>
          <Text style={styles.footerLink}>Need help? Check our FAQ</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function FormSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.formSection}>
      <Text style={styles.sectionLabel}>{label}</Text>
      {children}
    </View>
  );
}

function AttachmentItem({
  name,
  onRemove,
}: {
  name: string;
  onRemove: () => void;
}) {
  return (
    <View style={styles.attachmentItem}>
      <View style={styles.attachmentInfo}>
        <MaterialCommunityIcons
          name="file-image-outline"
          size={20}
          color={Colors.primary}
        />
        <Text style={styles.attachmentName}>{name}</Text>
      </View>
      <TouchableOpacity onPress={onRemove}>
        <MaterialCommunityIcons name="close" size={20} color={Colors.error} />
      </TouchableOpacity>
    </View>
  );
}

function getPriorityColor(priority: PriorityLevel): string {
  switch (priority) {
    case "high":
      return Colors.error;
    case "normal":
      return Colors.warning;
    case "low":
      return Colors.primary;
    default:
      return Colors.textSecondary;
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: "700",
    color: Colors.text,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },

  formSection: {
    marginBottom: Spacing.xl,
  },
  sectionLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Spacing.md,
    textTransform: "uppercase",
  },

  textInput: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: Typography.fontSize.base,
    color: Colors.text,
  },
  textareaInput: {
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    minHeight: 100,
    textAlignVertical: "top",
  },
  charCount: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
    textAlign: "right",
  },

  selectButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  selectButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: "600",
    color: Colors.text,
  },

  pickerOptions: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.lg,
    marginTop: Spacing.sm,
    overflow: "hidden",
  },
  pickerOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  pickerOptionActive: {
    backgroundColor: Colors.primary + "10",
  },
  pickerOptionText: {
    fontSize: Typography.fontSize.base,
    fontWeight: "500",
    color: Colors.text,
  },
  pickerOptionTextActive: {
    fontWeight: "700",
    color: Colors.primary,
  },

  priorityDisplay: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  priorityDot: {
    width: 10,
    height: 10,
    borderRadius: BorderRadius.full,
  },
  priorityOptionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    flex: 1,
  },

  locationInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  locationButton: {
    width: 44,
    height: 44,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
  },

  attachmentsList: {
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  attachmentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  attachmentInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    flex: 1,
  },
  attachmentName: {
    fontSize: Typography.fontSize.sm,
    fontWeight: "500",
    color: Colors.text,
  },

  addAttachmentButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
  },
  addAttachmentText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: "600",
    color: Colors.primary,
  },
  helperText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },

  voiceCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  voiceInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    flex: 1,
  },
  voiceText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  voiceButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.primary + "10",
  },
  voiceButtonRecording: {
    borderColor: Colors.error,
    backgroundColor: Colors.error + "10",
  },
  voiceButtonText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "700",
    color: Colors.primary,
  },
  voiceButtonTextRecording: {
    color: Colors.error,
  },

  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.md,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.xl,
    marginVertical: Spacing.xl,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: "700",
    color: Colors.background,
  },

  footerLink: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: Spacing.xl,
  },
});
