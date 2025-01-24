import React, { useEffect, useCallback } from "react";
import { BackHandler } from "react-native";
import { useRouter } from "expo-router";

type CustomBackHandlerProps = {
  useCustomHandler: boolean; // Toggle between custom and fallback behavior
  customHandler?: () => void; // Custom function to execute on back press
  fallbackRoute?: string; // Fallback route if customHandler is not used
};

const CustomBackHandler: React.FC<CustomBackHandlerProps> = ({
  useCustomHandler,
  customHandler,
  fallbackRoute,
}) => {
  const router = useRouter();

  // Back press handler
  const onBackPress = useCallback(() => {
    console.log("Back button pressed.");
    if (useCustomHandler && customHandler) {
      console.log("Custom handler triggered");
      customHandler(); // Trigger custom behavior
    } else if (fallbackRoute) {
      console.log(`Navigating to fallbackRoute: ${fallbackRoute}`);
      router.replace(`/${fallbackRoute}`); // Navigate to fallback route
    }
    return true; // Prevent default behavior
  }, [useCustomHandler, customHandler, fallbackRoute, router]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    };
  }, [onBackPress]);

  return null;
};

export default CustomBackHandler;
