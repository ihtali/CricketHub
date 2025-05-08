import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';

export default function SecondInningsSetup({ navigation, route }) {
  const {
    teamAName,
    teamBName,
    teamAPlayers,
    teamBPlayers,
    targetRuns,
  } = route.params;

  const [striker, setStriker] = useState('');
  const [nonStriker, setNonStriker] = useState('');
  const [bowler, setBowler] = useState('');

  const battingTeamPlayers = teamBPlayers;
  const bowlingTeamPlayers = teamAPlayers;

  const startSecondInnings = () => {
    if (!striker || !nonStriker || !bowler) {
      Alert.alert("Error", "Please select Striker, Non-Striker, and Bowler!");
      return;
    }

    if (striker === nonStriker) {
      Alert.alert("Error", "Striker and Non-Striker must be different players!");
      return;
    }

    navigation.navigate('ScoringScreen', {
      teamAName,
      teamBName,
      teamAPlayers,
      teamBPlayers,
      striker,
      nonStriker,
      bowler,
      battingTeamName: teamBName,
      bowlingTeamName: teamAName,
      targetRuns,
      currentInnings: 'Second',
      startFresh: true,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Second Innings Setup</Text>
      <Text style={styles.targetText}>Target: {targetRuns} Runs</Text>

      <Text style={styles.subHeader}>Select Striker</Text>
      <FlatList
        data={battingTeamPlayers}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[
              styles.itemButton,
              striker === item && styles.selectedItem
            ]} 
            onPress={() => setStriker(item)}
          >
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.subHeader}>Select Non-Striker</Text>
      <FlatList
        data={battingTeamPlayers.filter(player => player !== striker)}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[
              styles.itemButton,
              nonStriker === item && styles.selectedItem
            ]}
            onPress={() => setNonStriker(item)}
          >
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.subHeader}>Select First Bowler</Text>
      <FlatList
        data={bowlingTeamPlayers}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[
              styles.itemButton,
              bowler === item && styles.selectedItem
            ]}
            onPress={() => setBowler(item)}
          >
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity 
        style={styles.startButton} 
        onPress={startSecondInnings}
        disabled={!striker || !nonStriker || !bowler}
      >
        <Text style={styles.startButtonText}>Start Second Innings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e3f2fd', padding: 20 },
  header: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  targetText: { fontSize: 20, color: 'green', textAlign: 'center', marginBottom: 20, fontWeight: 'bold' },
  subHeader: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  itemButton: { 
    backgroundColor: '#90caf9', 
    padding: 10, 
    borderRadius: 8, 
    marginRight: 10,
    minWidth: 100,
    alignItems: 'center'
  },
  selectedItem: {
    backgroundColor: '#0D47A1'
  },
  itemText: { fontSize: 16, color: '#0D47A1', fontWeight: 'bold' },
  startButton: { 
    backgroundColor: '#0D47A1', 
    padding: 15, 
    borderRadius: 10, 
    marginTop: 40, 
    alignItems: 'center' 
  },
  startButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});