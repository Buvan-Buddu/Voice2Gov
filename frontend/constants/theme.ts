/**
 * Voice2Gov App Theme
 * Colors, typography, and spacing constants
 */

import { Platform } from "react-native";

// Primary Brand Colors
const VOICE2GOV_PRIMARY = "#1C4980";
const VOICE2GOV_DARK_BLUE = "#003263";
const VOICE2GOV_SECONDARY = "#FFD700"; // Gold accent for gamification
const VOICE2GOV_ACCENT = "#FF6B6B";    // Coral for interaction

export const Colors = {
  // Primary Brand
  primary: VOICE2GOV_PRIMARY,
  darkBlue: VOICE2GOV_DARK_BLUE,
  secondary: VOICE2GOV_SECONDARY,
  accent: VOICE2GOV_ACCENT,

  // Background & Surface
  background: "#F0F6FF",
  surface: "#FFFFFF",
  surfaceVariant: "#F9FAFB",

  // Border & Divider
  border: "#E5E7EB",
  divider: "#E5E7EB",

  // Text
  text: "#1B1C1C",
  textSecondary: "#444651",
  textTertiary: "#6B7280",
  textDisabled: "#9CA3AF",

  // Gray palette
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",

  // Status colors
  error: "#DC2626",
  errorLight: "#FEE2E2",
  success: "#10B981",
  successLight: "#DCFCE7",
  warning: "#F59E0B",
  warningLight: "#FEF3C7",
  info: "#3B82F6",
  infoLight: "#EFF6FF",

  // Special
  white: "#FFFFFF",
  black: "#000000",

  // Light mode
  light: {
    text: "#11181C",
    background: "#fff",
    tint: "#0a7ea4",
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: "#0a7ea4",
  },
  // Dark mode
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: "#fff",
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: "#fff",
  },
};

export const Typography = {
  fontSize: {
    xs: 11,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
  },
  fontWeight: {
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extraBold: "800",
  },
  lineHeight: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 20,
  full: 9999,
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
