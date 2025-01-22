import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import Header from "@/components/Header";
import DestructibleAlert from "@/components/DestructibleAlert";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import BackgroundWrapper from "@/components/BackgroundWrapper";

const CategoriesPage = () => {
  const router = useRouter();
  const { height: screenHeight } = Dimensions.get("window");
  const scaledHeight = screenHeight * 0.19;
  return (
    <BackgroundWrapper>
      <View>
        <Header
          examDuration={null}
          displaySubject={"Categories"}
          displayUser={false}
        />
        <View className="gap-4 pt-7 mx-10">
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
              <Text className="text-lg font-montMedium text-[#113768]">
                Topic Test
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="justify-center items-center border-2 border-[#c5dbf8] w-[48%] rounded-[25] "
              style={{ height: scaledHeight }}
              onPress={() => router.push("/unit")}
            >
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
            <TouchableOpacity
              disabled
              className="justify-center items-center border-2 border-[#c5dbf8] w-[48%] rounded-[25] opacity-50"
              style={{ height: scaledHeight }}
            >
              <Image
                source={require("@/assets/images/icons/past-paper.png")}
                style={{ width: 70, height: 70 }}
              />
              <Text className="text-lg font-montMedium text-[#113768]">
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
              <Text className="text-lg font-montMedium text-[#113768]">
                Subject Test
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BackgroundWrapper>
  );
};

export default CategoriesPage;
