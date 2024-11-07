import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import MoreScreen from './MoreScreen';
import AboutPage from './AboutPage';

export default function HomePage({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Welcome to CricketHub!</Text>
        
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
          />
          
          <TouchableOpacity style={styles.button}>
            <LinearGradient colors={['#0D47A1', '#0D47A1']} style={styles.buttonGradient}>
              <Text style={styles.buttonText}>LOG IN</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
            <Text style={styles.linkText}>Don't have an account? Register Your Club</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.additionalContent}>
          <Text style={styles.infoText}>
            Manage your cricket teams, score matches in real-time, and track player stats all in one place. Let's play!
          </Text>

          <View style={styles.featureCards}>
            <View style={styles.card}>
              <Ionicons name="people" size={24} color="#0D47A1" />
              <Text style={styles.cardTitle}>Manage Teams</Text>
            </View>
            <View style={styles.card}>
              <Ionicons name="timer" size={24} color="#0D47A1" />
              <Text style={styles.cardTitle}>Live Scores</Text>
            </View>
            <View style={styles.card}>
              <Entypo name="tools" size={24} color="#0D47A1" />
              <Text style={styles.cardTitle}>Tools</Text>
            </View>
            <View style={styles.card}>
              <Ionicons name="school" size={24} color="#0D47A1" />
              <Text style={styles.cardTitle}>Tutorials</Text>
            </View>
          </View>
        </View>

        {/* More Button */}
        <TouchableOpacity 
          style={styles.moreButton} 
          onPress={() => navigation.navigate('More')}
        >
          <Text style={styles.moreButtonText}>More</Text>
        </TouchableOpacity>

      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 CricketHub. All rights reserved.</Text>
        <View style={styles.footerLinks}>
          <TouchableOpacity onPress={() => navigation.navigate('About')}>
            <Text style={styles.footerLink}>About</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('TermsOfService')}>
            <Text style={styles.footerLink}>Terms of Service</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3f2fd',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0D47A1',
  },
  form: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonGradient: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linkText: {
    color: '#0D47A1',
    textAlign: 'center',
    marginTop: 10,
  },
  additionalContent: {
    alignItems: 'center',
  },
  infoText: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  featureCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    elevation: 3,
    flex: 1,
    minWidth: '40%',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginTop: 5,
  },
  moreButton: {
    backgroundColor: '#0D47A1',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  moreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#e3f2fd',
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    color: '#333',
    marginBottom: 5,
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 5,
  },
  footerLink: {
    color: '#0D47A1',
    textDecorationLine: 'underline',
  },
});
