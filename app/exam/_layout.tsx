import { Stack } from "expo-router";
import React from "react";

export default function ExamLayout() {
  return (
    <Stack>
      <Stack.Screen name="pretest" options={{ headerShown: false }} />
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen name="results" options={{ headerShown: false }} />
    </Stack>
  );
}
