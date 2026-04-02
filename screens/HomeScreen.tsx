import React from "react";
import { StyleSheet, Text, View } from "react-native";

import ScreenContainer from "../components/ScreenContainer";

export default function HomeScreen() {
  return (
    <ScreenContainer>
      <View style={styles.main}>
        <Text style={styles.title}>Hello World</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    maxWidth: 420,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  title: {
    fontSize: 48,
    fontWeight: "700",
    lineHeight: 56,
    color: "#111827",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 30,
    color: "#38434D",
    textAlign: "center",
  },
});
