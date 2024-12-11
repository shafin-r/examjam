import { View, Text } from "react-native";
import React from "react";
import Header from "@/components/Header";
import DestructibleAlert from "@/components/DestructibleAlert";
import ProgressBar from "@/components/ProgressBar";

const PerformancePage = () => {
  const progressData = [
    { label: "Mock Test", progress: 20 },
    { label: "Topic Test", progress: 70 },
    { label: "Subject Test", progress: 50 },
  ];
  return (
    <View>
      <Header
        displaySubject={"Performance Summary"}
        displayTabTitle={null}
        displayUser={false}
      />
      <View className="mx-10 gap-6 mt-10">
        {progressData.map((item, index) => (
          <ProgressBar
            key={index}
            label={item.label}
            progress={item.progress}
            showProgress={false}
          />
        ))}
      </View>
    </View>
  );
};

export default PerformancePage;
