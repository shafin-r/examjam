import { View, Text } from "react-native";
import React from "react";
import Header from "@/components/Header";
import DestructibleAlert from "@/components/DestructibleAlert";

const LeaderboardPage = () => {
  return (
    <View>
      <Header
        displaySubject={null}
        displayTabTitle="Leaderboard"
        displayUser={false}
      />
      <View className="mx-10">
        <DestructibleAlert extraStyles="mt-10" text="Page under work." />
      </View>
    </View>
  );
};

export default LeaderboardPage;
