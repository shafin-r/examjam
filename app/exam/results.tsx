import { useLocalSearchParams, useSearchParams } from "expo-router";
import { View, Text, FlatList, StyleSheet } from "react-native";

// Question papers data
const questionPapers = {
  1: {
    title: "Algebra Basics",
    metadata: [
      {
        quantity: 2,
        duration: 15,
        type: "Multiple Choice Questions",
        marking: "1 mark off",
      },
    ],
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
    ],
  },
  2: {
    title: "Geometry Fundamentals",
    metadata: [
      {
        quantity: 2,
        duration: 15,
        type: "Multiple Choice Questions",
        marking: "1 mark off",
      },
    ],
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
          A: "Square",
          B: "Rectangle",
          C: "Triangle",
          D: "Circle",
        },
        correctAnswer: "Square",
      },
    ],
  },
};

const ResultsPage = () => {
  const { id, answers } = useLocalSearchParams();

  // Parse submitted answers
  const submittedAnswers = JSON.parse(answers); // e.g., { "1": ["B"], "2": ["A"] }

  // Get the specific question paper
  const questionPaper = questionPapers[id];

  // Process results
  const results = questionPaper.questions.map((question) => {
    const userAnswerKey = submittedAnswers[question.id]; // e.g., "B" or "C"
    const userAnswer = userAnswerKey ? question.options[userAnswerKey] : null;
    const isCorrect = userAnswer === question.correctAnswer;

    return {
      questionText: question.question,
      userAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect,
    };
  });

  // Calculate total score
  const score = results.filter((result) => result.isCorrect).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results for {questionPaper.title}</Text>
      <Text style={styles.score}>
        Score: {score} / {questionPaper.questions.length}
      </Text>

      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.result}>
            <Text style={styles.question}>{item.questionText}</Text>
            <Text style={styles.answer}>
              Your Answer: {item.userAnswer || "Not Answered"}
            </Text>
            <Text style={styles.correctAnswer}>
              Correct Answer: {item.correctAnswer}
            </Text>
            <Text
              style={{
                color: item.isCorrect ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {item.isCorrect ? "Correct" : "Wrong"}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  score: { fontSize: 18, marginBottom: 20 },
  result: { marginBottom: 20 },
  question: { fontWeight: "bold", fontSize: 16 },
  answer: { color: "blue" },
  correctAnswer: { color: "green" },
});

export default ResultsPage;
