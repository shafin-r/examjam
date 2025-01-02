import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import * as React from "react";
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

const Home = () => {
  const profileImg = require("@/assets/images/static/pfp.jpg");
  const router = useRouter();

  const performanceData = [
    { label: "Mock Test", progress: 20 },
    { label: "Topic Test", progress: 70 },
    { label: "Subject Test", progress: 50 },
  ];
  const progressData = [
    { label: "Physics", progress: 25 },
    { label: "Chemistry", progress: 57 },
  ];

  const boardData = [
    {
      id: "1",
      name: "Shafin",
      points: 378,
      image: require("@/assets/images/static/pfp.jpg"),
    },
    {
      id: "2",
      name: "Alice",
      points: 350,
      image: require("@/assets/images/static/pfp.jpg"),
    },
    {
      id: "3",
      name: "Bob",
      points: 387,
      image: require("@/assets/images/static/pfp.jpg"),
    },
    {
      id: "4",
      name: "Charlie",
      points: 367,
      image: require("@/assets/images/static/pfp.jpg"),
    },
    {
      id: "5",
      name: "Derek",
      points: 396,
      image: require("@/assets/images/static/pfp.jpg"),
    },
    {
      id: "6",
      name: "Earl",
      points: 289,
      image: require("@/assets/images/static/pfp.jpg"),
    },
    {
      id: "7",
      name: "Frazier",
      points: 345,
      image: require("@/assets/images/static/pfp.jpg"),
    },
    {
      id: "8",
      name: "Gareth",
      points: 356,
      image: require("@/assets/images/static/pfp.jpg"),
    },
    {
      id: "9",
      name: "Hamilton",
      points: 245,
      image: require("@/assets/images/static/pfp.jpg"),
    },
    {
      id: "10",
      name: "Isaiah",
      points: 221,
      image: require("@/assets/images/static/pfp.jpg"),
    },
  ];

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
        <Header
          displayTabTitle={null}
          displayUser
          name="Shafin"
          image={profileImg}
        />
        <ScrollView className="pt-10">
          <View className="mx-10">
            <SlidingGallery />
            <View className="pt-10 gap-10">
              <View className="">
                <View className="flex-row items-center justify-between">
                  <Text className="text-3xl font-montBold text-[#113768]">
                    Categories
                  </Text>
                  <TouchableOpacity onPress={() => router.push("/sections")}>
                    <AntDesign name="arrowright" size={24} color="#113768" />
                  </TouchableOpacity>
                </View>
                <View className="gap-4 pt-7">
                  <View className="flex-row justify-between ">
                    <TouchableOpacity className="justify-center items-center border-2 border-[#c5dbf8] h-[170] w-[48%] rounded-[25]">
                      <Image
                        source={require("@/assets/images/icons/topic-test.png")}
                        style={{ width: 78, height: 78 }}
                      />
                      <Text className="text-lg font-montMedium text-[#113768]">
                        Topic Test
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="justify-center items-center border-2 border-[#c5dbf8] h-[170] w-[48%] rounded-[25]">
                      <Image
                        source={require("@/assets/images/icons/mock-test.png")}
                        style={{ width: 78, height: 78 }}
                      />
                      <Text className="text-lg font-montMedium text-[#113768]">
                        Mock Test
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View className="flex-row justify-between ">
                    <TouchableOpacity className="justify-center items-center border-2 border-[#c5dbf8] h-[170] w-[48%] rounded-[25]">
                      <Image
                        source={require("@/assets/images/icons/past-paper.png")}
                        style={{ width: 70, height: 70 }}
                      />
                      <Text className="text-lg font-montMedium text-[#113768]">
                        Past Papers
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => router.push("/category")}
                      className="justify-center items-center border-2 border-[#c5dbf8] h-[170] w-[48%] rounded-[25]"
                    >
                      <Image
                        source={require("@/assets/images/icons/subject-test.png")}
                        style={{ width: 78, height: 78 }}
                      />
                      <Text className="text-lg font-montMedium text-[#113768]">
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
                    <Text className="text-2xl font-montMedium">Top 3</Text>
                    <TouchableOpacity
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
                            style={{ width: 25, height: 25, borderRadius: 25 }}
                          />
                          <Text className="font-montMedium text-lg">
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
                  <TouchableOpacity onPress={() => router.push("/performance")}>
                    <AntDesign name="arrowright" size={24} color="#113768" />
                  </TouchableOpacity>
                </View>
                <View className="border-2 border-[#c5dbf8] w-full py-[24] rounded-[20] px-7 gap-8">
                  {performanceData.map((item, index) => (
                    <ProgressBar
                      key={index}
                      label={item.label}
                      progress={item.progress}
                      showProgress={false}
                    />
                  ))}
                </View>
              </View>
              <View className="gap-6">
                <View className="flex-row items-center justify-between">
                  <Text className="text-3xl font-montBold text-[#113768]">
                    Progress Tracker
                  </Text>
                  <TouchableOpacity onPress={() => router.push("/progress")}>
                    <AntDesign name="arrowright" size={24} color="#113768" />
                  </TouchableOpacity>
                </View>
                <View className="border-2 border-[#c5dbf8] w-full py-[24] rounded-[20] px-7 gap-8">
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
              <View className="gap-6">
                <Text className="text-3xl font-montBold text-[#113768]">
                  Daily Quiz
                </Text>
                <DailyQuiz />
              </View>
              <View className="gap-6">
                <Text className="text-3xl font-montBold text-[#113768]">
                  Live Exams
                </Text>
                <LiveCalendar />
              </View>
              <View>
                <View className="">
                  <Text className="text-3xl font-montBold text-[#113768]">
                    Achievements
                  </Text>
                </View>
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
