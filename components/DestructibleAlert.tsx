import { View, Text } from "react-native";
import React from "react";

const DestructibleAlert = ({ text }: { text: string }) => {
  return (
    <View
      className="border-[1px] 
            bg-red-200
           border-[#c0dafc] rounded-[25] py-6"
    >
      <Text className="text-xl font-montBold text-center text-red-800">
        {text}
      </Text>
    </View>
  );
};

export default DestructibleAlert;
