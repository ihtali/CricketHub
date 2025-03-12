import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PerformanceTracking({ navigation }) {
  // Sample player data
  const [players, setPlayers] = useState([
    { id: '1', name: 'John Doe', matches: 10, runs: 450, wickets: 5 },
    { id: '2', name: 'Jane Smith', matches: 8, runs: 320, wickets: 8 },
    { id: '3', name: 'Alice Johnson', matches: 12, runs: 600, wickets: 12 },
  ]);

  // State for adding a new player
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerMatches, setNewPlayerMatches] = useState('');
  const [newPlayerRuns, setNewPlayerRuns] = useState('');
  const [newPlayerWickets, setNewPlayerWickets] = useState('');

  // Add a new player
  const addPlayer = () => {
    if (newPlayerName && newPlayerMatches && newPlayerRuns && newPlayerWickets) {
      const newPlayer = {
        id: String(players.length + 1),
        name: newPlayerName,
        matches: parseInt(newPlayerMatches),
        runs: parseInt(newPlayerRuns),
        wickets: parseInt(newPlayerWickets),
      };
      setPlayers([...players, newPlayer]);
      setNewPlayerName('');
      setNewPlayerMatches('');
      setNewPlayerRuns('');
      setNewPlayerWickets('');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Performance Tracking</Text>
        </View>

        {/* Add Player Form */}
        <View style={styles.addPlayerForm}>
          <Text style={styles.sectionTitle}>Add New Player</Text>
          <TextInput
            style={styles.input}
            placeholder="Player Name"
            value={newPlayerName}
            onChangeText={setNewPlayerName}
          />
          <TextInput
            style={styles.input}
            placeholder="Matches Played"
            keyboardType="numeric"
            value={newPlayerMatches}
            onChangeText={setNewPlayerMatches}
          />
          <TextInput
            style={styles.input}
            placeholder="Total Runs"
            keyboardType="numeric"
            value={newPlayerRuns}
            onChangeText={setNewPlayerRuns}
          />
          <TextInput
            style={styles.input}
            placeholder="Total Wickets"
            keyboardType="numeric"
            value={newPlayerWickets}
            onChangeText={setNewPlayerWickets}
          />
          <TouchableOpacity style={styles.addButton} onPress={addPlayer}>
            <Text style={styles.addButtonText}>Add Player</Text>
          </TouchableOpacity>
        </View>

        {/* Player Performance List */}
        <View style={styles.performanceList}>
          <Text style={styles.sectionTitle}>Player Performance</Text>
          <FlatList
            data={players}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.playerCard}>
                <Text style={styles.playerName}>{item.name}</Text>
                <View style={styles.statsContainer}>
                  <Text style={styles.statText}>Matches: {item.matches}</Text>
                  <Text style={styles.statText}>Runs: {item.runs}</Text>
                  <Text style={styles.statText}>Wickets: {item.wickets}</Text>
                </View>
                <TouchableOpacity style={styles.detailsButton}>
                  <Text style={styles.detailsButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </ScrollView>
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
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D47A1',
  },
  addPlayerForm: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginBottom: 10,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#0D47A1',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  performanceList: {
    marginBottom: 20,
  },
  playerCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginBottom: 10,
  },
  statsContainer: {
    marginBottom: 10,
  },
  statText: {
    fontSize: 14,
    color: '#333',
  },
  detailsButton: {
    backgroundColor: '#0D47A1',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});