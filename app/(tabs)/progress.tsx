import { View, Text } from "react-native";
import React from "react";
import Header from "@/components/Header";
import DestructibleAlert from "@/components/DestructibleAlert";
import ProgressBar from "@/components/ProgressBar";

const PerformancePage = () => {
  const progressData = [
    { label: "Physics", progress: 25 },
    { label: "Chemistry", progress: 57 },
  ];
  return (
    <View>
      <Header
        displaySubject={"Progress Tracker"}
        displayTabTitle={null}
        displayUser={false}
      />
      <View className="mx-10 gap-6 mt-10">
        {progressData.map((item, index) => (
          <ProgressBar
            key={index}
            label={item.label}
            progress={item.progress}
            showProgress
          />
        ))}
      </View>
    </View>
  );
};

export default PerformancePage;
