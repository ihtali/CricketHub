import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PlayerSection({ route, navigation }) {
  const { team1, team2 } = route.params;

  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);
  const [newPlayer, setNewPlayer] = useState('');
  const [currentTeam, setCurrentTeam] = useState('team1');

  const handleAddPlayer = () => {
    if (newPlayer.trim()) {
      const players = currentTeam === 'team1' ? team1Players : team2Players;

      if (players.includes(newPlayer.trim())) {
        Alert.alert('Duplicate Player', 'This player already exists in the team.');
        return;
      }

      if (currentTeam === 'team1') {
        setTeam1Players([...team1Players, newPlayer.trim()]);
      } else {
        setTeam2Players([...team2Players, newPlayer.trim()]);
      }
      setNewPlayer('');
    } else {
      Alert.alert('Empty Input', 'Please enter a player name.');
    }
  };

  const handleRemovePlayer = (player) => {
    if (currentTeam === 'team1') {
      setTeam1Players(team1Players.filter((p) => p !== player));
    } else {
      setTeam2Players(team2Players.filter((p) => p !== player));
    }
  };

  const handleProceed = () => {
    if (team1Players.length > 0 && team2Players.length > 0) {
      navigation.navigate('TossPage', { team1, team2, team1Players, team2Players });
    } else {
      Alert.alert('Incomplete Teams', 'Please add players to both teams.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Player Selection</Text>

      <View style={styles.subHeader}>
        <TouchableOpacity
          style={[styles.teamButton, currentTeam === 'team1' && styles.activeTeam]}
          onPress={() => setCurrentTeam('team1')}
        >
          <Text style={styles.teamButtonText}>{team1}</Text>
        </TouchableOpacity>
        <Text style={styles.subHeaderText}>VS</Text>
        <TouchableOpacity
          style={[styles.teamButton, currentTeam === 'team2' && styles.activeTeam]}
          onPress={() => setCurrentTeam('team2')}
        >
          <Text style={styles.teamButtonText}>{team2}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.teamTitle}>
        {currentTeam === 'team1' ? team1 : team2} Players
      </Text>
      <FlatList
        data={currentTeam === 'team1' ? team1Players : team2Players}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.playerItem}>
            <Text style={styles.playerText}>{item}</Text>
            <TouchableOpacity onPress={() => handleRemovePlayer(item)}>
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No players added yet.</Text>
        }
      />

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

      <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
        <Text style={styles.proceedButtonText}>Proceed to Toss</Text>
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
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  teamButton: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0D47A1',
  },
  activeTeam: {
    backgroundColor: '#0D47A1',
  },
  teamButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  teamTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  playerText: {
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
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
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#fff',
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