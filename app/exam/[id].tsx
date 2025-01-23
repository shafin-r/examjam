import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useCallback, useReducer } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { useTimer } from "@/context/TimerContext";
import CustomBackHandler from "@/components/CustomBackHandler";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import { API_URL } from "@/lib/auth";
import { getToken } from "@/lib/secure-store";

const QuestionItem = React.memo(
  ({ question, selectedAnswer, handleSelect }) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>
        {question.id}. {question.question}
      </Text>
      <View style={styles.optionsContainer}>
        {Object.entries(question.options).map(([key, value]) => (
          <TouchableOpacity
            key={key}
            style={
              selectedAnswer === key
                ? [styles.optionButton, styles.selectedOption]
                : styles.optionButton
            }
            onPress={() => handleSelect(question.id, key)}
          >
            <Text
              style={
                selectedAnswer === key
                  ? [styles.optionText, styles.selectedOptionText]
                  : styles.optionText
              }
            >
              {key.toUpperCase()}
            </Text>
            <Text style={styles.optionDescription}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
);

const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT_ANSWER":
      return { ...state, [action.questionId]: action.option };
    default:
      return state;
  }
};

export default function ExamPage() {
  const router = useRouter();
  const { id, time } = useLocalSearchParams();
  const { setInitialTime, stopTimer } = useTimer();

  const [questions, setQuestions] = useState(null);
  const [answers, dispatch] = useReducer(reducer, {});
  const [loading, setLoading] = useState(true);
  const [submissionLoading, setSubmissionLoading] = useState(false);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`${API_URL}/mock/${id}`, {
        method: "GET",
      });
      const data = await response.json();
      setQuestions(data.questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
    setInitialTime(Number(time));
  }, [id, time, setInitialTime]);

  const handleSelect = useCallback((questionId, option) => {
    dispatch({ type: "SELECT_ANSWER", questionId, option });
  }, []);

  const handleSubmit = async () => {
    stopTimer();
    setSubmissionLoading(true); // Stop the timer before submission

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

  if (submissionLoading) {
    return (
      <BackgroundWrapper>
        <SafeAreaProvider>
          <Header examDuration={time} displayTabTitle={null} />
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#113768" />
            <Text
              style={[
                styles.submitText,
                { color: "#000", textAlign: "center" },
              ]}
            >
              Submitting...
            </Text>
          </View>
        </SafeAreaProvider>
      </BackgroundWrapper>
    );
  }

  return (
    <BackgroundWrapper>
      <SafeAreaProvider>
        <Header examDuration={time} displayTabTitle={null} />
        <View style={styles.container}>
          {loading ? (
            <ActivityIndicator size="large" color="#113768" />
          ) : (
            <FlatList
              data={questions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <QuestionItem
                  question={item}
                  selectedAnswer={answers[item.id]}
                  handleSelect={handleSelect}
                />
              )}
              contentContainerStyle={styles.listContentContainer}
            />
          )}
          <TouchableOpacity style={styles.bottomButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <CustomBackHandler />
      </SafeAreaProvider>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  questionContainer: {
    borderWidth: 1,
    borderColor: "#8abdff",
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  optionsContainer: {},
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 6,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "transparent",
  },
  selectedOption: {
    backgroundColor: "#",
  },
  optionText: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 25,
    textAlign: "center",
    borderWidth: 1,
  },
  selectedOptionText: {
    color: "white",
    backgroundColor: "#113768",
  },
  optionDescription: {
    fontSize: 16,
  },
  bottomButton: {
    width: "100%",
    backgroundColor: "#113768",
    height: 78,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0)",
  },
  submitText: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
  },
  listContentContainer: {
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
});
