import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

export default function PrivacyPolicy() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.content}>
        At CricketHub, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our app.
      </Text>
      <Text style={styles.subtitle}>Information We Collect</Text>
      <Text style={styles.content}>
        - Personal Information: Name, email address, and other details you provide during registration.
        - Usage Data: Information about how you use the app, such as matches played, scores, and performance metrics.
      </Text>
      <Text style={styles.subtitle}>How We Use Your Information</Text>
      <Text style={styles.content}>
        - To provide and improve our services.
        - To communicate with you about updates, features, and support.
        - To analyze app usage and improve user experience.
      </Text>
      <Text style={styles.subtitle}>Data Security</Text>
      <Text style={styles.content}>
        We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure.
      </Text>
      <Text style={styles.subtitle}>Changes to This Policy</Text>
      <Text style={styles.content}>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#e3f2fd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0D47A1',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#0D47A1',
  },
  content: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    lineHeight: 24,
  },
});