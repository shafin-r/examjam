import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { useTimer } from "@/context/TimerContext";
import CustomBackHandler from "@/components/CustomBackHandler";
import BackgroundWrapper from "@/components/BackgroundWrapper";

// Example data
const questionPapers = {
  1: {
    title: "বাংলা",
    metadata: {
      quantity: 12,
      type: "Multiple Choice Questions",
      duration: 30,
      marking: "1 mark off",
    },
    questions: [
      {
        id: 1,
        question: "‘শিশিরসিক্ত’ কোন সমাসের দৃষ্টান্ত?",
        type: "single",
        options: {
          A: "তৃতীয়া তৎপুরুষ",
          B: "ষষ্ঠী তৎপুরুষ",
          C: "অলুক তৎপুরুষ",
          D: "কর্ম তৎপুরুষ",
        },
        correctAnswer: "তৃতীয়া তৎপুরুষ",
      },
    ],
  },
};

export default function ExamPage() {
  const router = useRouter();
  const { id, time } = useLocalSearchParams();
  const { timeRemaining: currentTime, setInitialTime, stopTimer } = useTimer(); // Get the paper ID from the URL
  const paper = questionPapers[id];
  const questions = paper.questions; // Fetch the corresponding question paper
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(parseInt(time) * 60 * 100);

  let timer;

  useEffect(() => {
    if (timeRemaining) {
      setInitialTime(Number(time)); // Set initial time from params
    }
  }, [timeRemaining, setInitialTime]);

  const handleSelect = (questionId, option) => {
    const question = questions.find((q) => q.id === questionId);

    if (question.type === "single") {
      // Single-select logic: store only one answer per question
      setAnswers((prev) => ({
        ...prev,
        [questionId]: [option],
      }));
    } else if (question.type === "multiple") {
      // Multiple-select logic: toggle options in an array
      setAnswers((prev) => {
        const currentAnswers = prev[questionId] || [];
        if (currentAnswers.includes(option)) {
          // Remove if already selected
          return {
            ...prev,
            [questionId]: currentAnswers.filter((item) => item !== option),
          };
        } else {
          // Add if not selected
          return { ...prev, [questionId]: [...currentAnswers, option] };
        }
      });
    }
  };

  const handleSubmit = () => {
    stopTimer();
    // For Rafeed
    // Retrieve the current exam questions based on the `id`
    const currentExam = questionPapers[id];

    // For Rafeed
    // Prepare the data to be passed to the results page
    const examData = currentExam.questions.map((question) => ({
      id: question.id,
      questionText: question.question,
      options: question.options,
      correctAnswer: question.correctAnswer,
    }));

    // Include both the submitted answers and the options in the navigation
    router.push({
      pathname: `/exam/results`,
      params: {
        id,
        answers: JSON.stringify(answers), // Submitted answers
        examData: JSON.stringify(examData), // Questions and options
      },
    });
  };

  return (
    <BackgroundWrapper>
      <SafeAreaProvider>
        <Header examDuration={time} />
        <View className="flex-1 pt-6">
          <ScrollView>
            <View className="mx-10 gap-10">
              {questions.map((question) => (
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
                          {key}
                        </Text>
                        <Text className="text-xl font-montRegular">
                          {value}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}
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
