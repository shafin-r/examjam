import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import DestructibleAlert from "@/components/DestructibleAlert";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import CustomBackHandler from "@/components/CustomBackHandler";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/auth";

// For Rafeed
// Remove this when the fetch function is established

export default function PretestPage() {
  const router = useRouter();
  const { id, title, rating } = useLocalSearchParams();
  const [metadata, setMetadata] = useState();
  async function fetchQuestions() {
    try {
      const questionResponse = await fetch(`${API_URL}/mock/${id}`, {
        method: "GET",
      });
      const fetchedMetadata = await questionResponse.json();
      setMetadata(fetchedMetadata);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <BackgroundWrapper>
      <SafeAreaProvider>
        <SafeAreaView className="justify-between h-full">
          <ScrollView>
            {metadata ? (
              <View className="mx-10 mt-10 gap-6 pb-6">
                <TouchableOpacity onPress={() => router.push(`/category`)}>
                  <AntDesign name="arrowleft" size={30} color="black" />
                </TouchableOpacity>
                <Text className="text-4xl font-montSemiBold text-[#113768]">
                  {title}
                </Text>
                <Text className="text-xl font-montMedium text-[#113768]">
                  Rating: {rating} / 10
                </Text>
                <View className="border-[1.5px] border-[#226DCE]/30 rounded-[25] gap-8 py-7 px-5">
                  <View className="flex-row gap-5 items-center">
                    <AntDesign
                      name="questioncircleo"
                      size={40}
                      color="#113768"
                    />
                    <View className="gap-2">
                      <Text className="font-montBold text-4xl text-[#113768]">
                        {metadata.metadata.quantity}
                      </Text>
                      <Text className="font-montRegular text-lg">
                        {metadata.metadata.type}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row gap-5 items-center">
                    <AntDesign name="clockcircleo" size={40} color="#113768" />
                    <View className="gap-2">
                      <Text className="font-montBold text-4xl text-[#113768]">
                        {metadata.metadata.duration} mins
                      </Text>
                      <Text className="font-montRegular text-lg">
                        Time Taken
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row gap-5 items-center">
                    <AntDesign name="closecircleo" size={40} color="#113768" />
                    <View className="gap-2">
                      <Text className="font-montBold text-4xl text-[#113768]">
                        {metadata.metadata.marking}
                      </Text>
                      <Text className="font-montRegular text-lg">
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
                      You must complete this test in one session - make sure
                      your internet connection is reliable.
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
                      The more you answer correctly, the better chance you have
                      of winning a badge.
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
                <ActivityIndicator />
              </View>
            )}
          </ScrollView>

          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => {
              if (metadata) {
                router.push(`/exam/${id}?time=${metadata.metadata.duration}`);
              } else {
                router.push("/unit");
              }
            }}
          >
            <Text className="font-montBold text-white text-2xl">
              {metadata ? "Start Test" : "Go Back"}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
        <StatusBar style="dark" />
      </SafeAreaProvider>
      <CustomBackHandler routeName={"/unit"} />
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  bottomButton: {
    width: "100%",
    backgroundColor: "#113768",
    height: 78,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0)",
  },
});
