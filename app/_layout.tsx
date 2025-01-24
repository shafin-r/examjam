import { Stack } from "expo-router";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import "../global.css";
import { useEffect } from "react";
import { TimerProvider } from "@/context/TimerContext";
import { AuthProvider } from "@/context/AuthContext";
import { Text } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Montserrat-Black": require("@/assets/fonts/Montserrat-Black.ttf"),
    "Montserrat-BlackItalic": require("@/assets/fonts/Montserrat-BlackItalic.ttf"),
    "Montserrat-Bold": require("@/assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-BoldItalic": require("@/assets/fonts/Montserrat-BoldItalic.ttf"),
    "Montserrat-ExtraBold": require("@/assets/fonts/Montserrat-ExtraBold.ttf"),
    "Montserrat-ExtraBoldItalic": require("@/assets/fonts/Montserrat-ExtraBoldItalic.ttf"),
    "Montserrat-ExtraLight": require("@/assets/fonts/Montserrat-ExtraLight.ttf"),
    "Montserrat-ExtraLightItalic": require("@/assets/fonts/Montserrat-ExtraLightItalic.ttf"),
    "Montserrat-Italic": require("@/assets/fonts/Montserrat-Italic.ttf"),
    "Montserrat-Light": require("@/assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-LightItalic": require("@/assets/fonts/Montserrat-LightItalic.ttf"),
    "Montserrat-Medium": require("@/assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-MediumItalic": require("@/assets/fonts/Montserrat-MediumItalic.ttf"),
    "Montserrat-Regular": require("@/assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("@/assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-SemiBoldItalic": require("@/assets/fonts/Montserrat-SemiBoldItalic.ttf"),
    "Montserrat-Thin": require("@/assets/fonts/Montserrat-Thin.ttf"),
    "Montserrat-ThinItalic": require("@/assets/fonts/Montserrat-ThinItalic.ttf"),
  });

  useEffect(() => {
    (async () => {
      if (fontsLoaded || fontError) {
        try {
          await SplashScreen.hideAsync();
        } catch (e) {
          console.error("Failed to hide splash screen:", e);
        }
      }
    })();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded) {
    if (fontError) {
      return (
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Failed to load fonts: {fontError.message}
        </Text>
      );
    }
    return null;
  }

  return (
    <AuthProvider>
      <TimerProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="exam" options={{ headerShown: false }} />
        </Stack>
      </TimerProvider>
    </AuthProvider>
  );
}
