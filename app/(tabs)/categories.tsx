import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import React from "react";
import Header from "@/components/Header";
import DestructibleAlert from "@/components/DestructibleAlert";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import CustomBackHandler from "@/components/CustomBackHandler";

const CategoriesPage = () => {
  const router = useRouter();
  const { height: screenHeight } = Dimensions.get("window");
  const scaledHeight = screenHeight * 0.19;
  return (
    <BackgroundWrapper>
      <View>
        <Header
          examDuration={null}
          displaySubject={"Categories"}
          displayUser={false}
        />
        <View style={{ paddingHorizontal: 30 }}>
          <View style={styles.categoriesContainer}>
            <View style={styles.categoriesContainerRow}>
              <TouchableOpacity
                disabled
                style={[
                  styles.categoryButton,
                  { height: scaledHeight, opacity: 0.5 },
                ]}
              >
                <Image
                  source={require("@/assets/images/icons/topic-test.png")}
                  style={{ width: 70, height: 70 }}
                />
                <Text style={styles.categoryButtonText}>Topic Test</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/unit")}
                style={[styles.categoryButton, { height: scaledHeight }]}
              >
                <Image
                  source={require("@/assets/images/icons/mock-test.png")}
                  style={{ width: 70, height: 70 }}
                />
                <Text style={styles.categoryButtonText}>Mock Test</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.categoriesContainerRow}>
              <TouchableOpacity
                disabled
                style={[
                  styles.categoryButton,
                  { height: scaledHeight, opacity: 0.5 },
                ]}
              >
                <Image
                  source={require("@/assets/images/icons/past-paper.png")}
                  style={{ width: 62, height: 62 }}
                />
                <Text style={styles.categoryButtonText}>Past Papers</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled
                style={[
                  styles.categoryButton,
                  { height: scaledHeight, opacity: 0.5 },
                ]}
              >
                <Image
                  source={require("@/assets/images/icons/subject-test.png")}
                  style={{ width: 70, height: 70 }}
                />
                <Text style={styles.categoryButtonText}>Subject Test</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <CustomBackHandler fallbackRoute="home" useCustomHandler={false} />
    </BackgroundWrapper>
  );
};

export default CategoriesPage;

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingTop: 40,
  },
  scrollViewWrapper: {
    marginHorizontal: 35,
  },
  mainContentWrapper: {
    paddingTop: 25,
    gap: 35,
  },
  categoriesHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoriesHeaderText: {
    fontSize: 25,
    fontFamily: "Montserrat-Bold",
    color: "#113768",
  },
  categoriesContainer: {
    gap: 15,
    paddingTop: 25,
  },
  categoriesContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryButton: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#c5dbf8",
    width: "48%",
    borderRadius: 25,
  },
  categoryButtonText: {
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    color: "#113768",
  },
  leaderBoardWrapper: {
    gap: 20,
  },
  leaderBoardHeaderText: {
    fontSize: 25,
    fontFamily: "Montserrat-Bold",
    color: "#113768",
  },
  leaderBoardContainer: {
    borderWidth: 1,
    borderColor: "#c5dbf8",
    paddingVertical: 22,
    borderRadius: 20,
    paddingHorizontal: 15,
    gap: 15,
  },
  topThreeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topThreeContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#c5dbf8",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
