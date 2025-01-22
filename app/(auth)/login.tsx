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
import { login } from "@/lib/auth";
import DestructibleAlert from "@/components/DestructibleAlert";
import { useAuth } from "@/context/AuthContext";

const LoginScreen = () => {
  const router = useRouter();
  const { setToken } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  // For Rafeed
  // Function to login a user. I've kept it in a barebones form right now, but you can just call the login function from  /lib/auth.ts and pass on the form.
  const loginUser = async () => {
    try {
      await login(form, setToken); // Call the login function
      router.push("/home"); // Redirect on successful login
    } catch (error: any) {
      console.log(error);
      setError(error.message); // Handle error messages
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
                    title="Email Address"
                    value={form.email}
                    placeholder={"Enter your email address..."}
                    handleChangeText={(e) => setForm({ ...form, email: e })}
                  />
                  <FormField
                    title="Password"
                    value={form.password}
                    placeholder={"Enter a password"}
                    handleChangeText={(e) => setForm({ ...form, password: e })}
                  />
                </View>
                {error && <DestructibleAlert text={error} extraStyles={""} />}
                <TouchableOpacity
                  onPress={() => loginUser()}
                  style={styles.continue}
                >
                  <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.logInsteadText}>
                Don't have an account?{" "}
                <Link href="/register">
                  <Text style={styles.logInsteadLink}>Register here.</Text>
                </Link>
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaProvider>
    </BackgroundWrapper>
  );
};

export default LoginScreen;
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
    justifyContent: "center",
    gap: 40,
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
    fontFamily: "DMSans-Bold",
    letterSpacing: -4,
    fontSize: 40,
    color: "#0D47A1", // Adjusted color for "peak-950"
  },
  formContainer: {
    justifyContent: "space-between",
    gap: 40,
  },
  pickOptionText: {
    fontFamily: "DMSans-Medium",
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
    fontFamily: "DMSans-Medium",
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
