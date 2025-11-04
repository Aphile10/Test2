import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";

export default function Signup() {
  const router = useRouter();
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert("Missing info", "Please enter both email and password.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Sign Up Successful!");
      router.replace("/onboarding");
    } catch (error) {
      console.error("Signup Error:", error);
      Alert.alert("Signup Failed", error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("Google Sign-in Successful");
      router.replace("/onboarding");
    } catch (error) {
      console.error(error);
      Alert.alert("Google Sign-in failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.signupBtn} onPress={handleSignup}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/forgotpassword")}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleSignup}>
        <Image
          source={require("../../assets/Materials/05-Sign up Page/google 1.png")}
          style={styles.icon}
        />
        <Text style={styles.socialText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.appleBtn} onPress={() => Alert.alert("Apple Sign-in Coming Soon")}>
        <Image
          source={require("../../assets/Materials/05-Sign up Page/vuesax_bold_apple.png")}
          style={[styles.icon, { tintColor: "#fff" }]}
        />
        <Text style={[styles.socialText, { color: "#fff" }]}>Continue with Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.forgotText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 30,
    color: "#017601ff", 
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  signupBtn: {
    backgroundColor: "#017601ff", 
    paddingVertical: 12,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  signupText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  forgotText: {
    color: "#017601ff",
    fontWeight: "600",
    marginTop: 10,
  },
  orText: {
    marginVertical: 15,
    fontWeight: "500",
    color: "#555",
  },
  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 10,
    width: "100%",
    justifyContent: "center",
    marginBottom: 10,
  },
  appleBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 10,
    paddingVertical: 10,
    width: "100%",
    justifyContent: "center",
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 10,
    resizeMode: "contain",
  },
  socialText: {
    fontWeight: "600",
    color: "#000",
  },
});
