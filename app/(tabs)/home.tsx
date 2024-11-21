import { View, Text } from "react-native";
import * as React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";

const Home = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="h-full">
        <Header title={"Shafin"} image={"Shafin"} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Home;
