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
    async function fetchBoardData() {
      try {
        const boardResponse = await fetch(`${API_URL}/leaderboard`, {
          method: "GET",
        });
        const fetchedBoardData = await boardResponse.json();
        setBoardData(fetchedBoardData);
      } catch (error) {
        setBoardError("Something went wrong. Please try again.");
      }
    }

    fetchBoardData();
  }, []);

  const getTopThree = (boardData) => {
    const sortedData = boardData.slice().sort((a, b) => b.points - a.points);

    const topThree = sortedData.slice(0, 3).map((player, index) => ({
      ...player,
      rank: index + 1,
      height: index === 0 ? 250 : index === 1 ? 200 : 170,
    }));

    return topThree;
  };
  return (
    <BackgroundWrapper>
      <SafeAreaProvider>
        <Header displayTabTitle={null} displayUser image={profileImg} />
        <ScrollView className="pt-10">
          <View className="mx-10">
            <SlidingGallery />
            <View className="pt-10 gap-10">
              <View className="">
                <View className="flex-row items-center justify-between">
                  <Text
                    className="text-3xl font-montBold text-[#113768]"
                    style={{ fontSize: 25 }}
                  >
                    Categories
                  </Text>
                  <TouchableOpacity onPress={() => router.push("/categories")}>
                    <AntDesign name="arrowright" size={24} color="#113768" />
                  </TouchableOpacity>
                </View>
                <View className="gap-4 pt-7">
                  <View className="flex-row justify-between ">
                    <TouchableOpacity
                      disabled
                      className="justify-center items-center border-2 border-[#c5dbf8] w-[48%] rounded-[25] opacity-50"
                      style={{ height: scaledHeight }}
                    >
                      <Image
                        source={require("@/assets/images/icons/topic-test.png")}
                        style={{ width: 78, height: 78 }}
                      />
                      <Text
                        className="text-lg font-montMedium text-[#113768]"
                        style={{ fontSize: 15 }}
                      >
                        Topic Test
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => router.push("/unit")}
                      className="justify-center items-center border-2 border-[#c5dbf8] w-[48%] rounded-[25]"
                      style={{ height: scaledHeight }}
                    >
                      <Image
                        source={require("@/assets/images/icons/mock-test.png")}
                        style={{ width: 78, height: 78 }}
                      />
                      <Text
                        className="text-lg font-montMedium text-[#113768]"
                        style={{ fontSize: 15 }}
                      >
                        Mock Test
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View className="flex-row justify-between ">
                    <TouchableOpacity
                      disabled
                      className="justify-center items-center border-2 border-[#c5dbf8] w-[48%] rounded-[25] opacity-50"
                      style={{ height: scaledHeight }}
                    >
                      <Image
                        source={require("@/assets/images/icons/past-paper.png")}
                        style={{ width: 70, height: 70 }}
                      />
                      <Text
                        className="text-lg font-montMedium text-[#113768]"
                        style={{ fontSize: 15 }}
                      >
                        Past Papers
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      disabled
                      className="justify-center items-center border-2 border-[#c5dbf8] w-[48%] rounded-[25] opacity-50"
                      style={{ height: scaledHeight }}
                    >
                      <Image
                        source={require("@/assets/images/icons/subject-test.png")}
                        style={{ width: 78, height: 78 }}
                      />
                      <Text
                        className="text-lg font-montMedium text-[#113768]"
                        style={{ fontSize: 15 }}
                      >
                        Subject Test
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View className="gap-6">
                <Text className="text-3xl font-montBold text-[#113768]">
                  Leaderboard
                </Text>
                <View className="border-2 border-[#c5dbf8] w-full py-[24] rounded-[20] px-7 gap-5">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-xl font-montMedium">Top 3</Text>
                    <TouchableOpacity
                      disabled
                      onPress={() => router.push("/leaderboard")}
                    >
                      <AntDesign name="arrowright" size={24} color="#113768" />
                    </TouchableOpacity>
                  </View>
                  <View
                    className="w-full border-[#c5dbf8]"
                    style={{ borderWidth: 1 }}
                  ></View>
                  <View className="gap-4">
                    {getTopThree(boardData).map((student, idx) => (
                      <View
                        key={idx}
                        className="flex-row border-2 border-[#c5dbf8] rounded-[8] py-2 px-4 justify-between items-center"
                      >
                        <View className="flex-row gap-3 items-center">
                          <Text className="font-montMedium text-xl">
                            {student.rank}
                          </Text>
                          <Image
                            source={student.image}
                            style={{ width: 20, height: 20, borderRadius: 25 }}
                          />
                          <Text className="font-montMedium text-md">
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
