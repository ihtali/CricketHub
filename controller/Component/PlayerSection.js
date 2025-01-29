import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PlayerSection({ route, navigation }) {
  const { team1, team2 } = route.params;
  
  // State for players in each team
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);
  
  const [newPlayer, setNewPlayer] = useState('');
  const [currentTeam, setCurrentTeam] = useState('team1'); // Tracks the current team being edited

  const handleAddPlayer = () => {
    if (newPlayer.trim()) {
      if (currentTeam === 'team1') {
        setTeam1Players([...team1Players, newPlayer.trim()]);
      } else {
        setTeam2Players([...team2Players, newPlayer.trim()]);
      }
      setNewPlayer('');
    } else {
      alert('Please enter a player name.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Players</Text>

      {/* Sub-header: Current team being edited */}
      <View style={styles.subHeader}>
        <TouchableOpacity
          style={currentTeam === 'team1' ? styles.activeTeam : styles.inactiveTeam}
          onPress={() => setCurrentTeam('team1')}
        >
          <Text style={styles.teamText}>{team1}</Text>
        </TouchableOpacity>
        <Text style={styles.subHeaderText}>VS</Text>
        <TouchableOpacity
          style={currentTeam === 'team2' ? styles.activeTeam : styles.inactiveTeam}
          onPress={() => setCurrentTeam('team2')}
        >
          <Text style={styles.teamText}>{team2}</Text>
        </TouchableOpacity>
      </View>

      {/* Players list for the selected team */}
      <FlatList
        data={currentTeam === 'team1' ? team1Players : team2Players}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.playerItem}>
            <Text style={styles.playerText}>{item}</Text>
          </View>
        )}
      />

      {/* Add player to the current team */}
      <View style={styles.addPlayerContainer}>
        <TextInput
          style={styles.input}
          placeholder={`Add Player to ${currentTeam === 'team1' ? team1 : team2}`}
          value={newPlayer}
          onChangeText={setNewPlayer}
        />
        <TouchableOpacity onPress={handleAddPlayer}>
          <Ionicons name="add-circle" size={40} color="#0D47A1" />
        </TouchableOpacity>
      </View>

      {/* Proceed Button */}
      <TouchableOpacity
  style={styles.nextButton}
  onPress={() => navigation.navigate('MatchSetup')}
>
  <Text style={styles.nextButtonText}>Proceed to Match Setup</Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3f2fd',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D47A1',
    textAlign: 'center',
    marginBottom: 20,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  subHeaderText: {
    fontSize: 18,
    color: '#0D47A1',
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  activeTeam: {
    backgroundColor: '#0D47A1',
    padding: 10,
    borderRadius: 5,
  },
  inactiveTeam: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderColor: '#0D47A1',
    borderWidth: 1,
  },
  teamText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playerItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 3,
  },
  playerText: {
    fontSize: 16,
    color: '#333',
  },
  addPlayerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  nextButton: {
    backgroundColor: '#0D47A1',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
