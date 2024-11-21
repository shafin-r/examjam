import { View, Text } from "react-native";
import React from "react";

const Header = ({ title, image }: { title: string; image: string }) => {
  return (
    <View className="bg-[#113768] h-40 w-full">
      <Text className="text-7xl">Hello, {title}</Text>
    </View>
  );
};

export default Header;
