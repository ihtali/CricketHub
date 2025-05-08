import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

export default function TeamName({ navigation }) {
  const [teamAName, setTeamAName] = useState('');
  const [teamBName, setTeamBName] = useState('');
  const [teamAPlayers, setTeamAPlayers] = useState([]);
  const [teamBPlayers, setTeamBPlayers] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('A');

  const addPlayer = () => {
    if (playerName.trim() === '') {
      Alert.alert('Error', 'Please enter a player name.');
      return;
    }
    if (selectedTeam === 'A') {
      if (teamAPlayers.length >= 11) {
        Alert.alert('Limit Reached', 'Only 11 players allowed in Team A.');
        return;
      }
      setTeamAPlayers([...teamAPlayers, playerName.trim()]);
    } else {
      if (teamBPlayers.length >= 11) {
        Alert.alert('Limit Reached', 'Only 11 players allowed in Team B.');
        return;
      }
      setTeamBPlayers([...teamBPlayers, playerName.trim()]);
    }
    setPlayerName('');
  };

  const startToss = () => {
    if (teamAPlayers.length !== 11 || teamBPlayers.length !== 11) {
      Alert.alert('Teams Incomplete', 'Each team must have exactly 11 players.');
      return;
    }
    navigation.navigate('TossPage', {
      teamAName,
      teamBName,
      teamAPlayers,
      teamBPlayers,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter Team Names</Text>
      <TextInput
        placeholder="Team A Name"
        value={teamAName}
        onChangeText={setTeamAName}
        style={styles.input}
      />
      <TextInput
        placeholder="Team B Name"
        value={teamBName}
        onChangeText={setTeamBName}
        style={styles.input}
      />

      <Text style={styles.subHeader}>Add Players</Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.teamButton, selectedTeam === 'A' && styles.activeButton]}
          onPress={() => setSelectedTeam('A')}
        >
          <Text style={styles.buttonText}>Team A</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.teamButton, selectedTeam === 'B' && styles.activeButton]}
          onPress={() => setSelectedTeam('B')}
        >
          <Text style={styles.buttonText}>Team B</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Player Name"
        value={playerName}
        onChangeText={setPlayerName}
        style={styles.input}
      />

      <TouchableOpacity style={styles.addButton} onPress={addPlayer}>
        <Text style={styles.addButtonText}>Add Player</Text>
      </TouchableOpacity>

      <View style={styles.teamListContainer}>
        <View style={styles.teamList}>
          <Text style={styles.teamName}>{teamAName || 'Team A'}</Text>
          <FlatList
            data={teamAPlayers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <Text style={styles.playerName}>{index + 1}. {item}</Text>
            )}
          />
        </View>
        <View style={styles.teamList}>
          <Text style={styles.teamName}>{teamBName || 'Team B'}</Text>
          <FlatList
            data={teamBPlayers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <Text style={styles.playerName}>{index + 1}. {item}</Text>
            )}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.startButton} onPress={startToss}>
        <Text style={styles.startButtonText}>Proceed to Toss</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#e3f2fd' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  subHeader: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 10, marginTop: 10, marginBottom: 10 },
  buttonGroup: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  teamButton: { backgroundColor: '#bbdefb', padding: 10, borderRadius: 10 },
  activeButton: { backgroundColor: '#0D47A1' },
  buttonText: { color: '#000', fontWeight: 'bold' },
  addButton: { backgroundColor: '#0D47A1', padding: 10, borderRadius: 10, marginTop: 10, alignItems: 'center' },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  teamListContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  teamList: { width: '48%', backgroundColor: '#fff', padding: 10, borderRadius: 10 },
  teamName: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  playerName: { fontSize: 14, marginVertical: 2 },
  startButton: { backgroundColor: '#0D47A1', padding: 15, borderRadius: 10, marginTop: 20, alignItems: 'center' },
  startButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
