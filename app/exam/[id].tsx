import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { useTimer } from "@/context/TimerContext";

// Example data
const questionPapers = {
  1: {
    title: "Algebra Basics",
    questions: [
      {
        id: 1,
        question: "What is 2 + 2?",
        type: "single",
        options: {
          A: "3",
          B: "4",
          C: "5",
          D: "6",
        },
        correctAnswer: "4",
      },
      {
        id: 2,
        question: "Solve for x: 2x = 10",
        type: "single",
        options: {
          A: "5",
          B: "6",
          C: "4",
          D: "10",
        },
        correctAnswer: "5",
      },
      {
        id: 3,
        question: "Solve for x: 2x = 10",
        type: "single",
        options: {
          A: "5",
          B: "6",
          C: "4",
          D: "10",
        },
        correctAnswer: "5",
      },
    ],
  },
  2: {
    title: "Geometry Fundamentals",
    questions: [
      {
        id: 1,
        question: "What is the sum of angles in a triangle?",
        type: "single",
        options: {
          A: "180",
          B: "90",
          C: "60",
          D: "45",
        },
        correctAnswer: "180°",
      },
      {
        id: 2,
        question: "Name the shape with four equal sides.",
        type: "single",
        options: {
          A: "square",
          B: "rectangle",
          C: "triangle",
          D: "circle",
        },
        correctAnswer: "Square",
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
    // Retrieve the current exam questions based on the `id`
    const currentExam = questionPapers[id];

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
                      <Text className="text-xl font-montRegular">{value}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        <TouchableOpacity
          className="w-full bg-[#113768] h-[90] justify-center items-center border-2 border-white/0"
          onPress={() => handleSubmit()}
        >
          <Text className="font-montBold text-white text-2xl">Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
}
