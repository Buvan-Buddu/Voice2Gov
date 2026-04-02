import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { BorderRadius, Colors, Spacing, Typography } from "../constants/theme";

export default function CreateNewPasswordScreen() {
  const navigation = useNavigation<any>();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordRequirements = useMemo(() => {
    return {
      minLength: newPassword.length >= 8,
      hasUppercase: /[A-Z]/.test(newPassword),
      hasNumber: /[0-9]/.test(newPassword),
    };
  }, [newPassword]);

  const allRequirementsMet =
    passwordRequirements.minLength &&
    passwordRequirements.hasUppercase &&
    passwordRequirements.hasNumber;

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Please enter both passwords");
      return;
    }

    if (!allRequirementsMet) {
      Alert.alert("Error", "Password does not meet all requirements");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      Alert.alert("Success", "Password reset successfully!");
      navigation.navigate("DashboardScreen");
    } catch {
      Alert.alert("Error", "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.wrapper}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={Colors.text}
          />
        </TouchableOpacity>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Branding Section */}
        <View style={styles.brandingSection}>
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons
              name="sound-wave"
              size={24}
              color={Colors.white}
            />
          </View>
          <Text style={styles.appTitle}>Voice2Gov</Text>
          <Text style={styles.appSubtitle}>
            Empowering civic change through voice
          </Text>
        </View>

        {/* Main Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Create New Password</Text>
          <Text style={styles.cardDescription}>
            Set a strong password to secure your account.
          </Text>

          {/* New Password Field */}
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>New Password</Text>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons
                name="lock"
                size={20}
                color={Colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={Colors.textDisabled}
                secureTextEntry={!showNewPassword}
                value={newPassword}
                onChangeText={setNewPassword}
                editable={!loading}
              />
              <TouchableOpacity
                onPress={() => setShowNewPassword(!showNewPassword)}
                style={styles.visibilityButton}
              >
                <MaterialCommunityIcons
                  name={showNewPassword ? "eye" : "eye-off"}
                  size={20}
                  color={Colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Field */}
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons
                name="lock"
                size={20}
                color={Colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={Colors.textDisabled}
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                editable={!loading}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.visibilityButton}
              >
                <MaterialCommunityIcons
                  name={showConfirmPassword ? "eye" : "eye-off"}
                  size={20}
                  color={Colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Password Requirements */}
          <View style={styles.requirementsSection}>
            <RequirementItem
              icon={
                passwordRequirements.minLength
                  ? "check-circle"
                  : "circle-outline"
              }
              text="At least 8 characters"
              met={passwordRequirements.minLength}
            />
            <RequirementItem
              icon={
                passwordRequirements.hasUppercase
                  ? "check-circle"
                  : "circle-outline"
              }
              text="One uppercase letter"
              met={passwordRequirements.hasUppercase}
            />
            <RequirementItem
              icon={
                passwordRequirements.hasNumber
                  ? "check-circle"
                  : "circle-outline"
              }
              text="One number"
              met={passwordRequirements.hasNumber}
            />
          </View>

          {/* Reset Button */}
          <TouchableOpacity
            style={[
              styles.resetButton,
              loading && styles.buttonDisabled,
              !allRequirementsMet && styles.buttonDisabled,
            ]}
            onPress={handleResetPassword}
            disabled={loading || !allRequirementsMet}
          >
            {loading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <>
                <Text style={styles.resetButtonText}>Reset Password</Text>
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={18}
                  color={Colors.white}
                  style={styles.buttonIcon}
                />
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer Links */}
        <View style={styles.footerLinks}>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Civic Standards</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function RequirementItem({
  icon,
  text,
  met,
}: {
  icon: string;
  text: string;
  met: boolean;
}) {
  return (
    <View style={styles.requirementItem}>
      <MaterialCommunityIcons
        name={icon}
        size={18}
        color={met ? Colors.primary : Colors.textTertiary}
        style={styles.requirementIcon}
      />
      <Text
        style={[
          styles.requirementText,
          !met && { color: Colors.textSecondary },
        ]}
      >
        {text}
      </Text>
    </View>
  );
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
    paddingVertical: Spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing["2xl"],
  },

  // Branding
  brandingSection: {
    alignItems: "center",
    marginBottom: Spacing["2xl"],
  },
  logoContainer: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  appTitle: {
    fontSize: Typography.fontSize["2xl"],
    fontWeight: "700",
    letterSpacing: -0.5,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  appSubtitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: "500",
    color: Colors.textSecondary,
    textAlign: "center",
  },

  // Card
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius["2xl"],
    padding: Spacing["2xl"],
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.xl,
  },
  cardTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  cardDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },

  // Form Groups
  formGroup: {
    marginBottom: Spacing.xl,
  },
  inputLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: "500",
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
  },
  inputIcon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: Typography.fontSize.sm,
    color: Colors.text,
  },
  visibilityButton: {
    padding: Spacing.sm,
  },

  // Requirements
  requirementsSection: {
    gap: Spacing.md,
    paddingVertical: Spacing.lg,
    paddingTop: Spacing.md,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  requirementIcon: {
    marginRight: Spacing.sm,
  },
  requirementText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },

  // Button
  resetButton: {
    paddingVertical: 14,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    marginTop: Spacing.lg,
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.sm,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  resetButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: "600",
    color: Colors.white,
  },
  buttonIcon: {
    marginLeft: Spacing.sm,
  },

  // Footer
  footerLinks: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing["3xl"],
  },
  footerLink: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "500",
    color: Colors.textSecondary,
  },
});
