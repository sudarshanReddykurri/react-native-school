import React from "react";
import { Text, StyleSheet } from "react-native";
import colors from "../config/colors";

const styles = StyleSheet.create({
  h1: {
    color: colors.primary,
    fontSize: 40,
    fontWeight: "500",
    marginBottom: 10
  },
  h2: {
    color: colors.subtle,
    fontSize: 20,
    marginBottom: 20
  }
});

export const H1 = ({ children }) => <Text style={styles.h1}>{children}</Text>;
export const H2 = ({ children }) => <Text style={styles.h2}>{children}</Text>;
