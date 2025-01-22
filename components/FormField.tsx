import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";

const FormField = ({
  title,
  placeholder,
  value,
  handleChangeText,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#999999"
          onChangeText={handleChangeText}
          secureTextEntry={
            (title === "Password" || title === "Confirm Password") &&
            !showPassword
          }
        />
        {(title === "Password" || title === "Confirm Password") && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.toggleText}>
              {showPassword ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    color: "#666666",
    fontFamily: "Montserrat-Medium",
    fontSize: 18,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  inputContainer: {
    height: 64,
    paddingHorizontal: 16,
    backgroundColor: "#D2DFF0", // Adjusted for "bg-peak-200"
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    color: "#0D47A1", // Adjusted for "text-peak-950"
    fontSize: 16,
  },
  toggleText: {
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
  },
});

export default FormField;
