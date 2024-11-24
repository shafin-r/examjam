import { Link, router, useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as React from "react";

export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaProvider>
      <SafeAreaView className="mx-10 h-full">
        <View className="h-full justify-around pt-10">
          <View>
            <Image
              source={require("@/assets/images/logo/logo.png")}
              style={styles.logo}
            />
          </View>
          <Image
            source={require("@/assets/images/static/login-graphic-1.png")}
            style={styles.login}
          />
          <View className="gap-4 ">
            <TouchableOpacity
              onPress={() => router.push("/home")}
              className="w-full h-14 justify-center items-center border-2 border-[#113768] rounded-full"
            >
              <Text className="font-montMedium">Continue with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-full h-14 justify-center items-center border-2 border-[#113768] rounded-full">
              <Text className="font-montMedium">Continue with Facebook</Text>
            </TouchableOpacity>
            <Text className="font-montMedium text-center">
              Don't have an account?{" "}
              <Link href="/">
                <Text className="text-[#276ac0] ">Register here</Text>
              </Link>
            </Text>
          </View>
        </View>
      </SafeAreaView>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 90,
  },
  login: {
    width: "100%",
    height: "50%",
  },
});
