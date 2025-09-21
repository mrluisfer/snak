import { Colors, currentTheme, Styles } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

export function ViewTitle(props: TextProps) {
  return <Text {...props} style={[styles.title, props.style]} />;
}

const styles = StyleSheet.create({
  title: {
    fontSize: Styles.titleSize,
    fontWeight: "bold",
    marginVertical: 12,
    color: Colors[currentTheme].secondaryText,
  },
});
