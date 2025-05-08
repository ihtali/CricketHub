import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function MatchResultPage({ route, navigation }) {
  const { result } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Match Result</Text>
      <Text style={styles.resultText}>{result}</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('HomePage')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
});
////