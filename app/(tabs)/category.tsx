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
const subjects = [
  {
    id: 1,
    name: "Maths",
    rating: 9,
  },
  {
    id: 2,
    name: "Biology",
    rating: 9,
  },
  {
    id: 3,
    name: "Physics",
    rating: 9,
  },
  {
    id: 4,
    name: "Accounting",
    rating: 9,
  },
  {
    id: 5,
    name: "Marketing",
    rating: 9,
  },
  {
    id: 6,
    name: "Economics",
    rating: 9,
  },
  {
    id: 7,
    name: "ICT",
    rating: 9,
  },
  {
    id: 8,
    name: "Engineering",
    rating: 9,
  },
];

const Category = () => {
  const router = useRouter();
  return (
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
                  <Text className="text-xl font-montMedium">
                    {subject.name}
                  </Text>
                  <Text className="text-md font-montRegular">
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
  );
};

export default Category;
