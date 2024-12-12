import AntDesign from "@expo/vector-icons/AntDesign";
import { router, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Question papers data
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
  const { id, answers, examData } = useLocalSearchParams();

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
      options: question.options,
    };
  });

  // Calculate total score
  const score = results.filter((result) => result.isCorrect).length;
  console.log(results);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="mx-10 mt-10 h-full gap-10 flex-1">
        <TouchableOpacity onPress={() => router.push("/category")}>
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableOpacity>

        <View className="flex-1">
          <ScrollView className="">
            <Text className="font-montBold text-3xl text-[#113768] text-center mb-6">
              {(score / questionPaper.questions.length) * 100 < 30
                ? "Try harder!"
                : (score / questionPaper.questions.length) * 100 < 70
                ? "Getting Better"
                : "You did great!"}
            </Text>
            <View className="h-[170] w-full border-2 rounded-[25] border-[#c1dcff] p-6 justify-center items-center gap-3">
              <Text className="font-montMedium text-2xl border-2 border-white/0">
                Accuracy:
              </Text>
              <View className="flex-row items-center gap-3 ">
                <MaterialIcons
                  name="my-location"
                  size={60}
                  color="#113768"
                  className=""
                />
                <Text className="font-montBold text-[64px] text-[#113768] ">
                  {(
                    (score / questionPaper.questions.length) *
                    100
                  ).toLocaleString("en-US", {
                    maximumFractionDigits: 1,
                    minimumFractionDigits: 1,
                  })}
                  %
                </Text>
              </View>
            </View>
            <View className="mt-10">
              <Text className="font-montBold text-3xl text-[#113768]">
                Solutions
              </Text>
              <View className="gap-6 mt-6">
                {results.map((result, idx) => (
                  <View
                    key={idx}
                    className="h-fit border-2 border-[#abd0ff] p-6 rounded-[20] gap-4"
                  >
                    <View className="gap-2">
                      <Text className="font-montMedium text-2xl">
                        {idx + 1}. {result.questionText}
                      </Text>
                      <View className="flex-row justify-between border-2 border-white/0">
                        <View></View>
                        <View
                          className={`px-4 rounded-xl border-2 border-white/0 ${
                            result.userAnswer === null
                              ? "bg-yellow-500"
                              : result.isCorrect
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          <Text className="text-white font-montBold">
                            {result.userAnswer === null
                              ? "Skipped"
                              : result.isCorrect
                              ? "Correct"
                              : "Incorrect"}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View>
                      {Object.entries(result.options).map(([key, option]) => (
                        <View
                          key={key}
                          className="flex-row border-2 border-white/0 items-center gap-4"
                        >
                          <Text
                            className={`text-md rounded-full px-1 items-center justify-center border-[1px] &
                          ${
                            result.userAnswer === option
                              ? "bg-[#113768] text-white"
                              : ""
                          }
                        }`}
                          >
                            {key}
                          </Text>
                          <Text className="text-xl font-montRegular">
                            {option}
                          </Text>
                        </View>
                      ))}
                    </View>
                    <View
                      className="w-full"
                      style={styles.solutionBorder}
                    ></View>
                    <View>
                      <Text className="text-2xl font-montSemiBold text-[#000]/40">
                        Solution:
                      </Text>
                      <View>
                        <Text className="font-montRegular text-xl leading-10">
                          Let present age of A and B be 4x and 5x 18 years ago
                          their ages 4x - 18/5x - 18 = 11/16 Or, 64x - 288 = 55x
                          - 198 Or, 64x - 55x = -198 + 288 Or, 9x = 90 Or, x =
                          90/9 = 10 Sum of the present ages = 40 + 50 = 90 years
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>

        {/* <FlatList
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
      /> */}
      </SafeAreaView>
      <TouchableOpacity
        className="w-full bg-[#113768] h-[90] justify-center items-center border-2 border-white/0"
        onPress={() => router.push("/category")}
      >
        <Text className="font-montBold text-white text-2xl">Next</Text>
      </TouchableOpacity>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  solutionBorder: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#000",
  },
});

export default ResultsPage;
