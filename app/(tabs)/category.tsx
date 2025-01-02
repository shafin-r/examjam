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
const subjects = [
  {
    id: 1,
    name: "A Unit (Science)",
    rating: 9,
  },
  {
    id: 2,
    name: "B Unit (Business Studies)",
    rating: 9,
  },
  {
    id: 3,
    name: "C Unit (Humanities)",
    rating: 9,
  },
];

const Category = () => {
  const router = useRouter();
  return (
    <BackgroundWrapper>
      <View className="flex-1">
        <Header
          displayExamInfo={null}
          displayTabTitle={"Subjects"}
          displaySubject={null}
          displayUser={false}
          title=""
          image={""}
        />
        <View className="flex-1">
          <ScrollView className="">
            <View className="border-[1px] border-[#c0dafc] gap-4 h-fit rounded-[25] p-6 mx-10 mt-10">
              {subjects ? (
                subjects.map((subject) => (
                  <TouchableOpacity
                    key={subject.id}
                    onPress={() => router.push(`/paper/${subject.name}`)}
                    className="border-2 border-[#B0C2DA] py-4 rounded-[10] px-6 gap-2"
                  >
                    <Text className="text-lg font-montMedium">
                      {subject.name}
                    </Text>
                    <Text className="text-sm font-montRegular">
                      Rating: {subject.rating} / 10
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
    </BackgroundWrapper>
  );
};

export default Category;
