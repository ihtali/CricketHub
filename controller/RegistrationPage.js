import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { auth } from "../API/firebaseConfig";
import {  db } from "../API/firebaseConfig"; // Import Firebase auth & Firestore
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const RegistrationPage = ({ navigation }) => {
  const [clubName, setClubName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      console.log("User Registered:", user.uid, email, clubName); // Debugging log
  
      // Store club details in Firestore
      await setDoc(doc(db, "clubs", user.uid), {
        email: user.email,
        clubName: clubName,
        createdAt: serverTimestamp(),
      });
  
      console.log("Club registered successfully!");
  
      // Navigate to HomePage after successful registration
      navigation.replace("HomePage"); 
    } catch (error) {
      console.error("Registration failed:", error);
      setError(error.message);
    }
  };
  
  
  

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#0D47A1", "#1976D2"]} style={styles.gradient}>
        <Text style={styles.title}>Register Your Club</Text>

        <TextInput style={styles.input} placeholder="Club Name" value={clubName} onChangeText={setClubName} />
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("LoginPage")}>
          <Text style={styles.linkText}>Already have an account? Login here</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

// Ensure there is only **one** default export
export default RegistrationPage;

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  input: { width: "80%", height: 50, backgroundColor: "#fff", borderRadius: 10, paddingHorizontal: 15, marginBottom: 15 },
  button: { backgroundColor: "#fff", borderRadius: 10, padding: 15, width: "80%", alignItems: "center", marginBottom: 15 },
  buttonText: { color: "#0D47A1", fontSize: 18, fontWeight: "bold" },
  linkText: { color: "#fff", textDecorationLine: "underline" },
  errorText: { color: "red", marginBottom: 10 },
});
