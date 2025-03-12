
// LoginPage.js
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { auth, db } from "../API/firebaseConfig"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const docRef = doc(db, "clubs", email);
      const docSnap = await getDoc(docRef);
      let clubName = "Unknown Club";

      if (docSnap.exists()) {
        clubName = docSnap.data().clubName || "Unnamed Club";
      }

      navigation.replace("HomePage", { email, clubName });
    } catch (error) {
      console.error("Login failed:", error.message);
      setError("Login failed: " + error.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#0D47A1", "#1976D2"]} style={styles.gradient}>
        <Text style={styles.title}>Login</Text>
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator size="small" color="#0D47A1" /> : <Text style={styles.buttonText}>Login</Text>}
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  input: { width: "80%", height: 50, backgroundColor: "#fff", borderRadius: 10, paddingHorizontal: 15, marginBottom: 15 },
  button: { backgroundColor: "#fff", borderRadius: 10, padding: 15, width: "80%", alignItems: "center", marginBottom: 15 },
  buttonText: { color: "#0D47A1", fontSize: 18, fontWeight: "bold" },
  errorText: { color: "red", marginBottom: 10, fontSize: 16 }
});
