import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, Button, ScrollView } from "react-native";
import { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";

// Example data
const questionPapers = {
  1: {
    title: "Algebra Basics",
    metadata: [
      {
        quantity: 2,
        type: "Multiple Choice Questions",
        marking: "1 mark off",
      },
    ],
    questions: [
      {
        id: 1,
        question: "What is 2 + 2?",
        options: ["3", "4", "5"],
        correctAnswer: "4",
      },
      {
        id: 2,
        question: "Solve for x: 2x = 10",
        options: ["5", "6", "4"],
        correctAnswer: "5",
      },
    ],
  },
  2: {
    title: "Geometry Fundamentals",
    metadata: [
      {
        quantity: 2,
        type: "Multiple Choice Questions",
        marking: "1 mark off",
      },
    ],
    questions: [
      {
        id: 1,
        question: "What is the sum of angles in a triangle?",
        options: ["180°", "90°", "360°"],
        correctAnswer: "180°",
      },
      {
        id: 2,
        question: "Name the shape with four equal sides.",
        options: ["Square", "Rectangle", "Triangle"],
        correctAnswer: "Square",
      },
    ],
  },
};

export default function ExamPage() {
  const { id } = useLocalSearchParams(); // Get the paper ID from the URL
  const paper = questionPapers[id];
  const questions = paper.questions;
  console.log(questions); // Fetch the corresponding question paper
  const [answers, setAnswers] = useState({});

  if (!paper) {
    return (
      <View>
        <Text>Paper not found</Text>
      </View>
    );
  }

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = () => {
    console.log("Submitted answers:", answers);
    alert("Exam submitted!");
  };

  return (
    <SafeAreaProvider>
      <Header displayExamInfo="Time" />
      <SafeAreaView>
        <ScrollView>
          <View className="mx-10 gap-10">
            {questions.map((question) => (
              <View
                className="border-2 rounded-[25] p-8 gap-6"
                key={question.id}
              >
                <Text className="text-2xl font-montMedium">
                  {question.id}. {question.question}
                </Text>
                <View>
                  {question.options.map((option) => (
                    <Text key={option} className="text-xl">
                      {option}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
