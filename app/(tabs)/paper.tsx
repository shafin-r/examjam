import {
  View,
  Text,
  Button,
  ScrollView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import DestructibleAlert from "@/components/DestructibleAlert";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import CustomBackHandler from "@/components/CustomBackHandler";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/auth";

export default function PaperScreen() {
  const { name } = useLocalSearchParams();
  const router = useRouter();

  const [questions, setQuestions] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [componentKey, setComponentKey] = useState(0);
  async function fetchMocks() {
    try {
      const questionResponse = await fetch(`${API_URL}/mocks`, {
        method: "GET",
      });
      const fetchedQuestionData = await questionResponse.json();
      console.log(fetchedQuestionData.id);
      setQuestions(fetchedQuestionData);
    } catch (error) {
      setErrorMsg(error);
    }
  }

  useEffect(() => {
    fetchMocks();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);

    fetchMocks();
    setComponentKey((prevKey) => prevKey + 1);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  if (errorMsg) {
    return (
      <BackgroundWrapper>
        <View className="h-screen">
          <Header
            displaySubject={name}
            displayTabTitle={null}
            displayUser={false}
          />
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View className="mt-5 px-5">
              <DestructibleAlert text={errorMsg} extraStyles={""} />
            </View>
          </ScrollView>
          <CustomBackHandler fallbackRoute={"unit"} />
        </View>
      </BackgroundWrapper>
    );
  }
  return (
    <BackgroundWrapper>
      <View>
        <Header
          displayTabTitle={null}
          displayUser={false}
          displaySubject={name}
        />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          className="mx-10 pt-10"
        >
          <View
            className={`  "border-[1px] border-[#c0dafc] gap-4 h-fit w-full rounded-[25] p-6"

            `}
          >
            {questions ? (
              questions.map((mock) => (
                <View key={mock.id}>
                  <TouchableOpacity
                    onPress={() =>
                      router.push(
                        `/exam/pretest?unitname=${name}&id=${mock.id}&title=${mock.title}&rating=${mock.rating}`
                      )
                    }
                    className="border-2 border-[#B0C2DA] py-4 rounded-[10] px-6 gap-2"
                  >
                    <Text className="text-xl font-montMedium">
                      {mock.title}
                    </Text>
                    <Text className="text-md font-montRegular">
                      Rating: {mock.rating} / 10
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <ActivityIndicator size={"large"} />
            )}
          </View>
        </ScrollView>
      </View>
      <CustomBackHandler fallbackRoute="unit" useCustomHandler={false} />
    </BackgroundWrapper>
  );
}
