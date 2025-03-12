import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, FlatList } from 'react-native';

export default function MatchSetup({ route, navigation }) {
  const { team1, team2, team1Players, team2Players, tossWinner, tossDecision } = route.params;

  const [striker, setStriker] = useState(null);
  const [nonStriker, setNonStriker] = useState(null);
  const [bowler, setBowler] = useState(null);

  const handleStartMatch = () => {
    if (striker && nonStriker && bowler) {
      navigation.navigate('ScoringPage', {
        team1,
        team2,
        team1Players,
        team2Players,
        tossWinner,
        tossDecision,
        striker,
        nonStriker,
        bowler,
      });
    } else {
      Alert.alert('Incomplete Selection', 'Please select striker, non-striker, and bowler.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Match Setup</Text>

      <Text style={styles.subtitle}>Toss Results:</Text>
      <Text style={styles.tossResult}>
        {tossWinner} won the toss and chose to {tossDecision}.
      </Text>

      <Text style={styles.subtitle}>Select Striker:</Text>
      <FlatList
        data={team1Players}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.playerButton, striker === item && styles.selectedPlayer]}
            onPress={() => setStriker(item)}
          >
            <Text style={styles.playerText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.subtitle}>Select Non-Striker:</Text>
      <FlatList
        data={team1Players}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.playerButton, nonStriker === item && styles.selectedPlayer]}
            onPress={() => setNonStriker(item)}
          >
            <Text style={styles.playerText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.subtitle}>Select Bowler:</Text>
      <FlatList
        data={team2Players}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.playerButton, bowler === item && styles.selectedPlayer]}
            onPress={() => setBowler(item)}
          >
            <Text style={styles.playerText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.startButton} onPress={handleStartMatch}>
        <Text style={styles.startButtonText}>Start Match</Text>
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
  },
  tossResult: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  playerButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  selectedPlayer: {
    backgroundColor: '#0D47A1',
  },
  playerText: {
    fontSize: 16,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#0D47A1',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});