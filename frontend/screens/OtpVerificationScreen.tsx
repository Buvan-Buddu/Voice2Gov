import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
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

export default function OtpVerificationScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const email = route.params?.email || "user@email.com";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputs = useRef<TextInput[]>([]);

  useEffect(() => {
    if (secondsLeft > 0 && !canResend) {
      const timer = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (secondsLeft === 0) {
      setCanResend(true);
    }
  }, [secondsLeft, canResend]);

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    const newOtp = [...otp];
    if (!otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
    newOtp[index] = "";
    setOtp(newOtp);
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      Alert.alert("Error", "Please enter complete OTP");
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      Alert.alert("Success", "Email verified! Set your password.");
      navigation.navigate("CreatePasswordScreen");
    } catch {
      Alert.alert("Error", "Invalid OTP. Please try again.");
      setOtp(["", "", "", "", "", ""]);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSecondsLeft(60);
      setCanResend(false);
      Alert.alert("Success", "OTP sent to your email");
    } finally {
      setResendLoading(false);
    }
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
                name="email-verify"
                size={32}
                color={Colors.white}
              />
            </View>
            <Text style={styles.title}>Verify Your Email</Text>
            <Text style={styles.subtitle}>We sent a code to {email}</Text>
          </View>

          {/* OTP Input Fields */}
          <View style={styles.otpSection}>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    if (ref) inputs.current[index] = ref;
                  }}
                  style={[styles.otpInput, digit && styles.otpInputFilled]}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(index, value)}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === "Backspace") {
                      handleBackspace(index);
                    }
                  }}
                  keyboardType="number-pad"
                  maxLength={1}
                  editable={!loading}
                  placeholder="-"
                  placeholderTextColor={Colors.textDisabled}
                />
              ))}
            </View>
          </View>

          {/* Verify Button */}
          <TouchableOpacity
            style={[styles.verifyButton, loading && styles.buttonDisabled]}
            onPress={handleVerify}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text style={styles.verifyButtonText}>Verify Email</Text>
            )}
          </TouchableOpacity>

          {/* Resend Section */}
          <View style={styles.resendSection}>
            <Text style={styles.resendText}>
              Didn&apos;t receive the code?{" "}
            </Text>
            {canResend ? (
              <TouchableOpacity onPress={handleResend} disabled={resendLoading}>
                <Text style={styles.resendLink}>
                  {resendLoading ? "Sending..." : "Resend"}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.resendTimer}>Resend in {secondsLeft}s</Text>
            )}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Support Link */}
          <Text style={styles.supportText}>
            Having trouble? Contact{" "}
            <Text style={styles.supportLink}>support@voice2gov.gov</Text>
          </Text>
        </View>
      </ScrollView>
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
    marginBottom: Spacing["3xl"],
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
  title: {
    fontSize: Typography.fontSize["2xl"],
    fontWeight: "700",
    letterSpacing: -0.5,
    color: Colors.darkBlue,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.fontSize.sm,
    fontWeight: "500",
    color: Colors.textSecondary,
    textAlign: "center",
  },

  // OTP Section
  otpSection: {
    marginBottom: Spacing["3xl"],
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Spacing.sm,
  },
  otpInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: BorderRadius.lg,
    paddingVertical: 16,
    fontSize: Typography.fontSize.lg,
    fontWeight: "700",
    textAlign: "center",
    color: Colors.text,
    backgroundColor: Colors.white,
  },
  otpInputFilled: {
    borderColor: Colors.primary,
    backgroundColor: Colors.background,
  },

  // Verify Button
  verifyButton: {
    paddingVertical: 16,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  verifyButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: "700",
    color: Colors.white,
  },

  // Resend Section
  resendSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  resendText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: "500",
    color: Colors.textSecondary,
  },
  resendLink: {
    fontSize: Typography.fontSize.sm,
    fontWeight: "700",
    color: Colors.primary,
  },
  resendTimer: {
    fontSize: Typography.fontSize.sm,
    fontWeight: "500",
    color: Colors.textTertiary,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: Spacing.xl,
  },

  // Support
  supportText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
  supportLink: {
    color: Colors.primary,
    fontWeight: "700",
  },
});
