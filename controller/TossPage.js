import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

export default function TossPage({ route, navigation }) {
  const { team1, team2, team1Players, team2Players } = route.params;

  const [tossWinner, setTossWinner] = useState(null);
  const [tossDecision, setTossDecision] = useState(null);

  const handleTossWinner = (team) => {
    setTossWinner(team);
  };

  const handleTossDecision = (decision) => {
    setTossDecision(decision);
  };

  const handleProceed = () => {
    if (tossWinner && tossDecision) {
      navigation.navigate('MatchSetup', {
        team1,
        team2,
        team1Players,
        team2Players,
        tossWinner,
        tossDecision,
      });
    } else {
      Alert.alert('Incomplete Toss', 'Please select the toss winner and decision.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Toss</Text>

      <Text style={styles.subtitle}>Who won the toss?</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.tossButton, tossWinner === team1 && styles.selectedTossButton]}
          onPress={() => handleTossWinner(team1)}
        >
          <Text style={styles.tossButtonText}>{team1}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tossButton, tossWinner === team2 && styles.selectedTossButton]}
          onPress={() => handleTossWinner(team2)}
        >
          <Text style={styles.tossButtonText}>{team2}</Text>
        </TouchableOpacity>
      </View>

      {tossWinner && (
        <>
          <Text style={styles.subtitle}>What did {tossWinner} choose?</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.tossButton, tossDecision === 'Batting' && styles.selectedTossButton]}
              onPress={() => handleTossDecision('Batting')}
            >
              <Text style={styles.tossButtonText}>Batting</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tossButton, tossDecision === 'Bowling' && styles.selectedTossButton]}
              onPress={() => handleTossDecision('Bowling')}
            >
              <Text style={styles.tossButtonText}>Bowling</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
        <Text style={styles.proceedButtonText}>Proceed to Match Setup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  tossButton: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  selectedTossButton: {
    backgroundColor: '#0D47A1',
  },
  tossButtonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  proceedButton: {
    backgroundColor: '#0D47A1',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});