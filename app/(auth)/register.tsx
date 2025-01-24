import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import { Image } from "expo-image";
import FormField from "@/components/FormField";
import { register } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";
import DestructibleAlert from "@/components/DestructibleAlert";
const RegisterScreen = () => {
  const { setToken } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    institution: "",
    sscRoll: "",
    hscRoll: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleError = (error) => {
    // Check if error has a "detail" property
    if (error?.detail) {
      // Match the field causing the issue
      const match = error.detail.match(/Key \((.*?)\)=\((.*?)\)/);

      if (match) {
        const field = match[1]; // The field name, e.g., "phone"
        const value = match[2]; // The duplicate value, e.g., "0987654321"
        return `The ${field} already exists. Please use a different value.`;
      }
    }
    return "An unexpected error occurred. Please try again.";
  };

  // Output: The phone field already exists with the value "0987654321". Please use a different value.
  console.log("I'm here");
  // Function to validate the form
  const validateForm = () => {
    const { sscRoll, hscRoll, password } = form;

    // Check if SSC Roll and HSC Roll are unique
    if (sscRoll === hscRoll) {
      return "SSC Roll and HSC Roll must be unique.";
    }

    // Check password requirements
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,16}$/;
    if (!passwordRegex.test(password)) {
      return "Password must be 8-16 characters long, include at least one uppercase letter and one special character.";
    }

    return null; // No errors
  };

  const createUser = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await register(form, setToken); // Call the register function
      router.push("/home"); // Redirect on successful registration
    } catch (error: any) {
      console.error("Error:", error.response || error.message);
      if (error.response?.detail) {
        const decodedError = handleError({ detail: error.response.detail });
        setError(decodedError);
      } else {
        setError(error.message || "An unexpected error occurred.");
      }
    }
  };

  return (
    <BackgroundWrapper>
      <SafeAreaProvider>
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.wrapper}>
              <View style={styles.logoContainer}>
                <Image
                  source={require("@/assets/images/logo/logo.png")}
                  style={styles.logo}
                />
              </View>
              <View style={styles.formContainer}>
                <View style={styles.registerForm}>
                  <FormField
                    title="Full name"
                    value={form.name}
                    handleChangeText={(e) => setForm({ ...form, name: e })}
                    placeholder=""
                  />
                  <FormField
                    title="Institution"
                    value={form.institution}
                    placeholder={"Enter a institution"}
                    handleChangeText={(e) =>
                      setForm({ ...form, institution: e })
                    }
                  />
                  <FormField
                    title="SSC Roll No."
                    value={form.sscRoll}
                    placeholder={"Enter your SSC Roll No."}
                    handleChangeText={(e) => setForm({ ...form, sscRoll: e })}
                  />
                  <FormField
                    title="HSC Roll No."
                    value={form.hscRoll}
                    placeholder={"Enter your HSC Roll No."}
                    handleChangeText={(e) => setForm({ ...form, hscRoll: e })}
                  />
                  <FormField
                    title="Email Address"
                    value={form.email}
                    placeholder={"Enter your email address..."}
                    handleChangeText={(e) => setForm({ ...form, email: e })}
                  />
                  <FormField
                    title="Phone Number"
                    value={form.phone}
                    placeholder={"Enter your phone number.."}
                    handleChangeText={(e) => setForm({ ...form, phone: e })}
                  />
                  <FormField
                    title="Password"
                    value={form.password}
                    placeholder={"Enter a password"}
                    handleChangeText={(e) => setForm({ ...form, password: e })}
                  />
                </View>
                {error && <DestructibleAlert text={error} />}
                <TouchableOpacity
                  onPress={() => createUser()}
                  style={styles.continue}
                >
                  <Text style={styles.loginText}>Get started</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.logInsteadText}>
                Already have an account?{" "}
                <Link href="/login">
                  <Text style={styles.logInsteadLink}>Login here</Text>
                </Link>
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaProvider>
    </BackgroundWrapper>
  );
};

export default RegisterScreen;
const styles = StyleSheet.create({
  logInsteadText: {
    fontFamily: "Montserrat-Medium",
    textAlign: "center",
    marginBottom: 70,
  },
  logInsteadLink: {
    color: "#276ac0",
  },
  scrollViewContent: {
    justifyContent: "space-between",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  logoContainer: {
    width: "100%", // Use percentage for responsiveness
    aspectRatio: 368 / 89, // Set aspect ratio (base width/height of your design)
    alignSelf: "center",
    marginTop: 30,
  },
  wrapper: {
    height: "100%",
    flexDirection: "column",
    marginTop: 30,
    justifyContent: "space-between",
    marginHorizontal: 25,
  },
  continue: {
    width: "100%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#113768",
    borderRadius: 100,
  },
  loginText: {
    fontFamily: "Montserrat-Medium",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  title: {
    fontFamily: "Montserrat-Bold",
    letterSpacing: -4,
    fontSize: 40,
    color: "#0D47A1", // Adjusted color for "peak-950"
  },
  formContainer: {
    justifyContent: "space-between",
    gap: 40,
  },
  pickOptionText: {
    fontFamily: "Montserrat-Medium",
    fontSize: 40,
    letterSpacing: -2,
  },
  registerForm: {
    flexDirection: "column",
    width: "100%",
    gap: 20,
  },
  socialButton: {
    backgroundColor: "#BBDEFB", // Adjusted color for "peak-200"
    width: "47%",
    minHeight: 140,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: {
    width: 64,
    height: 64,
  },
  emailButton: {
    width: "100%",
  },
  registerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  registerText: {
    fontFamily: "Montserrat-Medium",
    fontSize: 30,
    letterSpacing: -2,
    textAlign: "center",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#42A5F5", // Adjusted color for "peak-800"
    marginTop: 12,
  },
});
