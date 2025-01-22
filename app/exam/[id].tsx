import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { useTimer } from "@/context/TimerContext";
import CustomBackHandler from "@/components/CustomBackHandler";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import { API_URL } from "@/lib/auth";
import { getToken } from "@/lib/secure-store";

export default function ExamPage() {
  const router = useRouter();
  const { id, time } = useLocalSearchParams();
  const { timeRemaining: currentTime, setInitialTime, stopTimer } = useTimer();
  const [questions, setQuestions] = useState(null);

  async function fetchQuestions() {
    try {
      const questionResponse = await fetch(`${API_URL}/mock/${id}`, {
        method: "GET",
      });
      const fetchedQuestions = await questionResponse.json();
      setQuestions(fetchedQuestions.questions);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, []); // Get the paper ID from the URL// Fetch the corresponding question paper
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(parseInt(time) * 60 * 100);

  let timer;

  useEffect(() => {
    if (timeRemaining) {
      setInitialTime(Number(time)); // Set initial time from params
    }
  }, [timeRemaining, setInitialTime]);

  const handleSelect = (questionId: number, option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option, // Store the selected option for the question
    }));
  };

  const handleSubmit = async () => {
    stopTimer(); // Stop the timer before submission

    const payload = {
      mock_id: id,
      data: answers,
    };

    try {
      const response = await fetch(`${API_URL}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(
          "Submission failed:",
          errorData.message || "Unknown error"
        );
        return;
      }

      const responseData = await response.json();
      console.log(responseData);

      router.push({
        pathname: `/exam/results`,
        params: {
          id,
          answers: JSON.stringify(responseData), // Submitted answers for display or analysis
        },
      });
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  return (
    <BackgroundWrapper>
      <SafeAreaProvider>
        <Header examDuration={time} />
        <View className="flex-1 pt-6">
          <ScrollView>
            <View className="mx-10 gap-10">
              {questions ? (
                questions.map((question) => (
                  <View
                    className="border-[1px] border-[#8abdff] rounded-[25] p-8 gap-6"
                    key={question.id}
                  >
                    <Text className="text-2xl font-montMedium pb-4">
                      {question.id}. {question.question}
                    </Text>
                    <View className="gap-2">
                      {Object.entries(question.options).map(([key, value]) => (
                        <TouchableOpacity
                          key={key}
                          className="flex-row border-2 border-white/0 items-center gap-4"
                          onPress={() => handleSelect(question.id, key)}
                        >
                          <Text
                            className={`text-md rounded-full px-1 items-center justify-center border-[1px] ${
                              (answers[question.id] || []).includes(key) &&
                              "bg-[#113768] text-white"
                            }`}
                          >
                            {key.toUpperCase()}
                          </Text>
                          <Text className="text-xl font-montRegular">
                            {value}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                ))
              ) : (
                <ActivityIndicator />
              )}
            </View>
          </ScrollView>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => handleSubmit()}
          >
            <Text className="font-montBold text-white text-2xl">Submit</Text>
          </TouchableOpacity>
        </View>
        <CustomBackHandler />
      </SafeAreaProvider>
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
