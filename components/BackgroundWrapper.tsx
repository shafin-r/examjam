import React from "react";
import { StyleSheet, ImageBackground, View } from "react-native";

const BackgroundWrapper = ({ children }) => {
  return (
    <ImageBackground
      source={require("@/assets/images/static/paper-background.png")} // Replace with your image path
      style={styles.background}
    >
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // Adjust image size: 'cover' or 'contain'
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0)", // Optional overlay
  },
});

export default BackgroundWrapper;
