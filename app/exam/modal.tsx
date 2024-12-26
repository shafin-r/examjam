// screens/SlidingModal.js
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const SlidingModal = () => {
  const router = useRouter(); // Use useRouter for navigation
  const translateX = useRef(new Animated.Value(width)).current; // Start off-screen to the right

  useEffect(() => {
    // Animate the modal in when the screen mounts
    Animated.timing(translateX, {
      toValue: 45, // Slide in
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const closeModal = () => {
    // Animate the modal out and go back to the previous screen
    Animated.timing(translateX, {
      toValue: width, // Slide out
      duration: 300,
      useNativeDriver: true,
    }).start(() => router.back()); // Use router.back() to navigate back
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Overlay */}
        <Pressable style={styles.overlay} onPress={closeModal} />

        {/* Sliding Modal */}
        <Animated.View style={[styles.modal, { transform: [{ translateX }] }]}>
          <View style={styles.paperInfo}>
            <Text style={styles.paperName}>Algebra Basics</Text>
            <View style={styles.paperDetails}>
              <Text style={styles.paperDetailsText}>Questions: 25</Text>
              <Text style={styles.paperDetailsText}>Answered: 2</Text>
              <Text style={styles.paperDetailsText}>Skipped: 23</Text>
            </View>
          </View>
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SlidingModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: width * 0.9,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    padding: 20,
  },
  paperInfo: {
    marginTop: 50,
  },
  paperName: {
    fontSize: 24,
    marginBottom: 10,
    fontFamily: "Montserrat-Medium",
  },
  paperDetails: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#fff",
    justifyContent: "space-between",
    width: "90%",
  },
  paperDetailsText: {
    fontFamily: "Montserrat-Regular",
  },
  closeButton: {
    backgroundColor: "#D32F2F",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
