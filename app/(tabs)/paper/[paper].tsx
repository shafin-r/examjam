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
import DestructibleAlert from "@/components/DestructibleAlert";

const questions = {
  Maths: [
    { id: 1, title: "Algebra Basics", rating: 9 },
    { id: 2, title: "Geometry Fundamentals", rating: 9 },
  ],
  Biology: [
    { id: 3, title: "The Human Mind", rating: 9 },
    { id: 4, title: "Brain", rating: 9 },
  ],
  Physics: [
    { id: 5, title: "Physics Introduction", rating: 9 },
    { id: 6, title: "Physics 101", rating: 9 },
  ],
};

export default function PaperScreen() {
  const { paper } = useLocalSearchParams();
  const router = useRouter();

  const categoryQuestions = questions[paper] || [];
  return (
    <View>
      <Header
        displayTabTitle={null}
        displayUser={false}
        title=""
        image={""}
        displaySubject={paper}
      />
      <View className="mx-10 pt-10">
        <View
          className={` ${
            categoryQuestions == questions[paper]
              ? "border-[1px] border-[#c0dafc] gap-4 h-fit w-full rounded-[25] p-6"
              : ""
          } `}
        >
          {categoryQuestions == questions[paper] ? (
            categoryQuestions.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() =>
                  router.push(
                    `/exam/pretest?id=${category.id}&title=${category.title}&rating=${category.rating}`
                  )
                }
                className="border-2 border-[#B0C2DA] py-4 rounded-[10] px-6 gap-2"
              >
                <Text className="text-xl font-montMedium">
                  {category.title}
                </Text>
                <Text className="text-md font-montRegular">
                  Rating: {category.rating} / 10
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <DestructibleAlert text="There are no question papers." />
          )}
        </View>
      </View>
    </View>
  );
}

{
  /* <View className="">
                <ActivityIndicator size="large" />
                <Text className="font-montBold text-2xl text-center">
                  Loading...
                </Text>
              </View> */
}
