import {
  View,
  Text,
  Button,
  ScrollView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import DestructibleAlert from "@/components/DestructibleAlert";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import CustomBackHandler from "@/components/CustomBackHandler";
import { useState } from "react";
import { API_URL } from "@/lib/auth";

const questions = {
  "A Unit (Science)": [
    { id: 1, title: "Mock Test 1", rating: 9 },
    { id: 2, title: "Mock Test 2", rating: 9 },
  ],
  "B Unit (Business Studies)": [
    { id: 1, title: "Mock Test 1", rating: 9 },
    { id: 2, title: "Mock Test 2", rating: 9 },
  ],
  "C Unit": [
    { id: 1, title: "Mock Test 1", rating: 9 },
    { id: 2, title: "Mock Test 2", rating: 9 },
    { id: 3, title: "Mock Test 3", rating: 9 },
  ],
};

export default function PaperScreen() {
  const { paper } = useLocalSearchParams();
  const router = useRouter();

  const [questions, setQuestions] = useState<Object | null>({
    "A Unit (Science)": [
      { id: 1, title: "Mock Test 1", rating: 9 },
      { id: 2, title: "Mock Test 2", rating: 9 },
    ],
    "B Unit (Business Studies)": [
      { id: 1, title: "Mock Test 1", rating: 9 },
      { id: 2, title: "Mock Test 2", rating: 9 },
    ],
    "C Unit (Humanities)": [
      { id: 1, title: "Mock Test 1", rating: 9 },
      { id: 2, title: "Mock Test 2", rating: 9 },
      { id: 3, title: "Mock Test 3", rating: 9 },
    ],
  });
  const [errorMsg, setErrorMsg] = useState<string | null>();
  const [refreshing, setRefreshing] = useState(false);
  const [componentKey, setComponentKey] = useState(0);

  // For Rafeed
  // fetch function for exam papers under a unit.
  const onRefresh = async () => {
    setRefreshing(true);
    async function fetchQuestions() {
      try {
        const questionResponse = await fetch(`${API_URL}/${paper}`, {
          method: "GET",
        });
        const fetchedQuestionData = await questionResponse.json();
        setQuestions(fetchedQuestionData);
      } catch (error) {
        setErrorMsg("Something went wrong. Please try again.");
      }
    }

    fetchQuestions();
    setComponentKey((prevKey) => prevKey + 1);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  if (!errorMsg) {
    return (
      <BackgroundWrapper>
        <View className="h-screen">
          <Header
            displaySubject={paper}
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
          <CustomBackHandler routeName={"category"} />
        </View>
      </BackgroundWrapper>
    );
  }

  const categoryQuestions = questions[paper] || [];
  return (
    <BackgroundWrapper>
      <View>
        <Header
          displayTabTitle={null}
          displayUser={false}
          displaySubject={paper}
        />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          className="mx-10 pt-10"
        >
          <View
            className={` ${
              categoryQuestions == questions[paper]
                ? "border-[1px] border-[#c0dafc] gap-4 h-fit w-full rounded-[25] p-6"
                : ""
            } `}
          >
            {categoryQuestions == questions[paper] ? (
              categoryQuestions.map((category) => (
                <View key={category.id}>
                  <TouchableOpacity
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
                </View>
              ))
            ) : (
              <DestructibleAlert text="There are no question papers." />
            )}
          </View>
        </ScrollView>
      </View>
      <CustomBackHandler routeName={"category"} />
    </BackgroundWrapper>
  );
}
