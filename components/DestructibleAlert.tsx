import { View, Text, StyleSheet } from "react-native";
import React from "react";

const DestructibleAlert = ({ text }: { text: string }) => {
  return (
    <View style={styles.alert}>
      <Text style={styles.dialog}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  alert: {
    borderWidth: 1,
    backgroundColor: "#fecaca",
    borderColor: "#c0dafc",
    borderRadius: 25,
    paddingTop: 24,
    paddingBottom: 24,
  },
  dialog: {
    fontSize: 20,
    lineHeight: 28,
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
    color: "#991b1b",
  },
});

export default DestructibleAlert;
