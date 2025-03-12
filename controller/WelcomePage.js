import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomePage({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0D47A1', '#1976D2']}
        style={styles.gradient}
      >
        <Image
          source={require('../assets/LOGO.jpg')} // Add a cricket-related image
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome to CricketHub!</Text>
        <Text style={styles.subtitle}>
          Empowering grassroots cricket with seamless team management and real-time match Scoring.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LoginPage')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Registration')}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    width: '80%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#0D47A1',
    fontSize: 18,
    fontWeight: 'bold',
  },
});