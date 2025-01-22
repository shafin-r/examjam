import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Header from "@/components/Header";
import { useRouter } from "expo-router";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import { StatusBar } from "expo-status-bar";
import CustomBackHandler from "@/components/CustomBackHandler";
const units = [
  {
    id: 3,
    name: "C Unit (Humanities)",
    rating: 9,
  },
];

const UnitPage = () => {
  const router = useRouter();

  return (
    <BackgroundWrapper>
      <View className="flex-1">
        <Header
          displayExamInfo={null}
          displayTabTitle={"Units"}
          displaySubject={null}
          displayUser={false}
          title=""
          image={""}
        />
        <View className="flex-1">
          <ScrollView className="">
            <View className="border-[1px] border-[#c0dafc] gap-4 h-fit rounded-[25] p-6 mx-10 mt-10">
              {units ? (
                units.map((unit) => (
                  <TouchableOpacity
                    key={unit.id}
                    disabled={
                      unit.name === "A Unit (Science)" ||
                      unit.name === "B Unit (Business Studies)"
                    }
                    onPress={() =>
                      router.push({
                        pathname: "/paper",
                        params: {
                          name: unit.name, // Specify the key and value correctly
                        },
                      })
                    }
                    className={`border-2 border-[#B0C2DA] py-4 rounded-[10] px-6 gap-2 ${
                      (unit.name === "A Unit (Science)" ||
                        unit.name === "B Unit (Business Studies)") &&
                      "opacity-50"
                    }`}
                  >
                    <Text className="text-lg font-montMedium">{unit.name}</Text>
                    <Text className="text-sm font-montRegular">
                      Rating: {unit.rating} / 10
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                <View className="">
                  <ActivityIndicator size="large" />
                  <Text className="font-montBold text-2xl text-center">
                    Loading...
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
      <StatusBar style="light" />
      <CustomBackHandler routeName={"home"} />
    </BackgroundWrapper>
  );
};

export default UnitPage;
