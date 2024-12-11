import { View, Text, StyleSheet } from "react-native";
import React from "react";

const ProgressBar = ({
  label,
  progress,
  showProgress,
}: {
  label: string;
  progress: number;
  showProgress: boolean;
}) => {
  return (
    <View>
      <View className="flex-row justify-between items-center border-2 border-white/0">
        <Text style={styles.label}>{label}</Text>
        {showProgress && <Text style={styles.percent}>{progress} %</Text>}
      </View>
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: "Montserrat-Medium",
  },
  percent: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: "Montserrat-SemiBold",
  },
  progressBarBackground: {
    height: 17,
    backgroundColor: "#e0e0e0",
    borderRadius: 50,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#113768",
    borderRadius: 50,
  },
});
