import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

const LiveCalendar = () => {
  const router = useRouter();
  return (
    <View className="border-2 border-[#c5dbf8] w-full py-[24] rounded-[20] px-7 gap-4">
      <View className="flex-row border-2 border-white/0 items-center justify-between">
        <Text className="font-montMedium text-xl">This Week</Text>
        <TouchableOpacity onPress={() => router.push("/live")}>
          <AntDesign name="arrowright" size={24} color="#113768" />
        </TouchableOpacity>
      </View>
      <View
        className="w-full border-[#c5dbf8]"
        style={{ borderWidth: 1 }}
      ></View>
      <View className="flex-row justify-between  w-full">
        <View
          className="items-center gap-2  rounded-full"
          style={{
            paddingVertical: 6,
            paddingHorizontal: 10,
          }}
        >
          <Text className="font-montMedium text-xl">S</Text>
          <Text className="font-montMedium text-xl text-[#000]/40">1</Text>
        </View>
        <View
          className="items-center gap-2  rounded-full"
          style={{
            paddingVertical: 6,
            paddingHorizontal: 10,
          }}
        >
          <Text className="font-montMedium text-xl">M</Text>
          <Text className="font-montMedium text-xl text-[#000]/40">2</Text>
        </View>
        <View
          className="items-center gap-2 rounded-full"
          style={{
            backgroundColor: "red",

            paddingVertical: 6,
            paddingHorizontal: 10,
          }}
        >
          <Text className="font-montMedium text-xl text-white">T</Text>
          <Text className="font-montMedium text-xl text-white">3</Text>
        </View>
        <View
          className="items-center gap-2  rounded-full"
          style={{
            paddingVertical: 6,
            paddingHorizontal: 10,
          }}
        >
          <Text className="font-montMedium text-xl">W</Text>
          <Text className="font-montMedium text-xl text-[#000]/40">4</Text>
        </View>
        <View
          className="items-center gap-2  rounded-full"
          style={{
            paddingVertical: 6,
            paddingHorizontal: 10,
          }}
        >
          <Text className="font-montMedium text-xl">T</Text>
          <Text className="font-montMedium text-xl text-[#000]/40">5</Text>
        </View>
        <View
          className="items-center gap-2  rounded-full"
          style={{
            paddingVertical: 6,
            paddingHorizontal: 10,
          }}
        >
          <Text className="font-montMedium text-xl">F</Text>
          <Text className="font-montMedium text-xl text-[#000]/40">6</Text>
        </View>
        <View
          className="items-center gap-2  rounded-full"
          style={{
            paddingVertical: 6,
            paddingHorizontal: 10,
          }}
        >
          <Text className="font-montMedium text-xl">S</Text>
          <Text className="font-montMedium text-xl text-[#000]/40">7</Text>
        </View>
      </View>
    </View>
  );
};

export default LiveCalendar;
