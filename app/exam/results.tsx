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
import { BackHandler } from "react-native";
import CustomBackHandler from "@/components/CustomBackHandler";
import BackgroundWrapper from "@/components/BackgroundWrapper";

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
        solution: "This is the solution for 1",
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
        solution: "This is the solution for 2",
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
        solution: "This is the solution for 3",
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
        solution: "This is the solution for 3",
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
        solution: "This is the solution for 3",
      },
    ],
  },
  3: {
    title: "Physics Basics",
    questions: [
      {
        id: 1,
        question: "What is the SI unit of force?",
        type: "single",
        options: {
          A: "Newton",
          B: "Joule",
          C: "Pascal",
          D: "Watt",
        },
        correctAnswer: "Newton",
        solution: "This is the solution for 3",
      },
      {
        id: 2,
        question: "What is the speed of light in vacuum?",
        type: "single",
        options: {
          A: "300,000 km/s",
          B: "150,000 km/s",
          C: "3,000 km/s",
          D: "30,000 km/s",
        },
        correctAnswer: "300,000 km/s",
        solution: "This is the solution for 3",
      },
      {
        id: 3,
        question: "What is the formula for calculating force?",
        type: "single",
        options: {
          A: "F = m/a",
          B: "F = ma",
          C: "F = m + a",
          D: "F = m - a",
        },
        correctAnswer: "F = ma",
        solution: "This is the solution for 3",
      },
    ],
  },
  4: {
    title: "History Essentials",
    questions: [
      {
        id: 1,
        question: "Who was the first President of the United States?",
        type: "single",
        options: {
          A: "Thomas Jefferson",
          B: "George Washington",
          C: "Abraham Lincoln",
          D: "John Adams",
        },
        correctAnswer: "George Washington",
        solution: "This is the solution for 3",
      },
      {
        id: 2,
        question: "In which year did World War II end?",
        type: "single",
        options: {
          A: "1945",
          B: "1939",
          C: "1918",
          D: "1950",
        },
        correctAnswer: "1945",
        solution: "This is the solution for 3",
      },
      {
        id: 3,
        question: "Who discovered America in 1492?",
        type: "single",
        options: {
          A: "Christopher Columbus",
          B: "Ferdinand Magellan",
          C: "Vasco da Gama",
          D: "Amerigo Vespucci",
        },
        correctAnswer: "Christopher Columbus",
        solution: "This is the solution for 3",
      },
    ],
  },
  5: {
    title: "Math Advanced",
    questions: [
      {
        id: 1,
        question: "What is the derivative of x²?",
        type: "single",
        options: {
          A: "2x",
          B: "x",
          C: "x²",
          D: "1",
        },
        correctAnswer: "2x",
        solution: "This is the solution for 3",
      },
      {
        id: 2,
        question: "What is the integral of 1/x dx?",
        type: "single",
        options: {
          A: "ln(x) + C",
          B: "x²/2 + C",
          C: "1/x² + C",
          D: "C/x",
        },
        correctAnswer: "ln(x) + C",
        solution: "This is the solution for 3",
      },
      {
        id: 3,
        question: "What is the value of π (pi) to 2 decimal places?",
        type: "single",
        options: {
          A: "3.14",
          B: "3.15",
          C: "3.13",
          D: "3.16",
        },
        correctAnswer: "3.14",
        solution: "This is the solution for 3",
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
      id: question.id,
      questionText: question.question,
      userAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect,
      solution: question.solution,
      options: question.options,
    };
  });

  // Calculate total score
  const score = results.filter((result) => result.isCorrect).length;
  console.log(results);

  return (
    <BackgroundWrapper>
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
                            {result.solution}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => router.push("/category")}
        >
          <Text className="font-montBold text-white text-2xl">Next</Text>
        </TouchableOpacity>
        <CustomBackHandler />
      </SafeAreaProvider>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  solutionBorder: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#000",
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
});

export default ResultsPage;
