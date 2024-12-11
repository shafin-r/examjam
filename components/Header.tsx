import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { useTimer } from "@/context/TimerContext";

interface HeaderProps {
  name?: string | undefined | null;
  image?: any | undefined;
  displayUser?: boolean;
  displaySubject?: string | string[] | undefined | null;
  displayTabTitle: string | undefined | null;
  examDuration?: string | string[] | null;
}

const Header = ({
  name,
  image,
  displayUser,
  displaySubject,
  displayTabTitle,
  examDuration,
}: HeaderProps) => {
  const router = useRouter();
  const [totalSeconds, setTotalSeconds] = useState(parseInt(examDuration) * 60);
  const { timeRemaining, stopTimer } = useTimer();

  useEffect(() => {
    const timer = setInterval(() => {
      setTotalSeconds((prev) => {
        if (prev <= 0) {
          clearInterval(timer); // Stop the timer when it reaches zero
          return 0;
        }
        return prev - 1; // Decrease the total seconds by 1
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, []);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const showExitDialog = () => {
    Alert.alert(
      "Quit exam?",
      "Are you sure you want to quit the exam?",
      [
        {
          text: "No",
          onPress: () => console.log(),
          style: "cancel", // Optional for iOS
        },
        {
          text: "Yes",
          onPress: () => {
            stopTimer();
            router.push("/category");
          },
        },
      ],
      { cancelable: false } // Prevent closing the dialog by tapping outside (optional)
    );
  };

  return (
    <View style={styles.header}>
      {displayUser && (
        <View style={styles.profile}>
          <Image source={image} style={styles.profileImg} />
          <Text style={styles.text}>Hello, {name}</Text>
        </View>
      )}
      {displaySubject && (
        <View style={styles.profile}>
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.text}>{displaySubject}</Text>
        </View>
      )}
      {displayTabTitle && (
        <View style={styles.profile}>
          <Text style={styles.text}>{displayTabTitle}</Text>
        </View>
      )}
      {examDuration && (
        <View className="flex-row justify-between w-full items-center">
          <TouchableOpacity
            onPress={() => {
              showExitDialog();
            }}
          >
            <AntDesign name="arrowleft" size={30} color="white" />
          </TouchableOpacity>
          <View style={styles.timer}>
            <View className="items-center">
              <Text className="font-montMedium text-xl text-[#082E5E]">
                {String(hours).padStart(2, "0")}
              </Text>
              <Text className="font-montMedium text-sm">Hrs</Text>
            </View>
            <View className="items-center">
              <Text className="font-montMedium text-xl  text-[#082E5E]">
                {String(minutes).padStart(2, "0")}
              </Text>
              <Text className="font-montMedium text-sm">Mins</Text>
            </View>
            <View className="items-center">
              <Text className="font-montMedium text-xl  text-[#082E5E]">
                {String(seconds).padStart(2, "0")}
              </Text>
              <Text className="font-montMedium text-sm">Secs</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.push("/exam/modal")}>
            <Feather name="layers" size={30} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#113768",
    height: 130,
    width: "100%",
    paddingTop: 30,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
  },
  timer: {
    width: 167,
    height: 55,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    fontSize: 20,
    fontFamily: "Montserrat-Bold",
    color: "#fff",
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});

export default Header;
