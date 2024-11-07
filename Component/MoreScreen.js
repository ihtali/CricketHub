import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

export default function MoreScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>MORE</Text>
      
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Registration')}>
        <Text style={styles.optionText}>Sign In / Register</Text>
        
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ManageFavourites')}>
        <Text style={styles.optionText}>Manage Favourites</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PrivacyPolicy')}>
        <Text style={styles.optionText}>Privacy Policy</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('TermsConditions')}>
        <Text style={styles.optionText}>Terms and Conditions</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Feedback')}>
        <Text style={styles.optionText}>Feedback</Text>
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image source={require('../assets/Cricket-bat-ball.png')} style={styles.logo} />
        <Text style={styles.version}>© 2024 CricketHub. All rights reserved.</Text>
        <Text style={styles.version}>Version: 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#e3f2fd',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0D47A1',
    marginBottom: 20,
  },
  option: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    elevation: 2,
  },
  optionText: {
    fontSize: 18,
    color: '#0D47A1',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  version: {
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
  },
});

