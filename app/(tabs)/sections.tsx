import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Header from "@/components/Header";
import DestructibleAlert from "@/components/DestructibleAlert";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

const SectionsPage = () => {
  const router = useRouter();
  return (
    <View>
      <Header
        examDuration={null}
        displaySubject={null}
        displayTabTitle="Categories"
        displayUser={false}
      />
      <View className="gap-4 pt-7 mx-10">
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
  );
};

export default SectionsPage;
