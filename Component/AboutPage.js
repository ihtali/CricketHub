import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

const AboutScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About CricketHub</Text>

      {/* Local Image */}
      <Image 
        source={require('../assets/Cricket-bat-ball.png')} 
        style={styles.image}
        resizeMode="contain" 
      />

      <Text style={styles.description}>
        CricketHub is your go-to application for managing grassroots cricket teams. 
        We provide an easy-to-use platform to help clubs manage their matches, 
        track player performance, and enhance communication within teams.
      </Text>
      <Text style={styles.subtitle}>Features:</Text>
      <Text style={styles.feature}>- Real-time match scoring</Text>
      <Text style={styles.feature}>- Performance tracking</Text>
      <Text style={styles.feature}>- Team management tools</Text>
      <Text style={styles.subtitle}>Meet the Team:</Text>
      <Text style={styles.teamMember}>- Ihtasham IH: Developer</Text>
      <Text style={styles.teamMember}>- Ali AA: Designer</Text>
      <Text style={styles.subtitle}>Contact Us:</Text>
      <Text style={styles.contactInfo}>For support, email us at support@crickethub.com</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'justify',
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  feature: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 5,
  },
  teamMember: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 16,
    marginBottom: 15,
  },
});

export default AboutScreen;
