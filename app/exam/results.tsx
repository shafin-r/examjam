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

const ResultsPage = () => {
  const { answers } = useLocalSearchParams();
  console.log(answers);
  // Parse submitted answers
  const resultSheet = JSON.parse(answers);
  console.log(resultSheet); // e.g., { "1": ["B"], "2": ["A"] }

  // // Process results
  // const results = questionPaper.questions.map((question) => {
  //   const userAnswerKey = submittedAnswers[question.id]; // e.g., "B" or "C"
  //   const userAnswer = userAnswerKey ? question.options[userAnswerKey] : null;
  //   const isCorrect = userAnswer === question.correctAnswer;

  //   return {
  //     id: question.id,
  //     questionText: question.question,
  //     userAnswer,
  //     correctAnswer: question.correctAnswer,
  //     isCorrect,
  //     solution: question.solution,
  //     options: question.options,
  //   };
  // });

  // // Calculate total score
  // const score = results.filter((result) => result.isCorrect).length;
  // console.log(results);

  return (
    <BackgroundWrapper>
      <SafeAreaProvider>
        <SafeAreaView className="mx-10 mt-10 h-full gap-10 flex-1">
          <TouchableOpacity onPress={() => router.push("/unit")}>
            <AntDesign name="arrowleft" size={30} color="black" />
          </TouchableOpacity>

          <View className="flex-1">
            <ScrollView className="">
              <Text className="font-montBold text-3xl text-[#113768] text-center mb-6">
                {resultSheet.score < 30
                  ? "Try harder!"
                  : resultSheet.score < 70
                  ? "Getting Better"
                  : "You did great!"}
              </Text>
              <View className="h-[170] w-full border-2 rounded-[25] border-[#c1dcff] p-6 justify-center items-center gap-3">
                <Text className="font-montMedium text-2xl border-2 border-white/0">
                  Score:
                </Text>
                <View className="flex-row items-center gap-3 ">
                  <MaterialIcons
                    name="my-location"
                    size={60}
                    color="#113768"
                    className=""
                  />
                  <Text className="font-montBold text-[64px] text-[#113768] ">
                    {resultSheet.score}
                  </Text>
                </View>
              </View>
              <View className="mt-10">
                <Text className="font-montBold text-3xl text-[#113768]">
                  Solutions
                </Text>
                <View className="gap-6 mt-6">
                  {resultSheet.questions.map((question, idx) => (
                    <View
                      key={idx}
                      className="h-fit border-2 border-[#abd0ff] p-6 rounded-[20] gap-4"
                    >
                      <View className="gap-2">
                        <Text className="font-montMedium text-2xl">
                          {idx + 1}. {question.question}
                        </Text>
                        <View className="flex-row justify-between border-2 border-white/0">
                          <View></View>
                          <View
                            className={`px-4 rounded-xl border-2 border-white/0 ${
                              question.userAnswer === null
                                ? "bg-yellow-500"
                                : question.isCorrect
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          >
                            <Text className="text-white font-montBold">
                              {question.userAnswer === null
                                ? "Skipped"
                                : question.isCorrect
                                ? "Correct"
                                : "Incorrect"}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View>
                        {Object.entries(question.options).map(
                          ([key, option]) => (
                            <View
                              key={key}
                              className="flex-row border-2 border-white/0 items-center gap-4"
                            >
                              <Text
                                className={`text-md rounded-full px-1 items-center justify-center border-[1px] &
                          ${
                            question.userAnswer === key
                              ? "bg-[#113768] text-white"
                              : ""
                          }
                        }`}
                              >
                                {key.toUpperCase()}
                              </Text>
                              <Text className="text-xl font-montRegular">
                                {option}
                              </Text>
                            </View>
                          )
                        )}
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
                            {question.solution}
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
          onPress={() => router.push("/unit")}
        >
          <Text className="font-montBold text-white text-2xl">Next</Text>
        </TouchableOpacity>
        <CustomBackHandler routeName={"/unit"} />
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
