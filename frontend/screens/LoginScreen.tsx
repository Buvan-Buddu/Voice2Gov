import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { BorderRadius, Colors, Spacing, Typography } from "../constants/theme";

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      // Simulate login delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      Alert.alert("Success", "Logged in successfully!");
      navigation.navigate("DashboardScreen");
    } catch {
      // Handle error silently
      Alert.alert("Login Error", "Failed to login. Please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    Alert.alert("Google Login", "Google SSO integration would go here");
  };

  const handleAgencySSOLogin = () => {
    Alert.alert("Agency SSO", "Agency SSO login would go here");
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPasswordScreen");
  };

  const handleRegister = () => {
    navigation.navigate("RegistrationScreen");
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Branding Section */}
          <View style={styles.brandingSection}>
            <View style={styles.logoContainer}>
              <MaterialCommunityIcons
                name="microphone"
                size={32}
                color={Colors.white}
              />
            </View>
            <Text style={styles.appTitle}>Voice2Gov</Text>
            <Text style={styles.appSubtitle}>
              Digital Concierge for Civic Change
            </Text>
          </View>

          {/* SSO Login Options */}
          <View style={styles.ssoSection}>
            <TouchableOpacity
              style={styles.ssoButton}
              onPress={handleGoogleLogin}
            >
              <Image
                source={{
                  uri: "https://www.google.com/favicon.ico",
                }}
                style={styles.ssoIcon}
              />
              <Text style={styles.ssoButtonText}>Login with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.ssoButton}
              onPress={handleAgencySSOLogin}
            >
              <MaterialCommunityIcons
                name="bank"
                size={20}
                color={Colors.text}
              />
              <Text style={styles.ssoButtonText}>Login via Agency SSO</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.dividerSection}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Email Input */}
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons
                name="email"
                size={20}
                color={Colors.textTertiary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="e.g. name@agency.gov"
                placeholderTextColor={Colors.textDisabled}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                editable={!loading}
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.formGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.inputLabel}>Password</Text>
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons
                name="lock"
                size={20}
                color={Colors.textTertiary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={Colors.textDisabled}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                editable={!loading}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.visibilityIcon}
              >
                <MaterialCommunityIcons
                  name={showPassword ? "eye" : "eye-off"}
                  size={20}
                  color={Colors.textTertiary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            style={[
              styles.signInButton,
              loading && styles.signInButtonDisabled,
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text style={styles.signInButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          {/* Register Link */}
          <View style={styles.registerSection}>
            <Text style={styles.registerText}>
              Don&apos;t have an account?{" "}
            </Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.registerLink}>Register Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Footer Links */}
      <View style={styles.footer}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  container: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing["2xl"],
    borderWidth: 1,
    borderColor: Colors.border,
    width: "100%",
    alignSelf: "center",
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
    color: Colors.darkBlue,
    marginBottom: Spacing.sm,
  },
  appSubtitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: "500",
    color: Colors.textSecondary,
    textAlign: "center",
  },

  // SSO Buttons
  ssoSection: {
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  ssoButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.md,
    paddingVertical: 12,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.surface,
  },
  ssoIcon: {
    width: 20,
    height: 20,
  },
  ssoButtonText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: "600",
    color: Colors.gray700,
  },

  // Divider
  dividerSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "700",
    letterSpacing: 0.5,
    color: Colors.textTertiary,
  },

  // Form Groups
  formGroup: {
    marginBottom: Spacing.xl,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  inputLabel: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "700",
    letterSpacing: -0.3,
    color: Colors.gray600,
    textTransform: "uppercase",
  },
  forgotPasswordLink: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "700",
    color: Colors.primary,
    textDecorationLine: "none",
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
    paddingVertical: 14,
    paddingRight: Spacing.md,
    fontSize: Typography.fontSize.sm,
    color: Colors.text,
  },
  visibilityIcon: {
    padding: Spacing.sm,
  },

  // Sign In Button
  signInButton: {
    paddingVertical: 16,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  signInButtonDisabled: {
    opacity: 0.6,
  },
  signInButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: "700",
    color: Colors.white,
  },

  // Register Section
  registerSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.lg,
  },
  registerText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: "500",
    color: Colors.textSecondary,
  },
  registerLink: {
    fontSize: Typography.fontSize.sm,
    fontWeight: "700",
    color: Colors.primary,
    textDecorationLine: "underline",
  },

  // Footer
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingHorizontal: Spacing.md,
  },
  footerLink: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "700",
    letterSpacing: -0.2,
    color: Colors.gray500,
    textTransform: "uppercase",
  },
});
