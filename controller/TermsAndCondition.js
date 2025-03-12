import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

export default function TermsAndConditions() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Terms and Conditions</Text>
      <Text style={styles.content}>
        Welcome to CricketHub! By using our app, you agree to the following terms and conditions:
      </Text>
      <Text style={styles.subtitle}>1. Acceptance of Terms</Text>
      <Text style={styles.content}>
        By accessing or using CricketHub, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the app.
      </Text>
      <Text style={styles.subtitle}>2. User Responsibilities</Text>
      <Text style={styles.content}>
        - You are responsible for maintaining the confidentiality of your account.
        - You agree to use the app only for lawful purposes.
      </Text>
      <Text style={styles.subtitle}>3. Intellectual Property</Text>
      <Text style={styles.content}>
        All content and features in CricketHub are the property of CricketHub and are protected by intellectual property laws.
      </Text>
      <Text style={styles.subtitle}>4. Limitation of Liability</Text>
      <Text style={styles.content}>
        CricketHub is not liable for any damages arising from the use of the app, including but not limited to data loss or service interruptions.
      </Text>
      <Text style={styles.subtitle}>5. Changes to Terms</Text>
      <Text style={styles.content}>
        We reserve the right to modify these Terms and Conditions at any time. Continued use of the app constitutes acceptance of the updated terms.
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