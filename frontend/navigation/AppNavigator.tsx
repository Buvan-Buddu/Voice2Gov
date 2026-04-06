import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { Colors } from "../constants/theme";

// Auth Screens
import CreateNewPasswordScreen from "../screens/CreateNewPasswordScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import LoginScreen from "../screens/LoginScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import OtpVerificationScreen from "../screens/OtpVerificationScreen";
import RegistrationScreen from "../screens/RegistrationScreen";

// Main App Screens
import ComplaintDetailsScreen from "../screens/ComplaintDetailsScreen";
import CreateComplaintScreen from "../screens/CreateComplaintScreen";
import DashboardScreen from "../screens/DashboardScreen";
import MyComplaintsScreen from "../screens/MyComplaintsScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import PublicFeedScreen from "../screens/PublicFeedScreen";
import AuthorityDashboardScreen from "../screens/AuthorityDashboardScreen";
import ResolveComplaintScreen from "../screens/ResolveComplaintScreen";

export type RootStackParamList = {
  OnboardingScreen: undefined;
  LoginScreen: undefined;
  RegistrationScreen: undefined;
  OTPVerificationScreen: { email: string };
  CreatePasswordScreen: { token?: string } | undefined;
  ForgotPasswordScreen: undefined;
  DashboardScreen: undefined;
  ComplaintDetailsScreen: { complaint?: any } | undefined;
  CreateComplaintScreen: undefined;
  AuthorityDashboardScreen: undefined;
  ResolveComplaintScreen: { complaint: any };
};

export type MainScreensTabParamList = {
  DashboardTab: undefined;
  ComplaintsTab: undefined;
  NotificationsTab: undefined;
  FeedTab: undefined;
};

const TabNavigator = createBottomTabNavigator<MainScreensTabParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
    card: Colors.surface,
    text: Colors.text,
    border: Colors.border,
    primary: Colors.primary,
  },
};

// Main App Tab Navigator
function MainTabNavigator() {
  return (
    <TabNavigator.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: Colors.surface },
        headerTitleStyle: { fontWeight: "700", color: Colors.text },
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textTertiary,
      }}
    >
      <TabNavigator.Screen
        name="DashboardTab"
        component={DashboardScreen}
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-dashboard-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <TabNavigator.Screen
        name="ComplaintsTab"
        component={MyComplaintsScreen}
        options={{
          title: "My Complaints",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="clipboard-text-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <TabNavigator.Screen
        name="NotificationsTab"
        component={NotificationsScreen}
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="bell-outline"
              size={size}
              color={color}
            />
          ),
          tabBarBadge: 2,
        }}
      />
      <TabNavigator.Screen
        name="FeedTab"
        component={PublicFeedScreen}
        options={{
          title: "Feed",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="rss" size={size} color={color} />
          ),
        }}
      />
    </TabNavigator.Navigator>
  );
}

// Root Navigator
export default function AppNavigator() {
  return (
    <NavigationContainer theme={appTheme}>
      <RootStack.Navigator initialRouteName="LoginScreen">
        <RootStack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="OTPVerificationScreen"
          component={OtpVerificationScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="CreatePasswordScreen"
          component={CreateNewPasswordScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />

        <RootStack.Screen
          name="DashboardScreen"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />

        <RootStack.Screen
          name="AuthorityDashboardScreen"
          component={AuthorityDashboardScreen}
          options={{ headerShown: false }}
        />

        <RootStack.Group
          screenOptions={{
            presentation: "modal",
          }}
        >
          <RootStack.Screen
            name="ComplaintDetailsScreen"
            component={ComplaintDetailsScreen}
            options={{ title: "Complaint Details" }}
          />
          <RootStack.Screen
            name="CreateComplaintScreen"
            component={CreateComplaintScreen}
            options={{ title: "File a Complaint" }}
          />
          <RootStack.Screen
            name="ResolveComplaintScreen"
            component={ResolveComplaintScreen}
            options={{ title: "Resolve Issue" }}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
