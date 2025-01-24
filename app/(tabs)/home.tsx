import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { StatusBar } from "expo-status-bar";
import SlidingGallery from "@/components/SlidingGallery";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, useRouter } from "expo-router";
import { Image } from "expo-image";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ProgressBar from "@/components/ProgressBar";
import DailyQuiz from "@/components/DailyQuiz";
import LiveCalendar from "@/components/LiveCalendar";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import { API_URL } from "@/lib/auth";
import DestructibleAlert from "@/components/DestructibleAlert";

const Home = () => {
  const { height: screenHeight } = Dimensions.get("window");
  const scaledHeight = screenHeight * 0.19;
  const profileImg = require("@/assets/images/static/avatar.jpg");
  const router = useRouter();
  const [boardData, setBoardData] = useState<string[] | null>([]);
  const [boardError, setBoardError] = useState<string | null>(null);

  const performanceData = [
    { label: "Mock Test", progress: 20 },
    { label: "Topic Test", progress: 70 },
    { label: "Subject Test", progress: 50 },
  ];
  const progressData = [
    { label: "Physics", progress: 25 },
    { label: "Chemistry", progress: 57 },
  ];

  // For Rafeed
  // fetch function for leaderboard data.
  useEffect(() => {
    let isMounted = true;
    async function fetchBoardData() {
      try {
        const response = await fetch(`${API_URL}/leaderboard`);
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard data");
        }
        const data = await response.json();
        if (isMounted) setBoardData(data);
      } catch (error) {
        if (isMounted) setBoardError(error.message || "An error occurred");
      }
    }
    fetchBoardData();
    return () => {
      isMounted = false; // Cleanup to avoid state updates after unmount
    };
  }, []);

  const getTopThree = (boardData) => {
    if (!boardData || boardData.length === 0) return [];
    return boardData
      .slice()
      .sort((a, b) => b.points - a.points)
      .slice(0, 3)
      .map((player, index) => ({
        ...player,
        rank: index + 1,
        height: index === 0 ? 250 : index === 1 ? 200 : 170,
      }));
  };

  return (
    <BackgroundWrapper>
      <SafeAreaProvider style={{ flex: 1 }}>
        <Header displayTabTitle={null} displayUser image={profileImg} />
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.scrollViewWrapper}>
            <SlidingGallery />
            <View style={styles.mainContentWrapper}>
              <View>
                <View style={styles.categoriesHeader}>
                  <Text style={styles.categoriesHeaderText}>Categories</Text>
                  <TouchableOpacity onPress={() => router.push("/categories")}>
                    <AntDesign name="arrowright" size={24} color="#113768" />
                  </TouchableOpacity>
                </View>
                <View style={styles.categoriesContainer}>
                  <View style={styles.categoriesContainerRow}>
                    <TouchableOpacity
                      disabled
                      style={[
                        styles.categoryButton,
                        { height: scaledHeight, opacity: 0.5 },
                      ]}
                    >
                      <Image
                        source={require("@/assets/images/icons/topic-test.png")}
                        style={{ width: 70, height: 70 }}
                      />
                      <Text style={styles.categoryButtonText}>Topic Test</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => router.push("/unit")}
                      style={[styles.categoryButton, { height: scaledHeight }]}
                    >
                      <Image
                        source={require("@/assets/images/icons/mock-test.png")}
                        style={{ width: 70, height: 70 }}
                      />
                      <Text style={styles.categoryButtonText}>Mock Test</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.categoriesContainerRow}>
                    <TouchableOpacity
                      disabled
                      style={[
                        styles.categoryButton,
                        { height: scaledHeight, opacity: 0.5 },
                      ]}
                    >
                      <Image
                        source={require("@/assets/images/icons/past-paper.png")}
                        style={{ width: 62, height: 62 }}
                      />
                      <Text style={styles.categoryButtonText}>Past Papers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      disabled
                      style={[
                        styles.categoryButton,
                        { height: scaledHeight, opacity: 0.5 },
                      ]}
                    >
                      <Image
                        source={require("@/assets/images/icons/subject-test.png")}
                        style={{ width: 70, height: 70 }}
                      />
                      <Text style={styles.categoryButtonText}>
                        Subject Test
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.leaderBoardWrapper}>
                <Text style={styles.leaderBoardHeaderText}>Leaderboard</Text>
                <View style={styles.leaderBoardContainer}>
                  <View style={styles.topThreeHeader}>
                    <Text
                      style={{ fontFamily: "Montserrat-Medium", fontSize: 17 }}
                    >
                      Top 3
                    </Text>
                    <TouchableOpacity
                      onPress={() => router.push("/leaderboard")}
                    >
                      <AntDesign name="arrowright" size={24} color="#113768" />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{ borderWidth: 0.5, borderColor: "#c5dbf8" }}
                  ></View>
                  <View style={{ gap: 12 }}>
                    {getTopThree(boardData).map((student, idx) => (
                      <View key={idx} style={styles.topThreeContainer}>
                        <View className="flex-row gap-3 items-center">
                          <Text className="font-montMedium text-xl">
                            {student.rank}
                          </Text>
                          <Image
                            source={require("@/assets/images/static/avatar.jpg")}
                            style={{ width: 20, height: 20, borderRadius: 25 }}
                          />
                          <Text className="font-montMedium text-sm">
                            {student.name}
                          </Text>
                        </View>
                        <Text className="font-montMedium text-[#000]/40">
                          {student.points}pt
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
              <View className="gap-6">
                <View className="flex-row items-center justify-between">
                  <Text className="text-2xl font-montBold text-[#113768]">
                    Performance Summary
                  </Text>
                  <TouchableOpacity
                    disabled
                    onPress={() => router.push("/performance")}
                  >
                    <AntDesign name="arrowright" size={24} color="#113768" />
                  </TouchableOpacity>
                </View>
                <View className="border-2 border-[#c5dbf8] w-full py-[24] rounded-[20] px-7 gap-8">
                  {/* {performanceData.map((item, index) => (
                    <ProgressBar
                      key={index}
                      label={item.label}
                      progress={item.progress}
                      showProgress={false}
                    />
                  ))} */}
                  <Text className="font-montMedium text-xl text-center">
                    Coming soon.
                  </Text>
                </View>
              </View>
              <View className="gap-6">
                <View className="flex-row items-center justify-between">
                  <Text className="text-3xl font-montBold text-[#113768]">
                    Progress Tracker
                  </Text>
                  <TouchableOpacity
                    disabled
                    onPress={() => router.push("/progress")}
                  >
                    <AntDesign name="arrowright" size={24} color="#113768" />
                  </TouchableOpacity>
                </View>
                <View className="border-2 border-[#c5dbf8] w-full py-[24] rounded-[20] px-7 gap-8">
                  {/* {progressData.map((item, index) => (
                    <ProgressBar
                      key={index}
                      label={item.label}
                      progress={item.progress}
                      showProgress
                    />
                  ))} */}
                  <Text className="font-montMedium text-xl text-center">
                    Coming soon.
                  </Text>
                </View>
              </View>
              <View className="gap-6">
                <Text className="text-3xl font-montBold text-[#113768]">
                  Daily Quiz
                </Text>
                <Text className="border-2 border-[#c5dbf8] p-10 rounded-3xl font-montMedium text-xl text-center">
                  Coming soon.
                </Text>
              </View>
              <View className="gap-6 mb-20">
                <Text className="text-3xl font-montBold text-[#113768]">
                  Live Exams
                </Text>
                <Text className="border-2 border-[#c5dbf8] p-10 rounded-3xl font-montMedium text-xl text-center">
                  Coming soon.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <StatusBar style="light" />
      </SafeAreaProvider>
    </BackgroundWrapper>
  );
};
export default Home;

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingTop: 40,
  },
  scrollViewWrapper: {
    marginHorizontal: 35,
  },
  mainContentWrapper: {
    paddingTop: 25,
    gap: 35,
  },
  categoriesHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoriesHeaderText: {
    fontSize: 24,
    borderWidth: 1,
    borderColor: "transparent",
    fontFamily: "Montserrat-Bold",
    color: "#113768",
  },
  categoriesContainer: {
    gap: 16,
    paddingTop: 25,
  },
  categoriesContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryButton: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#c5dbf8",
    width: "48%",
    borderRadius: 25,
  },
  categoryButtonText: {
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    color: "#113768",
    borderWidth: 1,
    borderColor: "transparent",
  },
  leaderBoardWrapper: {
    gap: 20,
  },
  leaderBoardHeaderText: {
    fontSize: 25,
    fontFamily: "Montserrat-Bold",
    color: "#113768",
  },
  leaderBoardContainer: {
    borderWidth: 1,
    borderColor: "#c5dbf8",
    paddingVertical: 22,
    borderRadius: 20,
    paddingHorizontal: 15,
    gap: 15,
  },
  topThreeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topThreeContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#c5dbf8",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
