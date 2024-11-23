import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";

const Header = ({
  title,
  image,
  displayUser,
  displaySubject,
  displayTabTitle,
  displayExamInfo,
}: {
  title: string | undefined;
  image: any | undefined;
  displayUser: boolean;
  displaySubject: null | string | string[] | undefined;
  displayTabTitle: string | undefined | null;
  displayExamInfo: string | null;
}) => {
  const router = useRouter();
  return (
    <View style={styles.header}>
      {displayUser && (
        <View style={styles.profile}>
          <Image source={image} style={styles.profileImg} />
          <Text style={styles.text}>Hello, {title}</Text>
        </View>
      )}
      {displaySubject && (
        <View style={styles.profile}>
          <TouchableOpacity onPress={() => router.push("/category")}>
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
      layer
      {displayExamInfo && (
        <View className="flex-row justify-between w-full">
          <AntDesign name="arrowleft" size={30} color="white" />
          <Text style={styles.text}>{displayExamInfo}</Text>
          <Feather name="layers" size={30} color="white" />
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
    marginBottom: 20,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
  },
  text: {
    color: "#fff",
    fontFamily: "Montserrat-ExtraBold",
    fontSize: 20,
  },
  profileImg: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});

export default Header;
