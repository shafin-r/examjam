import { View, Text, Button, TouchableOpacity, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import DestructibleAlert from "@/components/DestructibleAlert";

const questionData = {
  1: {
    title: "Algebra Basics",
    metadata: {
      quantity: 2,
      type: "Multiple Choice Questions",
      duration: 1,
      marking: "1 mark off",
    },
  },
  2: {
    title: "Geometry Fundamentals",
    metadata: {
      quantity: 4,
      type: "One word question",
      duration: 10,
      marking: "1 mark off",
    },
  },
};

export default function PretestPage() {
  const router = useRouter();
  const { id, title, rating } = useLocalSearchParams();
  let paperMeta;

  const paper = questionData[id];
  if (paper) {
    paperMeta = paper.metadata;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="justify-between h-full">
        <ScrollView>
          {paper !== undefined ? (
            <View className="mx-10 mt-10 gap-6 pb-6">
              <TouchableOpacity onPress={() => router.push(`/category`)}>
                <AntDesign name="arrowleft" size={40} color="black" />
              </TouchableOpacity>
              <Text className="text-4xl font-montSemiBold text-[#113768]">
                {title}
              </Text>
              <Text className="text-xl font-montMedium text-[#113768]">
                Rating: {rating} / 10
              </Text>
              <View className="border-[1.5px] border-[#226DCE]/30 rounded-[25] gap-8 py-7 px-5">
                <View className="flex-row gap-5 items-center">
                  <AntDesign name="questioncircleo" size={40} color="#113768" />
                  <View className="gap-2">
                    <Text className="font-montBold text-4xl text-[#113768]">
                      {paperMeta.quantity}
                    </Text>
                    <Text className="font-montRegular text-xl">
                      {paperMeta.type}
                    </Text>
                  </View>
                </View>
                <View className="flex-row gap-5 items-center">
                  <AntDesign name="clockcircleo" size={40} color="#113768" />
                  <View className="gap-2">
                    <Text className="font-montBold text-4xl text-[#113768]">
                      {paperMeta.duration} mins
                    </Text>
                    <Text className="font-montRegular text-xl">Time Taken</Text>
                  </View>
                </View>
                <View className="flex-row gap-5 items-center">
                  <AntDesign name="closecircleo" size={40} color="#113768" />
                  <View className="gap-2">
                    <Text className="font-montBold text-4xl text-[#113768]">
                      {paperMeta.marking}
                    </Text>
                    <Text className="font-montRegular text-xl">
                      From each wrong answer
                    </Text>
                  </View>
                </View>
              </View>
              <View className="border-[1.5px] border-[#226DCE]/30 rounded-[25] gap-8 py-7 px-5">
                <Text className="text-xl font-montBold">Ready yourself!</Text>
                <View className="flex-row pr-4">
                  <Text className="mx-4">{`\u2022`}</Text>
                  <Text className="font-montRegular text-lg">
                    You must complete this test in one session - make sure your
                    internet connection is reliable.
                  </Text>
                </View>
                <View className="flex-row pr-4">
                  <Text className="mx-4">{`\u2022`}</Text>
                  <Text className="font-montRegular text-lg">
                    1 mark awarded for a correct answer. No negative marking
                    will be there for wrong answer.
                  </Text>
                </View>
                <View className="flex-row  pr-4">
                  <Text className="mx-4">{`\u2022`}</Text>
                  <Text className="font-montRegular text-lg">
                    The more you answer correctly, the better chance you have of
                    winning a badge.
                  </Text>
                </View>
                <View className="flex-row  pr-4">
                  <Text className="mx-4">{`\u2022`}</Text>
                  <Text className="font-montRegular text-lg">
                    If you don't earn a badge this time, you can retake this
                    test once more.
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View className="mt-60">
              <DestructibleAlert text="Paper not found." />
            </View>
          )}
        </ScrollView>

        <TouchableOpacity
          className="w-full bg-[#113768] h-[90] justify-center items-center border-2 border-white/0"
          onPress={() => {
            if (paper) {
              router.push(`/exam/${id}?time=${paperMeta.duration}`);
            } else {
              router.push("/category");
            }
          }}
        >
          <Text className="font-montBold text-white text-2xl">
            {paper ? "Start Test" : "Go Back"}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
