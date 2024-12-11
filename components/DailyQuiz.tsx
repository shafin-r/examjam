import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";

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
        correctAnswer: "B",
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
        correctAnswer: "A",
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
        correctAnswer: "A",
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
        correctAnswer: "A",
      },
    ],
  },
};

export default function DailyQuiz() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState("");
  const fadeAnim = useRef(new Animated.Value(1)).current; // Animation state

  // Function to pick a random question
  const getRandomQuestion = () => {
    const paperIds = Object.keys(questionPapers);
    const randomPaperId = paperIds[Math.floor(Math.random() * paperIds.length)];
    const questions = questionPapers[randomPaperId].questions;
    const randomQuestion =
      questions[Math.floor(Math.random() * questions.length)];
    setSelectedQuestion(randomQuestion);
    setSelectedAnswer(null);
    setFeedback("");
  };

  // Handle answer selection
  const handleAnswer = (optionKey) => {
    setSelectedAnswer(optionKey);
    if (optionKey === selectedQuestion.correctAnswer) {
      setFeedback("Correct!");
    } else {
      setFeedback("Incorrect, try again!");
    }

    // Trigger fade-out, then load next question
    Animated.timing(fadeAnim, {
      toValue: 0, // Fade out
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      getRandomQuestion(); // Load new question
      Animated.timing(fadeAnim, {
        toValue: 1, // Fade in
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });
  };

  useEffect(() => {
    getRandomQuestion(); // Fetch a random question on mount
  }, []);

  if (!selectedQuestion) {
    return <Text>Loading...</Text>;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim, // Bind fade animation to opacity
        },
      ]}
    >
      {/* Question */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{selectedQuestion.question}</Text>
      </View>

      {/* Options */}
      {Object.entries(selectedQuestion.options).map(([key, value]) => (
        <TouchableOpacity
          key={key}
          onPress={() => handleAnswer(key)}
          style={[
            styles.optionButton,
            selectedAnswer === key && styles.selectedOption,
          ]}
        >
          <Text style={styles.optionKey}>{key}</Text>
          <Text style={styles.optionText}>{value}</Text>
        </TouchableOpacity>
      ))}

      {/* Feedback */}
      {feedback && (
        <Text
          style={styles.feedbackText}
          className={`${
            feedback === "Correct!" ? "text-green-600" : "text-red-600"
          }`}
        >
          {feedback}
        </Text>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#c5dbf8",
    width: "100%",
    paddingVertical: 24,
    borderRadius: 20,
    paddingHorizontal: 20,
    gap: 20,
  },
  questionContainer: {
    borderWidth: 1,
    borderColor: "#8abdff",
    borderRadius: 25,
    padding: 16,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 24,
    fontWeight: "600",
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 10,
  },
  selectedOption: {
    borderColor: "#113768",
  },
  optionKey: {
    backgroundColor: "#113768",
    color: "white",
    fontSize: 16,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  optionText: {
    fontSize: 18,
  },
  feedbackText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});
