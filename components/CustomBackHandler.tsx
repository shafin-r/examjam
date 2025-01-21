import React, { useEffect } from "react";
import { BackHandler, Alert } from "react-native";
import { useRouter, useSegments } from "expo-router";

const CustomBackHandler = ({ routeName }) => {
  const router = useRouter();
  const segments = useSegments(); // Tracks the current navigation segments (routes)

  useEffect(() => {
    const onBackPress = () => {
      if (segments.length > 1) {
        // If there's a previous route in the stack, navigate back
        router.replace(`/${routeName}`); // Adjust to navigate to your preferred route
        return true; // Prevent default behavior
      } else {
        // Show confirmation dialog or exit app
        Alert.alert(
          "Exit App",
          "Are you sure you want to exit the app?",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Exit", onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: true }
        );
        return true; // Prevent default behavior
      }
    };

    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  }, [segments, router]);

  return null;
};

export default CustomBackHandler;
