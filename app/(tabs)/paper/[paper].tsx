import {
  View,
  Text,
  Button,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";

const questions = {
  Maths: [
    { id: "1", title: "Algebra Basics", rating: 9 },
    { id: "2", title: "Geometry Fundamentals", rating: 9 },
  ],
  Biology: [
    { id: "3", title: "Physics Introduction", rating: 9 },
    { id: "4", title: "Chemistry Essentials", rating: 9 },
  ],
  Physics: [
    { id: "5", title: "World History", rating: 9 },
    { id: "6", title: "Medieval History", rating: 9 },
  ],
};

export default function PaperScreen() {
  const { paper } = useLocalSearchParams();
  const router = useRouter();

  const categoryQuestions = questions[paper] || [];
  return (
    <View>
      <Header displayUser={false} title="" image={""} displaySubject={paper} />
      <View className="mx-10">
        <View
          className={`border-[1px] ${
            categoryQuestions == questions[paper] ? "" : "bg-red-200"
          } border-[#c0dafc] gap-4 h-fit w-full mt-6 rounded-[25] p-6`}
        >
          {categoryQuestions == questions[paper] ? (
            categoryQuestions.map((category) => (
              <TouchableOpacity className="border-2 border-[#B0C2DA] py-4 rounded-[10] px-6 gap-2">
                <Text className="text-xl font-montMedium">
                  {category.title}
                </Text>
                <Text className="text-md font-montRegular">
                  Rating: {category.rating} / 10
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <View className="">
              <Text className="text-xl font-montBold text-center text-red-800">
                There are no question papers yet.
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
