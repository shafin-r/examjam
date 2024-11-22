import { View, Text, ScrollView } from "react-native";
import * as React from "react";
import Header from "@/components/Header";
import { StatusBar } from "expo-status-bar";
import SlidingGallery from "@/components/SlidingGallery";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link } from "expo-router";
import { Image } from "expo-image";

const Home = () => {
  const profileImg = require("@/assets/images/static/pfp.jpg");
  return (
    <View className="flex-1">
      <Header
        displayUser
        displaySubject={null}
        title={"Shafin"}
        image={profileImg}
      />
      <ScrollView className="mx-10">
        <SlidingGallery />
        <View className="pt-10">
          <View className="flex-row items-center justify-between">
            <Text className="text-3xl font-montBold text-[#113768]">
              Categories
            </Text>
            <Link href="/category">
              <AntDesign name="arrowright" size={24} color="#113768" />
            </Link>
          </View>
          <View className="flex-1 flex-row flex-wrap justify-between gap-4 pt-7">
            <View className="justify-center items-center border-2 border-[#c5dbf8] h-[180] w-[180] rounded-[25]">
              <Image
                source={require("@/assets/images/icons/topic-test.png")}
                style={{ width: 78, height: 78 }}
              />
              <Text className="text-lg font-montMedium text-[#113768]">
                Topic Test
              </Text>
            </View>
            <View className="justify-center items-center border-2 border-[#c5dbf8] h-[180] w-[180] rounded-[25]">
              <Image
                source={require("@/assets/images/icons/mock-test.png")}
                style={{ width: 78, height: 78 }}
              />
              <Text className="text-lg font-montMedium text-[#113768]">
                Mock Test
              </Text>
            </View>
            <View className="justify-center items-center border-2 border-[#c5dbf8] h-[180] w-[180] rounded-[25]">
              <Image
                source={require("@/assets/images/icons/past-paper.png")}
                style={{ width: 70, height: 70 }}
              />
              <Text className="text-lg font-montMedium text-[#113768]">
                Past Papers
              </Text>
            </View>
            <View className="justify-center items-center border-2 border-[#c5dbf8] h-[180] w-[180] rounded-[25]">
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
      </ScrollView>
      <StatusBar style="light" />
    </View>
  );
};

export default Home;
