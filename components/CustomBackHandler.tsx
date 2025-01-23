import React, { useEffect } from "react";
import { BackHandler } from "react-native";
import { useRouter } from "expo-router";

type CustomBackHandlerProps = {
  fallbackRoute: string; // The route to navigate to when pressing back
};

const CustomBackHandler: React.FC<CustomBackHandlerProps> = ({
  fallbackRoute,
}) => {
  const router = useRouter();

  useEffect(() => {
    const onBackPress = () => {
      // Navigate to the fallback route
      router.replace(`/${fallbackRoute}`);
      return true; // Prevent default back behavior
    };

    // Registering the back press handler
    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    };
  }, [fallbackRoute, router]);

  return null;
};

export default CustomBackHandler;
