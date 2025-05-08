import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../API/firebaseConfig"; // Ensure this path is correct

import { signOut } from "firebase/auth";

export default function HomePage({ navigation, route }) {
  const isGuest = route.params?.isGuest || false; // Check if the user is in guest mode
  const userEmail = route.params?.email; // Get logged-in user's email
  const [clubName, setClubName] = useState("Loading...");
  const [loading, setLoading] = useState(true); // Loading state
  const fadeAnim = useState(new Animated.Value(0))[0]; // Fade animation for hero section

  useEffect(() => {
    const fetchClub = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;
      try {
        console.log("Fetching club for UID:", currentUser.uid); // Debug log
        const clubRef = doc(db, "clubs", currentUser.uid); // This Use UID instead of email
        const clubSnap = await getDoc(clubRef);
  
        if (clubSnap.exists()) {
          console.log("Club Data:", clubSnap.data()); // Debug log
          setClubName(clubSnap.data().clubName || "Unnamed Club");
        } else {
          setClubName("Unknown Club");
        }
      } catch (error) {
        console.error("Error fetching club data:", error);
        setClubName("Error Loading Club");
      } finally {
        setLoading(false);
      }
    };
  
    fetchClub();
  }, []);

  // Fade-in animation for hero section
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('LoginPage'); // Redirect to the Login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Club Header */}
        <View style={styles.clubHeader}>
          <Text style={styles.clubName}>🏏 {clubName} 🏏</Text>
        </View>

        {/* Hero Section */}
        <Animated.View style={[styles.heroSection, { opacity: fadeAnim }]}>
          <Image
            source={require('../assets/LOGO.jpg')}
            style={styles.heroImage}
          />
          <LinearGradient colors={['rgba(13, 71, 161, 0.8)', 'rgba(25, 118, 210, 0.8)']} style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Empowering Grassroots Cricket</Text>
            <Text style={styles.heroSubtitle}>
              A centralized platform for team management, real-time match monitoring, and performance tracking.
            </Text>
          </LinearGradient>
        </Animated.View>

        {/* Guest Mode Message */}
        {isGuest && (
          <View style={styles.guestMessage}>
            <Text style={styles.guestText}>You are in guest mode. Register or log in to unlock all features.</Text>
            <TouchableOpacity style={styles.guestButton} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.guestButtonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.guestButton} onPress={() => navigation.navigate('Registration')}>
              <Text style={styles.guestButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>What We Offer</Text>
          <View style={styles.featureCards}>
            {/* Team Management */}
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TeamManagement')} disabled={isGuest}>
              <Ionicons name="people" size={40} color="#0D47A1" />
              <Text style={styles.cardTitle}>Team Management</Text>
              <Text style={styles.cardText}>Easily manage your teams, player profiles, and roles.</Text>
              {isGuest && <Text style={styles.lockedText}>Log in to access</Text>}
            </TouchableOpacity>

            {/* Real-Time Scoring */}
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TeamName')} disabled={isGuest}>
              <Ionicons name="timer" size={40} color="#0D47A1" />
              <Text style={styles.cardTitle}>Real-Time Scoring</Text>
              <Text style={styles.cardText}>Track match progress and scores in real-time.</Text>
              {isGuest && <Text style={styles.lockedText}>Log in to access</Text>}
            </TouchableOpacity>

            {/* Performance Tracking */}
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PerformanceTracking')} disabled={isGuest}>
              <Ionicons name="stats-chart" size={40} color="#0D47A1" />
              <Text style={styles.cardTitle}>Performance Tracking</Text>
              <Text style={styles.cardText}>Monitor player stats and improve team performance.</Text>
              {isGuest && <Text style={styles.lockedText}>Log in to access</Text>}
            </TouchableOpacity>

              {/* Schedule Management */}
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ScheduleManagement')} disabled={isGuest}>
              <Ionicons name="people" size={40} color="#0D47A1" />
              <Text style={styles.cardTitle}>Schedule Management</Text>
              <Text style={styles.cardText}>Set your upcoming match Schedule</Text>
              {isGuest && <Text style={styles.lockedText}>Log in to access</Text>}
            </TouchableOpacity>

            {/* Youth Engagement */}
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('YouthEngagement')} disabled={isGuest}>
              <Ionicons name="school" size={40} color="#0D47A1" />
              <Text style={styles.cardTitle}>Youth Engagement</Text>
              <Text style={styles.cardText}>Encourage young players to join and grow in the sport.</Text>
              {isGuest && <Text style={styles.lockedText}>Log in to access</Text>}
            </TouchableOpacity>

            {/* Training Resources */}
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TrainingPage')} disabled={isGuest}>
              <Ionicons name="book" size={40} color="#0D47A1" />
              <Text style={styles.cardTitle}>Training Resources</Text>
              <Text style={styles.cardText}>Access tutorials, drills, and tips to improve your game.</Text>
              {isGuest && <Text style={styles.lockedText}>Log in to access</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 CricketHub. All rights reserved.</Text>
        <View style={styles.footerLinks}>
          <TouchableOpacity onPress={() => navigation.navigate('About')}>
            <Text style={styles.footerLink}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MoreScreen')}>
            <Text style={styles.footerLink}>More Options</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.footerLink}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3f2fd',
  },
  scrollContent: {
    flexGrow: 1,
  },
  clubHeader: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  clubName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D47A1',
  },
  heroSection: {
    height: 300,
    position: 'relative',
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  guestMessage: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  guestText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  guestButton: {
    backgroundColor: '#0D47A1',
    borderRadius: 10,
    padding: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  guestButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  featuresSection: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D47A1',
    textAlign: 'center',
    marginBottom: 20,
  },
  featureCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginTop: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginTop: 5,
  },
  lockedText: {
    fontSize: 12,
    color: 'red',
    marginTop: 5,
    fontStyle: 'italic',
  },
  footer: {
    backgroundColor: '#0D47A1',
    paddingVertical: 15,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  footerLink: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 10,
    textDecorationLine: 'underline',
  },
});