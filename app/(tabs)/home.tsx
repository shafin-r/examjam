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
  return (
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
                  <View className="justify-center items-center border-2 border-[#c5dbf8] p-10 w-[48%] rounded-[25]">
                    <Image
                      source={require("@/assets/images/icons/topic-test.png")}
                      style={{ width: 78, height: 78 }}
                    />
                    <Text className="text-lg font-montMedium text-[#113768]">
                      Topic Test
                    </Text>
                  </View>
                  <View className="justify-center items-center border-2 border-[#c5dbf8] p-10 w-[48%] rounded-[25]">
                    <Image
                      source={require("@/assets/images/icons/mock-test.png")}
                      style={{ width: 78, height: 78 }}
                    />
                    <Text className="text-lg font-montMedium text-[#113768]">
                      Mock Test
                    </Text>
                  </View>
                </View>
                <View className="flex-row justify-between ">
                  <View className="justify-center items-center border-2 border-[#c5dbf8] p-10 w-[48%] rounded-[25]">
                    <Image
                      source={require("@/assets/images/icons/past-paper.png")}
                      style={{ width: 70, height: 70 }}
                    />
                    <Text className="text-lg font-montMedium text-[#113768]">
                      Past Papers
                    </Text>
                  </View>
                  <View className="justify-center items-center border-2 border-[#c5dbf8] p-10 w-[48%] rounded-[25]">
                    <Image
                      source={require("@/assets/images/icons/subject-test.png")}
                      style={{ width: 78, height: 78 }}
                    />
                    <Text className="text-lg font-montMedium text-[#113768]">
                      Subject Test
                    </Text>
                  </View>
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
                  <TouchableOpacity onPress={() => router.push("/leaderboard")}>
                    <AntDesign name="arrowright" size={24} color="#113768" />
                  </TouchableOpacity>
                </View>
                <View
                  className="w-full border-[#c5dbf8]"
                  style={{ borderWidth: 1 }}
                ></View>
                <View className="gap-4">
                  <View className="flex-row border-2 border-[#c5dbf8] rounded-[8] py-2 px-4 justify-between items-center">
                    <View className="flex-row gap-3 items-center">
                      <Text className="font-montMedium text-xl">1</Text>
                      <Image
                        source={require("@/assets/images/static/pfp.jpg")}
                        style={{ width: 25, height: 25, borderRadius: 25 }}
                      />
                      <Text className="font-montMedium text-lg">Shafin</Text>
                    </View>
                    <Text className="font-montMedium text-[#000]/40">
                      320pt
                    </Text>
                  </View>
                  <View className="flex-row border-2 border-[#c5dbf8] rounded-[8] py-2 px-4 justify-between items-center">
                    <View className="flex-row gap-3 items-center">
                      <Text className="font-montMedium text-xl">2</Text>
                      <Image
                        source={require("@/assets/images/static/pfp.jpg")}
                        style={{ width: 25, height: 25, borderRadius: 25 }}
                      />
                      <Text className="font-montMedium text-lg">Jamie</Text>
                    </View>
                    <Text className="font-montMedium text-[#000]/40">
                      320pt
                    </Text>
                  </View>
                  <View className="flex-row border-2 border-[#c5dbf8] rounded-[8] py-2 px-4 justify-between items-center">
                    <View className="flex-row gap-3 items-center">
                      <Text className="font-montMedium text-xl">3</Text>
                      <Image
                        source={require("@/assets/images/static/pfp.jpg")}
                        style={{ width: 25, height: 25, borderRadius: 25 }}
                      />
                      <Text className="font-montMedium text-lg">Oliver</Text>
                    </View>
                    <Text className="font-montMedium text-[#000]/40">
                      320pt
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View className="gap-6">
              <View className="flex-row items-center justify-between">
                <Text className="text-3xl font-montBold text-[#113768]">
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
              {/* <View className="border-2 border-[#c5dbf8] w-full py-[24] rounded-[20] px-7 gap-8">
                <View className="border-[1px] border-[#8abdff] rounded-[25] p-8 gap-6">
                  <Text className="text-2xl font-montMedium pb-4">
                    What is the gravitational force of Earth?
                  </Text>
                </View>
                <TouchableOpacity className="flex-row border-2 border-white/0 items-center gap-4">
                  <Text
                    className={`text-md rounded-full px-1 items-center justify-center border-[1px] 
                          bg-[#113768] text-white`}
                  >
                    A
                  </Text>
                  <Text className="text-xl font-montRegular">5</Text>
                </TouchableOpacity>
              </View> */}
              <DailyQuiz />
            </View>
            <View>
              <View className="flex-row items-center justify-between">
                <Text className="text-3xl font-montBold text-[#113768]">
                  Live Exams
                </Text>
              </View>
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
  );
};

export default Home;
