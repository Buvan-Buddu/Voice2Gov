import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { BorderRadius, Colors, Spacing, Typography } from "../constants/theme";

interface Impact {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  icon: string;
}

const IMPACT_STORIES: Impact[] = [
  {
    id: "1",
    title: "Oak Street Pothole Fixed",
    description:
      "Reported by 42 residents, the city council prioritized this major intersection repair within 48 hours.",
    timeAgo: "2 Days Ago",
    icon: "road",
  },
  {
    id: "2",
    title: "Central Park Lighting",
    description:
      "Installation of solar LED path lights after safety concerns were raised by the evening running club.",
    timeAgo: "1 Week Ago",
    icon: "lightbulb",
  },
  {
    id: "3",
    title: "New Inclusive Playground",
    description:
      "A $50,000 grant was secured via collective voting to build the neighborhood's first sensory playground.",
    timeAgo: "3 Days Ago",
    icon: "play-circle",
  },
];

export default function OnboardingScreen() {
  const navigation = useNavigation<any>();

  const handleGetStarted = () => {
    navigation.navigate("DashboardScreen");
  };

  const handleSignIn = () => {
    navigation.navigate("DashboardScreen");
  };

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons
              name="microphone"
              size={24}
              color={Colors.white}
            />
          </View>
          <Text style={styles.appTitle}>Voice2Gov</Text>
        </View>
        <TouchableOpacity onPress={handleSignIn}>
          <Text style={styles.signInButton}>Sign in</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.section}>
          <View style={styles.heroContent}>
            <View style={styles.badge}>
              <MaterialCommunityIcons
                name="rocket-launch"
                size={14}
                color={Colors.primary}
              />
              <Text style={styles.badgeText}>
                Join the Platform for Civic Action
              </Text>
            </View>
            <Text style={styles.heroTitle}>
              Empowering Your Voice for{" "}
              <Text style={{ color: Colors.info }}>Real Change</Text>
            </Text>
            <Text style={styles.heroDescription}>
              Be part of a collective movement that turns local concerns into
              community triumphs. Your voice is the catalyst for progress.
            </Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleGetStarted}
              >
                <Text style={styles.buttonText}>Join the Movement</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Learn More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard
            icon="check-circle"
            value="1.2k+"
            label="Issues Resolved"
            bgColor={Colors.success}
          />
          <StatCard
            icon="earth"
            value="15k+"
            label="Active Citizens"
            bgColor={Colors.primary}
          />
          <StatCard
            icon="coin"
            value="$2M+"
            label="Infrastructure Improved"
            bgColor={Colors.warning}
          />
        </View>

        {/* Impact Stories Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Impact Stories</Text>
              <Text style={styles.sectionSubtitle}>
                Real results from our active community
              </Text>
            </View>
          </View>

          <FlatList
            scrollEnabled={false}
            data={IMPACT_STORIES}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ImpactCard story={item} />}
            ItemSeparatorComponent={() => (
              <View style={{ height: Spacing.lg }} />
            )}
          />
        </View>

        {/* Mission Statement Section */}
        <View style={styles.missionSection}>
          <Text style={styles.missionBadge}>Our Philosophy</Text>
          <Text style={styles.missionTitle}>
            Collective Progress through Individual Action
          </Text>
          <Text style={styles.missionDescription}>
            At Voice2Gov, we believe that transparency is the bedrock of
            democracy. By centralizing reporting, tracking, and communication,
            we transform "I wish someone would fix this" into "We are fixing
            this together."
          </Text>

          <View style={styles.processFlow}>
            <ProcessStep step="Report" description="Snap and submit issues" />
            <View style={styles.processConnector} />
            <ProcessStep step="Track" description="Follow real-time progress" />
            <View style={styles.processConnector} />
            <ProcessStep step="Resolve" description="Verify the final result" />
          </View>
        </View>

        {/* Final CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to make an impact?</Text>
          <TouchableOpacity style={styles.ctaButton} onPress={handleGetStarted}>
            <Text style={styles.ctaButtonText}>Get Started Now</Text>
          </TouchableOpacity>
          <Text style={styles.ctaSubtext}>
            Free forever for citizens. No credit card required.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function StatCard({
  icon,
  value,
  label,
  bgColor,
}: {
  icon: string;
  value: string;
  label: string;
  bgColor: string;
}) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: bgColor + "20" }]}>
        <MaterialCommunityIcons name={icon as any} size={24} color={bgColor} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ImpactCard({ story }: { story: Impact }) {
  return (
    <View style={styles.card}>
      <View
        style={[styles.cardIcon, { backgroundColor: Colors.primary + "20" }]}
      >
        <MaterialCommunityIcons
          name={story.icon as any}
          size={28}
          color={Colors.primary}
        />
      </View>
      <View style={styles.cardContent}>
        <View style={styles.verifiedBadge}>
          <MaterialCommunityIcons
            name="check-circle"
            size={12}
            color={Colors.info}
          />
          <Text style={styles.verifiedText}>VERIFIED</Text>
        </View>
        <Text style={styles.cardTitle}>{story.title}</Text>
        <Text style={styles.cardDescription}>{story.description}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.timeAgo}>{story.timeAgo}</Text>
          <View style={styles.readMore}>
            <Text style={styles.readMoreText}>Read More</Text>
            <MaterialCommunityIcons
              name="arrow-right"
              size={12}
              color={Colors.secondary}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

function ProcessStep({
  step,
  description,
}: {
  step: string;
  description: string;
}) {
  return (
    <View style={styles.processStep}>
      <Text style={styles.processStepText}>{step}</Text>
      <Text style={styles.processDescription}>{description}</Text>
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
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  logoSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  appTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: "700",
    color: Colors.primary,
  },
  signInButton: {
    fontSize: Typography.fontSize.sm,
    fontWeight: "600",
    color: Colors.white,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: Spacing["2xl"],
  },

  // Hero Section
  section: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing["2xl"],
  },
  heroContent: {
    gap: Spacing.lg,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.primary + "10",
    borderRadius: BorderRadius.full,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: Colors.secondary + "30",
  },
  badgeText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "600",
    color: Colors.info,
  },
  heroTitle: {
    fontSize: Typography.fontSize["3xl"],
    fontWeight: "900",
    color: Colors.text,
    lineHeight: 40,
  },
  heroDescription: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  buttonGroup: {
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
  },
  buttonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: "600",
    color: Colors.white,
  },
  secondaryButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: "600",
    color: Colors.primary,
  },

  // Stats Grid
  statsGrid: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  statCard: {
    backgroundColor: Colors.surface,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius["2xl"],
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  statValue: {
    fontSize: Typography.fontSize["3xl"],
    fontWeight: "900",
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  statLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: "500",
    color: Colors.textSecondary,
  },

  // Impact Stories
  sectionHeader: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.fontSize["2xl"],
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  sectionSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius["2xl"],
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    flexDirection: "row",
    gap: Spacing.lg,
  },
  cardIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  cardContent: {
    flex: 1,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  verifiedText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "700",
    color: Colors.info,
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  cardDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: Spacing.md,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  timeAgo: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "600",
    color: Colors.info,
  },
  readMore: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  readMoreText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "700",
    color: Colors.info,
  },

  // Mission Section
  missionSection: {
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing["2xl"],
    borderRadius: BorderRadius["2xl"],
    marginBottom: Spacing.xl,
  },
  missionBadge: {
    fontSize: Typography.fontSize.xs,
    fontWeight: "700",
    color: Colors.info,
    letterSpacing: 1,
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
  missionTitle: {
    fontSize: Typography.fontSize["2xl"],
    fontWeight: "900",
    color: Colors.primary,
    textAlign: "center",
    marginBottom: Spacing.lg,
    lineHeight: 32,
  },
  missionDescription: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: Spacing.xl,
  },
  processFlow: {
    marginTop: Spacing.xl,
    gap: Spacing.md,
  },
  processStep: {
    alignItems: "center",
  },
  processStepText: {
    fontSize: Typography.fontSize.base,
    fontWeight: "700",
    color: Colors.info,
    marginBottom: Spacing.sm,
  },
  processDescription: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  processConnector: {
    height: 2,
    backgroundColor: Colors.secondary + "30",
    marginVertical: Spacing.sm,
  },

  // CTA Section
  ctaSection: {
    paddingHorizontal: Spacing.lg,
    alignItems: "center",
    gap: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  ctaTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: "700",
    color: Colors.primary,
    textAlign: "center",
  },
  ctaButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.xl,
    width: "100%",
    alignItems: "center",
  },
  ctaButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: "700",
    color: Colors.white,
  },
  ctaSubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
});
