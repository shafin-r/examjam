import { Link, router, useRouter } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Image } from "expo-image";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import BackgroundWrapper from "@/components/BackgroundWrapper";

export default function Index() {
  const router = useRouter();

  const styles = StyleSheet.create({
    logo: {
      width: "100%",
      height: "100%",
    },
    logoContainer: {
      width: "100%", // Use percentage for responsiveness
      aspectRatio: 368 / 89, // Set aspect ratio (base width/height of your design)
      alignSelf: "center",
    },
    loginText: {
      fontFamily: "Montserrat-Medium",
    },
    login: {
      width: "100%",
      height: "50%",
    },
    continue: {
      width: "100%",
      height: 60,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#113768",
      borderRadius: 100,
    },
  });
  // Assuming 375 is the base width used in design
  return (
    <BackgroundWrapper>
      <SafeAreaProvider>
        <SafeAreaView className="mx-10 h-full">
          <View className="h-full justify-around pt-10">
            <View style={styles.logoContainer}>
              <Image
                source={require("@/assets/images/logo/logo.png")}
                style={styles.logo}
              />
            </View>
            <Image
              source={require("@/assets/images/static/login-graphic-1.png")}
              style={styles.login}
            />
            <View className="gap-4">
              <TouchableOpacity
                onPress={() => router.push("/login")}
                style={styles.continue}
              >
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
              <Text className="font-montMedium text-center">
                Don't have an account?{" "}
                <Link href="/register">
                  <Text className="text-[#276ac0] ">Register here</Text>
                </Link>
              </Text>
            </View>
          </View>
        </SafeAreaView>
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </BackgroundWrapper>
  );
}
